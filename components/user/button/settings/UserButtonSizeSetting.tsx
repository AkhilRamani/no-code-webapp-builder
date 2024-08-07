import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import clsx from "clsx";

const presets = [
    { value: 'icon', label: 'Icon' },
    { value: 'sm', label: 'SM' },
    { value: 'default', label: 'MD' },
    { value: 'lg', label: 'LG' },
] as const;

export type UserButtonSizeSettingProps = {
    selected?: typeof presets[number]['value'];
    onChange: (size: typeof presets[number]['value']) => void;
}

export const UserButtonSizeSetting = ({ selected, onChange }: UserButtonSizeSettingProps) => (
    <div>
        <Label>Size</Label>
        <div className="flex ml-4 flex-wrap gap-2 !mt-3 mb-3 bg-secondary p-1 rounded-lg">
            {presets.map((size, index) => {
                const active = selected === size.value;
                return (
                    <Button
                        key={`${index}-ts`}
                        onClick={() => onChange(size.value)}
                        variant={"ghost"}
                        size="sm"
                        className={clsx("h-7 flex-1 rounded-lg tracking-widest font-mono hover:bg-white", active ? "bg-white outline outline-0 shadow-md outline-slate-300" : "text-slate-400 hover:bg-muted")}
                    >
                        {size.label}
                    </Button>
                )
            })}
        </div>
    </div>
)