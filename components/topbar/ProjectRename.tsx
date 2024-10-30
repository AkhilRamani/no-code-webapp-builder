import { useProjectStore } from "@/lib/store/useProjectStore"
import { ProjectModal } from "@/types/db/project.types";
import { useEffect, useState } from "react"
import ContentEditable from "react-contenteditable";

export const ProjectRename = () => {
    const { currentProject, updateProject, loading } = useProjectStore(({ currentProject, updateProject, loading }) => ({ currentProject, updateProject, loading }));
    const [text, setText] = useState("")

    useEffect(() => {
        setText(currentProject?.name ?? "")
    }, [currentProject])

    const handleUpdateProject = (r: React.FocusEvent<HTMLDivElement>) => {
        const newName = r.target.innerHTML

        if (!newName) {
            setText((currentProject as ProjectModal).name)
            return
        }

        if (currentProject?.name !== newName) {
            updateProject((currentProject as ProjectModal).id, { name: newName })
        }
    }

    return !loading ? (
        <ContentEditable
            className="bg-slate-100/60 hover:bg-slate-200/50 duration-200 focus:bg-slate-200/60 focus:text-slate-800 tracking-wide text-sm min-w-36 w-full text-slate-600 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 ring-blue-400"
            html={text}
            onBlur={handleUpdateProject}
            onChange={() => { }} // Add an empty onChange handler to satisfy the type checker
        />
    ) : (
        <div className="bg-slate-100 w-36 h-9 rounded-lg px-4 animate-pulse duration-700" />
    )
}