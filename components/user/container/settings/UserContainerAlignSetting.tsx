import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import clsx from "clsx";
import { AlignCenterVertical, AlignEndVertical, AlignHorizontalJustifyCenter, AlignHorizontalJustifyEnd, AlignHorizontalJustifyStart, AlignStartVertical, XIcon } from "lucide-react";
import { useMemo } from "react";

const justifyPresets = [
    { value: 'justify-start', Label: AlignHorizontalJustifyStart },
    { value: 'justify-center', Label: AlignHorizontalJustifyCenter },
    { value: 'justify-end', Label: AlignHorizontalJustifyEnd },
] as const

const alignPresets = [
    { value: 'items-start', Label: AlignStartVertical },
    { value: 'items-center', Label: AlignCenterVertical },
    { value: 'items-end', Label: AlignEndVertical },
] as const

export type UserContainerAlignValues = typeof alignPresets[number]['value'];
export type UserContainerJustifyValues = typeof justifyPresets[number]['value'];

type UserContainerAlignSettingProps = {
    flexDirection: 'flex-row' | 'flex-col' | undefined;
    selected?: UserContainerAlignValues | UserContainerJustifyValues;
    onChange: (tailwindGap: UserContainerAlignValues | UserContainerJustifyValues | undefined) => void;
}

export const UserContainerAlignSetting = ({ flexDirection, selected, onChange }: UserContainerAlignSettingProps) => {
    const presets = useMemo(() => flexDirection === 'flex-col' ? alignPresets : justifyPresets, [flexDirection])
    return (
        <div className="border-b pb-6 relative">
            <Label>Content align</Label>
            {selected && <Button size='icon' variant='destructive' className="rounded-full h-4 w-4 absolute right-1 top-1" onClick={() => onChange(undefined)}>
                <XIcon className="h-3 w-3" />
            </Button>}

            <div className="ml-4 flex flex-wrap gap-2 mt-3 bg-secondary p-1 rounded-lg">
                {presets.map(({ value, Label }, index) => {
                    const active = selected === value;
                    return (
                        <Button
                            key={`${index}-cso`}
                            onClick={() => onChange(value)}
                            variant={"ghost"}
                            size="sm"
                            className={clsx("h-7 flex-1 w-7 rounded-lg tracking-widest font-mono hover:bg-white", active ? "bg-white outline outline-0 shadow-md outline-slate-300" : "text-slate-400 hover:bg-muted")}
                        >
                            <Label className="h-4 w-4" />
                        </Button>
                    )
                })}
            </div>
        </div>
    )
}