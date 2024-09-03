import { TableRecord } from "@/types/db/table.types";
import { getDbCollection } from "../mongodb";
import { ObjectId } from "mongodb";

export class TableRepository {
    static async create(table: Omit<TableRecord, '_id'>): Promise<ObjectId> {
        const tablesCollection = await getDbCollection("tables")
        const { insertedId } = await tablesCollection.insertOne(table);

        return insertedId
    }
}