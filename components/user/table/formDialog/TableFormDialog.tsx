import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { AddEntryForm } from "./AddEntryForm"
import { useState } from "react";
import { TableField } from "@/lib/store/useTableStore";
import { useTableDataStore } from "@/lib/store/useTableDataStore";
import { useEditor } from "@craftjs/core";

interface TableFormDialogProps {
	children: React.ReactNode;
	title: string;
	fields: TableField[];
	projectId: string;
	tableId: string;
}

export const TableFormDialog = ({ children, title, fields, projectId, tableId }: TableFormDialogProps) => {
	const [isDialogOpen, setIsDialogOpen] = useState(false);

	const { editorEnabled } = useEditor((state) => ({
		editorEnabled: state.options.enabled,
	}));

	const addNewRow = useTableDataStore(store => store.addNewRow);
	const [isLoading, setIsLoading] = useState(false);

	const onSubmit = async (data: any) => {
		setIsLoading(true);

		await addNewRow(projectId, tableId, data);
		setIsLoading(false);

		setIsDialogOpen(false);
	}

	return (
		<Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
			<div onClick={() => !editorEnabled && setIsDialogOpen(true)}>
				{children}
			</div>
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