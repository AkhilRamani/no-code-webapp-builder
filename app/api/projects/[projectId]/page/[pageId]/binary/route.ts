import { authMiddleware, NextRequestAuthenticated } from "@/lib/auth/authMiddleware"
import { getPageBinaryController } from "@/lib/server/controllers/page/getPageBinary.controller"
import { NextResponse } from "next/server"

export const GET = authMiddleware(async (request: NextRequestAuthenticated, { params }: { params: { projectId: string, pageId: string } }) => {
    try {
        const { projectId, pageId } = params

        const binary = await getPageBinaryController(projectId, pageId)

        // TODO: stream this binary response
        return NextResponse.json(binary, {
            headers: {
                'Content-Type': 'text/plain'
            }
        })
    } catch (error) {
        console.error('Error fetching page binary:', error)
        if (error instanceof Error && 'code' in error) {
            const statusCode = (error as { code: number }).code
            return NextResponse.json({ error: error.message }, { status: statusCode })
        } else {
            return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
        }
    }
})