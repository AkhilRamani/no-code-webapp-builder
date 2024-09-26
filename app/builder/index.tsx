"use client";

import { Toolbox } from "../../components/toolbox/Toolbox";
import { SettingsPanel } from "../../components/SettingsPanel";
import { Topbar } from "../../components/topbar/Topbar";
import { Editor } from "@craftjs/core";
import { userComponents } from "@/components/user";
import { RenderNode } from "@/components/RenderNode";
import { EditorCanvas } from "@/components/EditorCanvas";
import { useParams } from "next/navigation";
import { useEffect } from "react";
import { useProjectStore } from "@/lib/store/useProjectStore";

export default function Builder() {
  const { projectId } = useParams<{ projectId: string }>();
  const fetchProject = useProjectStore(store => store.fetchProject);

  useEffect(() => {
    fetchProject(projectId);
  }, [])

  return (
    <Editor resolver={userComponents} onRender={RenderNode}>
      <div className="flex flex-col h-full">
        <Topbar />

        <div className="flex flex-1 w-full bg-zinc-100 overflow-auto overflow-x-hidden">
          <Toolbox />

          <EditorCanvas />

          <SettingsPanel />
        </div>
      </div>
    </Editor>
  );
}
