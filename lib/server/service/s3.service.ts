import { S3Client, PutObjectCommand, GetObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { NotFoundException } from '../controllers/exceptions/notFound.exception';

const s3Client = new S3Client({
    region: process.env.AWS_REGION,
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
    }
});

export class S3Service {
    static async getPageSaveUrl(projectId: string, pageId: string) {
        const command = new PutObjectCommand({
            Bucket: process.env.S3_BUCKET_NAME,
            Key: `projects/${projectId}/${pageId}`,
            ContentEncoding: 'base64',
            ContentType: 'text/plain'
        });

        const url = await getSignedUrl(s3Client, command, { expiresIn: 60 * 30 });

        return url
    }

    static async getPageBinary(projectId: string, pageId: string) {
        try {
            const command = new GetObjectCommand({
                Bucket: process.env.S3_BUCKET_NAME,
                Key: `projects/${projectId}/${pageId}`,
            });

            const data = await s3Client.send(command)
            const binary = await data.Body?.transformToString()

            return binary
        }
        catch (error) {
            if ((error as Error).name === 'NoSuchKey') {
                throw new NotFoundException('Page data not found')
            }
            throw error
        }
    }
}