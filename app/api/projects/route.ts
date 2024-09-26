import { authMiddleware, NextRequestAuthenticated } from "@/lib/auth/authMiddleware";
import { createProjectController } from "@/lib/server/controllers/project/createProject.controller";
import { getAllProjectsController } from "@/lib/server/controllers/project/getAllProjects.controller";
import { NextResponse } from "next/server";

export const POST = authMiddleware(async (request: NextRequestAuthenticated) => {
    try {
        const userId = request.user.id;
        const { name } = await request.json();

        const res = await createProjectController({ userId, name })

        return NextResponse.json(res)
    }
    catch (error) {
        console.error('Error creating project:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
})

export const GET = authMiddleware(async (request: NextRequestAuthenticated) => {
    try {
        const userId = request.user.id;

        const res = await getAllProjectsController(userId)

        return NextResponse.json(res)
    }
    catch (error) {
        console.error('Error getting projects:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
})
