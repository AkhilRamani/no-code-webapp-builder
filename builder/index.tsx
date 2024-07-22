"use client";

import { Toolbox } from "../components/Toolbox";
import { SettingsPanel } from "../components/SettingsPanel";
import { Topbar } from "../components/Topbar";
import { UserContainer } from "../components/user/Container";
import { UserButton } from "../components/user/Button";
import { UserText } from "../components/user/Text";
import { UserCard } from "../components/user/Card";
import { Editor, Frame, Element } from "@craftjs/core";
import { userComponents } from "@/components/user";

export default function Builder() {
  return (
    <Editor resolver={userComponents}>
      <div className="h-full">
        <Topbar />
        <div className="flex w-full h-full">
          <Toolbox />

          <Frame>
            <Element is={UserContainer} padding={5} background="#eee" canvas>
              <Element is={UserContainer} padding={2} background="#999" canvas>
                <UserText text="Title text" fontSize="20px" />
              </Element>
            </Element>
          </Frame>

          <div className="bg-white rounded-lg shadow-md h-full">
            <SettingsPanel />
          </div>
        </div>
      </div>
    </Editor>
  );
}
