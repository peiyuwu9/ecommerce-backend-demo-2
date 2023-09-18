"use client";

import { useRouter } from "next/navigation";
import { MoreVertical, GanttChartSquare } from "lucide-react";
import { OrderColumnType } from "./columns";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { routes } from "@/lib/constants";

export interface RowActionsProps {
  data: OrderColumnType;
}

const RowActions: React.FC<RowActionsProps> = ({ data }) => {
  const router = useRouter();

  return (
    <div className="flex justify-end">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Actions</span>
            <MoreVertical className="h-5 w-5" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem
            onClick={() =>
              router.push(`${routes.orders.pathname}/${data.id}`)
            }
          >
            <GanttChartSquare className="mr-2 h-4 w-4" /> Detail
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export { RowActions };
