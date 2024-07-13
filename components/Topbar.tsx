import React from "react";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

export const Topbar: React.FC = () => {
  return (
    <div className="px-4 py-4 mt-12 mb-2 bg-[#cbe8e7]">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Switch id="enable-switch" checked={true} />
          <Label htmlFor="enable-switch">Enable</Label>
        </div>
        <Button variant="outline" size="sm">
          Serialize JSON to console
        </Button>
      </div>
    </div>
  );
};