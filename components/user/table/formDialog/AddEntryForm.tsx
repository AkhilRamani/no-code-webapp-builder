import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Switch } from "@/components/ui/switch";
import { BooleanFieldSettingType, OptionFieldSettingType, TableField, TableFieldSettings, TableFieldTypes } from "@/lib/store/useTableStore";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import { DialogClose } from "@/components/ui/dialog";
import { Loader, Loader2 } from "lucide-react";

export const AddEntryForm = ({ fields, onSubmit, isLoading }: { fields: TableField[], onSubmit: (data: any) => void, isLoading: boolean }) => {
	const formSchema = z.object(
		fields.reduce<Record<string, z.ZodTypeAny>>((acc, field) => {
			let fieldSchema: z.ZodTypeAny;
			switch (field.type) {
				case TableFieldTypes.STR:
					fieldSchema = z.string();
					break;
				case TableFieldTypes.NUM:
					fieldSchema = z.coerce.number();
					break;
				case TableFieldTypes.OPT:
					fieldSchema = z.string();
					break;
				case TableFieldTypes.BOOL:
					fieldSchema = z.boolean();
					break;
				case TableFieldTypes.DATE:
					fieldSchema = z.string();
					break;
				default:
					fieldSchema = z.string();
			}
			if (field.setting?.required) {
				fieldSchema = fieldSchema.min(1, "This field is required");
			} else {
				fieldSchema = fieldSchema.optional();
			}
			acc[field.columnName] = fieldSchema;
			return acc;
		}, {})
	);

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: fields.reduce((acc, field) => {
			acc[field.columnName] = field.type === TableFieldTypes.BOOL ? false : undefined;
			return acc;
		}, {} as Record<string, any>),
	});

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col flex-1 bg-gradient-to-t from-slate-50 to-transparent overflow-auto">
				<div className="space-y-3 flex-1 px-5 overflow-auto pt-4 pb-6">
					{fields.map((field: TableField) => (
						<FormField
							key={field.columnName}
							control={form.control}
							name={field.columnName}
							render={({ field: formField }) => (
								<FormItem className="grid grid-cols-[0.4fr_1fr]">
									<div className="mt-3">
										<FormLabel className="tracking-wide">
											{field.columnName}
											{field.setting && field.setting.required && <span className="text-red-500 ml-1">*</span>}
										</FormLabel>
									</div>
									<div>
										<FormControl>
											{(() => {
												switch (field.type) {
													case TableFieldTypes.STR:
														return <Input className="rounded-lg tracking-wide" {...formField} value={formField.value ?? ""} />;
													case TableFieldTypes.NUM:
														return <Input className="rounded-lg tracking-wide" {...formField} type="number" value={formField.value ?? ""} />;
													case TableFieldTypes.OPT:
														return (
															<Select onValueChange={formField.onChange} defaultValue={formField.value}>
																<SelectTrigger className="rounded-lg">
																	<SelectValue placeholder="Select an option" />
																</SelectTrigger>
																<SelectContent className="rounded-lg">
																	{(field.setting as OptionFieldSettingType).options?.map(option => (
																		<SelectItem key={option} value={option}>
																			{option}
																		</SelectItem>
																	))}
																</SelectContent>
															</Select>
														);
													case TableFieldTypes.BOOL:
														return (
															<Switch
																checked={formField.value}
																onCheckedChange={formField.onChange}
																className="order-1"
															/>
														);
													case TableFieldTypes.DATE:
														return <Input className="rounded-lg" {...formField} type="date" value={formField.value ?? ""} />;
													default:
														return <Input {...formField} value={formField.value ?? ""} />;
												}
											})()}
										</FormControl>
										{field.setting?.description && (
											<div className="flex items-center mt-2">
												{/* <Info className="mr-1 h-3 w-3" /> */}
												<p className="text-xs text-gray-500">{field.setting.description}</p>
											</div>
										)}
									</div>
								</FormItem>
							)}
						/>
					))}
				</div>
				<div className={`flex justify-end gap-4 border-t pt-5 pb-5 px-5 bg-white`}>
					<DialogClose asChild>
						<Button variant='destructive' className="rounded-lg w-24 tracking-wide font-semibold shadow">Cancel</Button>
					</DialogClose>
					<Button type="submit" className="rounded-lg min-w-24 tracking-wide font-semibold shadow" disabled={isLoading}>
						{isLoading ? <Loader2 className="h-5 w-5 animate-spin" /> : 'Save'}
					</Button>
				</div>
			</form>
		</Form>
	);
};

AddEntryForm.craft = {
	displayName: 'Add Entry Form',
	props: {
		fields: [],
		onSubmit: () => { },
	},
};