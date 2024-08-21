import clsx from "clsx";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { TextIcon } from "lucide-react";
import { useState } from "react";
import { TableFieldSettings, TableFieldTypes, TableSchema, TextFieldSettingType } from "@/lib/store/useTableStore";
import { TextFieldSetting } from "./field/TextFieldSetting";
import { CommonFieldSetting } from "./field/CommonFieldSetting";
import { TooltipProvider } from "../ui/tooltip";
import { TableFieldIcon, tableFieldTypeToNameMapper } from "@/lib/helpers/TableFieldHelpers";

interface TableFieldsProps {
    tableName: string;
    schema: TableSchema['schema']
}

export const TableFields = ({ tableName, schema }: TableFieldsProps) => {
    const [selectedField, setSelectedField] = useState(schema[0])

    const setSettingField = <T extends TableFieldSettings>(property: keyof T, value: unknown) => setSelectedField(state => ({
        ...state,
        setting: {
            ...state.setting,
            [property]: value
        }
    }))

    return (
        <div className="grid grid-cols-[30%_auto] w-full ">
            <div className="flex flex-col">
                <Label className="ml-4">{tableName} fields</Label>
                <div className="mt-3 h-full flex flex-col justify-start flex-wrap bg-secondary/60 rounded-l-lg border overflow-auto border-r">

                    {schema.map((field, index) => {
                        const active = field.columnName === selectedField.columnName
                        return (
                            <Button
                                key={`${index}-dtf`}
                                className={clsx("font-mono justify-start gap-4 h-12 rounded-none text-muted-foreground hover:bg-white transition-all duration-200 border-b", active && "text-primary bg-white pl-7")}
                                variant="ghost"
                                onClick={() => setSelectedField(field)}
                            >
                                {TableFieldIcon[field.type]}
                                {field.columnName}
                            </Button>
                        )
                    })}
                </div>
            </div>
            <div className="flex flex-col">
                <Label className="ml-4">{tableFieldTypeToNameMapper[selectedField.type]} settings</Label>
                <div className="mt-3 h-full flex flex-col justify-start flex-wrap gap-6 bg-secondary/40 p-6 rounded-r-lg border border-l-0">
                    <TooltipProvider>
                        {
                            selectedField.type === TableFieldTypes.STR &&
                            <TextFieldSetting
                                setting={selectedField.setting as TextFieldSettingType}
                                onDiscriptionChange={text => setSettingField('description', text)}
                                onPlaceholderChange={text => setSettingField<TextFieldSettingType>('placeholder', text)}
                                onRequiredChange={required => setSettingField('required', required)}
                            />
                        }

                        <CommonFieldSetting
                            setting={selectedField.setting as TextFieldSettingType}
                            onDiscriptionChange={text => setSettingField('description', text)}
                            onRequiredChange={required => setSettingField('required', required)}
                        />
                    </TooltipProvider>
                </div>
            </div>
        </div>
    )
}