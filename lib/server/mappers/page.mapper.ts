import { PageModal, PageRecord } from "@/types/db/page.types"

export class PageMapper {
    static RecordToPageModal(record: PageRecord): PageModal {
        return {
            id: record._id.toString(),
            name: record.name,
            isPrivate: record.isPrivate,
            versions: record.versions,
            projectId: record.projectId.toString(),
            createdAt: record.createdAt,
            updatedAt: record.updatedAt
        }
    }
}