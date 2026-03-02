"use client";

import { createContext, useCallback, useContext, useEffect, useState } from "react";

interface AlertContextValue {
    showAlert: (message: string) => void;
    showConfirm: (message: string) => Promise<boolean>;
}

const AlertContext = createContext<AlertContextValue>({
    showAlert: () => {},
    showConfirm: async () => false,
});

export function useAlert() {
    return useContext(AlertContext);
}

export function AlertProvider({ children }: { children: React.ReactNode }) {
    const [message, setMessage] = useState<string | null>(null);
    const [confirmState, setConfirmState] = useState<
        { message: string; resolve: (v: boolean) => void } | null
    >(null);

    const showAlert = useCallback((msg: string) => setMessage(msg), []);
    const dismiss = useCallback(() => setMessage(null), []);

    const showConfirm = useCallback((msg: string) => {
        return new Promise<boolean>((resolve) => {
            setConfirmState({ message: msg, resolve });
        });
    }, []);

    const cancelConfirm = useCallback(() => {
        if (confirmState) confirmState.resolve(false);
        setConfirmState(null);
    }, [confirmState]);
    const acceptConfirm = useCallback(() => {
        if (confirmState) confirmState.resolve(true);
        setConfirmState(null);
    }, [confirmState]);

    // Escape / Enter to dismiss alerts or confirms
    useEffect(() => {
        if (!message && !confirmState) return;
        const handler = (e: KeyboardEvent) => {
            if (e.key === "Escape" || e.key === "Enter") {
                if (message) dismiss();
                else if (confirmState) cancelConfirm();
            }
        };
        document.addEventListener("keydown", handler);
        return () => document.removeEventListener("keydown", handler);
    }, [message, confirmState, dismiss, cancelConfirm]);

    // Lock body scroll when any modal open
    useEffect(() => {
        const open = !!message || !!confirmState;
        document.body.style.overflow = open ? "hidden" : "";
        return () => {
            document.body.style.overflow = "";
        };
    }, [message, confirmState]);

    return (
        <AlertContext.Provider value={{ showAlert, showConfirm }}>
            {children}
            {message && (
                <div
                    className='modal-overlay'
                    onClick={dismiss}
                    role='alertdialog'
                    aria-modal='true'
                    aria-label='Alert'
                >
                    <div
                        className='modal-sheet'
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Handle bar for mobile */}
                        <div className='flex justify-center pt-3 pb-1 sm:hidden'>
                            <div className='w-10 h-1 rounded-full bg-gray-300' />
                        </div>

                        {/* Header */}
                        <div className='flex items-center justify-between px-5 py-4 border-b border-gray-100'>
                            <h2 className='text-base font-semibold text-gray-900'>
                                Notice
                            </h2>
                            <button
                                onClick={dismiss}
                                className='w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 text-gray-500 transition-colors'
                                aria-label='Close'
                            >
                                <svg
                                    width='16'
                                    height='16'
                                    viewBox='0 0 24 24'
                                    fill='none'
                                    stroke='currentColor'
                                    strokeWidth='2.5'
                                >
                                    <path d='M18 6L6 18M6 6l12 12' />
                                </svg>
                            </button>
                        </div>

                        {/* Message */}
                        <div className='px-5 py-5'>
                            <p className='text-sm text-gray-700 leading-relaxed'>
                                {message}
                            </p>
                        </div>

                        {/* Footer */}
                        <div className='px-5 pb-5'>
                            <button
                                autoFocus
                                onClick={dismiss}
                                className='w-full px-4 py-2.5 rounded-xl text-sm font-semibold text-white bg-accent transition-colors'
                            >
                                OK
                            </button>
                        </div>
                    </div>
                </div>
            )}
            {confirmState && (
                <div
                    className='modal-overlay'
                    onClick={cancelConfirm}
                    role='alertdialog'
                    aria-modal='true'
                    aria-label='Confirmation'
                >
                    <div
                        className='modal-sheet'
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* handle bar */}
                        <div className='flex justify-center pt-3 pb-1 sm:hidden'>
                            <div className='w-10 h-1 rounded-full bg-gray-300' />
                        </div>
                        <div className='flex items-center justify-between px-5 py-4 border-b border-gray-100'>
                            <h2 className='text-base font-semibold text-gray-900'>
                                Confirm
                            </h2>
                        </div>
                        <div className='px-5 py-5'>
                            <p className='text-sm text-gray-700 leading-relaxed'>
                                {confirmState.message}
                            </p>
                        </div>
                        <div className='px-5 pb-5 flex gap-2'>
                            <button
                                onClick={cancelConfirm}
                                className='flex-1 px-4 py-2.5 rounded-xl text-sm font-semibold border border-gray-200 bg-white hover:bg-gray-50 transition-colors'
                            >
                                Cancel
                            </button>
                            <button
                                autoFocus
                                onClick={acceptConfirm}
                                className='flex-1 px-4 py-2.5 rounded-xl text-sm font-semibold text-white bg-accent transition-colors'
                            >
                                OK
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </AlertContext.Provider>
    );
}
