"use client";

// On-screen Armenian letters for typing answers without an Armenian keyboard.
// Rows follow the alphabet so letters are easy to find.

const ROWS = [
    "ա բ գ դ ե զ է ը թ ժ",
    "ի լ խ ծ կ հ ձ ղ ճ մ",
    "յ ն շ ո չ պ ջ ռ ս վ",
    "տ ր ց ւ փ ք օ ֆ և",
].map((r) => r.split(" "));

export function ArmenianKeypad({
    onKey,
    onBackspace,
    onSpace,
}: {
    onKey: (ch: string) => void;
    onBackspace: () => void;
    onSpace: () => void;
}) {
    const key =
        "h-9 rounded-lg bg-white border border-gray-200 font-armenian text-base text-gray-800 active:bg-indigo-50 hover:border-indigo-300 transition-colors";
    return (
        <div className='flex flex-col gap-1.5 select-none'>
            {ROWS.map((row, i) => (
                <div key={i} className='grid grid-cols-10 gap-1'>
                    {row.map((ch) => (
                        <button
                            key={ch}
                            type='button'
                            onMouseDown={(e) => e.preventDefault()}
                            onClick={() => onKey(ch)}
                            className={key}
                        >
                            {ch}
                        </button>
                    ))}
                    {i === 3 && (
                        <button
                            type='button'
                            onMouseDown={(e) => e.preventDefault()}
                            onClick={onBackspace}
                            className={`${key} font-sans text-gray-500`}
                            aria-label='Backspace'
                        >
                            ⌫
                        </button>
                    )}
                </div>
            ))}
            <div className='grid grid-cols-10 gap-1'>
                <button
                    type='button'
                    onMouseDown={(e) => e.preventDefault()}
                    onClick={() => onKey("ու")}
                    className={`${key} col-span-2`}
                >
                    ու
                </button>
                <button
                    type='button'
                    onMouseDown={(e) => e.preventDefault()}
                    onClick={onSpace}
                    className={`${key} col-span-8 font-sans text-xs text-gray-400`}
                >
                    space
                </button>
            </div>
        </div>
    );
}
