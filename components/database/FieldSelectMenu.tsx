import { Check, User } from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import React, { useState } from "react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuShortcut, DropdownMenuTrigger } from "../ui/dropdown-menu";
import { TableFieldIcon, tableFieldTypeToNameMapper } from "@/lib/helpers/tableFieldHelpers";
import { TableFieldSettings, TableFieldTypes } from "@/lib/store/useTableStore";

interface FieldSelectMenuProps {
    children: React.ReactElement;
    onFieldSelect: (fieldType: TableFieldTypes, preSetting?: TableFieldSettings) => void
}

const getPreSettings = (fieldType: TableFieldTypes): TableFieldSettings | undefined => {
    if (fieldType === 'OPT') return {
        options: []
    }

    return undefined;
}

export const FieldSelectMenu = ({ children, onFieldSelect }: FieldSelectMenuProps) => {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                {children}
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-40 rounded-lg mt-1">
                <DropdownMenuLabel>Field type</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                    {
                        Object.entries(tableFieldTypeToNameMapper).map(([key, value]) => (
                            <DropdownMenuItem key={`${key}-dtfs`} className="px-3 py-2 rounded-lg" onClick={() => onFieldSelect(key as TableFieldTypes, getPreSettings(key as TableFieldTypes))}>
                                {TableFieldIcon[key as TableFieldTypes]}
                                <span className="ml-2.5 opacity-80">{value}</span>
                            </DropdownMenuItem>
                        ))
                    }
                </DropdownMenuGroup>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}