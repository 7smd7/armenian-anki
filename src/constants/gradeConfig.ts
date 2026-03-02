export const GRADE_CONFIG = [
    {
        grade: 0,
        label: "Again",
        emoji: "😰",
        bg: "bg-red-500 hover:bg-red-600 active:bg-red-700",
    },
    {
        grade: 1,
        label: "Hard",
        emoji: "😓",
        bg: "bg-orange-500 hover:bg-orange-600 active:bg-orange-700",
    },
    {
        grade: 2,
        label: "Good",
        emoji: "🙂",
        bg: "bg-yellow-500 hover:bg-yellow-600 active:bg-yellow-700",
    },
    {
        grade: 3,
        label: "Easy",
        emoji: "😊",
        bg: "bg-green-500 hover:bg-green-600 active:bg-green-700",
    },
] as const;
