import React, { useEffect, useState } from "react";
import { useNode } from "@craftjs/core";
import clsx from "clsx";
import ContentEditable from "react-contenteditable";
import { TextSettings } from "./TextSettings";
import { UserTextProps } from "./types";

export const UserText = ({ text, classNames }: UserTextProps) => {
  const {
    connectors: { connect, drag },
    actions: { setProp },
    hasSelectedNode,
    hasDraggedNode,
  } = useNode((state) => ({
    hasSelectedNode: state.events.selected,
    hasDraggedNode: state.events.dragged,
  }));

  const [editable, setEditable] = useState(false);

  useEffect(() => {
    !hasSelectedNode && setEditable(false);
  }, [hasSelectedNode]);

  return (
    <span ref={(ref) => connect(drag(ref))} onClick={(e) => setEditable(true)}>
      <ContentEditable
        disabled={!editable}
        html={text}
        onChange={(e) => setProp((props) => (props.text = e.target.value.replace(/<\/?[^>]+(>|$)/g, "")))}
        tagName="h1"
        className={clsx('outline-none', Object.values(classNames ?? {}))}
      />
      {/* <p style={{ fontSize }}>{text}</p> */}
    </span>
  );
};



UserText.craft = {
  displayName: "Text",
  props: {
    // classNames: {}
  },
  rules: {
    canDrag: (node) => node.data.props.text != "Drag",
  },
  related: {
    settings: TextSettings,
  },
};
