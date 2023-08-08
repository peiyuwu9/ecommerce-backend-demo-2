"use client";

import { ColumnDef } from "@tanstack/react-table";
import { dateFormatter } from "@/lib/utils";
import { RowActions } from "./row-actions";

export interface CategoryColumnType {
  id: string;
  name: string;
  createdAt: Date;
}

const columns: ColumnDef<CategoryColumnType>[] = [
  {
    accessorKey: "name",
    header: "Name",
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
