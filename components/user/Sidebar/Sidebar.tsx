import { Bell, CommandIcon } from "lucide-react";
import Link from "next/link";
import { Button } from "../../ui/button";
import { Badge } from "../../ui/badge";
import { useNode, Element, UserComponent, useEditor } from "@craftjs/core";
import { UserContainer } from "../container/Container";
import { UserHeader } from "../Header";
import { useCallback } from "react";
import clsx from "clsx";
import { SidebarSettings } from "./SidebarSettings";
import { defaultSidebarMenus, UserSidebarMenuItem } from "./useSidebar.hook";
import { IconsLucide } from "@/components/common/IconsLucide";

export interface UserSidebarProps {
  menus: UserSidebarMenuItem[];
  selectedMenu: number
}

export const UserSidebar: UserComponent = ({ menus }) => {
  const {
    connectors: { connect, drag }, id, selectedMenu, actions: { setProp: setSidebarProp },
  } = useNode(node => ({
    selectedMenu: node.data.props.selectedMenu
  }));

  const { actions, query } = useEditor();

  const handleRef = useCallback((ref: HTMLSpanElement | null) => {
    if (ref) connect(drag(ref));
  }, []);

  const handleMenuClick = (previousMenuId: number, clickedMenuId: number) => {
    setSidebarProp((props: UserSidebarProps) => props.selectedMenu = clickedMenuId)

    const linkedNodes = query.node(id).get().data.linkedNodes
    const prevMenuNodeId = linkedNodes[`${previousMenuId}-sb-page`];
    const newMenuNodeId = linkedNodes[`${clickedMenuId}-sb-page`];

    actions.setProp(prevMenuNodeId, props => props.classNames = { ...props.classNames, hidden: 'hidden' })
    actions.setProp(newMenuNodeId, props => props.classNames = { ...props.classNames, hidden: undefined })

    // const freshNode: Node = {
    //   data: {
    //     type: 'h1',
    //     props: {
    //       children: "322222",
    //       className: "animate-in duration-200"
    //     }
    //   }
    // };
    // // Create a new valid Node object from the fresh Node
    // const node = query.parseFreshNode(freshNode).toNode();
    // actions.add(node, linkedNodeId)
  };

  return (
    <div ref={handleRef} className="grid h-full w-full cols-2 lg:grid-cols-[280px_1fr]">
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
              {menus?.map(({ id: menuId, name, icon, badgeText }: UserSidebarMenuItem) => (
                <Link
                  key={`${menuId}_sbm`}
                  href="#"
                  className={clsx('flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary', selectedMenu === menuId && 'bg-slate-200 text-primary')}
                  onClick={() => handleMenuClick(selectedMenu, menuId)}
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

      {menus?.map(({ id: menuId, name }: UserSidebarMenuItem) => {
        const template = `${menuId}-sb-page`
        return (
          <Element key={template} id={template} is={UserContainer} classNames={{ all: 'flex flex-col overflow-auto', hidden: selectedMenu === menuId ? undefined : 'hidden' }} canvas>
            <UserHeader title={name} />
            <Element id='page contents' is={UserContainer} classNames={{ all: 'p-4 h-full overflow-auto border-none' }} canvas>

            </Element>
          </Element>
        )
      })}
    </div >
  );
};

UserSidebar.craft = {
  displayName: 'Sidebar',
  props: {
    menus: defaultSidebarMenus,
    selectedMenu: 1
  },
  related: {
    settings: SidebarSettings
  },
}