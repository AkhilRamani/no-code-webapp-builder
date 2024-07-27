import { useNode, useEditor } from '@craftjs/core';
import { ROOT_NODE } from '@craftjs/utils';
import React, { useEffect, useRef, useCallback } from 'react';
import ReactDOM from 'react-dom';
import { ArrowUp01, BinaryIcon, DeleteIcon, MoveRight, Trash, Trash2, Trash2Icon } from 'lucide-react';

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

    useEffect(() => {
        if (dom) {
            if (isActive || isHover) dom.classList.add('component-selected');
            else dom.classList.remove('component-selected');
        }
    }, [dom, isActive, isHover]);

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
        currentDOM.style.top = top;
        currentDOM.style.left = left;
    }, [dom, getPos]);

    useEffect(() => {
        document
            .querySelector('.craftjs-renderer')
            .addEventListener('scroll', scroll);

        return () => {
            // FIXME: added ? to temporary fix error
            document.querySelector('.craftjs-renderer')?.removeEventListener('scroll', scroll);
        };
    }, [scroll]);

    return (
        <>
            {isHover || isActive
                ? ReactDOM.createPortal(
                    <div /> ||
                    <div
                        ref={currentRef}
                        className="px-2 py-2 bg-[#55a7ff] text-white fixed flex items-center text-xs leading-3 h-[29px] ml-3 -mt-[29px] z-[9999] rounded-t-md"
                        style={{
                            left: getPos(dom).left,
                            top: getPos(dom).top,
                        }}
                    >
                        <h2 className="flex-1 mr-4">{name}</h2>
                        {moveable ? (
                            <a className="p-0 opacity-90 flex items-center mr-2 cursor-move" ref={drag}>
                                <div className="relative -top-1/2 -left-1/2">
                                    <MoveRight className="fill-white w-[15px] h-[15px]" />
                                </div>
                            </a>
                        ) : null}
                        {id !== ROOT_NODE && (
                            <a
                                className="p-0 opacity-90 flex items-center mr-2 cursor-pointer"
                                onClick={() => {
                                    actions.selectNode(parent);
                                }}
                            >
                                <div className="relative -top-1/2 -left-1/2">
                                    <ArrowUp01 className="fill-white w-[15px] h-[15px]" />
                                </div>
                            </a>
                        )}
                        {deletable ? (
                            <a
                                className="p-0 opacity-90 flex items-center cursor-pointer"
                                onMouseDown={(e: React.MouseEvent) => {
                                    e.stopPropagation();
                                    actions.delete(id);
                                }}
                            >
                                <div className="relative -top-1/2 -left-1/2">
                                    <Trash className="w-[15px] h-[15px]" />
                                </div>
                            </a>
                        ) : null}
                    </div>,
                    document.querySelector('.page-container') as HTMLElement
                )
                : null}
            {render}
        </>
    );
};