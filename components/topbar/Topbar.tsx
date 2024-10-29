import React from "react";
import { Button } from "@/components/ui/button";
import { useEditor } from "@craftjs/core";
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
  const { actions, enabled } = useEditor((state) => ({
    enabled: state.options.enabled,
  }));

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
