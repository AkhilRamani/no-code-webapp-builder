import { useEditor } from '@craftjs/core';
import React from 'react';
import clsx from 'clsx';
import { useLayer } from '@craftjs/layers';
import { ChevronDown, Circle, Eye, Linkedin } from 'lucide-react';
import { EditableLayerName } from './EditableLayerName';

export const LayerHeader = () => {
    const {
        id,
        depth,
        expanded,
        children,
        connectors: { drag, layerHeader },
        actions: { toggleLayer },
    } = useLayer((layer) => ({
        expanded: layer.expanded,
    }));

    const { hidden, actions, selected, topLevel } = useEditor((state, query) => ({
        hidden: state.nodes[id] && state.nodes[id].data.hidden,
        selected: query.getEvent('selected').first() === id,
        topLevel: query.node(id).isTopLevelCanvas(),
    }));

    const hideClasses = clsx(
        'relative ml-2 transition-all duration-400 ease-[cubic-bezier(0.19,1,0.22,1)] cursor-pointer',
        'after:content-[""] after:w-[1.5px] after:absolute after:left-[1.5px] after:top-[2px] after:transform after:rotate-[-45deg] after:transition-all after:duration-400 after:ease-[cubic-bezier(0.19,1,0.22,1)] after:origin-[0%_0%]',
        // hidden ? 'after:h-full after:opacity-50' : 'after:h-0 after:opacity-100',
        hidden ? 'after:h-full' : 'after:h-0',
        selected ? 'after:bg-white' : 'after:bg-[#808184]',
    );

    return (
        <div ref={drag} className={clsx('flex flex-row mb-1 items-center p-[6px_10px] rounded-lg tracking-wide', selected ? 'bg-sky-500 text-white font-semibold' : 'bg-transparent text-slate-600')}>
            {children && children?.length ? <div
                className={clsx(
                    'w-[14px] h-[14px] flex items-center justify-center origin-center transition-transform duration-400 ease-[cubic-bezier(0.19,1,0.22,1)] opacity-70 cursor-pointer',
                    expanded ? 'rotate-180' : 'rotate-0')}
                onMouseDown={toggleLayer}
            >
                <ChevronDown />
            </div> : <div className='w-[14px]' />}

            <div className={'flex-1 ml-1 overflow-hidden'}>
                <div ref={layerHeader} className={`flex ml-[${depth * 10}px] items-center`}>
                    <div className="layer-name text-xs w-full">
                        <EditableLayerName />
                    </div>
                    {topLevel && (
                        <div className={'ml-[-22px] mr-[10px]'}>
                            <Linkedin className='w-4 h-4' />
                        </div>
                    )}
                </div>
            </div>

            <div
                className={hideClasses}
                onClick={() => actions.setHidden(id, !hidden)}
            >
                {/* <Eye className={clsx('h-3 w-3', hidden && 'opacity-30')} /> */}
                <Eye className={clsx('h-3 w-3')} />
            </div>
        </div>
    );
};