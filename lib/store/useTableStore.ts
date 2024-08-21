import { create } from 'zustand'

export type CommonFieldSetting = {
    description?: string;
    required?: boolean
}

export type TextFieldSettingType = CommonFieldSetting & {
    placeholder?: string
}

export type SwitchFieldSettingType = CommonFieldSetting;

export type TableFieldSettings = TextFieldSettingType | SwitchFieldSettingType;

export enum TableFieldTypes {
    STR = 'STR',
    NUM = 'NUM',
    OPT = 'OPT',
    BOOL = 'BOOL'
}

export interface TableSchema {
    tableName: string;
    schema: {
        columnName: string;
        type: TableFieldTypes,
        setting?: TableFieldSettings
    }[]
}

interface TableStore {
    tables: TableSchema[];

    createTable: (tableName: string, schema: TableSchema['schema']) => void
}

const testData: TableStore['tables'] = [
    {
        tableName: 'Orders',
        schema: [
            {
                columnName: 'Name',
                type: TableFieldTypes.STR,
                setting: {
                    required: true
                }
            },
            {
                columnName: 'Shipped',
                type: TableFieldTypes.BOOL,
            },
            {
                columnName: 'Date',
                type: TableFieldTypes.STR,
            },
            {
                columnName: 'Amount',
                type: TableFieldTypes.NUM
            },
        ]
    },
    {
        tableName: 'Products',
        schema: [
            {
                columnName: 'Name',
                type: TableFieldTypes.STR
            },
            {
                columnName: 'Stock',
                type: TableFieldTypes.NUM
            },
            {
                columnName: 'Date',
                type: TableFieldTypes.STR
            },
            {
                columnName: 'Amount',
                type: TableFieldTypes.NUM,
                setting: {
                    required: true
                }
            },
        ]
    }
]

export const useTableStore = create<TableStore>((set) => ({
    tables: [...testData],
    createTable: (tableName, schema) => {
        set(state => ({
            tables: [
                ...state.tables,
                {
                    tableName,
                    schema
                }
            ]
        }))
    }
}))