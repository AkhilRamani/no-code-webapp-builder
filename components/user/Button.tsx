import React from "react";
import { Button as ShadcnButton } from "@/components/ui/button"

type ButtonProps = {
    children: React.ReactNode;
}

export const Button = ({children}: ButtonProps) => {
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
    <ShadcnButton>
      {children}
    </ShadcnButton>
  )
}