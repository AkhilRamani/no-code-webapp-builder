"use client";

import { Toolbox } from "../../components/toolbox/Toolbox";
import { SettingsPanel } from "../../components/SettingsPanel";
import { Topbar } from "../../components/Topbar";
import { Editor } from "@craftjs/core";
import { userComponents } from "@/components/user";
import { RenderNode } from "@/components/RenderNode";
import { EditorCanvas } from "@/components/EditorCanvas";

export default function Builder() {
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
