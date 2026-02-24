import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/db";
import { DeckManageClient } from "@/components/decks/DeckManageClient";

export default async function DeckManagePage({ params }: { params: Promise<{ deckId: string }> }) {
    const session = await auth();
    if (!session) redirect("/");

    const { deckId } = await params;

    const deck = await prisma.deck.findUnique({
        where: { id: deckId },
        include: { _count: { select: { cards: { where: { isActive: true } } } } },
    });

    if (!deck || deck.ownerId !== session.user.id) {
        redirect("/");
    }

    return (
        <DeckManageClient
            deckId={deckId}
            initialTitle={deck.title}
            initialCardCount={deck._count.cards}
        />
    );
}
