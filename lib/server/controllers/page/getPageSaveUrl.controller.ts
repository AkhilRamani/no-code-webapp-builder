import { S3Service } from "../../service/s3.service"

export const getPageSaveUrlController = async (projectId: string, pageId: string) => {
    const url = await S3Service.getPageSaveUrl(projectId, pageId)
    return url
}