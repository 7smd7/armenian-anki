"use client";

import { useSyncExternalStore } from "react";

// Light / dark switch. With no saved choice the theme follows the system;
// tapping the button saves an explicit choice in localStorage ("theme").
// The class is applied before first paint by THEME_INIT_SCRIPT in layout.tsx.

export const THEME_KEY = "theme";

export const THEME_INIT_SCRIPT = `(function(){try{var t=localStorage.getItem("${THEME_KEY}");var d=t?t==="dark":window.matchMedia("(prefers-color-scheme: dark)").matches;document.documentElement.classList.toggle("dark",d)}catch(e){}})()`;

function subscribe(cb: () => void) {
    // Re-render when the class changes, and follow the system while no choice is saved
    const observer = new MutationObserver(cb);
    observer.observe(document.documentElement, {
        attributes: true,
        attributeFilter: ["class"],
    });
    const media = window.matchMedia("(prefers-color-scheme: dark)");
    const onSystem = () => {
        let saved: string | null = null;
        try {
            saved = localStorage.getItem(THEME_KEY);
        } catch {
            // ignore
        }
        if (!saved) document.documentElement.classList.toggle("dark", media.matches);
    };
    media.addEventListener("change", onSystem);
    return () => {
        observer.disconnect();
        media.removeEventListener("change", onSystem);
    };
}

const isDark = () => document.documentElement.classList.contains("dark");

export function ThemeToggle() {
    const dark = useSyncExternalStore(subscribe, isDark, () => false);

    const toggle = () => {
        const next = !isDark();
        document.documentElement.classList.toggle("dark", next);
        try {
            localStorage.setItem(THEME_KEY, next ? "dark" : "light");
        } catch {
            // ignore: the theme still applies for this visit
        }
    };

    return (
        <button
            type='button'
            onClick={toggle}
            aria-label={dark ? "Switch to light theme" : "Switch to dark theme"}
            title={dark ? "Light theme" : "Dark theme"}
            className='w-8 h-8 shrink-0 flex items-center justify-center rounded-lg text-gray-500 hover:bg-gray-100 hover:text-gray-800 transition-colors'
        >
            {dark ? (
                <svg width='17' height='17' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2' strokeLinecap='round' aria-hidden>
                    <circle cx='12' cy='12' r='4' />
                    <path d='M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4' />
                </svg>
            ) : (
                <svg width='17' height='17' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round' aria-hidden>
                    <path d='M21 12.8A9 9 0 1111.2 3a7 7 0 009.8 9.8z' />
                </svg>
            )}
        </button>
    );
}
