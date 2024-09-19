import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { AddEntryForm } from "./AddEntryForm"
import { useState } from "react";
import { TableField } from "@/lib/store/useTableStore";
import { useTableDataStore } from "@/lib/store/useTableDataStore";
import * as DialogPrimitive from "@radix-ui/react-dialog"
import { X } from "lucide-react";

interface TableFormDialogProps {
	children: React.ReactNode;
	title: string;
	fields: TableField[];
	tableId: string;
}

export const TableFormDialog = ({ children, title, fields, tableId }: TableFormDialogProps) => {
	const [isDialogOpen, setIsDialogOpen] = useState(false);

	const addNewRow = useTableDataStore(store => store.addNewRow);
	const [isLoading, setIsLoading] = useState(false);

	const onSubmit = async (data: any) => {
		setIsLoading(true);

		await addNewRow(tableId, data);
		setIsLoading(false);

		setIsDialogOpen(false);
	}

	return (
		<Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
			<DialogTrigger >
				{children}
			</DialogTrigger>
			<DialogContent className="!rounded-2xl p-0 overflow-hidden min-h-[50vh] max-h-[84vh] gap-0 flex flex-col">
				<DialogHeader className="px-5 py-5 border-b shadow-sm flex flex-row items-center justify-between">
					<DialogTitle>{title}</DialogTitle>
					<DialogDescription className="sr-only">
						{`${title}-form-dialog`}
					</DialogDescription>

					{/* <DialogPrimitive.Close className="">
						<X className="w-4 h-4" />
					</DialogPrimitive.Close> */}
				</DialogHeader>
				<AddEntryForm
					fields={fields}
					onSubmit={onSubmit}
					isLoading={isLoading}
				/>
			</DialogContent>
		</Dialog>
	)
}