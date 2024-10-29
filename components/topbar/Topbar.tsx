import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useEditor } from "@craftjs/core";
import lz from "lzutf8";
import copy from "copy-to-clipboard";
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "../ui/sheet";
import { Input } from "../ui/input";
import clsx from "clsx";
import { Play, Undo2 } from "lucide-react";
import { DatabaseDialog } from "../database/DatabaseDialog";
import { useRouter } from "next/navigation";
import { ProjectRename } from "./ProjectRename";
import { usePageStore } from "@/lib/store/usePageStore";
import { PageSaveHandler } from "../pageSave/PageSaveHandler";
import { usePageBinaryStore } from "@/lib/store/usePageBinaryStore";

export const Topbar: React.FC = () => {
  const router = useRouter();
  const { actions, query, enabled } = useEditor((state) => ({
    enabled: state.options.enabled,
  }));

  const onCopyExportClick = () => {
    const json = query.serialize();
    copy(lz.encodeBase64(lz.compress(json)));

    toast("State copied to clipboard");
  };

  const [loadTxt, setLoadTxt] = useState<string>();

  const onLoadClick = () => {
    const json = lz.decompress(lz.decodeBase64(loadTxt as string));
    actions.deserialize(json);

    toast("State loaded");
  };

  const resetPageStore = usePageStore(store => store.resetPageStore);
  const resetPageBinaryStore = usePageBinaryStore(store => store.resetPageBinaryStore);
  const onBackClick = () => {
    resetPageStore();
    resetPageBinaryStore();
    router.push('/dashboard');
  }

  return (
    <div className="bg-zinc-100 z-40">
      <div className={clsx("flex items-center px-4 py-4- h-[4.5rem] bg-white border-b justify-between duration-500 ease-out", !enabled && '-mt-20 mb-10')}>
        <div className="flex gap-3 items-center">
          <Button size='sm' variant='secondary' className="rounded-lg gap-2 text-muted-foreground hover:text-primary hover:bg-slate-200" onClick={onBackClick}>
            <Undo2 className="h-[1.1rem] w-[1.1rem] stroke-[2.7]" />
          </Button>

          <DatabaseDialog />

          <ProjectRename />
        </div>

        <div className="flex gap-4 items-center h-full">
          <PageSaveHandler />

          <Button variant="secondary" size="sm" onClick={onCopyExportClick}>
            Copy page
          </Button>

          <Sheet>
            <SheetTrigger asChild>
              <Button variant="default" size="sm">
                Load page
              </Button>
            </SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <SheetTitle>Load project</SheetTitle>
                <SheetDescription>Load your previous project from exported data</SheetDescription>
              </SheetHeader>
              <div className="py-4 pt-8 flex gap-4">
                <Input onChange={(e) => setLoadTxt(e.target.value)} />

                <SheetClose asChild>
                  <Button onClick={onLoadClick}>Load</Button>
                </SheetClose>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>

      <div className="absolute top-4 flex w-full pointer-events-none">
        <Button className="rounded-xl mx-auto pointer-events-auto" variant={enabled ? 'secondary' : 'default'} size='icon' onClick={() => actions.setOptions((options) => (options.enabled = !options.enabled))}>
          <Play className="h-5 w-5 fill-current" />
        </Button>
      </div>
    </div>
  );
};
