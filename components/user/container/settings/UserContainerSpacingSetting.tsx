import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import clsx from "clsx";

const spaceOutPresets = [
    { value: 'm-0', label: '0' },
    { value: 'm-2', label: '2' },
    { value: 'm-4', label: '4' },
    { value: 'm-6', label: '6' },
    { value: 'm-8', label: '8' },
    { value: 'm-10', label: '10' },
] as const

const spaceInPresets = [
    { value: 'p-0', label: '0' },
    { value: 'p-2', label: '2' },
    { value: 'p-4', label: '4' },
    { value: 'p-6', label: '6' },
    { value: 'p-8', label: '8' },
    { value: 'p-10', label: '10' },
] as const

export type UserContainerSpacingSettingProps = {
    spaceIn?: typeof spaceInPresets[number]['value'],
    spaceOut?: typeof spaceOutPresets[number]['value'],
    onSpaceInChange(size: typeof spaceInPresets[number]['value']): void;
    onSpaceOutChange(size: typeof spaceOutPresets[number]['value']): void;
}

export const UserContainerSpacingSetting = ({ spaceIn, spaceOut, onSpaceInChange, onSpaceOutChange }: UserContainerSpacingSettingProps) => (
    <div className="border-b pb-6">
        <Label>Spacing</Label>

        <div className="ml-4 mt-4">
            <Label className="text-muted-foreground">Inside</Label>
            <div className="flex flex-wrap gap-2 mt-3 bg-secondary p-1 rounded-lg">
                {spaceInPresets.map((space, index) => {
                    const active = spaceIn === space.value;
                    return (
                        <Button
                            key={`${index}-csi`}
                            onClick={() => onSpaceInChange(space.value)}
                            variant={"ghost"}
                            size="sm"
                            className={clsx("h-7 flex-1 w-2 rounded-lg tracking-widest font-mono hover:bg-white", active ? "bg-white outline outline-0 shadow-md outline-slate-300" : "text-slate-400 hover:bg-muted")}
                        >
                            {space.label}
                        </Button>
                    )
                })}
            </div>
        </div>

        <div className="ml-4 mt-4">
            <Label className="text-muted-foreground">Outside</Label>
            <div className="flex flex-wrap gap-2 mt-3 bg-secondary p-1 rounded-lg">
                {spaceOutPresets.map((space, index) => {
                    const active = spaceOut === space.value;
                    return (
                        <Button
                            key={`${index}-cso`}
                            onClick={() => onSpaceOutChange(space.value)}
                            variant={"ghost"}
                            size="sm"
                            className={clsx("h-7 flex-1 w-7 rounded-lg tracking-widest font-mono hover:bg-white", active ? "bg-white outline outline-0 shadow-md outline-slate-300" : "text-slate-400 hover:bg-muted")}
                        >
                            {space.label}
                        </Button>
                    )
                })}
            </div>
        </div>
    </div>
)