// Utility functions for common server operations
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";

export async function requireAuth() {
    const session = await auth();
    if (!session?.user || !session.user.id) {
        redirect("/");
    }
    return session.user;
}

export function generateSlug(title: string): string {
    return title
        .toLowerCase()
        .trim()
        .replace(/[^\w\s-]/g, "")
        .replace(/\s+/g, "-")
        .replace(/-+/g, "-")
        .substring(0, 100);
}

export function sanitizeFileName(fileName: string): string {
    return fileName.replace(/[^a-zA-Z0-9._-]/g, "-").substring(0, 255);
}
