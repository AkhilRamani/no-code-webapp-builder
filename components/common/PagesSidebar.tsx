'use client'

import { LogOut, User } from "lucide-react"
import { Avatar, AvatarFallback } from "../ui/avatar"
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "../ui/dropdown-menu"
import { signOut } from "next-auth/react"
import { Button } from "../ui/button"

export const PagesSidebar = () => {
    const handleLogout = () => {
        signOut({ callbackUrl: '/' })
    }

    return (
        <div className="w-1/5 bg-white border-r flex flex-col">
            <div className="py-5 border-b px-6">
                <h1 className="text-xl font-semibold tracking-normal">Portals</h1>
            </div>
            <div className="flex flex-1 p-3 flex-col justify-between">
                <div></div>

                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant='ghost' className="px-3 h-14 justify-start hover:bg-slate-100 rounded-lg flex items-center gap-3">
                            <Avatar>
                                <AvatarFallback className="bg-slate-200">AK</AvatarFallback>
                            </Avatar>
                            Akhil Ramani
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