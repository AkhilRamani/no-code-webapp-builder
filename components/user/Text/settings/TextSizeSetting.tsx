import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import clsx from "clsx"
import { Label } from "@/components/ui/label"

const presets = [
    { value: "text-sm", label: "SM" },
    { value: "text-base", label: "MD" },
    { value: "text-lg", label: "L" },
    { value: "text-xl", label: "XL" }
] as const

const allSizes = [
    { value: "text-xs", label: "Extra Small (12px)" },
    { value: "text-sm", label: "Small (14px)" },
    { value: "text-base", label: "Medium (16px)" },
    { value: "text-lg", label: "L (18px)" },
    { value: "text-xl", label: "XL (20px)" },
    { value: "text-2xl", label: "2XL (24px)" },
    { value: "text-3xl", label: "3XL (30px)" },
    { value: "text-4xl", label: "4XL (36px)" },
    { value: "text-5xl", label: "5XL (48px)" },
    { value: "text-6xl", label: "6XL (60px)" },
    { value: "text-7xl", label: "7XL (72px)" },
    { value: "text-8xl", label: "8XL (96px)" },
    { value: "text-9xl", label: "9XL (128px)" }
] as const

export type TextSizeSettingProps = {
    selected: typeof allSizes[number]['value'];
    onChange: (tailwindSize: typeof allSizes[number]['value']) => void;
}

export const TextSizeSetting = ({ selected, onChange }: TextSizeSettingProps) => {
    return (
        <div className="space-y-2 border-b pb-6">
            <Label>Size</Label>
            <div className="ml-4">
                <div className="flex flex-wrap gap-2 !mt-3 mb-3 bg-secondary p-1 rounded-lg">
                    {presets.map((size, index) => {
                        const active = selected === size.value;
                        return (
                            <Button
                                key={`${index}-ts`}
                                onClick={() => onChange(size.value)}
                                // variant={active ? "default" : "ghost"}
                                variant={"ghost"}
                                size="sm"
                                className={clsx("h-7 flex-1 rounded-lg tracking-widest font-mono hover:bg-white", active ? "bg-white outline outline-0 shadow-md outline-slate-300" : "text-slate-400 hover:bg-muted")}
                            >
                                {size.label}
                            </Button>
                        )
                    })}
                </div>
                <Select value={selected} onValueChange={onChange}>
                    <SelectTrigger className="font-semibold">
                        <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                        {allSizes.map(size => (
                            <SelectItem key={size.value} value={size.value} className="font-semibold text-muted-foreground">
                                {size.label}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>
        </div >
    )
}