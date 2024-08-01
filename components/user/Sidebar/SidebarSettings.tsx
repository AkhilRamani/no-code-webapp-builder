import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { TabsContent } from "@radix-ui/react-tabs"
import { Brush, Package, PaintBucket, Plus } from "lucide-react"
import { defaultSidebarMenus, UserSidebarMenuItem } from "./useSidebar.hook"
import React, { useEffect, useState } from "react"
import { useEditor, useNode } from "@craftjs/core"
import { UserSidebarProps } from "./Sidebar"

const SidebarMenuItem = ({ name, icon }: { name: string, icon: React.JSX.Element }) => {
    return (
        <Button variant="outline" className="flex justify-start gap-3 rounded-lg text-muted-foreground hover:text-primary active:bg-slate-200">
            {icon}
            {name}
        </Button>
    )
}

export const SidebarSettings = () => {
    const { actions: { setProp }, menus } = useNode(node => ({
        menus: node.data.props.menus
    }))

    const [localMenus, setLocalMenus] = useState<UserSidebarMenuItem[]>(menus)


    const onAddMenuClick = () => {
        setProp((props: UserSidebarProps) => {
            const newMenus = [...props.menus, {
                id: props.menus.length + 1,
                name: 'test',
                icon: <Package className="h-4 w-4" />
            }];

            props.menus = newMenus;
            setLocalMenus(newMenus)
        })
    }

    return (
        <div className="">
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
                <TabsContent value="style">

                </TabsContent>
                <TabsContent value="setting">
                    <Label>Tabs</Label>
                    <div className="grid gap-2 mt-3 ml-4 rounded-lg ">
                        {localMenus.map(({ id, name, icon }) => <SidebarMenuItem key={`${id}-sbsm`} name={name} icon={icon} />)}

                        <Button variant="secondary" className="h-7" onClick={onAddMenuClick}>
                            <Plus className="h-4 w-4" />
                        </Button>
                    </div>
                </TabsContent>
            </Tabs>
            <div className="px-4 pt-1">
            </div>
        </div>
    )
}