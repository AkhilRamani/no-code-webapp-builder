import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { Copy, MoreHorizontal, Pencil, Trash } from "lucide-react"
import { Row, Table } from "@tanstack/react-table"
import { toast } from "sonner"
import { TableDataRow } from "@/lib/store/useTableDataStore"

export const UserTableMenu = ({ row, table, onDelete, onEdit }: { row: Row<TableDataRow>, table: Table<TableDataRow>, onDelete: (rowId: string) => void, onEdit: (rowData: TableDataRow) => void }) => {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-8 w-8 p-0 float-right" disabled={table.getIsRowLoading(row.original._id)}>
                    <span className="sr-only">Open menu</span>
                    <MoreHorizontal className="h-4 w-4" />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="rounded-lg p-0 min-w-44 pb-1.5">
                <DropdownMenuLabel className="px-4 bg-gray-50 text-gray-600 py-2 mb-1.5">Actions</DropdownMenuLabel>
                <DropdownMenuItem
                    className="px-4 py-2.5 rounded-none"
                    onClick={() => {
                        navigator.clipboard.writeText(`${row.original._id}`)
                        toast.success('Record ID copied to clipboard')
                    }}
                >
                    <Copy className="w-[1.1rem] h-[1.1rem] mr-3" />
                    Copy ID
                </DropdownMenuItem>
                <DropdownMenuSeparator className="my-1.5" />
                <DropdownMenuItem onClick={() => onEdit(row.original)} className="px-4 py-2.5 rounded-none"><Pencil className="w-[1.1rem] h-[1.1rem] mr-3" /> Edit</DropdownMenuItem>
                <DropdownMenuItem onClick={() => onDelete(row.original._id)} className="px-4 py-2.5 rounded-none !text-red-700 hover:!bg-red-50"><Trash className="w-[1.1rem] h-[1.1rem] mr-3" /> Delete</DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu >
    )
}