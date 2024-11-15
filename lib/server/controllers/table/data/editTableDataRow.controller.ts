import { TableDataRepository } from "@/lib/server/repositories/tableData.repository"

export const editTableDataRowController = async (projectId: string, tableId: string, rowId: string, data: Record<string, any>): Promise<void> => {
    return TableDataRepository.updateOne(projectId, tableId, rowId, data);
}