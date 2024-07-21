import React from 'react';
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Form } from "@/components/ui/form"
import { Slider } from "@/components/ui/slider"
import { useEditor } from '@craftjs/core';
import { Sheet, SheetContent, SheetTrigger } from './ui/sheet';
import { BellIcon, HomeIcon, MenuIcon, Package2Icon, Settings2Icon, SettingsIcon, ShoppingCartIcon } from 'lucide-react';
import Link from 'next/link';
import { Label } from './ui/label';
import { Input } from './ui/input';

export const SettingsPanel = () => {
  const { selected } = useEditor((state) => {
    const [currentNodeId] = state.events.selected;

    let selected;

    if (currentNodeId) {
      selected = {
        id: currentNodeId,
        name: state.nodes[currentNodeId].data.name,
        settings: state.nodes[currentNodeId].related && state.nodes[currentNodeId].related.settings
      };
    }

    return { selected }
  })

  return selected && (
    <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
      <div className="hidden border-r bg-muted/40 md:block">
        <div className="flex h-full max-h-screen flex-col gap-2">
          <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
            <Link href="#" className="flex items-center gap-2 font-semibold" prefetch={false}>
              <Settings2Icon className="h-6 w-6" />
              <span className="">{selected.name} settings</span>
            </Link>
            <Button variant="outline" size="icon" className="ml-auto h-8 w-8">
              <BellIcon className="h-4 w-4" />
              <span className="sr-only">Toggle notifications</span>
            </Button>
          </div>
          <div className="">
            {
              selected.settings && React.createElement(selected.settings)
            }
          </div>
        </div>
      </div>
    </div>
  )
}