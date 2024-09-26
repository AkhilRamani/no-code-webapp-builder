import { getCollectionName } from "../utils/getCollectionName";
import { getTenantDbCollection } from "../appDb/mongodb";

export class TableDataRepository {
    static async getAllTableData(projectId: string, tableId: string): Promise<Record<string, any>[]> {
        const collectionName = getCollectionName(projectId, tableId);
        const tableDataCollection = await getTenantDbCollection(collectionName);

        const tableData = await tableDataCollection.find({}).toArray();

        return tableData;
    }

    static async insertRow(projectId: string, tableId: string, data: Record<string, any>): Promise<void> {
        const collectionName = getCollectionName(projectId, tableId);
        const tableDataCollection = await getTenantDbCollection(collectionName);

        const result = await tableDataCollection.insertOne(data);
        console.log(result);
    }
}