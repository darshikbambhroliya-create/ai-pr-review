"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, GitBranch, Settings } from "lucide-react";

import {
  DASHBOARD_NAV_ITEMS,
  type DashboardRoute,
} from "@/features/dashboard/lib/routes";

import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

const NAV_ICONS = {
  "layout-dashboard": LayoutDashboard,
  "folder-git-2": GitBranch,
  github: GitBranch,
  settings: Settings,
} as const;

function isActive(pathname: string, href: DashboardRoute) {
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function DashboardNav() {
  const pathname = usePathname();

  return (
    <SidebarGroup>
      <SidebarGroupLabel>Workspace</SidebarGroupLabel>
      <SidebarGroupContent>
        <SidebarMenu>
          {DASHBOARD_NAV_ITEMS.map((item) => {
            const Icon = NAV_ICONS[item.icon];
            const active = isActive(pathname, item.href);
            return (
              <SidebarMenuItem key={item.href}>
                <SidebarMenuButton isActive={active} tooltip={item.title}>
                  <Link href={item.href} className="flex items-center gap-2">
                    <Icon className="h-4 w-4" />
                    <span>{item.title}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            );
          })}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}
