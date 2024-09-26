import { EllipsisIcon, Settings, TextCursorInput, Trash2 } from "lucide-react"
import { Button } from "../ui/button"
import Link from "next/link"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../ui/dropdown-menu"

export const ProjectItem = ({ name, projectId, index, onDeleteAction }: { name: string, projectId: string, index: number, onDeleteAction: () => void }) => {
    return (
        <div className="relative group pb-2 animate-in duration-500 transition-all fade-in slide-in-from-bottom-2" style={{ animationDelay: `${index * 80}ms`, animationFillMode: 'backwards' }}>
            <Link href={`/builder/${projectId}`}>
                <div className="w-80 h-52 bg-white rounded-xl shadow-lg border hover:-translate-y-1 transition-transform duration-300 -group-hover:-translate-y-1">
                </div>
            </Link>

            <div className="flex justify-between items-center mt-4">
                <div className="flex flex-col ml-2 gap-0.5">
                    <h6 className="opacity-90 text-sm tracking-wide">{name}</h6>
                    <a className="opacity-60 text-xs hover:underline" href="_blank">employee.portals.app</a>
                </div>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button
                            size="icon"
                            variant="ghost"
                            className={`h-8 w-8 rounded-lg hover:bg-gray-200 data-[state=open]:bg-gray-200 z-10`}
                        >
                            <EllipsisIcon className="w-4 h-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" side="bottom" className="rounded-lg">
                        <DropdownMenuItem className=" tracking-wide cursor-pointer">
                            <Settings className="w-4 h-4 mr-2.5 " />
                            <span className="opacity-80">Settings</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem className="tracking-wide cursor-pointer" onClick={onDeleteAction}>
                            <Trash2 className="w-4 h-4 mr-2.5 " />
                            <span className="opacity-80">Delete</span>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </div>
    )
}

export const ProjectItemSkeleton = ({ index }: { index: number }) => (
    <div className="animate-pulse flex flex-col gap-4 duration-1000" style={{ animationDelay: `${index * 100}ms` }}>
        <div className="w-80 h-52 bg-gray-200/70 rounded-xl border" />
        <div className="h-6 bg-gray-200/70 rounded-full" />
    </div>
)