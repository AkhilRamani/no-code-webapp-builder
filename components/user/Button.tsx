import { Button as ShadcnButton } from "@/components/ui/button";
import { withNode } from "./connector";

export const UserButton = withNode(ShadcnButton, { draggable: true, droppable: true });

UserButton.craft = {
  ...UserButton.craft,
  // related: {
  //   toolbar: SettingsControl,
  // },
};
