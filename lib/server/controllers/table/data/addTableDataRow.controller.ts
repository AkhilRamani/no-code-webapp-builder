import { TableDataRepository } from "@/lib/server/repositories/tableData.repository"

export const addTableDataRowController = async (projectId: string, tableId: string, data: Record<string, any>): Promise<string> => {
    return TableDataRepository.insertRow(projectId, tableId, data);
}