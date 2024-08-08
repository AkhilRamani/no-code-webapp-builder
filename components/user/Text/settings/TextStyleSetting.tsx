import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const presets = [
    { value: "font-thin", label: "100" },
    { value: "font-extralight", label: "200" },
    { value: "font-light", label: "300" },
    { value: "font-normal", label: "Default" },
    { value: "font-medium", label: "500" },
    { value: "font-semibold", label: "600" },
    { value: "font-bold", label: "700" },
    { value: "font-extrabold", label: "800" },
    { value: "font-black", label: "900" }
] as const

export type TextThicknessSettingProps = {
    selected: typeof presets[number]['value'];
    onChange: (tailwindSize: typeof presets[number]['value']) => void;
}

export const TextThicknessSetting = ({ selected, onChange }: TextThicknessSettingProps) => (
    <div className="border-b pb-6">
        <div className="flex items-center justify-between">

            <Label>Thickness</Label>

            <Select value={selected} onValueChange={onChange}>
                <SelectTrigger className="w-32 font-semibold rounded-lg">
                    <SelectValue />
                </SelectTrigger>
                <SelectContent className="rounded-lg">
                    {presets.map(size => (
                        <SelectItem key={size.value} value={size.value} className="font-semibold text-muted-foreground">
                            {size.label}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>
        </div>
    </div>
)