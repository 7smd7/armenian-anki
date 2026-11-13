import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { SessionProviderWrapper } from "@/components/SessionProviderWrapper";
import { AlertProvider } from "@/components/modals/AlertProvider";
import { THEME_INIT_SCRIPT } from "@/components/ThemeToggle";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

const APP_URL = process.env.NEXTAUTH_URL ?? "http://localhost:3000";

export const metadata: Metadata = {
    metadataBase: new URL(APP_URL),
    title: {
        default: "Hayeren — Learn Armenian",
        template: "%s | Hayeren",
    },
    description:
        "Spaced repetition flashcard app for Armenian vocabulary. Try free, no sign-in needed.",
    keywords: [
        "Armenian",
        "vocabulary",
        "flashcards",
        "spaced repetition",
        "language learning",
        "Հայերեն",
    ],
    authors: [{ name: "Hayeren" }],
    creator: "Hayeren",
    publisher: "Hayeren",
    manifest: "/manifest.json",
    robots: {
        index: true,
        follow: true,
        googleBot: { index: true, follow: true },
    },
    icons: {
        icon: [
            { url: "/favicon.ico", sizes: "any" },
            { url: "/icon.svg", type: "image/svg+xml" },
            { url: "/icon-192.png", sizes: "192x192", type: "image/png" },
        ],
        shortcut: "/favicon.ico",
        apple: "/apple-touch-icon.png",
    },
    openGraph: {
        type: "website",
        siteName: "Hayeren",
        title: "Hayeren — Learn Armenian Vocabulary",
        description:
            "Spaced repetition flashcard app for Armenian vocabulary. Try free, no sign-in needed.",
        url: "/",
        locale: "en_US",
        images: [
            {
                url: "/og-image.jpg",
                width: 1200,
                height: 630,
                type: "image/jpeg",
                alt: "Hayeren — Learn Armenian Vocabulary",
            },
        ],
    },
    twitter: {
        card: "summary_large_image",
        title: "Hayeren — Learn Armenian Vocabulary",
        description:
            "Spaced repetition flashcard app for Armenian vocabulary. Try free, no sign-in needed.",
        images: [
            {
                url: "/og-image.jpg",
                width: 1200,
                height: 630,
                alt: "Hayeren — Learn Armenian Vocabulary",
            },
        ],
    },
};

export const viewport: Viewport = {
    themeColor: [
        { media: "(prefers-color-scheme: light)", color: "#6c63ff" },
        { media: "(prefers-color-scheme: dark)", color: "#0f0f19" },
    ],
    width: "device-width",
    initialScale: 1,
    maximumScale: 5,
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        // suppressHydrationWarning: the theme script sets the class before React loads
        <html lang='en' suppressHydrationWarning>
            <head>
                <script dangerouslySetInnerHTML={{ __html: THEME_INIT_SCRIPT }} />
            </head>
            <body
                className={`${geistSans.variable} ${geistMono.variable} antialiased`}
            >
                <AlertProvider>
                    <SessionProviderWrapper>{children}</SessionProviderWrapper>
                </AlertProvider>
            </body>
        </html>
    );
}
