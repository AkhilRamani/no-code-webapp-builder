import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export type UserTxtInptLabelSettingProps = {
    label?: string,
    onLabelChange(label?: string): void
}

export const UserTxtInptLabelSetting = ({ label, onLabelChange }: UserTxtInptLabelSettingProps) => {
    return <div className="flex justify-between items-center">
        <Label>Label</Label>
        <Input className="w-[60%]" value={label} onChange={e => onLabelChange(e.target.value)} />
    </div>
}