import { CornerTooltip } from "@/components/common/CornerTooltip";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { SwitchFieldSettingType } from "@/lib/store/useTableStore";

interface CommonFieldSettingProps {
    setting: SwitchFieldSettingType;
    onDiscriptionChange: (description: string) => void;
    onRequiredChange: (required: boolean) => void;
}

export const CommonFieldSetting = ({ setting, onDiscriptionChange, onRequiredChange }: CommonFieldSettingProps) => (
    <div className="grid gap-6">
        <div className="flex items-center gap-4 text-nowrap relative">
            <Label className="text-muted-foreground min-w-[30%] tracking-wide">Short description</Label>
            <Input value={setting?.description ?? ''} onChange={e => onDiscriptionChange(e.target.value)} className="rounded-lg" />

            <CornerTooltip tip="Discription will be displayed at forms" />
        </div>
        <div className="flex items-center gap-4 text-nowrap">
            <Label className="text-muted-foreground min-w-[30%] tracking-wide">Required</Label>
            <Switch checked={!!setting?.required} onCheckedChange={onRequiredChange}></Switch>
        </div>

        {/* future work: add default value */}
    </div>
)