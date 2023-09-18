"use client";

import { ColumnDef } from "@tanstack/react-table";
import { dateFormatter } from "@/lib/utils";
import { RowActions } from "./row-actions";

export interface OrderColumnType {
  id: string;
  status: string;
  createdAt: Date;
}

const columns: ColumnDef<OrderColumnType>[] = [
  {
    accessorKey: "id",
    header: "Order Number",
  },
  {
    accessorKey: "status",
    header: () => <div className="text-center">Status</div>,
    cell: ({ row }) => <div className="text-center">{row.original.status}</div>,
  },
  {
    accessorKey: "createdAt",
    header: () => <div className="text-center">Create Date</div>,
    cell: ({ row }) => (
      <div className="text-center">
        {dateFormatter.format(row.original.createdAt)}
      </div>
    ),
  },
  {
    id: "actions",
    cell: ({ row }) => <RowActions data={row.original} />,
  },
];

export { columns };
