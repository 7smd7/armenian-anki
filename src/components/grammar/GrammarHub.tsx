"use client";

import { useState, useSyncExternalStore } from "react";
import { Nav } from "@/components/Nav";
import type { DrillSettings } from "@/lib/grammar/drill";
import { Lessons } from "./Lessons";
import { Practice } from "./Practice";
import { Conjugator } from "./Conjugator";

type Tab = "learn" | "practice" | "conjugator";

const TABS: { id: Tab; label: string }[] = [
    { id: "learn", label: "Learn" },
    { id: "practice", label: "Practice" },
    { id: "conjugator", label: "Conjugator" },
];

// The tab lives in the URL hash so refresh and the back button keep your place
const subscribeHash = (cb: () => void) => {
    window.addEventListener("hashchange", cb);
    return () => window.removeEventListener("hashchange", cb);
};
const readHash = () => window.location.hash.slice(1);

export function GrammarHub() {
    const hash = useSyncExternalStore(subscribeHash, readHash, () => "");
    const tab: Tab = TABS.some((t) => t.id === hash) ? (hash as Tab) : "learn";
    // Bumped on every "Practice this" so Practice restarts with the preset
    const [preset, setPreset] = useState<{
        settings: Partial<DrillSettings>;
        version: number;
    } | null>(null);

    const go = (t: Tab) => {
        // Push a history entry so the back button returns to the previous tab
        window.history.pushState(null, "", `#${t}`);
        window.dispatchEvent(new HashChangeEvent("hashchange"));
        window.scrollTo({ top: 0 });
    };

    return (
        <div className='min-h-dvh flex flex-col bg-background'>
            <Nav />
            <main className='flex-1 w-full max-w-2xl mx-auto px-4 py-5 flex flex-col gap-4'>
                <div>
                    <h1 className='text-2xl font-bold text-gray-900'>
                        Grammar{" "}
                        <span className='font-armenian text-indigo-500 text-xl'>
                            Քերականություն
                        </span>
                    </h1>
                    <p className='text-sm text-gray-500'>
                        Tenses, irregular verbs, pronouns and more.
                    </p>
                </div>

                <div className='sticky top-14 z-20 -mx-4 px-4 py-2 bg-background/90 backdrop-blur-md'>
                    <div className='grid grid-cols-3 rounded-xl bg-gray-100 p-1'>
                        {TABS.map((t) => (
                            <button
                                key={t.id}
                                onClick={() => go(t.id)}
                                className={`py-2 rounded-lg text-sm font-semibold transition-colors ${
                                    tab === t.id
                                        ? "bg-white text-indigo-700 shadow-sm"
                                        : "text-gray-500 hover:text-gray-700"
                                }`}
                            >
                                {t.label}
                            </button>
                        ))}
                    </div>
                </div>

                {tab === "learn" && (
                    <Lessons
                        onPractice={(settings) => {
                            setPreset((p) => ({
                                settings,
                                version: (p?.version ?? 0) + 1,
                            }));
                            go("practice");
                        }}
                    />
                )}
                {tab === "practice" && (
                    <Practice
                        key={preset?.version ?? 0}
                        preset={preset?.settings ?? null}
                    />
                )}
                {tab === "conjugator" && <Conjugator />}
            </main>
        </div>
    );
}
