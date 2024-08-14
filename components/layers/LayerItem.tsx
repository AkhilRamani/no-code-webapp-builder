import { useEditor } from '@craftjs/core';
import React from 'react';
import clsx from 'clsx';
import { useLayer } from '@craftjs/layers';
import { LayerHeader } from './LayerHeader';

export type DefaultLayerProps = {
    children?: React.ReactNode;
};

export const LayerItem = ({ children }: DefaultLayerProps) => {
    const {
        id,
        expanded,
        hovered,
        depth,
        connectors: { layer },
    } = useLayer((layer) => ({
        hovered: layer.event.hovered,
        expanded: layer.expanded,
    }));

    const { hasChildCanvases, hidden } = useEditor((state, query) => ({
        hasChildCanvases: query.node(id).isParentOfTopLevelNodes(),
        hidden: state.nodes[id] && state.nodes[id].data.hidden,
    }));

    const layerChildrenClasses = clsx(
        'craft-layer-children',
        'relative',
        hasChildCanvases ? 'ml-[35px] bg-[rgba(255,255,255,0.02)]' : 'ml-0 bg-transparent',
        hasChildCanvases && `
          mr-[5px]//
          mb-[5px]
          mt-[5px]
          [&>*]:overflow-hidden/
          before:content-[' ']
          before:absolute
          before:left-[-19px]
          before:w-[1px]
          before:h-full
          before:bg-slate-300
        `
    );

    return (
        <div ref={layer} className={clsx('gap-4 rounded-lg', hovered && 'bg-slate-100', hasChildCanvases && expanded && 'mb-3', hidden && 'opacity-60')}>
            <LayerHeader />
            {children && (
                <div className={layerChildrenClasses}>
                    {children}
                </div>
            )}
        </div>
    );
};