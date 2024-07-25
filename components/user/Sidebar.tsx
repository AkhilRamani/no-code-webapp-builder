import { Bell, CommandIcon, Home, Package, ShoppingCart, Users } from "lucide-react";
import Link from "next/link";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { useNode, Element } from "@craftjs/core";
import { UserContainer } from "./Container";

export const UserSidebar = () => {
  const {
    connectors: { connect, drag },
  } = useNode();

  return (
    <div ref={(ref) => connect(drag(ref))} className="grid h-full w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
      <div className="hidden border-r bg-muted/40 md:block">
        <div className="flex h-full max-h-screen flex-col gap-2">
          <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
            <Link href="#" className="flex items-center gap-2 font-semibold" prefetch={false}>
              <CommandIcon className="h-6 w-6" />
              <span className="">Company</span>
            </Link>

            <Button variant="outline" size="icon" className="ml-auto h-8 w-8">
              <Bell className="h-4 w-4" />
            </Button>
          </div>
          <div className="flex-1">
            <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
              <Link href="#" className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary">
                <Home className="h-4 w-4" />
                Dashboard
              </Link>
              <Link href="#" className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary">
                <ShoppingCart className="h-4 w-4" />
                Orders
                <Badge className="ml-auto flex h-6 w-6 shrink-0 items-center justify-center rounded-full">6</Badge>
              </Link>
              <Link href="#" className="flex items-center gap-3 rounded-lg bg-muted px-3 py-2 text-primary transition-all hover:text-primary">
                <Package className="h-4 w-4" />
                Products{" "}
              </Link>
              <Link href="#" className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary">
                <Users className="h-4 w-4" />
                Customers
              </Link>
            </nav>
          </div>
        </div>
      </div>
      <Element id='sidebar-page' is={UserContainer} canvas>
        {/* <Element id='siedbar-page-name' */}
      </Element>
    </div >
  );
};
