import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { UserAvatarSizeSetting } from "./setting/UserAvatarSizeSetting"
import { UserAvatarClassNames, UserAvatarProps } from "./types";
import { useNode } from "@craftjs/core";

export const UserAvatarSettings = () => {
    const {
        actions: { setProp },
        classNames
    } = useNode<UserAvatarProps>((node) => ({
        fontSize: node.data.props.fontSize,
        classNames: node.data.props.classNames
    }));

    const setClassName = <T extends keyof UserAvatarClassNames>(name: T, value: UserAvatarClassNames[T]) => setProp((props: UserAvatarProps) => (props.classNames = { ...props.classNames, [name]: value }));

    return (
        <div className="mt-2">
            <Tabs className="-my-2 p-4" defaultValue="style">
                <TabsList className="w-full  rounded-lg">
                    <TabsTrigger className="flex-1 h-full data-[state=active]:shadow-md rounded-lg" value="style" >
                        {/* <Brush className="h-5 w-5 mr-2" /> */}
                        Styles
                    </TabsTrigger>

                    <TabsTrigger className="flex-1 h-full data-[state=active]:shadow-md rounded-lg" value="setting">
                        {/* <Settings className="h-5 w-5 mr-2" /> */}
                        Settings
                    </TabsTrigger>
                </TabsList>
                <Separator className="my-4" />
                <TabsContent value="style" className="pt-2">

                    <UserAvatarSizeSetting selected={classNames?.size ?? '-'} onChange={value => setClassName('size', value)} />

                </TabsContent>
                <TabsContent value="setting">

                </TabsContent>
            </Tabs>
            <div className="px-4 pt-1">
            </div>
        </div>
    )
}