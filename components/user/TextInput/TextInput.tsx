import { Input } from "@/components/ui/input";
import { useNode } from "@craftjs/core";
import { useCallback } from "react";
import { UserTextInputProps } from "./types";
import { UserTextInputSettings } from "./UserTextInputSetting";
import { Label } from "@/components/ui/label";

export const UserTextInput = ({ classNames, placeholder, label, type }: UserTextInputProps) => {
    const { connectors: { connect, drag } } = useNode();

    const handleRef = useCallback(
        (ref: HTMLSpanElement | null) => {
            if (ref) {
                connect(drag(ref));
            }
        },
        // [connect, drag]
        []
    );

    return <div ref={handleRef}>
        {label && <Label className="pb-2 block">{label}</Label>}
        <Input placeholder={placeholder} type={type} />
    </div>
}

UserTextInput.craft = {
    displayName: 'Text Input',
    props: {
        placeholder: 'Enter text here...',
        type: 'text'
    },
    related: {
        settings: UserTextInputSettings
    }
}