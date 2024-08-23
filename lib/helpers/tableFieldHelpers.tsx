import { TableFieldTypes } from "@/lib/store/useTableStore";
import { CalendarClock, FileDigit, LayoutList, Link2, TextCursorInput, ToggleRight } from "lucide-react";

export const TableFieldIcon: Record<TableFieldTypes, React.ReactElement> = {
    STR: <TextCursorInput className="h-4 w-4" />,
    BOOL: <ToggleRight className="h-4 w-4" />,
    NUM: <FileDigit className="h-4 w-4" />,
    OPT: <LayoutList className="h-4 w-4" />,
    DATE: <CalendarClock className="h-4 w-4" />,
    REF: <Link2 className="h-4 w-4" />,
}

export const tableFieldTypeToNameMapper: Record<TableFieldTypes, string> = {
    STR: 'Text',
    BOOL: 'Switch',
    NUM: 'Number',
    OPT: 'Option',
    DATE: 'Date',
    REF: 'Reference'
}