import { authMiddleware, NextRequestAuthenticated } from "@/lib/auth/authMiddleware"
import { createPageController } from "@/lib/server/controllers/page/createPage.controller";
import { getAllPagesController } from "@/lib/server/controllers/page/getAllPages.controller";
import { ObjectId } from "mongodb";
import { NextResponse } from "next/server"

export const GET = authMiddleware(async (request: NextRequestAuthenticated, { params }: { params: { projectId: string } }) => {
    try {
        const { projectId } = params

        if (!ObjectId.isValid(projectId)) {
            return NextResponse.json({ error: `Invalid projectId: ${projectId}` }, { status: 400 });
        }

        const pages = await getAllPagesController(projectId)

        return NextResponse.json(pages)
    } catch (error) {
        console.error('Error getting pages:', error)
        throw error
    }
})

export const POST = authMiddleware(async (request: NextRequestAuthenticated, { params }: { params: { projectId: string } }) => {
    try {
        const { projectId } = params
        const { name, isPrivate } = await request.json()

        if (!ObjectId.isValid(projectId)) {
            return NextResponse.json({ error: `Invalid projectId: ${projectId}` }, { status: 400 });
        }

        const page = await createPageController({ name, projectId, isPrivate })

        return NextResponse.json(page)
    } catch (error) {
        console.error('Error creating page:', error)
        throw error
    }
})