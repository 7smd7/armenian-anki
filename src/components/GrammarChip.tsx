import Link from "next/link";

// Chips in the deck selector row that switch between flashcards and grammar.
// Styled like the deck chips so Grammar reads as one more thing to study.

const base =
    "shrink-0 inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-semibold border-2 transition-all whitespace-nowrap";
const idle = "border-gray-200 bg-white text-gray-600 hover:border-gray-300";
const active = "border-indigo-500 bg-indigo-50 text-indigo-700";

export function GrammarChip({ active: isActive = false }: { active?: boolean }) {
    return (
        <Link
            href='/grammar'
            aria-current={isActive ? "page" : undefined}
            className={`${base} ${isActive ? active : idle}`}
        >
            <span className='font-armenian text-indigo-500'>Քեր</span>
            Grammar
        </Link>
    );
}

export function FlashcardsChip() {
    return (
        <Link href='/' className={`${base} ${idle}`}>
            <svg
                width='14'
                height='14'
                viewBox='0 0 24 24'
                fill='none'
                stroke='currentColor'
                strokeWidth='2.2'
                aria-hidden
            >
                <rect x='3' y='5' width='14' height='14' rx='2' />
                <path d='M7 3h12a2 2 0 012 2v12' />
            </svg>
            Flashcards
        </Link>
    );
}
