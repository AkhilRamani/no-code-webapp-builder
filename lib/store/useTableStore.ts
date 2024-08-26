import { create } from 'zustand'

export type CommonFieldSetting = {
    description?: string;
    required?: boolean
}

export type TextFieldSettingType = CommonFieldSetting & {
    placeholder?: string
}

export type OptionFieldSettingType = CommonFieldSetting & {
    options: string[]
}

export type SwitchFieldSettingType = CommonFieldSetting;

export type TableFieldSettings = TextFieldSettingType | SwitchFieldSettingType | OptionFieldSettingType;

export enum TableFieldTypes {
    STR = 'STR',
    NUM = 'NUM',
    OPT = 'OPT',
    BOOL = 'BOOL',
    DATE = 'DATE',
    REF = 'REF'
}

export interface TableSchema {
    tableName: string;
    schema: {
        columnName: string;
        type: TableFieldTypes,
        setting?: TableFieldSettings
    }[]
}

export interface TableStore {
    tables: TableSchema[];

    createTable: (tableName: string, schema: TableSchema['schema']) => void;
    updateTables: (tables: TableSchema[]) => void
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
            {
                columnName: 'Status',
                type: TableFieldTypes.OPT,
                setting: {
                    required: true,
                    options: [
                        'Unhandled',
                        'Packed',
                        'Processed',
                        'Shipped',
                        'Fulfilled'
                    ]
                }
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
    // tables: [],
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
    },
    updateTables: (tables: TableSchema[]) => {
        set(() => ({
            tables
        }))
    }
}))