import { useNode, useEditor } from '@craftjs/core';
import { ROOT_NODE } from '@craftjs/utils';
import React, { useEffect, useRef, useCallback } from 'react';
import ReactDOM from 'react-dom';
import { ArrowUp, Move, Trash } from 'lucide-react';
import { Button } from './ui/button';
import clsx from 'clsx';

export const RenderNode = ({ render }) => {
    const { id } = useNode();
    const { actions, query, isActive } = useEditor((_, query) => ({
        isActive: query.getEvent('selected').contains(id),
    }));
    const {
        isHover,
        dom,
        name,
        moveable,
        deletable,
        connectors: { drag },
        parent,
    } = useNode((node) => ({
        isHover: node.events.hovered,
        dom: node.dom,
        name: node.data.custom.displayName || node.data.displayName,
        moveable: query.node(node.id).isDraggable(),
        deletable: query.node(node.id).isDeletable(),
        parent: node.data.parent,
        props: node.data.props,
    }));

    const currentRef = useRef<HTMLDivElement>();


    const highlightRef = useRef(null);
    const updateHighlightPosition = useCallback(() => {
        if (!dom || !highlightRef.current) return;
        const rect = dom.getBoundingClientRect();
        const highlight = highlightRef.current;

        Object.assign(highlight.style, {
            position: 'fixed',
            left: `${rect.left}px`,
            top: `${rect.top}px`,
            width: `${rect.width}px`,
            height: `${rect.height}px`,
            // zIndex: '9998',
        });
    }, [dom]);

    useEffect(() => {
        if (!dom) return;

        const elem = document.querySelector('.craftjs-renderer')
        const highlight = document.createElement('div');
        highlight.className = clsx('ring ring-offset-1 ring-[#9ccaff] shadow-[0_0_16px_#6eb2ff9e] pointer-events-none rounded-md z-30', isActive && 'animate-pulse');
        // document.body.appendChild(highlight);
        elem.appendChild(highlight);
        highlightRef.current = highlight;

        let animFrameId: number | undefined = undefined
        const updateAndCheck = () => {
            updateHighlightPosition();
            animFrameId = requestAnimationFrame(updateAndCheck);
        };

        if (isActive || isHover) {
            updateAndCheck();
        } else {
            highlight.remove()
        }

        return () => {
            animFrameId && cancelAnimationFrame(animFrameId);
            highlight.remove();
        };
    }, [dom, isActive, isHover, updateHighlightPosition]);
    // useEffect(() => {
    //     if (dom) {
    //         if (isActive || isHover) dom.classList.add('component-selected');
    //         else dom.classList.remove('component-selected');
    //     }
    // }, [dom, isActive, isHover]);

    const getPos = useCallback((dom: HTMLElement) => {
        const { top, left, bottom } = dom
            ? dom.getBoundingClientRect()
            : { top: 0, left: 0, bottom: 0 };
        return {
            top: `${top > 0 ? top : bottom}px`,
            left: `${left}px`,
        };
    }, []);

    const scroll = useCallback(() => {
        const { current: currentDOM } = currentRef;

        if (!currentDOM) return;
        const { top, left } = getPos(dom);
        console.log({ top, left })
        currentDOM.style.top = top;
        currentDOM.style.left = left;
    }, [dom, getPos]);

    useEffect(() => {
        document.querySelector('.craftjs-renderer').addEventListener('scroll', scroll);

        return () => {
            // FIXME: added ? to temporary fix error
            document.querySelector('.craftjs-renderer')?.removeEventListener('scroll', scroll);
        };
    }, [scroll]);

    return (
        <>
            {/* {isHover || isActive */}
            {isActive
                ? ReactDOM.createPortal(
                    // <div />
                    // ||
                    <div
                        ref={currentRef}
                        className="fixed flex gap-2 -translate-y-3 -mt-[29px] rounded-t-xl transition-all duration-200 animate-in z-30"
                        style={{
                            left: getPos(dom).left,
                            top: getPos(dom).top,
                        }}
                    >
                        {/* <h2 className="flex-1 mr-4">{name}</h2> */}
                        {moveable ? (
                            <Button size="icon"
                                className="flex items-center cursor-pointer rounded-full h-8 w-8 shadow-md bg-sky-400 hover:bg-sky-500 hover:scale-110 duration-200 transition-all" ref={drag}>
                                <Move className="h-4 w-4" />
                            </Button>
                        ) : null}
                        {id !== ROOT_NODE && (
                            <Button
                                size="icon"
                                className="flex items-center cursor-pointer rounded-full h-8 w-8 shadow-md bg-sky-400 hover:bg-sky-500 hover:scale-110 duration-200 transition-all"
                                onClick={() => {
                                    console.log(parent)
                                    actions.selectNode(parent);
                                }}
                            >
                                <ArrowUp className="h-4 w-4" />
                            </Button>
                        )}
                        {deletable ? (
                            <Button
                                size="icon"
                                variant="destructive"
                                className="rounded-full h-8 w-8 duration-200 transition-all bg-rose-400 shadow-md hover:scale-110 hover:bg-rose-500"
                                onMouseDown={(e: React.MouseEvent) => {
                                    e.stopPropagation();
                                    actions.delete(id);
                                }}
                            >
                                <Trash className="h-4 w-4" />
                            </Button>
                        ) : null}
                    </div>,
                    document.querySelector('.page-container') as HTMLElement
                )
                : null}
            {render}
        </>
    );
};