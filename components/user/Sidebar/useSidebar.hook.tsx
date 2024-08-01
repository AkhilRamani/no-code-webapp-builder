import { useEditorStore, useNode } from "@craftjs/core"
import { Home, icons, Package, ShoppingCart, Users } from "lucide-react"
import { useState } from "react"
import { UserSidebarProps } from "./Sidebar"

export type UserSidebarMenuItem = typeof defaultSidebarMenus[1]

export const defaultSidebarMenus = [
    {
        id: 1,
        name: 'Dashboard',
        icon: <Home className="h-4 w-4" />
    },
    {
        id: 2,
        name: 'Orders',
        icon: <ShoppingCart className="h-4 w-4" />,
        badgeText: 5
    },
    {
        id: 3,
        name: 'Products',
        icon: <Package className="h-4 w-4" />
    },
    {
        id: 4,
        name: 'Customers',
        icon: <Users className="h-4 w-4" />
    },
]

export const useSidebar = () => {
    const [menus, setMenus] = useState(defaultSidebarMenus)

    const addMenu = (name: string) => {
        setMenus(prevState => ([...menus, {
            id: prevState.length + 1,
            name,
            icon: <Package className="h-4 w-4" />
        }]))
    }

    return {
        menus,
        addMenu
    }

}