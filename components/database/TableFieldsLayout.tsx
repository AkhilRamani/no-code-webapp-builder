import clsx from "clsx";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { useEffect, useMemo, useState } from "react";
import { OptionFieldSettingType, TableFieldSettings, TableFieldTypes, TableSchema, TextFieldSettingType } from "@/lib/store/useTableStore";
import { TextFieldSetting } from "./field/TextFieldSetting";
import { CommonFieldSetting } from "./field/CommonFieldSetting";
import { TooltipProvider } from "../ui/tooltip";
import { TableFieldIcon, tableFieldTypeToNameMapper } from "@/lib/helpers/tableFieldHelpers";
import { Plus } from "lucide-react";
import { FieldSelectMenu } from "./EditFieldPopover";
import { Input } from "../ui/input";
import { CornerTooltip } from "../common/CornerTooltip";
import { OptionFieldSetting } from "./field/OptionFieldSetting";

interface TableFieldsProps {
    tableName: string;
    schema: TableSchema['schema'];
    updateTable: (updatedTable: TableSchema) => void;
    selectedTableChange: boolean;   // used to reset selected field to 0
}

export const TableFields = ({ tableName, schema, updateTable, selectedTableChange }: TableFieldsProps) => {
    const [selectedFieldIndex, setSelectedFieldIndex] = useState(0)

    useEffect(() => {
        setSelectedFieldIndex(0)
    }, [selectedTableChange])

    const selectedField = useMemo(() => schema[selectedFieldIndex] ?? [], [selectedFieldIndex, schema])

    const setSettingField = <T extends TableFieldSettings>(property: keyof T, value: unknown) => {
        const updatedField = {
            ...selectedField,
            setting: {
                ...selectedField.setting,
                [property]: value
            }
        }

        const updatedSchema = [...schema];
        updatedSchema[selectedFieldIndex] = updatedField;

        updateTable({ tableName, schema: updatedSchema })
    }

    const addNewField = (fieldType: TableFieldTypes, preSetting?: TableFieldSettings) => {
        updateTable({
            tableName,
            schema: [
                ...schema,
                {
                    columnName: 'fieldname',
                    type: fieldType,
                    ...preSetting && { setting: preSetting }
                }
            ]
        })

        setSelectedFieldIndex(schema.length)
    }

    const _onColumnNameChange = (columnName: string) => {
        const updatedField = {
            ...selectedField,
            columnName
        }

        const updatedSchema = [...schema];
        updatedSchema[selectedFieldIndex] = updatedField;

        updateTable({ tableName, schema: updatedSchema })
    }

    return (
        <>
            <div className="flex flex-col overflow-auto">
                <Label className="ml-4">{tableName} fields</Label>
                <div className="mt-3 flex grow flex-col bg-secondary/60 rounded-l-lg border overflow-auto border-r">

                    {schema.map((field, index) => {
                        const active = index === selectedFieldIndex
                        return (
                            <Button
                                key={`${index}-dtf`}
                                className={clsx("font-mono justify-start gap-4 min-h-12 rounded-none text-muted-foreground hover:bg-white transition-all duration-200 border-b", active && "text-primary bg-white pl-7")}
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
            <div className="flex flex-col overflow-auto">
                <Label className="ml-4">{tableFieldTypeToNameMapper[selectedField?.type]} settings</Label>
                <div className="mt-3 grow flex flex-col justify-start gap-6 bg-secondary/40 p-6 rounded-r-lg border border-l-0 overflow-auto">
                    <div className="flex items-center gap-4 text-nowrap relative">
                        <Label className="text-muted-foreground min-w-[30%]">Field name</Label>
                        <Input value={selectedField?.columnName ?? ''} onChange={e => _onColumnNameChange(e.target.value)} className="rounded-lg" />

                        {/* <CornerTooltip tip="Field name for internal use (No spaces)" /> */}
                    </div>

                    {(schema && schema.length) ? <TooltipProvider>
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

                        <CommonFieldSetting
                            setting={selectedField.setting as TextFieldSettingType}
                            onDiscriptionChange={text => setSettingField('description', text)}
                            onRequiredChange={required => setSettingField('required', required)}
                        />
                    </TooltipProvider>
                        :
                        <></>
                    }
                </div>
            </div>
        </>
    )
}