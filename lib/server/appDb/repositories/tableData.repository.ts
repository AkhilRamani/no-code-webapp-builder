import { getCollectionName } from "../../utils/getCollectionName";
import { getTenantDbCollection } from "../mongodb";

export class TableDataRepository {
    static async getAllTableData(projectId: string, tableId: string): Promise<Record<string, any>[]> {
        const collectionName = getCollectionName(projectId, tableId);
        const tableDataCollection = await getTenantDbCollection(collectionName);

        const tableData = await tableDataCollection.find({}).toArray();

        return tableData;
    }
}