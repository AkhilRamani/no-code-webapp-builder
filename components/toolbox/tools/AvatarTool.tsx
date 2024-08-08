import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { UserAvatar } from "@/components/user/avatar/UserAvatar";
import { useEditor } from "@craftjs/core";
import React from "react";

export const AvatarTool = () => {
    const { connectors } = useEditor()


    const handleRef = React.useCallback(
        (ref: HTMLSpanElement | null) => {
            if (ref) {
                connectors.create(ref, <UserAvatar />);
            }
        },
        [connectors]
    );

    return (
        <Avatar ref={handleRef}>
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>CN</AvatarFallback>
        </Avatar>
    )
}