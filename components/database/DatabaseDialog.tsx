import { Button } from "@/components/ui/button"
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Database, Loader2, Plus, Table } from "lucide-react"
import React, { lazy, Suspense, useEffect, useState } from "react"
import { TableSchema, useTableStore } from "@/lib/store/useTableStore"
import { EditTableNamePopover } from "./TableEditPopover"
import { useToggle } from "@/lib/hooks/useToggle.hook.ts"
import clsx from "clsx"

const DatabaseLayout = lazy(() => import("./DatabaseLayout.tsx"));

export const DatabaseDialog = () => {
    const [isOpen, setIsOpen] = useState(false);

    const { tables, updateTables } = useTableStore()
    const [localTables, setLocalTables] = useState<TableSchema[]>([])
    const [isSaving, toggleIsSaving] = useToggle(false);

    useEffect(() => {
        setLocalTables([...tables])
    }, [tables])

    const handleSaveChanges = async () => {
        toggleIsSaving();

        await updateTables(localTables)

        toggleIsSaving();
        setIsOpen(false);
    }

    const createTable = (tableName: string) => {
        setLocalTables(localTables => ([
            ...localTables,
            {
                tableName,
                fields: []
            }
        ]));
    }

    const _onOpenChange = (isOpen: boolean) => {
        setIsOpen(isOpen);
        isOpen && setLocalTables(tables);
    }

    const isTables = localTables && localTables.length;

    return (
        <Dialog open={isOpen} onOpenChange={_onOpenChange}>
            <DialogTrigger asChild>
                <Button size='sm' variant='secondary' className="rounded-lg gap-2 text-muted-foreground hover:bg-slate-200 [&>svg]:hover:opacity-90 hover:text-primary">
                    <Database className="h-[1.1rem] w-[1.1rem] text-secondary fill-primary opacity-65 shrink-0" />
                    {/* Database */}
                </Button>
            </DialogTrigger>

            <DialogContent className="min-w-[70vw] h-5/6 flex flex-col">
                <DialogHeader className="-mx-6 px-6 pb-5 border-b">
                    <DialogTitle>Database</DialogTitle>
                    <DialogDescription>
                        Create tables for your application as you need
                    </DialogDescription>
                </DialogHeader>
                <div className="grow pt-6 pb-2 flex overflow-auto">
                    {/* <DatabaseLayout tables={localTables} setTables={setLocalTables} /> */}
                    <Suspense fallback={<div className="h-full flex flex-1 justify-center"><Loader2 className="m-auto animate-spin h-10 w-10 opacity-40" /></div>}>
                        {isTables ?
                            <DatabaseLayout
                                tables={localTables}
                                setTables={setLocalTables}
                                createTable={createTable}
                            />
                            :
                            <div className="rounded-lg flex flex-1 items-center justify-center flex-col gap-3">
                                <Table className="h-7 w-7 opacity-40" />
                                <h3 className="text-primary/40 font-medium- text-sm text-center">Your database is empty.<br />Create a table to get started.</h3>

                                <EditTableNamePopover onDone={createTable}>
                                    <Button className="gap-2 rounded-lg mt-1" size='sm'>
                                        <Plus className="h-4 w-4" />
                                        Create table
                                    </Button>
                                </EditTableNamePopover>
                            </div>
                        }
                    </Suspense>
                </div>
                <DialogFooter className="self-end">
                    <DialogClose asChild>
                        <Button variant='destructive' className="rounded-lg" disabled={isSaving}>Discard</Button>
                    </DialogClose>

                    {isTables || tables.length ? (
                        <Button
                            type="submit"
                            onClick={handleSaveChanges}
                            className="rounded-lg relative"
                            disabled={isSaving}
                        >
                            <span className={clsx(isSaving && 'invisible')}>Save changes</span>
                            {isSaving && <Loader2 className="absolute h-5 w-5 animate-spin" />}
                        </Button>
                    ) : null}
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
