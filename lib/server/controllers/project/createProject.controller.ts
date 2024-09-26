import { ProjectRepository } from "../../repositories/project.repository"

export const createProjectController = async ({ userId, name }: { userId: string, name: string }) => {
    const recordId = await ProjectRepository.create(userId, name);

    return {
        id: recordId,
        name
    }
}