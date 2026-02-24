"use client";

import { useEffect, useRef } from "react";

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    title?: string;
    children: React.ReactNode;
}

export function Modal({ isOpen, onClose, title, children }: ModalProps) {
    const sheetRef = useRef<HTMLDivElement>(null);

    // Close on Escape
    useEffect(() => {
        if (!isOpen) return;
        const handler = (e: KeyboardEvent) => {
            if (e.key === "Escape") onClose();
        };
        document.addEventListener("keydown", handler);
        return () => document.removeEventListener("keydown", handler);
    }, [isOpen, onClose]);

    // Prevent body scroll when open
    useEffect(() => {
        document.body.style.overflow = isOpen ? "hidden" : "";
        return () => {
            document.body.style.overflow = "";
        };
    }, [isOpen]);

    if (!isOpen) return null;

    return (
        <div
            className='modal-overlay'
            onClick={(e) => {
                if (e.target === e.currentTarget) onClose();
            }}
            role='dialog'
            aria-modal='true'
        >
            <div className='modal-sheet' ref={sheetRef}>
                {/* Handle bar for mobile */}
                <div className='flex justify-center pt-3 pb-1 sm:hidden'>
                    <div className='w-10 h-1 rounded-full bg-gray-300' />
                </div>

                {/* Header */}
                {title && (
                    <div className='flex items-center justify-between px-5 py-4 border-b border-gray-100'>
                        <h2 className='text-lg font-semibold text-gray-900'>
                            {title}
                        </h2>
                        <button
                            onClick={onClose}
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
                )}

                {/* Body */}
                <div className='flex-1 overflow-y-auto overscroll-contain'>
                    {children}
                </div>
            </div>
        </div>
    );
}
