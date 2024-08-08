import { useNode } from "@craftjs/core";
import clsx from "clsx";
import { UserContainerSettings } from "./UserContainerSettings";
import { UserContainerProps } from "./types";

export const UserContainer = ({ background, children, classNames }: UserContainerProps) => {
  const {
    connectors: { connect, drag },
  } = useNode();

  return (
    <div
      ref={(ref) => connect(drag(ref))}
      // className={clsx(!children && 'p-4', 'w-full', classNames && Object.values(classNames).reduce((acc, value) => (acc += ` ${value}`), ""))}
      className={clsx(!children && 'p-4 min-h-16 border', 'w-full', Object.values(classNames ?? {}))}
      // className={`p-4 w-full ${classNames?.direction}`}
      // className={`p-4 w-full`}
      style={{ background }}
    >
      {children}
    </div>
  );
};



UserContainer.craft = {
  displayName: 'Container',
  props: {
    classNames: {
      direction: "flex-col",
      radius: 'rounded-lg'
    },
  },
  related: {
    settings: UserContainerSettings,
  },
};
