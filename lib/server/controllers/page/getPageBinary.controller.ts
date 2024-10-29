import { S3Service } from "../../service/s3.service"

export const getPageBinaryController = async (projectId: string, pageId: string) => {
    const binary = await S3Service.getPageBinary(projectId, pageId)
    return binary
}