import { UserContainerBorderSettingProp } from "./settings/UserContainerBorderSetting";
import { UserContainerGapSettingProps } from "./settings/UserContainerGapSetting";
import { UserContainerShadowSetting } from "./settings/UserContainerShadowSetting";
import { UserContainerSpacingSettingProps } from "./settings/UserContainerSpacingSetting";

export type UserContainerClassNames = {
    direction?: "flex-col" | "flex-row";
    display?: "block" | "flex";
    padding?: UserContainerSpacingSettingProps['spaceIn'];
    margin?: UserContainerSpacingSettingProps['spaceOut'];
    gap?: UserContainerGapSettingProps['selected'];
    border?: 'border';
    radius?: UserContainerBorderSettingProp['radius'];
    shadow?: UserContainerShadowSetting['selected'];
    all?: string;
};

export type UserContainerProps = {
    background?: string;
    padding?: number;
    children?: React.ReactNode;
    classNames?: UserContainerClassNames;
};