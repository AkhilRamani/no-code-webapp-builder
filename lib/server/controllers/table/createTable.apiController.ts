import { TableRepository } from "@/lib/server/appDb/repositories/table.repository";
import { TableRecord } from "@/types/db/table.types";
import { ObjectId } from "mongodb";

interface Params {
    projectId: string;
    name: string;
    fields: TableRecord['fields']
}

export const createTableController = async ({ projectId, name, fields }: Params) => {
    const newTable = {
        appId: new ObjectId(projectId),
        name,
        fields,
    } as unknown as TableRecord;

    console.log(newTable);

    const res = await TableRepository.create(newTable)

    return res
}