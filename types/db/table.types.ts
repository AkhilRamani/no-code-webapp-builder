import { TableFieldSettings, TableFieldTypes } from "@/lib/store/useTableStore";
import { ObjectId } from "mongodb";

export interface TableRecord {
    _id: ObjectId;
    projectId: ObjectId;
    name: string;
    fields: {
        columnName: string;
        type: TableFieldTypes,
        setting?: TableFieldSettings
    }[],
    createdAt: Date;
    updatedAt?: Date;
}

export interface TableModal {
    id: string;
    projectId: string;
    name: string;
    fields: {
        columnName: string;
        type: TableFieldTypes,
        setting?: TableFieldSettings
    }[],
    createdAt: Date;
    updatedAt?: Date;
}

// export interface Table