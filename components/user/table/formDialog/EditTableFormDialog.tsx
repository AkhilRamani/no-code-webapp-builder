import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { AddEntryForm } from "./AddEntryForm"
import { useState } from "react";
import { TableField } from "@/lib/store/useTableStore";
import { TableDataRow } from "@/lib/store/useTableDataStore";

interface EditTableFormDialogProps {
	data: TableDataRow | undefined;
	onOpenChange: (open: boolean) => void;
	title: string;
	fields: TableField[];
	tableId: string;
	onSubmit: (rowId: string, data: Record<string, unknown>) => Promise<void>;
}

export const EditTableFormDialog = ({ data, onOpenChange, title, fields, tableId, onSubmit }: EditTableFormDialogProps) => {
	const [isLoading, setIsLoading] = useState(false);

	const _onSubmit = async (newData: any) => {
		setIsLoading(true);

		await onSubmit((data as TableDataRow)._id, newData);
		setIsLoading(false);

		onOpenChange(false);
	}

	return (
		<Dialog open={!!data} onOpenChange={onOpenChange}>
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
					data={data}
					fields={fields}
					onSubmit={_onSubmit}
					isLoading={isLoading}
				/>
			</DialogContent>
		</Dialog>
	)
}