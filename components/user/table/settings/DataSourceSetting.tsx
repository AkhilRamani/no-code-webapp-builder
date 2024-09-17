import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useTableStore } from "@/lib/store/useTableStore";
import { useMemo } from "react";

interface DataSourceSettingProps {
    selected: string;
    onChange: (tableName: string) => void;
}

export const DataSourceSetting = ({ selected, onChange }: DataSourceSettingProps) => {
    const { tables } = useTableStore()

    const options = useMemo(() => tables.map(table => ({
        tableId: table.id,
        tableName: table.tableName
    })), [tables])

    return (
        <div className="space-y-2 border-b pb-6">
            <div className="flex items-center justify-between">


                <Label>Data source</Label>
                <div className="ml-4">
                    <Select value={selected} onValueChange={onChange} >
                        <SelectTrigger className="w-36 font-semibold rounded-lg">
                            <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value='Dummy' className="font-semibold italic text-muted-foreground">
                                Dummy
                            </SelectItem>
                            {options.map((source, index) => (
                                // assuming table id will be updated when creating a new table from server response
                                <SelectItem key={`${source.tableName}-${index}`} value={source.tableId as string} className="font-semibold text-muted-foreground">
                                    {source.tableName}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
            </div>
        </div>
    )
}