import { Element } from "@craftjs/core";
import { UserText } from "./Text/Text";
import { UserContainer } from "./Container";

export const UserHeader = () => {
    return (
        // <Element id="Header" is={UserContainer} classNames={{ all: 'h-[60px] border-b bg-muted/40 flex items-center justify-between px-6' }} canvas>
        <UserContainer classNames={{ all: 'h-[60px] border-b bg-muted/40 flex items-center justify-between px-6 shrink-0' }}>
            <div className="shrink-0 w-fit">
                <Element id='Page title' is={UserText} text="Page title" canvas />
                {/* <UserText text="Page title" fontSize="20px" /> */}
            </div>
            <Element id="Header menus" is={UserContainer} classNames={{ all: 'flex items-center justify-center !w-fit gap-4' }} canvas>
                <div className="h-10 w-10 bg-gray-100 rounded-full border hover:shadow-md" />
            </Element>
        </UserContainer>
    )
}