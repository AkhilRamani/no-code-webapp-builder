import { ProjectRepository } from "../../repositories/project.repository"

export const getAllProjectsController = async (userId: string) => {
    return ProjectRepository.getAllByUserId(userId);
}