import { ProjectModal } from "@/types/db/project.types";

export const createProjectApi = async (name: string): Promise<{ id: string, name: string }> => {
    try {
        const response = await fetch('/api/projects', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name })
        });

        const resData = await response.json();
        if (!response.ok) {
            throw new Error(`Failed to create project: ${resData.error || response.statusText}`);
        }

        return resData;
    } catch (error) {
        console.error('Error creating project:', error);
        throw error;
    }
}

export const getAllProjectsApi = async (): Promise<ProjectModal[]> => {
    try {
        const response = await fetch('/api/projects');
        const resData = await response.json();
        if (!response.ok) {
            throw new Error(`Failed to get projects: ${resData.error || response.statusText}`);
        }
        return resData;
    } catch (error) {
        console.error('Error getting projects:', error);
        throw error;
    }
}

export const getProjectApi = async (projectId: string): Promise<ProjectModal | null> => {
    try {
        const response = await fetch(`/api/projects/${projectId}`);

        if (!response.ok) {
            if (response.status === 404) {
                throw new Error('Project not found');
            }
            const resData = await response.json();
            throw new Error(`Failed to get: ${resData.error || response.statusText}`);
        }

        const resData = await response.json();
        return resData;
    } catch (error) {
        throw error;
    }
}

export const updateProjectApi = async (projectId: string, data: Partial<Omit<ProjectModal, 'id' | 'createdAt' | 'updatedAt' | 'belongsTo'>>): Promise<ProjectModal> => {
    try {
        const response = await fetch(`/api/projects/${projectId}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });

        if (!response.ok) {
            const resData = await response.json();
            throw new Error(`Failed to update project: ${resData.error || response.statusText}`);
        }

        const resData = await response.json();
        console.log(resData);
        return resData;
    } catch (error) {
        throw error;
    }
}

export const deleteProjectApi = async (projectId: string): Promise<void> => {
    try {
        const response = await fetch(`/api/projects/${projectId}`, {
            method: 'DELETE'
        });

        if (!response.ok) {
            const resData = await response.json();
            throw new Error(`Failed to delete project: ${resData.error || response.statusText}`);
        }

        return;
    } catch (error) {
        throw error;
    }
}
