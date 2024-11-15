import { getCollectionName } from "../utils/getCollectionName";
import { getTenantDbCollection } from "../appDb/mongodb";
import { ObjectId } from "mongodb";
import { BadRequestException } from "../controllers/exceptions/badRequest.exception";

export class TableDataRepository {
    static async getAllTableData(projectId: string, tableId: string): Promise<Record<string, any>[]> {
        const collectionName = getCollectionName(projectId, tableId);
        const tableDataCollection = await getTenantDbCollection(collectionName);

        const tableData = await tableDataCollection.find({}).toArray();

        return tableData;
    }

    static async insertRow(projectId: string, tableId: string, data: Record<string, any>): Promise<string> {
        const collectionName = getCollectionName(projectId, tableId);
        const tableDataCollection = await getTenantDbCollection(collectionName);

        const result = await tableDataCollection.insertOne(data);
        console.log(result);

        return result.insertedId.toString();
    }

    static async deleteMulti(projectId: string, tableId: string, rowIds: string[]): Promise<void> {
        rowIds.map(id => {
            if (!ObjectId.isValid(id)) {
                throw new BadRequestException(`Invalid id: ${id}`);
            }
        })

        const collectionName = getCollectionName(projectId, tableId);
        const tableDataCollection = await getTenantDbCollection(collectionName);

        const objectIdArray = rowIds.map(id => new ObjectId(id));
        await tableDataCollection.deleteMany({ _id: { $in: objectIdArray } });
    }

    static async updateOne(projectId: string, tableId: string, rowId: string, data: Record<string, any>): Promise<void> {
        const collectionName = getCollectionName(projectId, tableId);
        const tableDataCollection = await getTenantDbCollection(collectionName);

        await tableDataCollection.updateOne({ _id: new ObjectId(rowId) }, { $set: data });
    }
}