import { authMiddleware, NextRequestAuthenticated } from "@/lib/auth/authMiddleware"
import { getPageSaveUrlController } from "@/lib/server/controllers/page/getPageSaveUrl.controller"
import { NextResponse } from "next/server"

export const GET = authMiddleware(async (request: NextRequestAuthenticated, { params }: { params: { projectId: string, pageId: string } }) => {
    try {
        const { projectId, pageId } = params

        const signedUrl = await getPageSaveUrlController(projectId, pageId)

        return NextResponse.json({
            signedUrl
        })
    } catch (error) {
        console.error('Error getting page save url:', error)
        throw error
    }
})