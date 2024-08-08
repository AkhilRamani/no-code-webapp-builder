import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useNode, UserComponent } from "@craftjs/core";
import { useCallback } from "react";
import { UserAvatarSettings } from "./UserAvatarSettings";
import { UserAvatarProps } from "./types";
import clsx from "clsx";

export const UserAvatar = ({ classNames }: UserAvatarProps) => {
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

    return (
        <Avatar ref={handleRef} className={clsx(Object.values(classNames ?? {}))}>
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>CN</AvatarFallback>
        </Avatar>
    )
}

UserAvatar.craft = {
    displayName: 'Avatar',
    related: {
        settings: UserAvatarSettings
    }
}