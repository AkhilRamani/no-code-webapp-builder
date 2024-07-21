import { Button } from "@/components/ui/button";
import { Element, useEditor } from "@craftjs/core";
import { UserButton } from "./user/Button";
import { UserText } from "./user/Text";
import { UserContainer } from "./user/Container";
import { UserCard } from "./user/Card";

export const Toolbox: React.FC = () => {
  const { connectors, query } = useEditor();

  return (
    <div className="px-2 py-2 border-r min-w-48">
      <div className="flex flex-col items-center justify-center space-y-2">
        <h3>Drag to add</h3>
        <div className="flex flex-col space-y-2">
          <Button ref={(ref: HTMLButtonElement) => connectors.create(ref, <UserButton>Button</UserButton>)}>Button</Button>
          <Button ref={(ref) => connectors.create(ref, <UserText text="Some text" fontSize="20" />)}>Text</Button>
          <Button ref={(ref) => connectors.create(ref, <Element is={UserContainer} canvas />)}>Container</Button>
          <Button ref={(ref) => connectors.create(ref, <UserCard />)}>Card</Button>
        </div>
      </div>
    </div>
  );
};
