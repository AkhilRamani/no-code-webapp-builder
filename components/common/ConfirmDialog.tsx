import { useState } from "react";
import { Button } from "../ui/button"
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "../ui/dialog"
import { Loader2 } from "lucide-react";

export const ConfirmDialog = ({ open, onOpenChange, title, description, async, onConfirm }: { open: boolean, onOpenChange: (open: boolean) => void, title: string, description: string, async?: boolean, onConfirm: () => Promise<void> }) => {
    const [loading, setLoading] = useState(false);

    const handleConfirmSync = async () => {
        setLoading(true);
        await onConfirm();
        setLoading(false);
    }

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="!rounded-2xl p-0 gap-0 flex flex-col overflow-hidden">
                <DialogHeader className="px-5 py-5 border-b-">
                    <DialogTitle>{title}</DialogTitle>
                    <DialogDescription>{description}</DialogDescription>
                </DialogHeader>
                <DialogFooter className="px-5 py-5 shadow-sm flex flex-row items-center justify-end gap-2">
                    <DialogClose asChild>
                        <Button className="w-24 rounded-lg shadow font-semibold tracking-wide">Cancel</Button>
                    </DialogClose>
                    <Button variant="destructive" className="w-24 rounded-lg shadow font-semibold tracking-wide" onClick={async ? onConfirm : handleConfirmSync} disabled={loading}>
                        {loading ? <Loader2 className="h-5 w-5 animate-spin stroke-[2.5]" /> : 'Delete'}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog >
    )
}