import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { TableDataRow, useTableDataStore } from "@/lib/store/useTableDataStore";
import { TableSchema } from "@/lib/store/useTableStore";
import { flexRender, getCoreRowModel, useReactTable } from "@tanstack/react-table";
import clsx from "clsx";
import { Check, Frown, Loader2, X } from "lucide-react";
import { UserTableProps } from "../types";
import { LoadingFeature } from "./rowLoadingFeature";
import { getUserTableColumns } from "./getUserTableColumns";
import { useState } from "react";
import { ConfirmDialog } from "@/components/common/ConfirmDialog";
import { EditTableFormDialog } from "../formDialog/EditTableFormDialog";

export const TableLayout = ({ dataSource, table, projectId }: { dataSource: UserTableProps['dataSource'], table: TableSchema | undefined, projectId: string }) => {
    const tableData = useTableDataStore(state => state.tableData[dataSource]);
    const { loading, deleteRows, editRow } = useTableDataStore(({ loading, deleteRows, editRow }) => ({ loading, deleteRows, editRow }));

    const [deleteRowId, setDeleteRowId] = useState<string | undefined>();
    const [editRowData, setEditRowData] = useState<TableDataRow | undefined>();

    const columns = getUserTableColumns(table?.fields, tableData?.data, { onDelete: rowId => setDeleteRowId(rowId), onEdit: setEditRowData });
    const [loadingRows, setLoadingRows] = useState(new Set<string>());

    const reactTable = useReactTable<TableDataRow>({
        data: tableData?.data ?? [],
        columns,
        getCoreRowModel: getCoreRowModel(),
        _features: [LoadingFeature],
        state: {
            loadingRows,
        },
        onLoadingChange: setLoadingRows,
    })

    const deleteHandler = async () => {
        const rowsToDelete = [deleteRowId as string]
        setDeleteRowId(undefined)

        reactTable.setRowLoading(deleteRowId as string)
        await deleteRows(projectId, dataSource, rowsToDelete)
        reactTable.setRowNotLoading(deleteRowId as string)
    }

    const editHandler = async (rowId: string, data: Record<string, unknown>) => {
        console.log('editHandler', rowId, data);
        await editRow(projectId, dataSource, rowId, data)
        // setEditRowData(undefined)
    }

    return (
        <Table>
            <TableHeader className="sticky top-0 bg-muted/50 tracking-wide">
                {
                    reactTable.getHeaderGroups().map((headerGroup) => (
                        <TableRow key={headerGroup.id}>
                            {headerGroup.headers.map(header => <TableHead key={header.id}>
                                {header.isPlaceholder
                                    ? null
                                    : flexRender(
                                        header.column.columnDef.header,
                                        header.getContext()
                                    )}
                            </TableHead>)}
                        </TableRow>
                    ))
                }
            </TableHeader>
            <TableBody>
                {
                    loading ?
                        <TableRow>
                            <TableCell colSpan={6}>
                                <Loader2 className="animate-spin ease-in-out m-auto" />
                            </TableCell>
                        </TableRow>
                        :
                        reactTable.getRowModel().rows.length ?
                            reactTable.getRowModel().rows.map((row) => {
                                const loading = reactTable.getIsRowLoading(row.original._id);
                                return (
                                    <TableRow key={row.id} data-state={row.getIsSelected() && "selected"} className={clsx(loading && 'bg-gray-100 opacity-50')}>
                                        {row.getVisibleCells().map(cell => {
                                            const value = cell.getValue();
                                            if (typeof value === 'boolean') return (
                                                <TableCell key={cell.id}>
                                                    {value ? <Check className="w-5 h-5 text-green-700" /> : <X className="w-5 h-5 text-red-500" />}
                                                </TableCell>
                                            )

                                            if (typeof value === 'number') return (
                                                <TableCell key={cell.id} className="font-mono italic opacity-75">
                                                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                                </TableCell>
                                            )

                                            return <TableCell className={clsx("py-0", loading && '[&:has([role=checkbox])]:pr-4')} key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
                                        })}
                                    </TableRow>
                                )
                            })
                            :
                            <TableRow>
                                <TableCell colSpan={table?.fields.length} align="center">
                                    <Frown className="w-5 h-5 mb-2 text-muted-foreground" />
                                    <p className="text-muted-foreground tracking-wider">Nothing added yet</p>
                                </TableCell>
                            </TableRow>
                }
            </TableBody>

            <ConfirmDialog open={!!deleteRowId} onOpenChange={() => setDeleteRowId(undefined)} title="Delete row" description="Are you sure you want to delete this row?" async onConfirm={deleteHandler} />
            <EditTableFormDialog data={editRowData} onOpenChange={() => setEditRowData(undefined)} title={`Edit ${table?.tableName} data`} fields={table?.fields ?? []} tableId={dataSource} onSubmit={editHandler} />
        </Table>
    )
}