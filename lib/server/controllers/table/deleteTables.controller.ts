import { CollectionRepository } from "../../repositories/collection.repository";
import { TableRepository } from "../../repositories/table.repository";

export const deleteTablesController = async (projectId: string, tableIds: string[]) => {
    await TableRepository.deleteMany(tableIds);

    await CollectionRepository.deleteManyCollection(projectId, tableIds);
}