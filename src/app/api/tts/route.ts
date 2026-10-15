// API route for Armenian text-to-speech
// GET /api/tts?text=xxx → audio/mpeg
//
// Synthesizes with Azure Speech (neural hy-AM voice) and caches each MP3 on
// disk, so every distinct text costs Azure characters only once.
// Env: AZURE_SPEECH_KEY, AZURE_SPEECH_REGION, optional AZURE_SPEECH_VOICE,
// optional TTS_CACHE_DIR (mount a volume there to keep audio across deploys).

import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import fs from "fs/promises";
import path from "path";

const MAX_TEXT_LENGTH = 300;
const DEFAULT_VOICE = "hy-AM-AnahitNeural";
const CACHE_DIR =
    process.env.TTS_CACHE_DIR || path.join(process.cwd(), ".cache", "tts");

// Armenian letters (U+0531–U+0587) — rejects requests that would spend quota on non-Armenian text
const ARMENIAN_RE = /[Ա-և]/;

// Concurrent requests for the same text share one Azure call
const inFlight = new Map<string, Promise<Buffer>>();

function escapeXml(text: string): string {
    return text
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&apos;");
}

async function synthesize(text: string, voice: string): Promise<Buffer> {
    const key = process.env.AZURE_SPEECH_KEY;
    const region = process.env.AZURE_SPEECH_REGION;
    if (!key || !region) throw new Error("Azure Speech is not configured");

    // Slightly slower than normal speed for learners
    const ssml =
        `<speak version='1.0' xml:lang='hy-AM'><voice name='${voice}'>` +
        `<prosody rate='-10%'>${escapeXml(text)}</prosody></voice></speak>`;

    const res = await fetch(
        `https://${region}.tts.speech.microsoft.com/cognitiveservices/v1`,
        {
            method: "POST",
            headers: {
                "Ocp-Apim-Subscription-Key": key,
                "Content-Type": "application/ssml+xml",
                "X-Microsoft-OutputFormat": "audio-24khz-48kbitrate-mono-mp3",
                "User-Agent": "armenian-anki",
            },
            body: ssml,
        },
    );

    if (!res.ok) {
        throw new Error(`Azure TTS failed: ${res.status} ${await res.text()}`);
    }
    return Buffer.from(await res.arrayBuffer());
}

async function getAudio(text: string): Promise<Buffer> {
    const voice = process.env.AZURE_SPEECH_VOICE || DEFAULT_VOICE;
    const hash = crypto
        .createHash("sha256")
        .update(`${voice}\n${text}`)
        .digest("hex");
    const file = path.join(CACHE_DIR, `${hash}.mp3`);

    try {
        return await fs.readFile(file);
    } catch {
        // cache miss
    }

    const pending = inFlight.get(hash);
    if (pending) return pending;

    const job = (async () => {
        const audio = await synthesize(text, voice);
        try {
            await fs.mkdir(CACHE_DIR, { recursive: true });
            await fs.writeFile(file, audio);
        } catch (err) {
            console.error("TTS cache write failed:", err);
        }
        return audio;
    })().finally(() => inFlight.delete(hash));

    inFlight.set(hash, job);
    return job;
}

export async function GET(request: NextRequest) {
    const text = (request.nextUrl.searchParams.get("text") ?? "")
        .normalize("NFC")
        .trim();

    if (!text || text.length > MAX_TEXT_LENGTH || !ARMENIAN_RE.test(text)) {
        return NextResponse.json({ error: "Invalid text" }, { status: 400 });
    }

    try {
        const audio = await getAudio(text);
        return new NextResponse(new Uint8Array(audio), {
            headers: {
                "Content-Type": "audio/mpeg",
                "Content-Length": String(audio.length),
                "Cache-Control": "public, max-age=31536000, immutable",
            },
        });
    } catch (error) {
        console.error("TTS error:", error);
        return NextResponse.json(
            { error: "Text-to-speech unavailable" },
            { status: 502 },
        );
    }
}
