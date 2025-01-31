"use client";

import ThemeToggle from "@/components/theme-toggle";
import Link from "next/link";
import { Dock, DockIcon } from "@/components/ui/dock";
import { Code, Home } from "lucide-react";
import { usePathname } from "next/navigation";

export function AppDock() {
  const pathname = usePathname();
  return (
    <header className="relative">
      <Dock className="ml-auto mr-10">
        <DockIcon className={pathname === "/" ? "bg-muted" : ""}>
          <Link href="/">
            <Home className="size-6" />
          </Link>
        </DockIcon>
        <DockIcon
          className={pathname.startsWith("/examples") ? "bg-muted" : ""}
        >
          <Link href="/examples">
            <Code />
          </Link>
        </DockIcon>
        <DockIcon>
          <ThemeToggle />
        </DockIcon>
      </Dock>
    </header>
  );
}
