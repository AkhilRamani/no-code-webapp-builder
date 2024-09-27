'use client'

import { LogOut, User } from "lucide-react"
import { Avatar, AvatarFallback } from "../ui/avatar"
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "../ui/dropdown-menu"
import { signOut, useSession } from "next-auth/react"
import { Button } from "../ui/button"
import { getAvatarInitials, titleCase } from "@/lib/utils"

export const PagesSidebar = () => {
    const { data: session } = useSession()
    const firstName = session?.user?.firstName ?? '';
    const lastName = session?.user?.lastName ?? '';

    const handleLogout = () => {
        signOut({ callbackUrl: '/signin' })
    }

    return (
        <div className="w-72 bg-white border-r flex flex-col shrink-0">
            <div className="py-5 border-b px-6 flex items-center gap-1">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="mr-2 h-6 w-6"
                >
                    <path d="M15 6v12a3 3 0 1 0 3-3H6a3 3 0 1 0 3 3V6a3 3 0 1 0-3 3h12a3 3 0 1 0-3-3" />
                </svg>
                <h1 className="text-lg font-medium">Portals</h1>
            </div>
            <div className="flex flex-1 p-3 flex-col justify-between">
                <div></div>

                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant='ghost' className="px-3 h-14 justify-start hover:bg-slate-100 rounded-lg flex items-center gap-3">
                            <Avatar>
                                <AvatarFallback className="bg-slate-200">
                                    {getAvatarInitials(firstName, lastName)}
                                </AvatarFallback>
                            </Avatar>
                            {titleCase(firstName)} {titleCase(lastName)}
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-56 mr-4 rounded-xl ml-4" align="end" side="right">
                        <DropdownMenuLabel className="px-3">My Account</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuGroup>
                            <DropdownMenuItem className="py-2 px-3 rounded-lg">
                                <User className="mr-2 h-4 w-4" />
                                <span>Account</span>
                            </DropdownMenuItem>
                            <DropdownMenuItem className="py-2 px-3 rounded-lg" onClick={handleLogout}>
                                <LogOut className="mr-2 h-4 w-4" />
                                <span>Log out</span>
                            </DropdownMenuItem>
                        </DropdownMenuGroup>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </div>
    )
}