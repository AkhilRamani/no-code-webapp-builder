import { EllipsisIcon, X } from "lucide-react"
import { Button } from "./ui/button"
import { usePageStore } from "@/lib/store/usePageStore"
import clsx from "clsx"
import { useEditorPageChange } from "@/lib/hooks/useEditorPageChange.hook"

const PageItem = ({ index, name, onClick }: { index: number, name: string, onClick: () => void }) => {
    return (
        <div className="relative group slide-in-from-bottom-4 fade-in ease-in-out animate-in duration-500" style={{ animationDelay: `${index * 40}ms`, animationFillMode: 'backwards' }}>
            <Button variant="outline" onClick={onClick} className="w-full h-56 rounded-lg shadow-sm border ring-blue-400 ring-offset-2 hover:bg-white group-hover:ring-[3px] transition-all duration-100">
                <span className="font-bold text-base tracking-wider opacity-40">{name}</span>
            </Button>
            <Button variant="ghost" size="icon" className="absolute top-2 right-2 h-4 w-7 rounded-lg bg-gray-800/60 hover:bg-blue-400 !text-white z-10 hidden group-hover:flex">
                <EllipsisIcon className="w-4 h-4 stroke-2" />
            </Button>
        </div>
    )
}

export const PageList = ({ hidden }: { hidden?: boolean }) => {
    const { toggleShowList, pages } = usePageStore(({ toggleShowList, pages }) => ({ toggleShowList, pages }))
    const { savePrevAndChange } = useEditorPageChange()

    const _handlePageClick = (pageId: string) => {
        savePrevAndChange(pageId)
        toggleShowList()
    }

    return (
        <div className={clsx('flex-1 flex flex-col relative', hidden && 'hidden')}>
            <Button variant='secondary' size='icon' onClick={toggleShowList} className="absolute top-6 right-6 h-8 w-8 rounded-lg bg-gray-300/50 hover:bg-gray-300/70 z-10">
                <X className="w-4 h-4 stroke-[3] opacity-60" />
            </Button>
            <div className="py-8 px-52 w-full grid grid-cols-2 2xl:grid-cols-4 gap-8 overflow-auto">
                {pages.map((page, index) => (
                    <PageItem key={page.id} index={index} name={page.name} onClick={() => _handlePageClick(page.id)} />
                ))}
            </div>
        </div>
    )
}