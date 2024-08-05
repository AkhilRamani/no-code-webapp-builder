import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import { SidebarMenuDialog } from "./SidebarMenuDialog"
import { IconsLucide } from "@/components/common/IconsLucide"
import { MouseEventHandler, useState } from "react"
import { UserSidebarMenuItem } from "../useSidebar.hook"
import { UserSidebarProps } from "../Sidebar"
import { useNode } from "@craftjs/core"
import { Label } from "@/components/ui/label"

const SidebarMenuItem = ({ name, icon, onClick }: { name: string, icon: string, onClick: MouseEventHandler }) => {
    return (
        <Button variant="outline" onClick={onClick} className="flex justify-start gap-3 rounded-lg text-muted-foreground hover:text-primary active:bg-slate-200">
            <IconsLucide name={icon} className="h-4 w-4" />
            {name}
        </Button>
    )
}

export const SidebarMenus = () => {
    const { actions: { setProp }, menus } = useNode(node => ({
        menus: node.data.props.menus as UserSidebarMenuItem[]
    }))

    // selected menu's index will be set here. null will be set when no menu selected making dialog closed
    const [menuDialog, setMenuDialog] = useState<number | null>(null)

    const handleDialogOpenChange = (isOpen: boolean) => {
        if (!isOpen) {
            setMenuDialog(null);
        }
    };

    const onAddMenuClick = () => {
        setProp((props: UserSidebarProps) => {
            props.menus = [
                ...props.menus,
                {
                    id: props.menus.length + 1,
                    name: 'New menu',
                    icon: 'Box'
                }
            ];
        }, 500)
    }

    const onEditMenuSubmit = (editedMenu: UserSidebarMenuItem) => {
        setProp((props: UserSidebarProps) => {
            props.menus = props.menus.map(menu =>
                menu.id === editedMenu.id
                    ? { ...menu, ...editedMenu }
                    : menu
            );
        }, 500)
        setMenuDialog(null);
    }

    const onDeleteMenu = (menuId: number) => {
        setProp((props: UserSidebarProps) => {
            props.menus = props.menus.filter(menu => menu.id !== menuId);
        }, 500);
        setMenuDialog(null);
    };

    return (
        <Accordion type="single" collapsible>
            <AccordionItem value="menus" className="pb-2" >
                <AccordionTrigger className="hover:no-underline"><Label>Menus</Label></AccordionTrigger>
                <AccordionContent>
                    <div className="grid gap-2 mt-3 ml-4 rounded-lg ">
                        {menus.map(({ id, name, icon }, index) => (
                            <SidebarMenuItem
                                key={`${id}-sbsm`}
                                name={name}
                                icon={icon}
                                onClick={() => setMenuDialog(index)}
                            />
                        ))}

                        <Button variant="secondary" className="h-7" onClick={onAddMenuClick}>
                            <Plus className="h-4 w-4" />
                        </Button>

                        <SidebarMenuDialog
                            open={menuDialog !== null}
                            data={menuDialog ? menus[menuDialog] : null}
                            onOpenChange={handleDialogOpenChange}
                            onSubmit={onEditMenuSubmit}
                            onDelete={onDeleteMenu}
                        />
                    </div>
                </AccordionContent>
            </AccordionItem>
        </Accordion>
    )
}