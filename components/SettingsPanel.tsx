import React from "react";
import { Button } from "@/components/ui/button";
import { useEditor } from "@craftjs/core";
import { Settings2Icon, Trash2Icon } from "lucide-react";
import Link from "next/link";

export const SettingsPanel = () => {
  const { selected, actions } = useEditor((state, query) => {
    const [currentNodeId] = state.events.selected;

    let selected;

    if (currentNodeId) {
      selected = {
        id: currentNodeId,
        name: state.nodes[currentNodeId].data.name,
        settings: state.nodes[currentNodeId].related && state.nodes[currentNodeId].related.settings,
        isDeletable: query.node(currentNodeId).isDeletable(),
      };
    }

    return { selected };
  });

  return (
    selected && (
      // <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr] bg-[#FAFAFA]">
      <div className="hidden border-l bg-white md:block w-72 shrink-0">
        <div className="flex h-full max-h-screen flex-col gap-2">
          <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
            <Link href="#" className="flex items-center gap-2 font-semibold" prefetch={false}>
              <Settings2Icon className="h-6 w-6" />
              <span className="">{selected.name}</span>
            </Link>

            {selected.isDeletable && (
              <Button
                variant="outline"
                size="icon"
                onClick={() => actions.delete(selected.id)}
                className="ml-auto h-8 w-8 bg-red-100 border-red-300 hover:bg-red-200"
              >
                <Trash2Icon className="h-4 w-4 text-red-700" />
              </Button>
            )}
          </div>

          <div className="">{selected.settings && React.createElement(selected.settings)}</div>
        </div>
      </div>
      // </div>
    )
  );
};
