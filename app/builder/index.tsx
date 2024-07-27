"use client";

import { Toolbox } from "../../components/Toolbox";
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

        <div className="flex flex-grow w-full bg-zinc-100 overflow-auto">
          <Toolbox />

          <EditorCanvas />

          <SettingsPanel />
        </div>
      </div>
    </Editor>
  );
}
