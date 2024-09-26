import { ProjectRepository } from "../../repositories/project.repository"

export const deleteProjectController = async (projectId: string) => {
    return ProjectRepository.delete(projectId)
}