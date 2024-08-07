import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import clsx from "clsx";

const presets = [
    { value: undefined, label: '0' },
    { value: 'shadow-sm', label: 'SM' },
    { value: 'shadow', label: 'N' },
    { value: 'shadow-md', label: 'MD' },
    { value: 'shadow-lg', label: 'LG' },
    { value: 'shadow-xl', label: 'XL' },
    { value: 'shadow-2xl', label: '2XL' },
] as const;

export type UserContainerShadowSetting = {
    selected?: typeof presets[number]['value'],
    onChange(tailwindShadow?: typeof presets[number]['value']): void

}

export const UserContainerShadowSetting = ({ selected, onChange }: UserContainerShadowSetting) => (
    <div>
        <Label >Shadow</Label>
        <div className=" ml-4 flex flex-wrap gap-2 mt-3 bg-secondary p-1 rounded-lg">
            {presets.map((space, index) => {
                const active = selected === space.value;

                return (
                    <Button
                        key={`${index}-csi`}
                        onClick={() => onChange(space.value)}
                        variant={"ghost"}
                        size="sm"
                        className={clsx("h-7 flex-1 w-2 rounded-lg tracking-widest font-mono hover:bg-white text-xs", active ? "bg-white outline outline-0 shadow-md outline-slate-300" : "text-slate-400 hover:bg-muted")}
                    >
                        {space.label}
                    </Button>
                )
            })}
        </div>
    </div>

)