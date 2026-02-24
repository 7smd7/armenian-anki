// Auth configuration using NextAuth.js with Google provider
import NextAuth, { type NextAuthOptions, getServerSession } from "next-auth";
import type { AdapterUser } from "next-auth/adapters";
import GoogleProvider from "next-auth/providers/google";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "@/lib/db";

export const authOptions: NextAuthOptions = {
    adapter: PrismaAdapter(prisma),
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID || "",
            clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
            allowDangerousEmailAccountLinking: true,
        }),
    ],
    callbacks: {
        session: async ({
            session,
            user,
        }: {
            session: any;
            user: AdapterUser;
        }) => {
            if (session && session.user) {
                session.user.id = user.id;
            }
            return session;
        },
    },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };

// Wrapper for auth() that uses getServerSession internally
export async function auth() {
    const session = await getServerSession(authOptions);
    return session;
}
