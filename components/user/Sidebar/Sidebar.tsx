import { Bell, CommandIcon, Home, icons, Package, ShoppingCart, Users } from "lucide-react";
import Link from "next/link";
import { Button } from "../../ui/button";
import { Badge } from "../../ui/badge";
import { useNode, Element, UserComponentConfig, UserComponent } from "@craftjs/core";
import { UserContainer } from "../Container";
import { UserHeader } from "../Header";
import { useState } from "react";
import clsx from "clsx";
import { SidebarSettings } from "./SidebarSettings";
import { defaultSidebarMenus, UserSidebarMenuItem } from "./useSidebar.hook";
import { IconsLucide } from "@/components/common/IconsLucide";

export interface UserSidebarProps {
  menus: UserSidebarMenuItem[]
}

export const UserSidebar: UserComponent = ({ menus }) => {
  const {
    connectors: { connect, drag },
  } = useNode();

  // const { menus } = useSidebar()

  // console.log(menus)

  const [selected, setSelected] = useState<number>(3);

  return (
    <div ref={(ref) => connect(drag(ref))} className="grid h-full w-full cols-2 lg:grid-cols-[280px_1fr]">
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
            <nav className="grid items-start px-2 text-sm font-medium lg:px-4 gap-1">
              {menus?.map(({ id, name, icon, badgeText }: UserSidebarMenuItem) => (
                <Link
                  key={`${id}_sbm`}
                  href="#"
                  className={clsx('flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary', selected === id && 'bg-slate-200 text-primary')}
                  onClick={() => setSelected(id)}
                >
                  <IconsLucide name={icon} className="h-4 w-4" />
                  {name}
                  {badgeText && <Badge className="ml-auto flex h-6 w-6 shrink-0 items-center justify-center rounded-full">{badgeText}</Badge>}
                </Link>
              ))}
            </nav>
          </div>
        </div>
      </div>
      <Element id='sidebar-page' is={UserContainer} classNames={{ all: 'flex flex-col overflow-auto' }} canvas>
        {/* <Element id='siedbar-page-name' */}
        {/* <Element is={UserContainer} classNames={{ all: 'h-[60px] border-b bg-muted/40' }} canvas>
          <UserText text="Title text" fontSize="20px" />
        </Element> */}
        <UserHeader />
        <Element id='page contents' is={UserContainer} classNames={{ padding: 'p-4 h-full overflow-auto' }} canvas>

        </Element>
      </Element>
    </div >
  );
};

UserSidebar.craft = {
  displayName: 'Sidebar',
  props: {
    menus: defaultSidebarMenus
  },
  related: {
    settings: SidebarSettings
  },
}