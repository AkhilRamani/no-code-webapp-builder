import { TableFieldTypes } from "@/lib/store/useTableStore";
import { FileDigit, LayoutList, TextCursorInput, ToggleRight } from "lucide-react";

export const TableFieldIcon: Record<TableFieldTypes, React.ReactElement> = {
    STR: <TextCursorInput className="h-4 w-4" />,
    BOOL: <ToggleRight className="h-4 w-4" />,
    NUM: <FileDigit className="h-4 w-4" />,
    OPT: <LayoutList className="h-4 w-4" />,
}

export const tableFieldTypeToNameMapper: Record<TableFieldTypes, string> = {
    STR: 'Text',
    BOOL: 'Switch',
    NUM: 'Number',
    OPT: 'Option'
}