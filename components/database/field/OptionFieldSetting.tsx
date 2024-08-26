import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { OptionFieldSettingType } from "@/lib/store/useTableStore"
import { Trash2 } from "lucide-react";
import ContentEditable from "react-contenteditable"

interface OptionFieldSettingProps {
    setting: OptionFieldSettingType;
    onOptionAdd: (optionName: string) => void;
    onOptionEdit: (optionIndex: number, optionName: string) => void;
    onOptionDelete: (optionIndex: number) => void;
}

export const OptionFieldSetting = ({ setting, onOptionAdd, onOptionEdit, onOptionDelete }: OptionFieldSettingProps) => {
    return (
        <div className="grid gap-6">
            <div className="flex gap-4 text-nowrap relative">
                <Label className="text-muted-foreground min-w-[30%] mt-2.5">Options</Label>
                <div className="flex flex-col flex-1 gap-2 max-w-48">
                    {
                        setting.options?.map((option, index) => (
                            <div key={`${index}_dtf-o`} className="flex bg-slate-200/50 rounded-lg relative [&>button]:hover:visible">
                                <ContentEditable
                                    html={option}
                                    onChange={(e) => onOptionEdit(index, e.target.value)}
                                    tagName="p"
                                    className='py-2 px-4 flex-1 rounded-lg outline-black text-slate-800 text-[0.82rem]'
                                />
                                <Button variant='ghost' onClick={() => onOptionDelete(index)} className="invisible absolute right-0 rounded-md h-7 w-7 p-0 mt-1 mr-1 hover:bg-destructive hover:text-white">
                                    <Trash2 className="w-3 h-3" />
                                </Button>
                            </div>
                        ))
                    }
                    <Button
                        size='sm'
                        variant='secondary'
                        className="rounded-lg bg-slate-200/70 hover:bg-slate-200"
                        onClick={() => onOptionAdd(`Option ${setting.options.length + 1}`)}>
                        Add
                    </Button>
                </div>
            </div>
        </div>
    )
}