import { UserRecord } from "@/types/db/user.types";
import { getDbCollection } from "../mongodb";

export class UserRepository {
    static async create(user: Omit<UserRecord, '_id'>): Promise<string> {
        const usersCollection = await getDbCollection("users")
        const { insertedId } = await usersCollection.insertOne(user)

        return insertedId.toString()
    }

    static async findByEmail(email: string): Promise<UserRecord | null> {
        const usersCollection = await getDbCollection("users")
        const user = await usersCollection.findOne<UserRecord>({ email })

        return user
    }
}