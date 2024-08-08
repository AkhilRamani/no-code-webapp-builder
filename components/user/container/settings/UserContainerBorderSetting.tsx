import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";

const presets = [
    { value: 'rounded-none', label: 'None' },
    { value: 'rounded-sm', label: 'SM' },
    { value: 'rounded', label: 'Normal' },
    { value: 'rounded-md', label: 'MD' },
    { value: 'rounded-lg', label: 'LG' },
    { value: 'rounded-xl', label: 'XL' },
    { value: 'rounded-2xl', label: '2XL' },
    { value: 'rounded-3xl', label: '3XL' },
    { value: 'rounded-full', label: 'Full' },
] as const;

export type UserContainerBorderSettingProp = {
    enabled: boolean,
    onChange(tailwindBorder?: 'border'): void,
    radius: typeof presets[number]['value'],
    onRadiusChange(tailwindRounded?: typeof presets[number]['value']): void
}

export const UserContainerBorderSetting = ({ enabled, onChange, radius, onRadiusChange }: UserContainerBorderSettingProp) => (
    <div className="border-b pb-6">
        <div className="flex justify-between gap-4 items-center">
            <Label>Border</Label>
            <Switch checked={enabled} onCheckedChange={(checked) => onChange(checked ? 'border' : undefined)} />
        </div>
        <div className="mt-4 rounded flex justify-between items-center">
            <Label>Roundness</Label>
            <Select value={radius} onValueChange={onRadiusChange as (value: string) => void}>
                <SelectTrigger className="font-semibold w-32">
                    <SelectValue />
                </SelectTrigger>
                <SelectContent>
                    {presets.map(size => (
                        <SelectItem key={size.value} value={size.value} className="font-semibold text-muted-foreground">
                            {size.label}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>
        </div>
    </div >
)