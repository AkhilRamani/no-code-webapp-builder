'use client'

import { ConfirmDialog } from "@/components/common/ConfirmDialog";
import { CreateProjectDialog } from "@/components/project/createProjectDialog";
import { ProjectItem, ProjectItemSkeleton } from "@/components/project/projectItem";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useProjectStore } from "@/lib/store/useProjectStore";
import { Plus, Search } from "lucide-react";
import { useEffect, useState } from "react";

export default function Dashboard() {
    const { projects, loading, getProjects, deleteProject } = useProjectStore(({ projects, loading, getProjects, deleteProject }) => ({ projects, loading, getProjects, deleteProject }))

    const [deleteProjectId, setDeleteProjectId] = useState<string | null>(null)

    useEffect(() => {
        !projects.length && getProjects()
    }, [])

    return (
        <div className="bg-gradient-to-t from-gray-100/75 to-gray-100/50 h-full flex">
            <div className="pt-10 flex flex-col flex-1">
                <div className="mb-6 flex justify-between items-center px-16 ">
                    <h3 className="text-lg font-medium">My Portals</h3>

                    <div className="flex flex-1 items-center justify-end gap-4">
                        <div className="flex flex-1 max-w-[300px] relative">
                            <Input placeholder="Search" className="h-9 rounded-lg focus-visible:ring-offset-0 !ring-gray-200" />
                            <Search className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 stroke-[3] opacity-50" />
                        </div>
                        <CreateProjectDialog
                            trigger={<Button className="gap-2 rounded-lg tracking-wide font-semibold shadow" size='sm'>
                                <Plus className="h-4 w-4 stroke-[3]" />
                                New portal
                            </Button>}
                        />
                    </div>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-5 px-16 gap-10 2xl:gap-14 pt-2 flex-wrap overflow-auto">
                    {loading ?
                        <>
                            {Array.from({ length: 6 }).map((_, i) => (
                                <ProjectItemSkeleton key={i} index={i} />
                            ))}
                        </>
                        :
                        projects.map((project, index) => (
                            <ProjectItem key={project.id} name={project.name} projectId={project.id} index={index} onDeleteAction={() => setDeleteProjectId(project.id)} />
                        ))
                    }
                </div>
                <ConfirmDialog
                    open={!!deleteProjectId}
                    onOpenChange={() => setDeleteProjectId(null)}
                    title="Are you sure?"
                    description="This action cannot be undone."
                    onConfirm={() => {

                        setDeleteProjectId(null)
                    }}
                    confirmHandler={async () => {
                        if (!deleteProjectId) return
                        await deleteProject(deleteProjectId)
                        setDeleteProjectId(null)
                    }}
                />
            </div>
        </div>
    )
}