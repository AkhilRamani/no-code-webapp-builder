import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useState } from "react"

export type UserContainerSizeSettingProps = {
    width?: number,
    height?: number,
    onWidthChange(width: number | undefined): void,
    onHeightChange(height: number | undefined): void
}

export const UserContainerSizeSetting = ({ width, height, onWidthChange, onHeightChange }: UserContainerSizeSettingProps) => {
    return <div className="border-b pb-6">
        <Label>Size</Label>

        <div className="mt-4 ml-4 flex text-center gap-4">
            <div className="flex justify-between items-center">
                <Label className="text-muted-foreground mr-2">Width</Label>
                <SizeInput value={width} onChange={onWidthChange} />
            </div>
            <div className="flex justify-between items-center">
                <Label className="text-muted-foreground mr-2">Height</Label>
                <SizeInput value={height} onChange={onHeightChange} />
            </div>
        </div>
    </div>
}

const SizeInput = ({ value, onChange }: { value: number | undefined, onChange: (value: number | undefined) => void }) => {
    const [localValue, setLocalValue] = useState<string | number | undefined>(value);

    const handleBlur = () => {
        const value = localValue === '' ? undefined : !isNaN(Number(localValue)) ? Number(localValue) : undefined;
        onChange(value);
        setLocalValue(value);
    }

    return <Input
        className="font-semibold text-center [&::-webkit-inner-spin-button]:appearance-none"
        value={localValue ?? 'Auto'}
        onChange={e => setLocalValue(e.target.value)}
        onBlur={handleBlur}
    />
}
