import { TableDataRepository } from "@/lib/server/repositories/tableData.repository";

export const deleteTableDataRowsController = async (projectId: string, tableId: string, rowIds: string[]) => {
    await TableDataRepository.deleteMulti(projectId, tableId, rowIds);
}