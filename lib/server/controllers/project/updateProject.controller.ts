import { ProjectModal } from "@/types/db/project.types"
import { ProjectRepository } from "../../repositories/project.repository"

export const updateProjectController = async (id: string, data: Partial<Omit<ProjectModal, 'id' | 'createdAt' | 'updatedAt'>>) => {
    return ProjectRepository.update(id, data)
}