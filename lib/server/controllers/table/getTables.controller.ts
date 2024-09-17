import { TableModal } from "@/types/db/table.types";
import { TableRepository } from "../../appDb/repositories/table.repository";

export const getTablesController = async (projectId: string): Promise<TableModal[]> => {
    return await TableRepository.getTablesByProjectId(projectId);
}