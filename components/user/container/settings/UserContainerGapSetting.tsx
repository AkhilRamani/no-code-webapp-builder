import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import clsx from "clsx";

const presets = [
    { value: 'gap-0', label: '0' },
    { value: 'gap-2', label: '2' },
    { value: 'gap-4', label: '4' },
    { value: 'gap-6', label: '6' },
    { value: 'gap-8', label: '8' },
    { value: 'gap-10', label: '10' },
] as const

export type UserContainerGapSettingProps = {
    selected: typeof presets[number]['value'];
    onChange: (tailwindGap: typeof presets[number]['value']) => void;
}

export const UserContainerGapSetting = ({ selected, onChange }: UserContainerGapSettingProps) => (
    <div className="border-b pb-6">
        <Label>Gap</Label>
        <div className="ml-4 flex flex-wrap gap-2 mt-3 bg-secondary p-1 rounded-lg">
            {presets.map((gap, index) => {
                const active = selected === gap.value;
                return (
                    <Button
                        key={`${index}-cso`}
                        onClick={() => onChange(gap.value)}
                        variant={"ghost"}
                        size="sm"
                        className={clsx("h-7 flex-1 w-7 rounded-lg tracking-widest font-mono hover:bg-white", active ? "bg-white outline outline-0 shadow-md outline-slate-300" : "text-slate-400 hover:bg-muted")}
                    >
                        {gap.label}
                    </Button>
                )
            })}
        </div>
    </div>
)