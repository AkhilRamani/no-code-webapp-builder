import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { AddEntryForm } from "./AddEntryForm"
import { useState } from "react";
import { TableField } from "@/lib/store/useTableStore";

interface TableFormDialogProps {
    children: React.ReactNode;
    title: string;
    fields: TableField[];
}

export const TableFormDialog = ({ children, title, fields }: TableFormDialogProps) => {
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    const onSubmit = (data: any) => {
        console.log(data);
        setIsDialogOpen(false);
    }

    return (
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
                {children}
            </DialogTrigger>
            <DialogContent className="!rounded-2xl p-0 overflow-hidden">
                <DialogHeader className="px-5 py-5 border-b">
                    <DialogTitle>{title}</DialogTitle>
                    <DialogDescription className="sr-only">
                        {`${title}-form-dialog`}
                    </DialogDescription>
                </DialogHeader>
                <AddEntryForm
                    fields={fields}
                    onSubmit={onSubmit}
                />
            </DialogContent>
        </Dialog>
    )
}