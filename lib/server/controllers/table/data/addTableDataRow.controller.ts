import { TableDataRepository } from "@/lib/server/appDb/repositories/tableData.repository"

export const addTableDataRowController = async (projectId: string, tableId: string, data: Record<string, any>) => {
    return TableDataRepository.insertRow(projectId, tableId, data);
}