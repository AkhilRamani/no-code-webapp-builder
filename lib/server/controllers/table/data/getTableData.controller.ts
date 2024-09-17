import { TableDataRepository } from "@/lib/server/appDb/repositories/tableData.repository";

export const getTableDataController = async (projectId: string, tableId: string) => {
    const tableData = await TableDataRepository.getAllTableData(projectId, tableId);
    return tableData;
}