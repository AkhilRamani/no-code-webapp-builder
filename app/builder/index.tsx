"use client";

import { Toolbox } from "../../components/toolbox/Toolbox";
import { SettingsPanel } from "../../components/SettingsPanel";
import { Topbar } from "../../components/topbar/Topbar";
import { Editor, useEditor } from "@craftjs/core";
import { userComponents } from "@/components/user";
import { RenderNode } from "@/components/RenderNode";
import { EditorCanvas } from "@/components/EditorCanvas";
import { useParams } from "next/navigation";
import { useEffect } from "react";
import { useProjectStore } from "@/lib/store/useProjectStore";
import { PageList } from "@/components/PageList";
import { usePageStore } from "@/lib/store/usePageStore";
import { usePageBinaryStore } from "@/lib/store/usePageBinaryStore";

export default function Builder() {
  const { projectId } = useParams<{ projectId: string }>();
  const fetchProject = useProjectStore(store => store.fetchProject);
  const fetchPages = usePageStore(store => store.fetchPages);
  const showList = usePageStore(state => state.showList)
  const handleBinaryChange = usePageBinaryStore(state => state.handleBinaryChange)

  useEffect(() => {
    fetchProject(projectId);
    fetchPages(projectId);
  }, [])

  return (
    <Editor resolver={userComponents} onRender={RenderNode} onNodesChange={handleBinaryChange}>
      <div className="flex flex-col h-full">
        <Topbar />

        <div className="flex flex-1 w-full bg-zinc-100 overflow-auto overflow-x-hidden">
          <Toolbox />

          <PageList hidden={!showList} />
          <EditorCanvas projectId={projectId} hidden={showList} />

          <SettingsPanel />
        </div>
      </div>
    </Editor>
  );
}
