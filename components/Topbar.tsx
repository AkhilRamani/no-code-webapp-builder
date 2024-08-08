import React, { useState } from "react";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { useEditor } from "@craftjs/core";
import lz from "lzutf8";
import copy from "copy-to-clipboard";
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from "./ui/sheet";
import { Input } from "./ui/input";

export const Topbar: React.FC = () => {
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

  return (
    <div className="px-4 py-4 border-b">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Switch id="enable-switch" checked={!enabled} onCheckedChange={(value) => actions.setOptions((options) => (options.enabled = !value))} />
          <Label htmlFor="enable-switch">Preview</Label>
        </div>

        <div className="flex gap-4">
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
    </div>
  );
};
