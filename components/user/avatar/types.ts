import { UserAvatarSettingSizes } from "./setting/UserAvatarSizeSetting";

export type UserAvatarClassNames = {
    size?: UserAvatarSettingSizes;
    all?: string;
};

export type UserAvatarProps = {
    classNames?: UserAvatarClassNames
}