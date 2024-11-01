// lib/mongodb.ts
import { Collection, Db, MongoClient, ServerApiVersion } from "mongodb";

if (!process.env.MONGODB_URI) {
    throw new Error('Invalid/Missing environment variable: "MONGODB_URI"')
}

const uri = process.env.MONGODB_URI
const options = {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    },
}

let client: MongoClient
let clientPromise: Promise<MongoClient>

if (process.env.NODE_ENV === 'development') {
    // In development mode, use a global variable so that the value
    // is preserved across module reloads caused by HMR (Hot Module Replacement).
    let globalWithMongo = global as typeof globalThis & {
        _mongoClientPromise?: Promise<MongoClient>
    }

    if (!globalWithMongo._mongoClientPromise) {
        client = new MongoClient(uri, options)
        globalWithMongo._mongoClientPromise = client.connect()
    }
    clientPromise = globalWithMongo._mongoClientPromise
} else {
    // In production mode, it's best to not use a global variable.
    client = new MongoClient(uri, options)
    clientPromise = client.connect()
}

// Export a module-scoped MongoClient promise. By doing this in a
// separate module, the client can be shared across functions.
export default clientPromise

async function getAppDb(): Promise<Db> {
    const client = await clientPromise;
    return client.db('portals_app');
}

export async function getAppDbCollection(collectionName: string): Promise<Collection> {
    const db = await getAppDb();
    return db.collection(collectionName);
}

export async function getTenantDb(): Promise<Db> {
    const client = await clientPromise;
    return client.db('portals_tenant');
}

export async function getTenantDbCollection(collectionName: string): Promise<Collection> {
    const db = await getTenantDb();
    return db.collection(collectionName);
}