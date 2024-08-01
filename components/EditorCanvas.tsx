import { Frame, useEditor, Element } from "@craftjs/core";
import { UserCanvas } from "./user/Canvas";
import { UserContainer } from "./user/Container";
import { UserText } from "./user/Text";
import { useEffect } from "react";
import { UserSidebar } from "./user/Sidebar/Sidebar";
import clsx from "clsx";

export const EditorCanvas = () => {
    const {
        enabled,
        connectors,
        actions: { setOptions },
    } = useEditor((state) => ({
        enabled: state.options.enabled,
    }));

    // useEffect(() => {
    //     if (!window) {
    //         return;
    //     }

    //     window.requestAnimationFrame(() => {
    //         // Notify doc site
    //         window.parent.postMessage(
    //             {
    //                 LANDING_PAGE_LOADED: true,
    //             },
    //             '*'
    //         );

    //         setTimeout(() => {
    //             setOptions((options) => {
    //                 options.enabled = true;
    //             });
    //         }, 200);
    //     });
    // }, [setOptions]);

    // TODO: 
    return (
        // <div className="page-container flex w-full justify-center bg-zinc-100 py-10 overflow-auto" ref={(ref) => connectors.select(connectors.hover(ref, null), null)}>
        <div className="page-container flex-1 overflow-auto">
            <div className="craftjs-renderer grid items-center h-full" ref={(ref) => connectors.select(connectors.hover(ref, null), null)}>
                <div className={clsx("flex w-full m-auto h-[60%] max-w-[1000px] bg-white shadow-xl rounded-md border overflow-auto", 'ease-in-out', enabled ? 'h-[60%] max-w-[1000px] duration-500' : 'max-w-[90%] h-[90%] duration-700 delay-0')}>
                    <Frame>
                        <Element is={UserCanvas} canvas>
                            <UserSidebar />
                        </Element>
                    </Frame>
                </div>
            </div>
        </div>
    )
}