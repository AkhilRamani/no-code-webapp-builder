import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "./ui/label"
import { Button } from "./ui/button"
import { LayoutGrid, Lock, LockKeyhole, Plus, Shield, ShieldCheck } from "lucide-react"
import { usePageStore } from "@/lib/store/usePageStore"
import { CreatePageDrawer } from "./page/createPageDrawer"
import { useEditorPageChange } from "@/lib/hooks/useEditorPageChange.hook"

export const CanvasToolbar = () => {
    const { toggleShowList, pages, currentPage } = usePageStore(({ toggleShowList, pages, currentPage }) => ({ toggleShowList, pages, currentPage }));
    const { savePrevAndChange } = useEditorPageChange()

    return (
        <div className="flex w-full max-w-[1000px] p-2 rounded-xl bg-gray-200/75 justify-between hover:bg-sky-400/20-">
            <div className="flex items-center gap-1.5 ml-1.5">
                <Label className="text-xs font-semibold tracking-wide opacity-65 mr-1">Page</Label>
                {currentPage ? <Select value={currentPage.id} onValueChange={savePrevAndChange}>
                    <SelectTrigger className="min-w-[140px] text-xs font-semibold tracking-wide opacity-65 h-7 rounded-lg bg-white !outline-none !ring-offset-0 hover:opacity-100 hover:ring-2- !ring-blue-400 duration-100">
                        <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="rounded-xl" >
                        {pages.map((page) => (
                            <SelectItem key={page.id} value={page.id} className="text-xs font-semibold tracking-wide opacity-65 rounded-lg">{page.name}</SelectItem>
                        ))}
                    </SelectContent>
                </Select>
                    : <div className="h-7 rounded-lg bg-white/70 w-[140px] animate-pulse duration-1000" />
                }

                {currentPage?.isPrivate && <div className="flex items-center gap-1.5 ml-2 h-6 px-2.5 bg-white/60 rounded-full">
                    <LockKeyhole className="w-3.5 h-3.5 opacity-50" />
                    <p className="text-xs pt-[1px] font-semibold- tracking-wide opacity-50 text-nowrap">Private page</p>
                </div>}
            </div>

            <div className="flex items-center gap-1.5">
                <Button size="icon" variant="ghost" className="rounded-lg hover:bg-gray-300/70 h-7 w-7 group" onClick={toggleShowList}>
                    <LayoutGrid className="w-4 h-4 opacity-50 fill-primary group-hover:opacity-70 stroke-[0.8]" />
                </Button>
                <CreatePageDrawer>
                    <Button size="sm" variant="outline" className="rounded-lg hover:bg-white h-fit py-1.5 gap-1.5 text-xs font-semibold tracking-wide opacity-50 hover:opacity-100 duration-100 transition-opacity">
                        <Plus className="w-3.5 h-3.5 -ml-0.5 opacity-80 group-hover:opacity-70 stroke-[4]" />
                        New
                    </Button>
                </CreatePageDrawer>
            </div>
        </div>
    )
}