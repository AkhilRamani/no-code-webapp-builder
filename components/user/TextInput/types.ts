import { UserTextInputTypeSettingProps } from "./settings/UserTextInputTypeSetting";

export type UserTextInputClassNames = {
    all?: string;
}

export type UserTextInputProps = {
    classNames?: UserTextInputClassNames,
    placeholder?: string;
    label?: string;
    type: UserTextInputTypeSettingProps['selected'];
}