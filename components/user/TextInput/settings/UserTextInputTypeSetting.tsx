import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
const presets = [
    { value: 'text', label: 'Text' },
    { value: 'email', label: 'Email' },
    { value: 'password', label: 'Password' },
    { value: 'number', label: 'Number' },
] as const

export type UserTextInputTypeSettingProps = {
    selected: typeof presets[number]['value'],
    onChange: (value: typeof presets[number]['value']) => void
}

export const UserTextInputTypeSetting = ({ selected, onChange }: UserTextInputTypeSettingProps) => {
    return <div className="mb-2 flex items-center justify-between">
        <Label>Type</Label>
        <div className="ml-4 mt-4">
            <Select value={selected} onValueChange={onChange}>
                <SelectTrigger className="w-32 font-semibold rounded-lg">
                    <SelectValue />
                </SelectTrigger>
                <SelectContent className="rounded-lg">
                    {presets.map(type => (
                        <SelectItem key={type.value} value={type.value} className="font-semibold text-muted-foreground">
                            {type.label}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>
        </div>
    </div>
}