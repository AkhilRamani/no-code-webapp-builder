import { PageModal, PageRecord } from "@/types/db/page.types";
import { getAppDbCollection } from "../appDb/mongodb";
import { ObjectId } from "mongodb";
import { PageMapper } from "../mappers/page.mapper";
import { S3Service } from "../service/s3.service";

export class PageRepository {
    static async create(name: string, projectId: string, isPrivate: boolean) {
        const pagesCollection = await getAppDbCollection("pages")

        const { insertedId } = await pagesCollection.insertOne({
            name: name,
            isPrivate: isPrivate,
            projectId: new ObjectId(projectId),
            createdAt: new Date()
        })

        return insertedId.toString()
    }

    static async getByProjectId(projectId: string) {
        const pagesCollection = await getAppDbCollection("pages")

        const pages = await pagesCollection.find<PageRecord>({ projectId: new ObjectId(projectId) }).toArray()

        return pages.map(PageMapper.RecordToPageModal)
    }

    static async getById(id: string) {
        const pagesCollection = await getAppDbCollection("pages")

        const page = await pagesCollection.findOne<PageRecord>({ _id: new ObjectId(id) })

        return page ? PageMapper.RecordToPageModal(page) : null
    }

    static async delete(id: string) {
        const pagesCollection = await getAppDbCollection("pages")
        await pagesCollection.deleteOne({ _id: new ObjectId(id) })
    }

    static async update(id: string, pageData: Partial<Omit<PageModal, 'id' | 'createdAt' | 'updatedAt'>>) {
        const pagesCollection = await getAppDbCollection("pages")
        const updatedPage = await pagesCollection.findOneAndUpdate({ _id: new ObjectId(id) }, { $set: { ...pageData, updatedAt: new Date() } }, { returnDocument: 'after' });

        return updatedPage ? PageMapper.RecordToPageModal(updatedPage as PageRecord) : null;
    }
}