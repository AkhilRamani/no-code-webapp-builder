"use client";

import { Toolbox } from "../../components/Toolbox";
import { SettingsPanel } from "../../components/SettingsPanel";
import { Topbar } from "../../components/Topbar";
import { UserContainer } from "../../components/user/Container";
import { UserText } from "../../components/user/Text";
import { Editor, Frame, Element } from "@craftjs/core";
import { userComponents } from "@/components/user";

export default function Builder() {
  return (
    <Editor resolver={userComponents}>
      <div className="h-full ">
        <Topbar />

        <div className="flex w-full h-full bg-zinc-100">
          <Toolbox />

          {/* TODO: */}
          <div className="flex h-full w-full max-w-[1000px] bg-white">
            <Frame>
              <Element is={UserContainer} canvas>
                <Element is={UserContainer} background="#999" canvas>
                  <UserText text="Title text" fontSize="20px" />
                </Element>
              </Element>
            </Frame>
          </div>

          <SettingsPanel />
        </div>
      </div>
    </Editor>
  );
}
