import { Check } from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import React, { useState } from "react";

interface TableEditPopoverProps {
    children: React.ReactElement;
    onDone: (tableName: string) => void
}

export const EditTableNamePopover = ({ children, onDone }: TableEditPopoverProps) => {
    const [tableName, setTableName] = useState('')

    const [isOpen, setIsOpen] = useState(false);

    const _onOpenChange = (isOpen: boolean) => {
        setIsOpen(isOpen);
    }

    const _onDoneClick = () => {
        if (!tableName) return;
        onDone(tableName);
        setIsOpen(false);
    }

    return (
        <Popover open={isOpen} onOpenChange={_onOpenChange}>
            <PopoverTrigger asChild>{children}</PopoverTrigger>
            <PopoverContent className="rounded-xl border shadow-lg mt-1 grid w-80">
                <h4 className="text-sm text-muted-foreground mb-3 -mt-1">Set the table name to create.</h4>
                <div className="flex items-center gap-1.5 rounded-lg">
                    <Input
                        placeholder="Products"
                        defaultValue={tableName}
                        onChange={e => setTableName(e.target.value)}
                        className="col-span-2 h-9 rounded-lg rounded-r-none bg-muted"
                    />
                    <Button size='sm' onClick={_onDoneClick} className="rounded-lg rounded-l-none ml-auto">
                        <Check className="h-4 w-4" />
                    </Button>
                </div>
            </PopoverContent>
        </Popover>
    )
}