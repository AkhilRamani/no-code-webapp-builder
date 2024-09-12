import { UserButtonSizeSettingProps } from "./settings/UserButtonSizeSetting"
import { UserButtonVarientSettingProps } from "./settings/UserButtonVarientSetting"

export type UserButtonProps = {
    varient?: UserButtonVarientSettingProps['selected'] | null,
    size?: UserButtonSizeSettingProps['selected'],
    label?: string,
    icon?: string,
    onClick?: () => void
}