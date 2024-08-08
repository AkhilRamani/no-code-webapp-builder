import React from "react";
import { Button } from "@/components/ui/button";
import { useEditor } from "@craftjs/core";
import { Settings2Icon, Trash2Icon } from "lucide-react";
import clsx from "clsx";

export const SettingsPanel = () => {
  const { selected, actions, enabled } = useEditor((state, query) => {
    const [currentNodeId] = state.events.selected;

    let selected;

    if (currentNodeId) {
      selected = {
        id: currentNodeId,
        name: state.nodes[currentNodeId].data.name,
        displayName: state.nodes[currentNodeId].data.displayName,
        settings: state.nodes[currentNodeId].related && state.nodes[currentNodeId].related.settings,
        isDeletable: query.node(currentNodeId).isDeletable(),
      };
    }

    return { selected, enabled: state.options.enabled };
  });

  return (
    // selected && (
    // <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr] bg-[#FAFAFA]">
    <div className={clsx("border-l bg-white shrink-0 transition-all duration-300 ease-out w-72", selected ? 'mr-0' : '-mr-72')}>
      {selected && <div className="flex h-full max-h-screen flex-col">
        <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6 shrink-0">
          <div className="flex items-center gap-2 font-semibold" >
            <Settings2Icon className="h-6 w-6" />
            <span className="">{selected.displayName}</span>
          </div>

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

        <div className="h-full overflow-auto pb-10">{selected.settings && React.createElement(selected.settings)}</div>
      </div>}

    </div>
    // </div>

  );
};
