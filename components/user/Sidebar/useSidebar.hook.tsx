import { useState } from "react"

export type UserSidebarMenuItem = typeof defaultSidebarMenus[1]

export const defaultSidebarMenus = [
    {
        id: 1,
        name: 'Dashboard',
        icon: 'House'
    },
    {
        id: 2,
        name: 'Orders',
        icon: 'ShoppingCart',
        badgeText: 5
    },
    {
        id: 3,
        name: 'Products',
        icon: 'Package'
    },
    {
        id: 4,
        name: 'Customers',
        icon: 'Users'
    },
]

export const useSidebar = () => {
    const [menus, setMenus] = useState(defaultSidebarMenus)

    const addMenu = (name: string) => {
        setMenus(prevState => ([...menus, {
            id: prevState.length + 1,
            name,
            icon: 'Package'
        }]))
    }

    return {
        menus,
        addMenu
    }

}