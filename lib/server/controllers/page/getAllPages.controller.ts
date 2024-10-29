import { PageRepository } from "../../repositories/page.repository"

export const getAllPagesController = async (projectId: string) => {
    return PageRepository.getByProjectId(projectId)
}