import { TableFieldSettings, TableFieldTypes } from "@/lib/store/useTableStore";
import { ObjectId } from "mongodb";

export interface TableRecord {
    _id: ObjectId;
    appId: ObjectId;
    name: string;
    fields: {
        columnName: string;
        type: TableFieldTypes,
        setting?: TableFieldSettings
    }[]
}