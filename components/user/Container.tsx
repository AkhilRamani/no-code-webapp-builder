import { useNode } from "@craftjs/core";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Label } from "../ui/label";
import { DivideCircle } from "lucide-react";
import { Separator } from "../ui/separator";
import clsx from "clsx";

type ClassNames = {
  direction?: "flex-col" | "flex-row";
  display?: "block" | "flex";
  padding?: string;
  all?: string;
};

type ContainerProps = {
  background?: string;
  padding?: number;
  children?: React.ReactNode;
  classNames?: ClassNames;
};

export const UserContainer = ({ background, children, classNames }: ContainerProps) => {
  const {
    connectors: { connect, drag },
  } = useNode();

  return (
    <div
      ref={(ref) => connect(drag(ref))}
      className={clsx(!children && 'p-4', 'w-full', classNames && Object.values(classNames).reduce((acc, value) => (acc += ` ${value}`), ""))}
      // className={`p-4 w-full ${classNames?.direction}`}
      // className={`p-4 w-full`}
      style={{ background }}
    >
      {children}
    </div>
  );
};

interface SettingsProps {
  classNames?: ClassNames;
}

const ContainerSettings = () => {
  const {
    actions: { setProp },
    classNames,
  } = useNode<SettingsProps>((node) => ({
    classNames: node.data.props.classNames || "",
  }));

  const onFDirectionTabChange = (value: string) => setProp((props: SettingsProps) => (props.classNames = { ...classNames, direction: value }));
  const onTypeChange = (value: string) => setProp((props: SettingsProps) => (props.classNames = { ...classNames, display: value }));

  return (
    <div>
      <div className="px-4 pt-1">
        <Label>Type</Label>
        <Tabs className="mt-2 mb-4 bg-slate-100 rounded-lg" defaultValue={classNames?.display} onValueChange={onTypeChange}>
          <TabsList className="w-full">
            <TabsTrigger className="flex-1" value="block">
              Default
            </TabsTrigger>
            <TabsTrigger className="flex-1" value="flex">
              Stack
            </TabsTrigger>
          </TabsList>
          <TabsContent value="block"></TabsContent>
          <TabsContent value="flex" className="px-2 pb-2">
            <Tabs defaultValue={classNames?.direction} onValueChange={onFDirectionTabChange}>
              <TabsList className="w-full">
                <TabsTrigger className="flex-1" value="flex-col">
                  Verticle
                </TabsTrigger>
                <TabsTrigger className="flex-1" value="flex-row">
                  Horizontal
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </TabsContent>
        </Tabs>
      </div>
      <Separator />
    </div>
  );
};

UserContainer.craft = {
  props: {
    classNames: {
      direction: "flex-col",
    },
  },
  related: {
    settings: ContainerSettings,
  },
};
