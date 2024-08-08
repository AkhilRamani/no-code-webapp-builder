import { Separator } from "@/components/ui/separator"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { TabsContent } from "@radix-ui/react-tabs"
import React from "react"
import { useNode } from "@craftjs/core"
import { SidebarMenus } from "./settings/SidebarMenus"

export const SidebarSettings = () => {
    const { actions: { setProp }, menus } = useNode(node => ({
        menus: node.data.props.menus
    }))

    return (
        <div className="mt-2">
            <Tabs className="-my-2 p-4" defaultValue="setting">
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
                    <SidebarMenus />
                </TabsContent>
            </Tabs>
            <div className="px-4 pt-1">
            </div>
        </div>
    )
}