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
import { Blocks, Layers2, Layers3, Layers as LayersIcon } from "lucide-react";
import { AvatarTool } from "./tools/AvatarTool";
import { UserNumberCard } from "../user/visulisation/userNumberCard/UserNumberCard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Separator } from "../ui/separator";
import { Layers } from "../layers/Layers";
import { UserTableDynamic } from "../user/table/UserTableDynamic";
import { UserTextInput } from "../user/TextInput/TextInput";
import { UserBarChart } from "../user/chart/BarChart";

type ConnectorRef = NodeSelectorWrapper | HTMLElement | null;


export const Toolbox: React.FC = () => {
  const { connectors, query, enabled } = useEditor(state => ({
    enabled: state.options.enabled
  }));

  return (
    <div className={clsx("border-r w-56 h-full bg-white z-[2]", 'duration-300 ease-out', enabled ? 'ml-0' : '-ml-56')}>
      <div className="flex flex-col h-full space-y-6">
        {/* <div className="flex w-full h-14 items-center border-b px-4 lg:h-[60px] lg:px-6 shrink-0">
          <div className="flex items-center gap-2 font-semibold" >
            <Cuboid className="h-6 w-6" />
            <span className="">Components</span>
          </div>
        </div> */}

        <Tabs className="p-4 pb-0 flex flex-col h-full flex-1" defaultValue="component">
          <TabsList className="w-full rounded-lg shrink-0">
            <TabsTrigger className="flex-1 h-full data-[state=active]:shadow-md rounded-lg" value="component" >
              <Blocks className="h-4 w-4 fill-current opacity-60" />
              {/* Blocks */}
            </TabsTrigger>

            <TabsTrigger className="flex-1 h-full data-[state=active]:shadow-md rounded-lg" value="layer">
              <Layers2 className="h-4 w-4 stroke-[3] opacity-55" />
              {/* Layers */}
            </TabsTrigger>
          </TabsList>

          <Separator className="mt-4" />

          <TabsContent value="component" className="overflow-auto h-full">

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
              <Button ref={(ref) => connectors.create(ref, <UserTableDynamic />)}>Table - Dynamic</Button>
              <Button ref={(ref) => connectors.create(ref, <UserTextInput />)}>Text Input</Button>
              <Button ref={(ref) => connectors.create(ref, <UserBarChart />)}>Bar Chart</Button>
            </div>

          </TabsContent>
          <TabsContent value="layer" className="mt-0 pt-4 pb-8 overflow-auto h-full no-scrollbar">
            <Layers />
          </TabsContent>
        </Tabs>


      </div>
    </div>
  );
};
