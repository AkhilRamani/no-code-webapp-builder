import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const presets = [
    { value: 'default', label: 'Default' },
    { value: 'secondary', label: 'Secondary' },
    { value: 'destructive', label: 'Danger' },
    { value: 'outline', label: 'Outline' },
    { value: 'ghost', label: 'Ghost' },
    { value: 'link', label: 'Link' },
] as const

export type UserButtonVarientSettingProps = {
    selected?: typeof presets[number]['value'];
    onChange: (tailwindSize: typeof presets[number]['value']) => void;
}

export const UserButtonVarientSetting = ({ selected, onChange }: UserButtonVarientSettingProps) => (
    <div className="border-b pb-6">
        <div className="flex items-center justify-between">

            <Label>Varient</Label>

            <Select value={selected} onValueChange={onChange}>
                <SelectTrigger className="w-36 font-semibold rounded-lg">
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