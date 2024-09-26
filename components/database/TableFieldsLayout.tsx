import clsx from "clsx";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { useEffect, useMemo, useState } from "react";
import { OptionFieldSettingType, TableFieldSettings, TableFieldTypes, TableSchema, TextFieldSettingType } from "@/lib/store/useTableStore";
import { TextFieldSetting } from "./field/TextFieldSetting";
import { CommonFieldSetting } from "./field/CommonFieldSetting";
import { TooltipProvider } from "../ui/tooltip";
import { TableFieldIcon, tableFieldTypeToNameMapper } from "@/lib/helpers/tableFieldHelpers";
import { Plus, Trash, Trash2 } from "lucide-react";
import { FieldSelectMenu } from "./FieldSelectMenu";
import { Input } from "../ui/input";
import { OptionFieldSetting } from "./field/OptionFieldSetting";
import { CornerTooltip } from "../common/CornerTooltip";

interface TableFieldsProps {
	tableData: TableSchema;
	updateTable: (updatedTable: TableSchema) => void;
	selectedTableChange: boolean;   // used to reset selected field to 0
}

export const TableFields = ({ updateTable, selectedTableChange, tableData }: TableFieldsProps) => {
	const [selectedFieldIndex, setSelectedFieldIndex] = useState(0)

	useEffect(() => {
		setSelectedFieldIndex(0)
	}, [selectedTableChange])

	const selectedField = useMemo(() => tableData.fields[selectedFieldIndex] ?? [], [selectedFieldIndex, tableData.fields])

	const setSettingField = <T extends TableFieldSettings>(property: keyof T, value: unknown) => {
		const updatedField = {
			...selectedField,
			setting: {
				...selectedField.setting,
				[property]: value
			}
		}

		const updatedFields = [...tableData.fields];
		updatedFields[selectedFieldIndex] = updatedField;

		updateTable({ ...tableData, fields: updatedFields })
	}

	const addNewField = (fieldType: TableFieldTypes, preSetting?: TableFieldSettings) => {
		updateTable({
			...tableData,
			fields: [
				...tableData.fields,
				{
					columnName: 'fieldname',
					type: fieldType,
					...preSetting && { setting: preSetting }
				}
			]
		})

		setSelectedFieldIndex(tableData.fields.length)
	}

	const _onColumnNameChange = (columnName: string) => {
		const updatedField = {
			...selectedField,
			columnName
		}

		const updatedFields = [...tableData.fields];
		updatedFields[selectedFieldIndex] = updatedField;

		updateTable({ ...tableData, fields: updatedFields })
	}

	const _onFieldDelete = () => {
		const updatedFields = tableData.fields.filter((_, index) => index !== selectedFieldIndex);
		updateTable({ ...tableData, fields: updatedFields })
		setSelectedFieldIndex(selectedFieldIndex - 1)
	}

	return (
		<>
			<div className="flex flex-col overflow-auto">
				<Label className="ml-4">{tableData.tableName} fields</Label>
				<div className="mt-3 flex grow flex-col bg-secondary/60 rounded-l-lg border overflow-auto border-r">

					{tableData.fields.map((field, index) => {
						const active = index === selectedFieldIndex
						return (
							<Button
								key={`${index}-dtf`}
								className={clsx("font-mono justify-start gap-4 min-h-12 rounded-none text-muted-foreground hover:bg-white transition-all duration-200 border-b tracking-wide", active && "text-primary bg-white pl-7")}
								variant="ghost"
								onClick={() => setSelectedFieldIndex(index)}
							>
								{TableFieldIcon[field.type]}
								{field.columnName}
							</Button>
						)
					})}


					<FieldSelectMenu onFieldSelect={addNewField}>
						<Button size='icon' className="rounded-full shrink-0 h-8 w-8 place-self-center mt-6 shadow-lg">
							<Plus className="h-4 w-4" />
						</Button>
					</FieldSelectMenu>
					<p className="place-self-center text-xs mt-2 text-muted-foreground mb-6">Add new field</p>
				</div>
			</div>

			<div className="flex flex-col flex-1 overflow-auto relative">
				<Label className="ml-4">{tableFieldTypeToNameMapper[selectedField?.type]} settings</Label>

				<div className="mt-3 flex flex-1 flex-col justify-start gap-6 bg-secondary/40 p-6 rounded-r-lg border border-l-0 overflow-auto bg-gradient-to-tr from-secondary/40 to-white">
					{(tableData.fields && tableData.fields.length) ?
						<TooltipProvider>
							<div className="flex items-center gap-4 text-nowrap relative">
								<Label className="text-muted-foreground min-w-[30%] tracking-wide">Field name</Label>
								<Input value={selectedField?.columnName ?? ''} onChange={e => _onColumnNameChange(e.target.value)} className="rounded-lg" />
							</div>

							{
								selectedField?.type === TableFieldTypes.STR &&
								<TextFieldSetting
									setting={selectedField.setting as TextFieldSettingType}
									onDiscriptionChange={text => setSettingField('description', text)}
									onPlaceholderChange={text => setSettingField<TextFieldSettingType>('placeholder', text)}
									onRequiredChange={required => setSettingField('required', required)}
								/>
							}
							{
								selectedField?.type === TableFieldTypes.OPT &&
								<OptionFieldSetting
									setting={selectedField.setting as OptionFieldSettingType}
									onOptionAdd={optionName => setSettingField<OptionFieldSettingType>('options', [
										...(selectedField.setting as OptionFieldSettingType).options,
										optionName
									])}
									onOptionEdit={(index, optionName) => {
										const newOpts = [...(selectedField.setting as OptionFieldSettingType).options];
										newOpts[index] = optionName;
										console.log({ index, optionName })
										setSettingField<OptionFieldSettingType>('options', newOpts);
									}}
									onOptionDelete={(index) => {
										const newOpts = (selectedField.setting as OptionFieldSettingType).options.filter((_, i) => i !== index);
										setSettingField<OptionFieldSettingType>('options', newOpts);
									}}
								/>
							}

							{
								selectedField?.type === TableFieldTypes.BOOL ?
									<div className="flex items-center gap-4 text-nowrap relative">
										<Label className="text-muted-foreground min-w-[30%] tracking-wide">Short description</Label>
										<Input value={selectedField.setting?.description ?? ''} onChange={e => setSettingField('description', e.target.value)} className="rounded-lg" />
										<CornerTooltip tip="Discription will be displayed at forms" />
									</div>
									:
									<CommonFieldSetting
										setting={selectedField.setting as TextFieldSettingType}
										onDiscriptionChange={text => setSettingField('description', text)}
										onRequiredChange={required => setSettingField('required', required)}
									/>
							}

							<Button variant='outline' size='icon' className="absolute bottom-2 right-2 rounded-md h-8 w-8 !text-red-600 hover:bg-red-50 border-red-300/70 hover:border-red-300/90 shadow-sm" onClick={_onFieldDelete}><Trash2 className="h-4 w-4" /></Button>
						</TooltipProvider>
						:
						<></>
					}
				</div>
			</div>
		</>
	)
}