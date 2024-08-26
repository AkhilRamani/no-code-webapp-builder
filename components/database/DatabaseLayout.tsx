import clsx from "clsx";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { TableFields } from "./TableFieldsLayout";
import { EllipsisVertical, Plus } from "lucide-react";
import { Dispatch, SetStateAction, useEffect, useMemo, useState } from "react";
import { TableSchema } from "@/lib/store/useTableStore";
import { EditTableNamePopover } from "./TableEditPopover";
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "../ui/dropdown-menu";

interface DatabaseLayoutProps {
    tables: TableSchema[]
    setTables: Dispatch<SetStateAction<TableSchema[]>>;
    createTable: (tableName: string) => void;
}

const DatabaseLayout = ({ tables, setTables, createTable }: DatabaseLayoutProps) => {
    const [selectedTableIndex, setSelectedTableIndex] = useState(0)

    const updateSelectedTable = (updatedTable: TableSchema) => {
        // setTables(prevTables =>
        //     prevTables.map(table =>
        //         table.tableName === updatedTable.tableName ? updatedTable : table
        //     )
        // )

        setTables(prevTables => {
            const newTables = [...prevTables];
            newTables[selectedTableIndex] = updatedTable;
            return newTables;
        });
    }

    const deleteTable = (tableIndex: number) => {
        setTables(prevTables => {
            const newTables = prevTables.filter((_, i) => i !== tableIndex)
            return newTables;
        });
    }

    const selectedTable = useMemo(() => tables[selectedTableIndex] ?? setSelectedTableIndex(tables.length - 1), [selectedTableIndex, tables])

    return (
        <div className="flex gap-4 flex-1">
            <div className="w-1/4 flex flex-col">
                <div className="flex justify-between">
                    <Label className="ml-4">Tables</Label>

                    <EditTableNamePopover onDone={createTable}>
                        <Button variant='secondary' size='icon' className="h-6 w-6 -mt-2 -mb-2 rounded-full hover:bg-slate-200">
                            <Plus className="h-4 w-4" />
                        </Button>
                    </EditTableNamePopover>

                </div>
                <div className="mt-3 flex flex-col justify-start flex-wrap gap-2 bg-secondary/60 p-1.5 rounded-lg">
                    {tables.map((table, index) => {
                        const active = index === selectedTableIndex;
                        return (
                            <Button
                                key={`${index}-dtn`}
                                onClick={() => setSelectedTableIndex(index)}
                                variant={"ghost"}
                                // size="sm"
                                className={clsx("h-10 justify-between rounded-lg tracking-wide hover:bg-transparent", active ? "!bg-white  outline outline-0 shadow-md " : "text-muted-foreground/65")}
                            >
                                {table.tableName}
                                {active &&
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <EllipsisVertical className="h-4 w-4" />
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent className="rounded-lg mt-1">
                                            <DropdownMenuGroup>
                                                <DropdownMenuItem className="px-3 py-2 rounded-lg" onClick={() => deleteTable(index)}>
                                                    <span className="ml-2.5 opacity-80">Delete</span>
                                                </DropdownMenuItem>
                                            </DropdownMenuGroup>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                }
                            </Button>
                        )
                    })}
                </div>
            </div>

            <div className="grid grid-cols-[38%_auto] flex-1">
                {selectedTable && <TableFields
                    tableName={selectedTable.tableName}
                    schema={selectedTable.schema}
                    updateTable={updateSelectedTable}
                    selectedTableChange={!!selectedTableIndex}
                />}
            </div>
        </div>
    )
}

export default DatabaseLayout;