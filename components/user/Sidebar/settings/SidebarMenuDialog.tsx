import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Check, Trash2 } from "lucide-react"
import { UserSidebarMenuItem } from "../useSidebar.hook"
import { IconsLucide } from "@/components/common/IconsLucide"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import IconPicker from "../IconPicker"
import { useEffect, useState } from "react"

type SidebarMenuDialogProps = {
    data: UserSidebarMenuItem | undefined,
    onOpenChange(open: boolean): void,
    open: boolean | undefined,
    onSubmit(menuData: UserSidebarMenuItem): void,
    onDelete: (id: number) => void
}

export const SidebarMenuDialog = ({ data, open, onOpenChange, onSubmit, onDelete }: SidebarMenuDialogProps) => {
    const [icon, setIcon] = useState<string | undefined>(undefined)
    const [name, setName] = useState<string | undefined>(undefined)

    useEffect(() => {
        if (data) {
            setIcon(data.icon)
            setName(data.name)
        }
    }, [data])

    const [iconPickerOpen, setIconPickerOpen] = useState(false)

    const onIconSelect = (iconName: string) => {
        setIconPickerOpen(false)
        setIcon(iconName)
    }

    const onSubmitClick = () => {
        onSubmit({
            id: data?.id,
            name,
            icon
        } as UserSidebarMenuItem)
        onOpenChange(false)

    }

    const handleDelete = () => {
        if (data) {
            onDelete(data.id);
            onOpenChange(false);
        }
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="!rounded-xl">
                <DialogHeader>
                    <DialogTitle>Edit menu</DialogTitle>
                    <DialogDescription>A menu item will appear on sidebar menus list</DialogDescription>
                </DialogHeader>
                <div className="flex gap-4  ">
                    <Popover modal open={iconPickerOpen} onOpenChange={setIconPickerOpen}>
                        <PopoverTrigger asChild>
                            <Button variant='outline'>
                                <IconsLucide name={icon} className="h-5 w-5" />
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent className="rounded-xl px-3 py-4">
                            <IconPicker onSelectIcon={onIconSelect} />
                        </PopoverContent>
                    </Popover>
                    <Input placeholder="Display name" required value={name} onChange={e => setName(e.target.value)} />
                </div>
                <DialogFooter >
                    <Button variant="destructive" onClick={handleDelete}>
                        <Trash2 className="h-5" />
                    </Button>
                    <Button type="submit" onClick={onSubmitClick} disabled={!name}>
                        <Check className="h-5 mx-4" />
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}