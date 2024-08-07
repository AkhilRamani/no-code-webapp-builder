import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import IconPicker from "../../Sidebar/IconPicker";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { IconsLucide } from "@/components/common/IconsLucide";
import { Button } from "@/components/ui/button";
import { XIcon } from "lucide-react";

export type UserButtonLabelSettingProps = {
    icon?: string,
    label?: string,
    onIconChange(icon: string | undefined): void,
    onLabelChange(label?: string): void
}

export const UserButtonLabelSetting = ({ icon, label, onIconChange, onLabelChange }: UserButtonLabelSettingProps) => (
    <div className="pb-6 border-b">
        <div className="flex justify-between items-center">
            <Label>Label</Label>
            <Input className="w-[40%]" value={label} onChange={e => onLabelChange(e.target.value)} />
        </div>
        <div className="flex justify-between items-center mt-3">
            <Label>Icon</Label>

            {/* <Popover modal open={iconPickerOpen} onOpenChange={setIconPickerOpen}> */}
            <Popover modal>
                <div className="flex items-center gap-2">
                    {icon && <Button size='icon' variant='destructive' className="rounded-full h-6 w-6" onClick={() => onIconChange(undefined)}>
                        <XIcon className="h-4 w-4" />
                    </Button>}
                    <PopoverTrigger asChild>
                        <Button variant='outline'>
                            <IconsLucide name={icon} className="h-5 w-5" />
                        </Button>
                    </PopoverTrigger>
                </div>
                <PopoverContent className="rounded-xl px-3 pb-3 mr-10">
                    <IconPicker onSelectIcon={onIconChange} />
                </PopoverContent>
            </Popover>
        </div>
    </div>
)