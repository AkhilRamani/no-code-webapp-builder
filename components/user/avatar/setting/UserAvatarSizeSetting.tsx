import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

const presets = [
    { value: 'h-7 w-7', label: 'Tiny' },
    { value: '-', label: 'Small' },
    { value: 'h-14 w-14', label: 'Medium' },
    { value: 'h-20 w-20', label: 'Large' },
    { value: 'h-28 w-28', label: 'X Large' },
    { value: 'h-36 w-36', label: 'Big' },
    { value: 'h-56 w-56', label: 'Huge' },
] as const;

export type UserAvatarSettingSizes = typeof presets[number]['value'];

type UserAvatarSizeSettingProps = {
    selected?: UserAvatarSettingSizes;
    onChange: (tailwindHW: UserAvatarSettingSizes | undefined) => void;
}

// add deselect functionality
export const UserAvatarSizeSetting = ({ selected, onChange }: UserAvatarSizeSettingProps) => (
    <div className="border-b pb-6">
        <div className="flex items-center justify-between h-">

            <Label>Size</Label>

            <Select value={selected} onValueChange={(value: UserAvatarSettingSizes) => onChange(value === '-' ? undefined : value)}>
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