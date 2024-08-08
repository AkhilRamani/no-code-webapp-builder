import { Button } from "@/components/ui/button";
import { Element, useEditor, NodeSelectorWrapper } from "@craftjs/core";
import { UserButton } from "../user/button/Button";
import { UserText } from "../user/Text/Text";
import { UserContainer } from "../user/container/Container";
import { UserCard } from "../user/Card";
import { UserSidebar } from "../user/Sidebar/Sidebar";
import { UserHeader } from "../user/Header";
import clsx from "clsx";
import { UserTable } from "../user/table/UserTable";
import { Cuboid } from "lucide-react";
import { UserAvatar } from "../user/avatar/UserAvatar";
import { AvatarTool } from "./tools/AvatarTool";
import { UserNumberCard } from "../user/visulisation/userNumberCard/UserNumberCard";

type ConnectorRef = NodeSelectorWrapper | HTMLElement | null;


export const Toolbox: React.FC = () => {
  const { connectors, query, enabled } = useEditor(state => ({
    enabled: state.options.enabled
  }));

  return (
    <div className={clsx("border-r w-48 bg-white", 'duration-300 ease-out', enabled ? 'ml-0' : '-ml-48')}>
      <div className="flex flex-col items-center justify-center space-y-6">
        <div className="flex w-full h-14 items-center border-b px-4 lg:h-[60px] lg:px-6 shrink-0">
          <div className="flex items-center gap-2 font-semibold" >
            <Cuboid className="h-6 w-6" />
            <span className="">Components</span>
          </div>
        </div>

        <h4 className="font-medium text-muted-foreground mt-4">Drag to add</h4>
        <div className="flex flex-col space-y-2.5 items-center">
          <AvatarTool />

          <Button ref={(ref: HTMLButtonElement | null) => connectors.create(ref as HTMLElement, <UserButton label="Button" />)}>Button</Button>
          <Button ref={(ref: HTMLElement) => ref && connectors.create(ref, <UserText text="Some text" />)}>Text</Button>
          <Button ref={(ref) => connectors.create(ref, <Element is={UserContainer} canvas />)}>Container</Button>
          <Button ref={(ref) => connectors.create(ref, <UserCard />)}>Card</Button>
          <Button ref={(ref) => connectors.create(ref, <UserSidebar />)}>Sidebar</Button>
          <Button ref={(ref) => connectors.create(ref, <UserHeader />)}>Header</Button>
          <Button ref={(ref) => connectors.create(ref, <UserTable />)}>Table</Button>
          <Button ref={(ref) => connectors.create(ref, <UserNumberCard />)}>Number card</Button>


        </div>
      </div>
    </div>
  );
};
