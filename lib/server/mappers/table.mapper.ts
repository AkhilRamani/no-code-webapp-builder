import { TableModal, TableRecord } from "@/types/db/table.types"

export class TableMapper {
    static RecordToTableModal(record: TableRecord): TableModal {
        return {
            id: record._id.toString(),
            projectId: record.projectId.toString(),
            name: record.name,
            fields: record.fields,
            createdAt: record.createdAt,
            updatedAt: record.updatedAt
        }
    }
}