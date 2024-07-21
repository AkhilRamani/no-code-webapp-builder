import React, { useEffect, useState } from "react";
import { useNode } from "@craftjs/core";
import ContentEditable from 'react-contenteditable'
import { Input } from "@/components/ui/input";
import { Label } from "../ui/label";

type TextProps = {
  text: string;
  fontSize: string;
}

export const UserText = ({ text, fontSize }: TextProps) => {
  const { connectors: { connect, drag }, actions: { setProp }, hasSelectedNode, hasDraggedNode } = useNode((state) => ({
    hasSelectedNode: state.events.selected,
    hasDraggedNode: state.events.dragged
  }));

  const [editable, setEditable] = useState(false);

  useEffect(() => { !hasSelectedNode && setEditable(false) }, [hasSelectedNode]);

  return (
    <div ref={ref => connect(drag(ref))} onClick={e => setEditable(true)}>
      <ContentEditable
        disabled={!editable}
        html={text}
        onChange={e => setProp(props => props.text = e.target.value.replace(/<\/?[^>]+(>|$)/g, ""))}
        tagName="h1"
        style={{ fontSize: `${fontSize}px` }}
      />
      {/* <p style={{ fontSize }}>{text}</p> */}
    </div>
  )
}

interface SettingsProps {
  fontSize?: string
}
const UserTextSettings = () => {
  const { actions: { setProp }, fontSize } = useNode((node) => ({
    fontSize: node.data.props.fontSize
  }));

  return (
    <>
      <Label className="pb-4">Font size</Label>
      <div>
        <Input
          type="number"
          value={fontSize || 20}
          onChange={e => setProp((props: SettingsProps) => props.fontSize = e.target.value)}
        />
      </div>
    </>
  )
}

UserText.craft = {
  props: {
    fontSize: 20,
  },
  rules: {
    canDrag: (node) => node.data.props.text != "Drag"
  },
  related: {
    settings: UserTextSettings
  }
}