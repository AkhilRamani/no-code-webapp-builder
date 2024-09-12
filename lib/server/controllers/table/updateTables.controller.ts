import { TableModal, TableRecord } from "@/types/db/table.types";
import { TableRepository } from "../../appDb/repositories/table.repository";

export const updateTablesController = async (tablesToUpdate: Omit<TableModal, 'createdAt' | 'updatedAt' | 'projectId'>[]) => {
    await TableRepository.updateMany(tablesToUpdate)
}