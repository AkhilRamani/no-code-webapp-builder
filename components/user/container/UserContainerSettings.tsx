import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useNode } from "@craftjs/core";
import { UserContainerClassNames, UserContainerProps } from "./types";
import { UserContainerSpacingSetting } from "./settings/UserContainerSpacingSetting";
import { UserContainerGapSetting } from "./settings/UserContainerGapSetting";
import { MoveHorizontal, MoveVertical } from "lucide-react";
import { UserContainerBorderSetting } from "./settings/UserContainerBorderSetting";
import { UserContainerShadowSetting } from "./settings/UserContainerShadowSetting";
import { UserContainerAlignSetting } from "./settings/UserContainerAlignSetting";

export type UserContainerSettingsProps = {
    classNames?: UserContainerClassNames;
}

export const UserContainerSettings = () => {
    const {
        actions: { setProp },
        classNames,
    } = useNode<UserContainerProps>((node) => ({
        classNames: node.data.props.classNames,
    }));

    const setClassName = (name: keyof UserContainerClassNames, value: string | undefined) => setProp((props: UserContainerProps) => (props.classNames = { ...props.classNames, [name]: value }), 500);

    return (
        <div className="px-4 pt-6 grid gap-6">
            <div className="border-b pb-6">
                <Label>Type</Label>
                <Tabs className="mt-2 bg-slate-100 rounded-lg font-mono" defaultValue={classNames?.display ?? 'block'} onValueChange={(value) => {
                    setClassName('display', value)
                    setClassName('direction', undefined)
                }}>
                    <TabsList className="w-full rounded-lg">
                        <TabsTrigger className="flex-1 rounded-lg" value="block">
                            Default
                        </TabsTrigger>
                        <TabsTrigger className="flex-1 rounded-lg" value="flex">
                            Stack
                        </TabsTrigger>
                    </TabsList>
                    <TabsContent value="block"></TabsContent>
                    <TabsContent value="flex" className="px-1 pb-1">
                        <Tabs defaultValue={classNames?.direction} value={classNames?.direction ?? 'flex-row'} onValueChange={(value) => {
                            setClassName('direction', value)
                            setClassName('alignment', undefined)
                        }}>
                            {/* {console.log(classNames?.direction ?? 'flex-row')} */}
                            <TabsList className="w-full">
                                <TabsTrigger className="flex-1 rounded-lg" value="flex-row">
                                    <MoveHorizontal className="w-4 h-4" />
                                </TabsTrigger>
                                <TabsTrigger className="flex-1 rounded-lg" value="flex-col">
                                    <MoveVertical className="w-4 h-4" />
                                </TabsTrigger>
                            </TabsList>
                        </Tabs>
                    </TabsContent>
                </Tabs>
            </div>

            {classNames?.display === 'flex' &&
                <UserContainerAlignSetting
                    flexDirection={classNames?.direction}
                    selected={classNames?.alignment}
                    onChange={value => setClassName('alignment', value)}
                />
            }

            <UserContainerSpacingSetting
                spaceIn={classNames?.padding ?? 'p-0'}
                spaceOut={classNames?.margin ?? 'm-0'}
                onSpaceInChange={value => setClassName('padding', value)}
                onSpaceOutChange={value => setClassName('margin', value)}
            />

            <UserContainerGapSetting selected={classNames?.gap ?? 'gap-0'} onChange={value => setClassName('gap', value)} />

            <UserContainerBorderSetting
                enabled={!!classNames?.border}
                onChange={value => setClassName('border', value)}
                radius={classNames?.radius ?? 'rounded-lg'}
                onRadiusChange={(value) => setClassName('radius', value)}
            />

            <UserContainerShadowSetting selected={classNames?.shadow} onChange={(value) => setClassName('shadow', value)} />
        </div>
    );
};