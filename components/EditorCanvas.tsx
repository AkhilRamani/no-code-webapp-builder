import { Frame, useEditor, Element } from "@craftjs/core";
import { UserCanvas } from "./user/Canvas";
import clsx from "clsx";
import { CanvasToolbar } from "./CanvasToolbar";
import { usePageStore } from "@/lib/store/usePageStore";
import { useEffect, useState } from "react";
import { usePageBinaryStore } from "@/lib/store/usePageBinaryStore";
import { Loader2 } from "lucide-react";

export const EditorCanvas = ({ projectId, hidden }: { projectId: string, hidden?: boolean }) => {
    const { enabled, connectors, actions: { setOptions } } = useEditor((state) => ({
        enabled: state.options.enabled,
    }));

    const currentPage = usePageStore(state => state.currentPage)
    const { fetchPageNodes, fetchingBinary } = usePageBinaryStore(({ fetchPageNodes, fetchingBinary }) => ({ fetchPageNodes, fetchingBinary }))
    const { actions, } = useEditor();
    const [error, setError] = useState<boolean>(false)

    useEffect(() => {
        if (!currentPage) return;

        fetchPageNodes(projectId, currentPage.id)
            .then(nodes => {
                if (!nodes) return setError(true);
                actions.deserialize(nodes);
            })
    }, [currentPage])

    // useEffect(() => {
    //     if (!window) return;
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
        <div className={clsx('page-container flex-1 overflow-auto relative', hidden && 'hidden')}>

            <div className={clsx("craftjs-renderer flex flex-col justify-center items-center h-full px-8", "fade-in ease-in-out animate-in slide-in-from-top-4 duration-500")} ref={(ref) => connectors.select(connectors.hover(ref, null), null)}>
                <div className={clsx("flex w-full max-w-[1000px] pb-4 -mt-10 transition-all duration-700 ease-in-out", enabled ? "opacity-100 translate-y-0 delay-300" : "delay-150 opacity-0 translate-y-16")}>
                    <CanvasToolbar />
                </div>

                <div className={clsx("flex bg-white shadow-xl rounded-md border overflow-auto z-[1]", 'ease-in-out w-full', enabled ? 'h-[570px] max-w-[1000px] duration-500' : 'max-w-[90%] h-[90%] duration-1000 delay-100')}>
                    {!error ?
                        <Frame >
                            <Element is={UserCanvas} canvas>

                            </Element>
                        </Frame>
                        :
                        <div className="flex w-full h-full items-center justify-center">
                            <p className="text-sm font-semibold tracking-wide opacity-50">Failed to load page</p>
                        </div>
                    }
                </div>
            </div>

            {(!currentPage || fetchingBinary) &&
                <div className={clsx("flex w-full items-center absolute top-0 left-0 h-full justify-center bg-white/50 z-[1] backdrop-blur-sm fade-in animate-in ease-in-out duration-300")}>
                    <Loader2 className="w-10 h-10 mb-16 opacity-60 animate-spin ease-in-out duration-700 stroke-[2.2]" />
                </div>
            }
        </div>
    )
}