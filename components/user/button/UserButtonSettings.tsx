import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { UserButtonVarientSetting, UserButtonVarientSettingProps } from "./settings/UserButtonVarientSetting"
import { useNode } from "@craftjs/core";
import { UserButtonProps } from "./types";
import { UserButtonSizeSetting, UserButtonSizeSettingProps } from "./settings/UserButtonSizeSetting";
import { UserButtonLabelSetting } from "./settings/UserButtonLabelSetting";

export const UserButtonSettings = () => {
    const {
        actions: { setProp },
        varient,
        size,
        label,
        icon
    } = useNode<UserButtonProps>((node) => ({
        varient: node.data.props.varient,
        size: node.data.props.size,
        label: node.data.props.label,
        icon: node.data.props.icon,
        // classNames: node.data.props.classNames as UserTextClassNames,
    }));

    // FIXME: types - any
    const setButtonProp = (name: keyof UserButtonProps, value: any) => setProp((props: UserButtonProps) => (props[name] = value), 500);

    return (
        <div>
            <Tabs className="p-4" defaultValue="style">
                <TabsList className="w-full  rounded-lg">
                    <TabsTrigger className="flex-1 h-full data-[state=active]:shadow-md rounded-lg" value="style" >
                        Styles
                    </TabsTrigger>
                    <TabsTrigger className="flex-1 h-full data-[state=active]:shadow-md rounded-lg" value="setting">
                        Settings
                    </TabsTrigger>
                </TabsList>
                <Separator className="my-6" />
                <TabsContent value="style" className="grid gap-6">

                    <UserButtonLabelSetting
                        label={label}
                        icon={icon}
                        onLabelChange={(value) => setButtonProp('label', value)}
                        onIconChange={icon => setButtonProp('icon', icon)}
                    />

                    <UserButtonVarientSetting selected={varient ?? 'default'} onChange={selectedValue => setButtonProp('varient', selectedValue)} />
                    <UserButtonSizeSetting selected={size ?? 'default'} onChange={size => setButtonProp('size', size)} />
                </TabsContent>
                <TabsContent value="setting">

                </TabsContent>
            </Tabs>
        </div>
    )
}