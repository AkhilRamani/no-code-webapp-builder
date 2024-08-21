import { CornerTooltip } from "@/components/common/CornerTooltip";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { TextFieldSettingType } from "@/lib/store/useTableStore";
import { TooltipProvider } from "@radix-ui/react-tooltip";

interface TextFieldSettingProps {
    setting: TextFieldSettingType;
    onDiscriptionChange: (description: string) => void;
    onRequiredChange: (required: boolean) => void;
    onPlaceholderChange: (text: string) => void
}

export const TextFieldSetting = ({ setting, onDiscriptionChange, onPlaceholderChange, onRequiredChange }: TextFieldSettingProps) => (
    <div className="grid gap-6">
        {/* <div className="flex items-center gap-4 text-nowrap relative">
                <Label className="text-muted-foreground min-w-[25%]">Short description</Label>
                <Input value={setting?.description ?? ''} onChange={e => onDiscriptionChange(e.target.value)} />

                <CornerTooltip tip="Discription will be displayed at forms" />
            </div>
            <div className="flex items-center gap-4 text-nowrap">
                <Label className="text-muted-foreground min-w-[25%]">Required</Label>
                <Switch checked={!!setting?.required} onCheckedChange={onRequiredChange}></Switch>
            </div> */}
        <div className="flex items-center gap-4 text-nowrap relative">
            <Label className="text-muted-foreground min-w-[25%]">Placeholder</Label>
            <Input value={setting?.placeholder ?? ''} onChange={(e) => onPlaceholderChange(e.target.value)} />
            <CornerTooltip tip="Placeholder text to display at forms' field" />
        </div>
    </div>
)