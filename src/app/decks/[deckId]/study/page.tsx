import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { StudySession } from "@/components/study/StudySession";
import { Nav } from "@/components/Nav";
import { prisma } from "@/lib/db";

export default async function DeckStudyPage({
    params,
}: {
    params: Promise<{ deckId: string }>;
}) {
    const session = await auth();

    if (!session) {
        redirect("/");
    }

    const resolvedParams = await params;
    const deck = await prisma.deck.findUnique({
        where: { id: resolvedParams.deckId },
    });

    if (!deck || deck.ownerId !== session.user.id) {
        redirect("/");
    }

    return (
        <div className='min-h-dvh flex flex-col bg-background'>
            <Nav />
            <main className='flex-1 max-w-md mx-auto w-full px-4 py-6'>
                <StudySession
                    deckId={resolvedParams.deckId}
                    deckTitle={deck.title}
                />
            </main>
        </div>
    );
}
