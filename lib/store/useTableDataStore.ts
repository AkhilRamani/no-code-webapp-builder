import { create } from "zustand";
import { addTableDataRowApi, deleteTableRowsApi, editTableDataRowApi, getTableDataApi } from "../apis/tableDataApis";
import { toast } from "sonner";

export type TableDataRow = {
    _id: string;
} & Record<string, any>;

interface TableData {
    tableName: string;
    data: TableDataRow[];
}

type tableId = string;

interface TableDataStore {
    tableData: Record<tableId, TableData>;
    loading: boolean;
    addNewRow: (projectId: string, tableId: tableId, data: Record<string, any>[]) => Promise<void>;
    initTableData: (projectId: string, tableId: tableId, tableName: string) => void;
    deleteRows: (projectId: string, tableId: tableId, rowIds: string[]) => Promise<void>;
    editRow: (projectId: string, tableId: tableId, rowId: string, data: Record<string, any>) => Promise<void>;
}

export const useTableDataStore = create<TableDataStore>((set, get) => ({
    tableData: {},
    loading: true,
    addNewRow: async (projectId: string, tableId: string, data: Record<string, any>[]) => {
        try {
            const { id } = await addTableDataRowApi(projectId, tableId, data);

            set(state => ({
                ...state,
                tableData: {
                    ...state.tableData,
                    [tableId]: {
                        ...state.tableData[tableId],
                        data: [
                            ...state.tableData[tableId].data,
                            {
                                ...data,
                                _id: id
                            }
                        ]
                    }
                }
            }));
        } catch (error) {
            toast.error('Something went wrong. Please try again.');
            console.error(error);
        }
    },
    initTableData: async (projectId: string, tableId: string, tableName: string) => {
        set(state => ({ ...state, loading: true }));

        try {
            const tableData = await getTableDataApi(projectId, tableId);

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
    },
    deleteRows: async (projectId: string, tableId: string, rowIds: string[]) => {
        try {
            await deleteTableRowsApi(projectId, tableId, rowIds);

            set(state => ({
                ...state,
                tableData: {
                    ...state.tableData,
                    [tableId]: {
                        ...state.tableData[tableId],
                        data: state.tableData[tableId].data.filter((row) => !rowIds.includes(row._id))
                    }
                }
            }));
        } catch (error) {
            console.error(error);
        }
    },
    editRow: async (projectId: string, tableId: string, rowId: string, data: Record<string, any>) => {
        try {
            await editTableDataRowApi(projectId, tableId, rowId, data);

            set(state => ({
                ...state,
                tableData: {
                    ...state.tableData,
                    [tableId]: {
                        ...state.tableData[tableId],
                        data: state.tableData[tableId].data.map(row => (row._id === rowId ? { ...data, _id: rowId } : row))
                    }
                }
            }));
        } catch (error) {
            console.error(error);
            toast.error('Something went wrong. Please try again.');
        }
    }
}));