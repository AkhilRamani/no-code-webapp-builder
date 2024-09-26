import { getTenantDb } from "../appDb/mongodb";
import { getCollectionName } from "@/lib/server/utils/getCollectionName";

export class CollectionRepository {
    static async createCollection(projectId: string, tableId: string): Promise<string> {
        const db = await getTenantDb()

        const collectionName = getCollectionName(projectId, tableId);
        await db.createCollection(collectionName);

        return collectionName;
    }

    static async deleteManyCollection(projectId: string, tableIds: string[]): Promise<void> {
        const db = await getTenantDb()

        const collectionNames = tableIds.map((tableId) => getCollectionName(projectId, tableId));

        await Promise.all(collectionNames.map(name => db.dropCollection(name)));
    }
}