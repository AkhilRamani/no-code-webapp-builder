import { authMiddleware, NextRequestAuthenticated } from "@/lib/auth/authMiddleware";
import { deleteProjectController } from "@/lib/server/controllers/project/deleteProject.controller";
import { getProjectController } from "@/lib/server/controllers/project/getProject.controller";
import { updateProjectController } from "@/lib/server/controllers/project/updateProject.controller";
import { ObjectId } from "mongodb";
import { NextResponse } from "next/server";

export const GET = authMiddleware(async (request: NextRequestAuthenticated, { params }: { params: { projectId: string } }) => {
    try {
        const { projectId } = params;
        if (!ObjectId.isValid(projectId)) {
            return NextResponse.json({ error: `Invalid projectId: ${projectId}` }, { status: 400 });
        }

        const project = await getProjectController(projectId);
        if (!project) {
            return NextResponse.json({ error: 'Project not found' }, { status: 404 });
        }

        return NextResponse.json(project);
    } catch (error) {
        console.error('Error getting project:', error);
        throw error;
    }
});

export const PATCH = authMiddleware(async (request: NextRequestAuthenticated, { params }: { params: { projectId: string } }) => {
    try {
        const { projectId } = params;
        const { name } = await request.json();

        if (!ObjectId.isValid(projectId)) {
            return NextResponse.json({ error: `Invalid projectId: ${projectId}` }, { status: 400 });
        }

        const updatedProject = await updateProjectController(projectId, { name });

        return NextResponse.json(updatedProject);
    } catch (error) {
        console.error('Error updating project:', error);
        throw error;
    }
});

export const DELETE = authMiddleware(async (request: NextRequestAuthenticated, { params }: { params: { projectId: string } }) => {
    try {
        const { projectId } = params;
        if (!ObjectId.isValid(projectId)) {
            return NextResponse.json({ error: `Invalid projectId: ${projectId}` }, { status: 400 });
        }

        await deleteProjectController(projectId);
        return NextResponse.json({ message: 'Project deleted successfully' });
    } catch (error) {
        console.error('Error deleting project:', error);
        throw error;
    }
});