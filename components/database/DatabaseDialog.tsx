import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Database } from "lucide-react"
import { DatabaseLayout } from "./DatabaseLayout"

export const DatabaseDialog = () => {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button size='sm' variant='secondary' className="rounded-lg gap-2 text-muted-foreground hover:bg-slate-200 [&>svg]:hover:opacity-90 hover:text-primary">
                    <Database className="h-[1.1rem] w-[1.1rem] text-secondary fill-primary opacity-65" />
                    {/* Database */}
                </Button>
            </DialogTrigger>
            <DialogContent className="min-w-max h-5/6">
                <div className="flex flex-col min-w-[70vw] h-full">
                    <DialogHeader className="-mx-6 px-6 pb-5 border-b">
                        <DialogTitle>Database</DialogTitle>
                        <DialogDescription>
                            Create tables for your application as you need
                        </DialogDescription>
                    </DialogHeader>
                    <div className="pt-6 pb-4 flex-1">
                        <DatabaseLayout />
                    </div>
                    <DialogFooter className="self-end">
                        <Button type="submit">Save changes</Button>
                    </DialogFooter>

                </div>
            </DialogContent>
        </Dialog>
    )
}
