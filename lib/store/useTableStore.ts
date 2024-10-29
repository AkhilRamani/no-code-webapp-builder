import { create } from 'zustand'
import { createTableApi, deleteTablesApi, getTablesApi, updateTablesApi } from '../apis/tableApis';
import { TableModal } from '@/types/db/table.types';
import { toast } from 'sonner';

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

export type BooleanFieldSettingType = Omit<CommonFieldSetting, 'required'>;

export type SwitchFieldSettingType = CommonFieldSetting;

export type TableFieldSettings = TextFieldSettingType | SwitchFieldSettingType | OptionFieldSettingType | BooleanFieldSettingType;

export enum TableFieldTypes {
    STR = 'STR',
    NUM = 'NUM',
    OPT = 'OPT',
    BOOL = 'BOOL',
    DATE = 'DATE',
    REF = 'REF'
}

export interface TableField {
    columnName: string;
    type: TableFieldTypes,
    setting?: TableFieldSettings
}

export interface TableSchema {
    id?: string;
    tableName: string;
    fields: TableField[]
}

export interface TableStore {
    tables: TableSchema[];
    fetched: boolean;

    fetchTables: (projectId: string) => Promise<void>;
    createTable: (projectId: string, tableName: string, schema: TableField[]) => void;
    updateTables: (projectId: string, tables: TableSchema[]) => Promise<void>
}

const testData: TableStore['tables'] = [
    {
        id: '1',
        tableName: 'Orders',
        fields: [
            {
                columnName: 'Name',
                type: TableFieldTypes.STR,
                setting: {
                    required: true,
                    description: 'The name of the order'
                }
            },
            {
                columnName: 'Shipped',
                type: TableFieldTypes.BOOL,
                setting: {
                    description: 'Whether the order has been shipped'
                }
            },
            {
                columnName: 'Date',
                type: TableFieldTypes.STR,
                setting: {
                    description: 'The date the order was shipped'
                }
            },
            {
                columnName: 'Amount',
                type: TableFieldTypes.NUM,
                setting: {
                    description: 'The amount of the order'
                }
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
        id: '2',
        tableName: 'Products',
        fields: [
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

export const useTableStore = create<TableStore>((set, get) => ({
    // tables: [...testData],
    tables: [],
    fetched: false,
    fetchTables: async (projectId) => {
        try {
            const tables = await getTablesApi(projectId)

            set({
                tables: tables.map(table => ({
                    id: table.id,
                    tableName: table.name,
                    fields: table.fields
                })),
                fetched: true
            })
        } catch (error) {
            console.error('Error fetching tables:', error);
            toast.error('Error fetching database, please reload the app');
        }
    },
    createTable: async (projectId, tableName, fields) => {
        // const projectId = '66d65fd3def943cfc739e2d1'
        const { id } = await createTableApi(projectId, tableName, fields)

        set(state => ({
            tables: [...state.tables, {
                id,
                tableName,
                fields
            }]
        }))
    },
    updateTables: async (projectId, tables) => {
        // const projectId = '66d65fd3def943cfc739e2d1'; // Assuming this is the same project ID used in createTable
        const existingTables = get().tables;

        const tablesToCreate: (Omit<TableModal, 'id' | 'createdAt' | 'updatedAt' | 'belongsTo'> & { trackingId: string })[] = [];
        const tablesToUpdate: Omit<TableModal, 'createdAt' | 'updatedAt' | 'belongsTo'>[] = [];
        const tablesToDelete: string[] = [];

        const existingTableMap = new Map(existingTables.map(table => [table.id, table]));
        const newTableIds = new Set(tables.map(table => table.id));

        // Compare and categorize tables
        tables.forEach((table, index) => {
            const existingTable = existingTableMap.get(table.id);
            if (!existingTable) {
                tablesToCreate.push({
                    projectId,
                    name: table.tableName,
                    fields: table.fields,
                    trackingId: `t-${index}`    // (depends on index of tables array) trackingId is used to match the response of created tables to update the table with the correct id
                });
            } else if (JSON.stringify(existingTable) !== JSON.stringify(table)) {
                tablesToUpdate.push({
                    id: table.id as string,
                    projectId,
                    name: table.tableName,
                    fields: table.fields
                });
            }
        });

        // Identify deleted tables
        existingTables.forEach(table => {
            if (!newTableIds.has(table.id)) {
                tablesToDelete.push(table.id as string);
            }
        });

        try {
            const createPromises = tablesToCreate.map(table =>
                createTableApi(projectId, table.name, table.fields, table.trackingId)
            );

            const [createdResponse] = await Promise.all([
                Promise.all(createPromises),
                tablesToUpdate.length && updateTablesApi(projectId, tablesToUpdate),
                tablesToDelete.length && deleteTablesApi(projectId, tablesToDelete)
            ]);

            // Update tables with new IDs
            const createdTables = tables.reduce((acc, table, index) => {
                if (!table.id) {
                    const createdTable = createdResponse.find(ct => ct.trackingId === `t-${index}`);
                    acc.push(createdTable ? { ...table, id: createdTable.id } : table);
                } else {
                    acc.push(table);
                }
                return acc;
            }, [] as typeof tables);

            set(state => ({
                ...state,
                tables: [
                    ...tables.slice(0, -createdTables.length),
                    ...createdTables
                ]
            }));
        } catch (error) {
            console.error('Error updating tables:', error);
            toast.error('Error updating tables, please try again.');
            throw error; // Re-throw to allow caller to handle
        }
    }
}))