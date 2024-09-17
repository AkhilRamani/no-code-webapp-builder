import { create } from "zustand";
import { getTableDataApi } from "../apis/tableDataApis";

interface TableData {
    tableName: string;
    data: Record<string, any>[];
}

type tableId = string;

interface TableDataStore {
    tableData: Record<tableId, TableData>;
    loading: boolean;
    setTableData: (tableId: tableId, tableName: string, data: Record<string, any>[]) => void;
    initTableData: (tableId: tableId, tableName: string) => void;
}

export const useTableDataStore = create<TableDataStore>((set, get) => ({
    tableData: {},
    loading: true,
    setTableData: (tableId: tableId, tableName: string, data: Record<string, any>[]) => {
        set(state => ({
            tableData: {
                ...state.tableData,
                [tableId]: {
                    ...state.tableData[tableId],
                    tableName,
                    data
                }
            }
        }));
    },
    initTableData: async (tableId: string, tableName: string) => {
        set(state => ({ ...state, loading: true }));

        const projectId = '66d65fd3def943cfc739e2d1'; // FIXME: remove this

        try {
            const tableData = await getTableDataApi(projectId, tableId) as Record<string, any>[];

            set(state => ({
                tableData: {
                    ...state.tableData,
                    [tableId]: {
                        tableName,
                        data: tableData
                    }
                },
                loading: false
            }));
        } catch (error) {
            console.error(error);
            set(state => ({
                ...state,
                loading: false
            }));
        }
    }
}));