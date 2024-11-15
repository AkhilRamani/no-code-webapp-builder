import { makeStateUpdater, OnChangeFn, RowData, Table, TableFeature } from "@tanstack/react-table";

export type LoadingTableState = {
    loadingRows: Set<string>;
};

export interface LoadingOptions {
    enableLoading?: boolean;
    onLoadingChange?: OnChangeFn<Set<string>>;
}

export interface LoadingInstance {
    setRowLoading: (rowId: string) => void;
    setRowNotLoading: (rowId: string) => void;
    getIsRowLoading: (rowId: string) => boolean;
}

// Use declaration merging to add our feature
declare module '@tanstack/react-table' {
    interface TableState extends LoadingTableState { }
    interface TableOptionsResolved<TData extends RowData> extends LoadingOptions { }
    interface Table<TData extends RowData> extends LoadingInstance { }
}

// Create the loading feature
export const LoadingFeature: TableFeature<any> = {
    getInitialState: (state): LoadingTableState => {
        return {
            loadingRows: new Set<string>(),
            ...state,
        }
    },

    getDefaultOptions: <TData extends RowData>(table: Table<TData>): LoadingOptions => {
        return {
            enableLoading: true,
            onLoadingChange: makeStateUpdater('loadingRows', table),
        }
    },

    createTable: <TData extends RowData>(table: Table<TData>): void => {
        table.setRowLoading = (rowId: string) => {
            table.options.onLoadingChange?.(old => {
                const newSet = new Set(old);
                newSet.add(rowId);
                return newSet;
            });
        };

        table.setRowNotLoading = (rowId: string) => {
            table.options.onLoadingChange?.(old => {
                const newSet = new Set(old);
                newSet.delete(rowId);
                return newSet;
            });
        };

        table.getIsRowLoading = (rowId: string) => {
            return table.getState().loadingRows.has(rowId);
        };
    },
};