"use client";

import { Toolbox } from "../../components/Toolbox";
import { SettingsPanel } from "../../components/SettingsPanel";
import { Topbar } from "../../components/Topbar";
import { UserContainer } from "../../components/user/Container";
import { UserText } from "../../components/user/Text";
import { Editor, Frame, Element } from "@craftjs/core";
import { userComponents } from "@/components/user";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { UserCanvas } from "@/components/user/Canvas";

export default function Builder() {
  return (
    <Editor resolver={userComponents}>
      <div className="flex flex-col h-full">
        <Topbar />

        <div className="flex flex-grow w-full bg-zinc-100 overflow-auto">
          <Toolbox />

          {/* TODO: */}
          <div className="flex w-full justify-center bg-zinc-100 py-10 overflow-auto">
            <div className="flex w-full max-w-[1000px] bg-white shadow-xl rounded-md border overflow-auto">
              <Frame>
                <Element is={UserCanvas} canvas>
                  <Element is={UserContainer} background="#999" canvas>
                    <UserText text="Title text" fontSize="20px" />
                  </Element>
                </Element>
              </Frame>
            </div>
          </div>

          <SettingsPanel />
        </div>
      </div>
    </Editor>
  );
}
