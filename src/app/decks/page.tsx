import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";

// Keep /decks working as a URL — authenticated users are sent to home (which shows deck modal)
// Unauthenticated users go to home too
export default async function DecksPage() {
  const session = await auth();
  if (session) {
    redirect("/?modal=decks");
  }
  redirect("/");
}
