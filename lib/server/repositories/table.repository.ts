import { TableModal, TableRecord } from "@/types/db/table.types";
import { getAppDbCollection } from "../appDb/mongodb";
import { ObjectId } from "mongodb";
import { TableMapper } from "../mappers/table.mapper";

export class TableRepository {
    static async getTablesByProjectId(projectId: string): Promise<TableModal[]> {
        const tablesCollection = await getAppDbCollection("tables")
        const tables = await tablesCollection.find<TableRecord>({ projectId: new ObjectId(projectId) }).toArray()
        return tables.map(TableMapper.RecordToTableModal)
    }

    static async create(table: Omit<TableModal, 'id' | 'createdAt' | 'updatedAt'>): Promise<string> {
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