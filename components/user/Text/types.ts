import { TextSizeSettingProps } from "./settings/TextSizeSetting";
import { TextThicknessSettingProps } from "./settings/TextStyleSetting";

export type UserTextClassNames = {
    fontSize?: TextSizeSettingProps['selected'];
    thickNess?: TextThicknessSettingProps['selected'];
    all?: string;
};

export type UserTextProps = {
    text: string;
    classNames?: UserTextClassNames
};