import { create } from "zustand";
import { addTableDataRowApi, getTableDataApi } from "../apis/tableDataApis";
import { toast } from "sonner";

interface TableData {
    tableName: string;
    data: Record<string, any>[];
}

type tableId = string;

interface TableDataStore {
    tableData: Record<tableId, TableData>;
    loading: boolean;
    addNewRow: (tableId: tableId, data: Record<string, any>[]) => Promise<void>;
    initTableData: (tableId: tableId, tableName: string) => void;
}

export const useTableDataStore = create<TableDataStore>((set, get) => ({
    tableData: {},
    loading: true,
    addNewRow: async (tableId: string, data: Record<string, any>[]) => {
        const projectId = '66d65fd3def943cfc739e2d1'; // FIXME: remove this

        // console.log(data);
        try {
            await addTableDataRowApi(projectId, tableId, data);

            set(state => ({
                ...state,
                tableData: {
                    ...state.tableData,
                    [tableId]: {
                        ...state.tableData[tableId],
                        data: [...state.tableData[tableId].data, data]
                    }
                }
            }));
        } catch (error) {
            toast.error('Something went wrong. Please try again.');
            console.error(error);
        }
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