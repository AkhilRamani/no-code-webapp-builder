import { Button, Button as ShadcnButton } from "@/components/ui/button";
import { withNode } from "../connector";
import { UserButtonSettings } from "./UserButtonSettings";
import { useNode } from "@craftjs/core";
import { UserButtonProps } from "./types";
import { IconsLucide } from "@/components/common/IconsLucide";
import clsx from "clsx";

export const UserButton = ({ label, icon, varient, size }: UserButtonProps) => {
  const { connectors: { connect, drag } } = useNode();

  return (
    <Button
      ref={(ref) => connect(drag(ref))}
      variant={varient}
      size={size}
      className={clsx('gap-3')}
    >
      {icon && <IconsLucide name={icon} className="h-4 w-4" />}
      {label}
    </Button>
  )
}

UserButton.craft = {
  ...UserButton.craft,
  displayName: 'Button',
  props: {
    label: 'Button'
  },
  related: {
    // toolbar: SettingsControl,
    settings: UserButtonSettings
  },
};
