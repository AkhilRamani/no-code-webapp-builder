import { ObjectId } from "mongodb";

export interface ProjectRecord {
    _id: ObjectId;
    name: string;

    belongsTo: ObjectId;
    createdAt: Date;
    updatedAt?: Date;
}

export interface ProjectModal {
    id: string;
    name: string;

    belongsTo: string;
    createdAt: Date;
    updatedAt?: Date;
}

// export interface Table