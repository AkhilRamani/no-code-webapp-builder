import React from "react";
import { Button as ShadcnButton } from "@/components/ui/button"
import { useNode } from "@craftjs/core";
import { withNode } from "./connector";

type ButtonProps = {
  children: React.ReactNode;
}

const Button = ({ children }: ButtonProps) => {
  const { connectors: { connect, drag } } = useNode();
  // Map Material UI props to Shadcn UI props
  //   const sizeMapping = {
  //     small: "sm",
  //     medium: "md",
  //     large: "lg"
  //   };
  //   const variantMapping = {
  //     contained: "default",
  //     outlined: "outline",
  //     text: "ghost" 
  //   };
  //   const colorMapping = {
  //     primary: "blue",
  //     secondary: "gray",
  //     // ... add more mappings as needed
  //   };
  //   const shadcnSize = sizeMapping[size] || "md"; 
  //   const shadcnVariant = variantMapping[variant] || "default";
  //   const shadcnColor = colorMapping[color] || "blue";

  return (
    <ShadcnButton ref={ref => connect(drag(ref))}>
      {children}
    </ShadcnButton>
  )
}

export const UserButton = withNode(Button, { draggable: true })

Button.craft = {
  ...UserButton.craft,
  // related: {
  //   toolbar: SettingsControl,
  // },
};