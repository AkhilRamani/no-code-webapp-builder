import { TableRepository } from "@/lib/server/repositories/table.repository";
import { CollectionRepository } from "@/lib/server/repositories/collection.repository";
import { TableModal, TableRecord } from "@/types/db/table.types";
import { ObjectId } from "mongodb";

interface Params {
    projectId: string;
    name: string;
    fields: TableRecord['fields'];
    userId: string;
}

export const createTableController = async ({ projectId, name, fields, userId }: Params) => {
    const newTable = {
        projectId: new ObjectId(projectId),
        name,
        fields,
        belongsTo: new ObjectId(userId),
    } as unknown as TableModal;

    const recordId = await TableRepository.create(newTable);

    await CollectionRepository.createCollection(projectId, recordId.toString());

    return {
        id: recordId,
    }
}