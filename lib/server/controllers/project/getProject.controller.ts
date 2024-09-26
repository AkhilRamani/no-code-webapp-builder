import { ProjectRepository } from "../../repositories/project.repository";

export const getProjectController = async (projectId: string) => {
    return ProjectRepository.getById(projectId);
};