import React from 'react';
import clsx from 'clsx';
import { usePageBinaryStore } from '@/lib/store/usePageBinaryStore';
import { CircleAlert, CircleArrowUp, CircleCheck, RefreshCcw } from 'lucide-react';
import { Button } from '../ui/button';

export const PageSaveHandler: React.FC = () => {
    const { saveFailed, saving } = usePageBinaryStore(({ saveFailed, saving }) => ({ saveFailed, saving }))

    return (
        <div className={clsx('relative h-9 w-[5.6rem] px-3.5 rounded-lg flex items-center justify-between', saveFailed ? 'bg-red-700/10' : saving ? 'bg-slate-100' : 'bg-green-700/10')}>
            {saveFailed ?
                <>
                    <p className='text-xs tracking-wide text-red-900/90'>Failed</p>
                    <CircleAlert className='w-[1.3rem] h-[1.3rem] -mr-0.5 fill-red-900/70 text-red-100 stroke-[2.5]' />
                </>
                :
                saving ?
                    <>
                        <p className='text-xs tracking-wide opacity-70'>Saving</p>
                        <CircleArrowUp className='w-[1.25rem] h-[1.25rem] fill-slate-900/70 text-slate-100 -mr-0.5 stroke-[1.7]' />
                    </>
                    : <>
                        <p className='text-xs tracking-wide text-green-900/90'>Saved</p>
                        <CircleCheck className='w-[1.3rem] h-[1.3rem] fill-green-900/70 text-slate-100 -mr-0.5' />
                    </>
            }
            {saveFailed && <Button variant='outline' onClick={() => { }} size='icon' className='absolute -right-2 -top-2 text-xs h-6 w-6 rounded-full -mr-0.5 shadow-md'>
                <RefreshCcw className='w-3 h-3 stroke-[2.5] opacity-90' />
            </Button>}
        </div>

    );
};