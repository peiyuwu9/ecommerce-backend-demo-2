"use client";

import Link from "next/link";
import { useSelectedLayoutSegment } from "next/navigation";
import { routes } from "@/lib/constants";
import { cn } from "@/lib/utils";

import { BarChartBig, Eye, Leaf, List, Settings } from "lucide-react";

const Tabs = () => {
  const segment = useSelectedLayoutSegment();
  const navLinks = Object.values(routes).filter(
    (route: RouteType) => route.label === "dashboard-nav"
  );

  function selectIcon(name: string) {
    let icon = null;
    switch (name) {
      case routes.overview.name:
        icon = <Eye className="tab-icons" />;
        break;
      case routes.products.name:
        icon = <Leaf className="tab-icons" />;
        break;
      case routes.categories.name:
        icon = <List className="tab-icons" />;
        break;
      case routes.settings.name:
        icon = <Settings className="tab-icons" />;
        break;
      case routes.analytics.name:
        icon = <BarChartBig className="tab-icons" />;
        break;
      default:
        icon = <></>;
    }
    return icon;
  }

  return (
    <div className="inline-block bg-brand-background px-2 py-1.5 mx-8 my-2 rounded-[12px] drop-shadow-md">
      {navLinks.map((route) => (
        <Link
          key={route.name}
          href={route.pathname}
          className={cn(
            "inline-block pl-1 pr-2.5 py-0.5 rounded-[8px]",
            (!segment && routes.overview.name === route.name) ||
              segment === route.name.toLowerCase()
              ? "bg-slate-100 transition"
              : "hover:opacity-70"
          )}
        >
          {selectIcon(route.name)}
          {route.name}
        </Link>
      ))}
    </div>
  );
};

export default Tabs;
