import { TableRepository } from "@/lib/server/appDb/repositories/table.repository";
import { CollectionRepository } from "@/lib/server/appDb/repositories/collection.repository";
import { TableModal, TableRecord } from "@/types/db/table.types";
import { ObjectId } from "mongodb";

interface Params {
    projectId: string;
    name: string;
    fields: TableRecord['fields']
}

export const createTableController = async ({ projectId, name, fields }: Params) => {
    const newTable = {
        projectId: new ObjectId(projectId),
        name,
        fields,
    } as unknown as TableModal;

    const recordId = await TableRepository.create(newTable);

    await CollectionRepository.createCollection(projectId, recordId.toString());

    return {
        id: recordId,
    }
}