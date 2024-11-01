import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export type UserTextInputPlaceholderSettingProps = {
    placeholder?: string;
    onPlaceholderChange(placeholder?: string): void;
}

export const UserTextInputPlaceholderSetting = ({ placeholder, onPlaceholderChange }: UserTextInputPlaceholderSettingProps) => {
    return (
        <div className="flex justify-between items-center">
            <Label>Placeholder</Label>
            {/* <div className="ml-4 mt-3"> */}
            <Input className="w-[60%]" value={placeholder} onChange={e => onPlaceholderChange(e.target.value)} />
            {/* </div> */}
        </div>
    )
}