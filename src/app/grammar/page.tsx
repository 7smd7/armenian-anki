import type { Metadata } from "next";
import { GrammarHub } from "@/components/grammar/GrammarHub";

export const metadata: Metadata = {
    title: "Grammar",
    description:
        "Learn Eastern Armenian verb tenses, irregular verbs, pronouns, place words and if-sentences with short lessons and adaptive drills.",
};

export default function GrammarPage() {
    return <GrammarHub />;
}
