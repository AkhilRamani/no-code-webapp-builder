import { TableModal, TableRecord } from "@/types/db/table.types";
import { getAppDbCollection } from "../mongodb";
import { ObjectId } from "mongodb";

export class TableRepository {
    static async create(table: Omit<TableModal, '_id' | 'createdAt' | 'updatedAt'>): Promise<string> {
        const tablesCollection = await getAppDbCollection("tables")
        const { insertedId } = await tablesCollection.insertOne({
            ...table,
            createdAt: new Date()
        });

        return insertedId.toString()
    }

    static async updateMany(tables: Omit<TableModal, 'createdAt' | 'updatedAt' | 'projectId'>[]): Promise<void> {
        const tablesCollection = await getAppDbCollection("tables")

        await tablesCollection.bulkWrite(
            tables.map(table => ({
                updateOne: {
                    filter: { _id: new ObjectId(table.id) },
                    update: {
                        $set: {
                            name: table.name,
                            fields: table.fields,
                            updatedAt: new Date()
                        }
                    }
                }
            }))
        )
    }

    static async deleteMany(tableIds: string[]): Promise<void> {
        const tablesCollection = await getAppDbCollection("tables")
        await tablesCollection.deleteMany({ _id: { $in: tableIds.map(id => new ObjectId(id)) } })
    }
}