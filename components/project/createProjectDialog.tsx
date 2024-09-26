import { useState } from "react"
import { Button } from "../ui/button"
import { Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog"
import { Input } from "../ui/input"
import { Label } from "../ui/label"
import { useProjectStore } from "@/lib/store/useProjectStore"
import { Loader2 } from "lucide-react"
import { toast } from "sonner"
import { useRouter } from 'nextjs-toploader/app';

export const CreateProjectDialog = ({ trigger }: { trigger: React.ReactNode }) => {
    const [isDialogOpen, setIsDialogOpen] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [projectName, setProjectName] = useState("")
    const createProject = useProjectStore(store => store.createProject)
    const router = useRouter();

    const onSubmit = async () => {
        const name = projectName.trim()
        if (!name) {
            toast.error("Please enter a project name")
            return
        }
        setIsLoading(true)
        const projectId = await createProject(name)
        if (projectId) {
            router.push(`/builder/${projectId}`)
        }
        setIsLoading(false)
        setIsDialogOpen(false)

    }

    return (
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
                {trigger}
            </DialogTrigger>
            <DialogContent className="!rounded-2xl p-0 gap-0 flex flex-col">
                <DialogHeader className="px-5 py-5 border-b shadow-sm flex flex-row items-center justify-between">
                    <DialogTitle>Create Project</DialogTitle>
                </DialogHeader>
                <div className="px-5 py-5 bg-gradient-to-t from-slate-50 to-transparent">
                    <Label>Portal Name</Label>
                    <Input className="rounded-lg mt-2 mb-2" placeholder="Ex. Resource management" value={projectName} onChange={(e) => setProjectName(e.target.value)} />
                </div>
                <DialogFooter className="px-5 py-5 border-t shadow-sm flex flex-row items-center justify-end gap-2">
                    <DialogClose asChild>
                        <Button variant='destructive' className="w-24 rounded-lg shadow font-semibold tracking-wide">Cancel</Button>
                    </DialogClose>
                    <Button className="w-24 rounded-lg shadow font-semibold tracking-wide" disabled={isLoading} onClick={onSubmit}>
                        {isLoading ? <Loader2 className="h-5 w-5 animate-spin" /> : 'Create'}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}