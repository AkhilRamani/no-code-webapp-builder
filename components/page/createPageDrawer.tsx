import { Sheet, SheetContent, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Input } from "../ui/input"
import { Switch } from "../ui/switch"
import { Label } from "../ui/label"
import { Button } from "../ui/button"
import { CircleCheck, Loader2 } from "lucide-react"
import clsx from "clsx"
import { useState } from "react"
import { usePageStore } from "@/lib/store/usePageStore"
import { useParams } from "next/navigation"

const PageTemplateItem = ({ name, selected, onClick }: { name: string, selected?: boolean, onClick?: () => void }) => {
    return (
        <Button variant='outline' onClick={onClick} className={clsx("group relative flex gap-2 items-center justify-center h-28 border w-full rounded-xl shadow-sm duration-100 transition-all hover:bg-white ring-primary/80 hover:ring !ring-offset-2", selected && "ring")}>
            <span className={clsx("text-sm font-medium opacity-50 tracking-wide group-hover:opacity-100", selected && "!opacity-100")}>{name}</span>
            {selected && <CircleCheck className="absolute top-1 right-1 h-6 w-6 text-white fill-primary/80" />}
        </Button>
    )
}

const pageTemplatesMap = [
    {
        name: "None",
        value: "none"
    },
    {
        name: "Dashboard",
        value: "dashboard"
    },
    {
        name: "Login",
        value: "login"
    },
    {
        name: "Signup",
        value: "signup"
    },
    {
        name: "Visulisation",
        value: "visulisation"
    }
]

export const CreatePageDrawer = ({ children }: { children: React.ReactNode }) => {
    const { projectId } = useParams<{ projectId: string }>();
    const [selectedTemplate, setSelectedTemplate] = useState<string>("none");
    const [name, setName] = useState<string>("");
    const [isPrivate, setIsPrivate] = useState<boolean>(false);
    const [isSaving, setIsSaving] = useState<boolean>(false);
    const [isOpen, setIsOpen] = useState<boolean>(false);

    const createPage = usePageStore(store => store.createPage);

    const handleCreate = async () => {
        setIsSaving(true);
        const trimmedName = name.trim();
        if (trimmedName) {
            await createPage(trimmedName, projectId, isPrivate)
        }
        setIsSaving(false);
        setIsOpen(false);
    }

    return (
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
                {children}
            </SheetTrigger>
            <SheetContent className="p-0 flex flex-col gap-0">
                <SheetHeader className="border-b p-4">
                    <SheetTitle>Create new page</SheetTitle>
                </SheetHeader>
                <div className="p-4 pt-6 flex-1 bg-gradient-to-t from-slate-50 to-transparent">
                    <div className="flex gap-4 items-center">
                        <Label htmlFor="name" className="w-32 text-sm shrink-0 font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                            Page name
                        </Label>
                        <Input id="name" placeholder="Dashboard" value={name} onChange={(e) => setName(e.target.value)} />
                    </div>
                    <div className="flex items-center gap-4 mt-6">
                        <Label htmlFor="terms" className="w-32 text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                            Authenticated
                        </Label>
                        <Switch id="terms" checked={isPrivate} onCheckedChange={setIsPrivate} />
                    </div>

                    <div className="mt-8 border-t py-6">
                        <Label>Templates</Label>
                        <div className="grid grid-cols-2 gap-4 mt-4 ml-6">
                            {pageTemplatesMap.map((template, index) => (
                                <PageTemplateItem key={index} name={template.name} selected={template.value === selectedTemplate} onClick={() => setSelectedTemplate(template.value)} />
                            ))}
                        </div>
                    </div>
                </div>
                <SheetFooter className="border-t p-4">
                    <Button className="rounded-lg font-semibold tracking-wide shadow-sm w-24" onClick={handleCreate} disabled={isSaving}>
                        {isSaving ? <Loader2 className="animate-spin w-5 h-5 stroke-[2.5]" /> : "Create"}
                    </Button>
                </SheetFooter>
            </SheetContent>
        </Sheet>

    )
}