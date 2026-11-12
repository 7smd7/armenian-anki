"use client";

import { useState } from "react";

// One shared player so starting a new word stops the previous one
let current: HTMLAudioElement | null = null;

export function Speak({
    text,
    className = "",
    label = "Listen",
}: {
    text: string;
    className?: string;
    label?: string;
}) {
    const [state, setState] = useState<"idle" | "playing" | "error">("idle");

    const play = (e: React.MouseEvent) => {
        e.stopPropagation();
        current?.pause();
        const audio = new Audio(`/api/tts?text=${encodeURIComponent(text)}`);
        current = audio;
        setState("playing");
        audio.onended = () => setState("idle");
        audio.onerror = () => setState("error");
        audio.play().catch(() => setState("error"));
    };

    return (
        <button
            type='button'
            onClick={play}
            aria-label={`${label}: ${text}`}
            title={state === "error" ? "Audio unavailable" : label}
            className={`inline-flex items-center justify-center w-7 h-7 rounded-full shrink-0 transition-colors ${
                state === "error"
                    ? "text-gray-300"
                    : state === "playing"
                      ? "bg-indigo-100 text-indigo-600"
                      : "text-indigo-400 hover:bg-indigo-50 hover:text-indigo-600"
            } ${className}`}
        >
            <svg
                width='15'
                height='15'
                viewBox='0 0 24 24'
                fill='none'
                stroke='currentColor'
                strokeWidth='2.2'
                strokeLinecap='round'
                strokeLinejoin='round'
            >
                <path d='M11 5L6 9H2v6h4l5 4V5z' />
                {state === "error" ? (
                    <path d='M22 9l-6 6M16 9l6 6' />
                ) : (
                    <path d='M15.5 8.5a5 5 0 010 7M19 5a10 10 0 010 14' />
                )}
            </svg>
        </button>
    );
}
