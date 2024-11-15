import { Checkbox } from "@/components/ui/checkbox";
import { TableSchema } from "@/lib/store/useTableStore";
import { ColumnDef } from "@tanstack/react-table";
import { Loader2 } from "lucide-react";
import { UserTableMenu } from "./UserTableMenu";
import { TableDataRow } from "@/lib/store/useTableDataStore";

export const getUserTableColumns = (fields: TableSchema['fields'] | undefined, tableData: TableDataRow[] | undefined, handlers: { onDelete: (rowId: string) => void, onEdit: (rowData: TableDataRow) => void }) => {
    let columns = fields?.map(({ columnName }) => ({
        header: columnName,
        accessorKey: columnName,
        // header: ({ column }: Header<any, any>) => {
        //     return (
        //         <Button
        //             className="px-0"
        //             variant="ghost"
        //             onClick={() => {
        //                 console.log(column.getIsSorted())
        //                 column.toggleSorting(column.getIsSorted() === "asc")
        //             }}
        //         >
        //             {columnName}
        //             <ArrowUpDown className="ml-2 h-4 w-4" />
        //         </Button>
        //     )
        // },
    })) ?? [] as ColumnDef<TableDataRow, any>[];

    if (tableData && tableData.length > 0) {
        columns = [
            {
                id: "select",
                header: ({ table }) => (
                    <Checkbox
                        checked={
                            table.getIsAllPageRowsSelected() ||
                            (table.getIsSomePageRowsSelected() && "indeterminate")
                        }
                        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
                        aria-label="Select all"
                    />
                ),
                cell: ({ row, table }) => table.getIsRowLoading(row.original._id) ?
                    <Loader2 className="w-5 h-5 p-0 -m-0.5 -mr-5 rounded-full bg-gray-200 animate-spin" />
                    : (
                        <Checkbox
                            checked={row.getIsSelected()}
                            onCheckedChange={(value) => row.toggleSelected(!!value)}
                            aria-label="Select row"
                        />
                    ),
                enableSorting: false,
                enableHiding: false,
            },
            ...columns,
            {
                id: 'actions',
                cell: ({ row, table }) => <UserTableMenu row={row} table={table} onDelete={handlers.onDelete} onEdit={handlers.onEdit} />,
            }
        ] as ColumnDef<TableDataRow, any>[]
    }

    return columns;
}