import clsx from "clsx";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { TableFields } from "./TableFieldsLayout";
import { EllipsisVertical } from "lucide-react";
import { useState } from "react";
import { TableSchema, useTableStore } from "@/lib/store/useTableStore";

export const DatabaseLayout = () => {
    const { tables } = useTableStore()
    const [selectedTable, setSelectedTable] = useState(tables[0])

    return (
        <div className="flex gap-4 h-full">
            <div className="w-1/3 flex flex-col">
                <Label className="ml-4">Tables</Label>
                <div className="mt-3 flex flex-col justify-start flex-wrap gap-2 bg-secondary/60 p-1.5 rounded-lg">
                    {tables.map((table, index) => {
                        const active = table.tableName === selectedTable.tableName;
                        return (
                            <Button
                                key={`${index}-dtn`}
                                onClick={() => setSelectedTable(table)}
                                variant={"ghost"}
                                // size="sm"
                                className={clsx("h-10 justify-between rounded-lg tracking-wide hover:bg-transparent", active ? "!bg-white  outline outline-0 shadow-md " : "text-muted-foreground/65")}
                            >
                                {table.tableName}
                                {active && <EllipsisVertical className="h-4 w-4" />}
                            </Button>
                        )
                    })}
                </div>
            </div>


            <TableFields tableName={selectedTable.tableName} schema={selectedTable.schema} />
        </div>
    )
}