import React from "react";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useEditor } from "@craftjs/core";

export const Topbar: React.FC = () => {
  const { actions, query, enabled } = useEditor((state) => ({
    enabled: state.options.enabled,
  }));

  return (
    <div className="px-4 py-4 border-b">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Switch id="enable-switch" checked={enabled} onCheckedChange={(value) => actions.setOptions((options) => (options.enabled = value))} />
          <Label htmlFor="enable-switch">Enable</Label>
        </div>
        <Button
          // variant="outline"
          size="sm"
          onClick={() => {
            console.log(query.serialize());
          }}
        >
          Serialize JSON to console
        </Button>
      </div>
    </div>
  );
};
