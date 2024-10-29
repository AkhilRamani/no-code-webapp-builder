import { ObjectId } from "mongodb";

export interface PageRecord {
    _id: ObjectId;
    name: string;
    isPrivate: boolean;
    publishedVersion?: number;
    versions: {
        version: number;
        message: string;
        publishedAt: Date;
    }[];

    projectId: ObjectId;
    createdAt: Date;
    updatedAt?: Date;
}

export interface PageModal {
    id: string;
    name: string;
    isPrivate: boolean;
    publishedVersion?: number;
    versions: {
        version: number;
        message: string;
        publishedAt: Date;
    }[];

    projectId: string;
    createdAt: Date;
    updatedAt?: Date;
}