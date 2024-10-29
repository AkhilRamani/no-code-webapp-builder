import { PageRepository } from "../../repositories/page.repository"

export const createPageController = async ({ name, projectId, isPrivate }: { name: string, projectId: string, isPrivate: boolean }) => {
    const recordId = await PageRepository.create(name, projectId, isPrivate);

    return {
        id: recordId,
        name,
        isPrivate,
        versions: []
    }
}