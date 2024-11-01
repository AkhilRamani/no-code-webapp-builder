import { UserTextInputPlaceholderSetting } from "./settings/UserTextInputPlaceholderSetting"
import { useNode } from "@craftjs/core";
import { UserTextInputProps } from "./types";
import { UserTxtInptLabelSetting } from "./settings/UserTxtInptLabelSetting";
import { UserTextInputTypeSetting } from "./settings/UserTextInputTypeSetting";

export const UserTextInputSettings = () => {
    const { actions: { setProp }, placeholder, label, type } = useNode<UserTextInputProps>((node) => ({
        placeholder: node.data.props.placeholder,
        label: node.data.props.label,
        type: node.data.props.type
    }));

    const setTextInputProp = (name: keyof UserTextInputProps, value: any) => setProp((props: UserTextInputProps) => (props[name] = value), 500);

    return (
        <div className="px-4 pt-4 grid gap-6">
            <div className="border-b pb-6 grid gap-3">
                <UserTextInputTypeSetting selected={type} onChange={type => setProp((props: UserTextInputProps) => (props.type = type), 500)} />

                <UserTxtInptLabelSetting label={label} onLabelChange={label => setTextInputProp('label', label)} />
                <UserTextInputPlaceholderSetting placeholder={placeholder} onPlaceholderChange={placeholder => setTextInputProp('placeholder', placeholder)} />
            </div>

        </div>
    )
}