"use client";

import { useState } from "react";
import { useSession, signIn, signOut } from "next-auth/react";
import Link from "next/link";
import { DecksModal } from "@/components/modals/DecksModal";
import { ImportModal } from "@/components/modals/ImportModal";

interface NavProps {
    onOpenDecks?: () => void;
}

export function Nav({ onOpenDecks }: NavProps) {
    const { data: session, status } = useSession();
    const isLoading = status === "loading";

    // Self-managed modal state used on any page that doesn't supply onOpenDecks
    const [ownDecksOpen, setOwnDecksOpen] = useState(false);
    const [ownImportOpen, setOwnImportOpen] = useState(false);
    const selfManaged = !onOpenDecks;
    const handleOpenDecks = onOpenDecks ?? (() => setOwnDecksOpen(true));

    return (
        <>
        <header className='sticky top-0 z-30 bg-white/90 backdrop-blur-md border-b border-gray-100'>
            <div className='max-w-2xl mx-auto px-4 h-14 flex items-center justify-between gap-3'>
                {/* Logo */}
                <Link
                    href='/'
                    className='flex items-center gap-2 font-bold text-lg text-gray-900 shrink-0'
                >
                    <span className='font-armenian text-indigo-600 text-xl'>
                        Հ
                    </span>
                    <span>Hayeren</span>
                </Link>

                {/* Right side */}
                <div className='flex items-center gap-2'>
                    {isLoading ? (
                        <div className='w-8 h-8 rounded-full bg-gray-100 animate-pulse' />
                    ) : session ? (
                        <>
                            <button
                                onClick={handleOpenDecks}
                                className='flex items-center gap-1.5 px-3 py-1.5 text-sm font-semibold rounded-lg bg-indigo-50 text-indigo-700 hover:bg-indigo-100 transition-colors'
                            >
                                <svg
                                    width='15'
                                    height='15'
                                    viewBox='0 0 24 24'
                                    fill='none'
                                    stroke='currentColor'
                                    strokeWidth='2.5'
                                >
                                    <path d='M2 6a2 2 0 012-2h6l2 2h8a2 2 0 012 2v10a2 2 0 01-2 2H4a2 2 0 01-2-2V6z' />
                                </svg>
                                My Decks
                            </button>
                            <button
                                onClick={() => signOut({ callbackUrl: "/" })}
                                className='flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium rounded-lg text-gray-600 hover:bg-gray-100 transition-colors border border-gray-200'
                                title={`Sign out (${session.user?.name ?? session.user?.email})`}
                            >
                                {session.user?.image ? (
                                    <img
                                        src={session.user.image}
                                        alt=''
                                        width={20}
                                        height={20}
                                        loading='lazy'
                                        referrerPolicy='no-referrer'
                                        className='w-5 h-5 rounded-full'
                                    />
                                ) : (
                                    <svg
                                        width='15'
                                        height='15'
                                        viewBox='0 0 24 24'
                                        fill='none'
                                        stroke='currentColor'
                                        strokeWidth='2'
                                    >
                                        <circle cx='12' cy='8' r='4' />
                                        <path d='M4 20c0-4 3.6-7 8-7s8 3 8 7' />
                                    </svg>
                                )}
                                Sign out
                            </button>
                        </>
                    ) : (
                        <button
                            onClick={() =>
                                signIn("google", { callbackUrl: "/" })
                            }
                            className='flex items-center gap-2 px-4 py-2 rounded-xl font-semibold text-sm bg-white border-2 border-gray-200 text-gray-700 hover:border-indigo-300 hover:bg-indigo-50 transition-all shadow-sm'
                        >
                            <GoogleIcon />
                            Sign in
                        </button>
                    )}
                </div>
            </div>
        </header>

        {selfManaged && (
            <>
                <DecksModal
                    isOpen={ownDecksOpen}
                    onClose={() => setOwnDecksOpen(false)}
                    onOpenImport={() => { setOwnDecksOpen(false); setOwnImportOpen(true); }}
                />
                <ImportModal
                    isOpen={ownImportOpen}
                    onClose={() => { setOwnImportOpen(false); setOwnDecksOpen(true); }}
                />
            </>
        )}
        </>
    );
}

function GoogleIcon() {
    return (
        <svg width='16' height='16' viewBox='0 0 24 24'>
            <path
                fill='#4285F4'
                d='M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z'
            />
            <path
                fill='#34A853'
                d='M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z'
            />
            <path
                fill='#FBBC05'
                d='M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z'
            />
            <path
                fill='#EA4335'
                d='M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z'
            />
        </svg>
    );
}
