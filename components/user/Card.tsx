import {
  Card as ShadcnCard,
  CardContent,
  CardDescription,
  CardFooter as ShadcnCardFooter,
  CardHeader as ShadcnCardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useNode, Element } from "@craftjs/core";
import { withNode } from "./connector";
import { UserButton } from "./Button";

// export const CardHeader = ({ children }) => {
//   const { connectors: { connect } } = useNode();
//   return (
//     <div ref={connect} className="text-only">
//       {children}
//     </div>
//   )
// }
// CardHeader.craft = {
//   rules: {
//     // Only accept Text
//     canMoveIn: (incomingNodes) => incomingNodes.every(incomingNode => incomingNode.data.type === Text)
//   }
// }

// export const CardFooter = ({ children }) => {
//   const { connectors: { connect } } = useNode();
//   return (
//     <div ref={connect}>
//       {children}
//     </div>
//   )
// }
// CardFooter.craft = {
//   rules: {
//     // Only accept Buttons
//     canMoveIn: (incomingNodes) => incomingNodes.every(incomingNode => incomingNode.data.type === UserButton)
//   }
// }

const nodeConfig = { draggable: true, droppable: true };

export const UserCardTitle = withNode(CardTitle, nodeConfig);
export const UserCardDescription = withNode(CardDescription, nodeConfig);
export const UserCardContainer = withNode(ShadcnCard, nodeConfig);
export const UserCardHeader = withNode(ShadcnCardHeader, { droppable: true });
export const UserCardFooter = withNode(ShadcnCardFooter, { droppable: true });

export const UserCard = () => {
  return (
    <UserCardContainer className="w-[350px] m-4">
      <Element id="card-header" is={UserCardHeader as typeof UserCardHeader & string} canvas>
        <UserCardTitle>Create project</UserCardTitle>
        <UserCardDescription>Deploy your new project in one-click.</UserCardDescription>
      </Element>

      {/* <CardContent>

      </CardContent> */}
      <Element id="card-footer" is={UserCardFooter} canvas>
        <UserButton>Done</UserButton>
      </Element>
    </UserCardContainer>
  );
};
