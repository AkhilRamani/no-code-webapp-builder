import { TableModal } from "@/types/db/table.types";
import { TableRepository } from "../../repositories/table.repository";

export const getTablesController = async (projectId: string): Promise<TableModal[]> => {
    return await TableRepository.getTablesByProjectId(projectId);
}