import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from "next-auth/next"
import { authConfig } from "@/app/api/auth/[...nextauth]/auth"

export type NextRequestAuthenticated = NextRequest & {
    user: {
        id: string
    }
}

export const authMiddleware = (handler: (req: NextRequestAuthenticated, ...args: any[]) => Promise<NextResponse>) => async (req: NextRequest, ...args: any[]) => {
    try {
        const session = await getServerSession(authConfig);

        if (!session || !session.user) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        (req as NextRequestAuthenticated).user = {
            id: session.user.id
        }

        return handler(req as NextRequestAuthenticated, ...args);

    } catch (error) {
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}