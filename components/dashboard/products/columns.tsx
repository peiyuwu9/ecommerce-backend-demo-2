"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Product } from "@prisma/client";
import { dollarFormatter } from "@/lib/utils";

export const columns: ColumnDef<Product>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "netWeight",
    header: () => <div className="text-center">Net Weight</div>,
    cell: ({ row }) => (
      <div className="text-center">{row.original.netWeight} g</div>
    ),
  },
  {
    accessorKey: "category",
    header: () => <div className="text-center">Category</div>,
    cell: ({ row }) => (
      <div className="text-center">{row.original.category}</div>
    ),
  },
  {
    accessorKey: "price",
    header: () => <div className="text-center">Price</div>,
    cell: ({ row }) => (
      <div className="text-center">
        {dollarFormatter.format(row.original.price)}
      </div>
    ),
  },
  {
    accessorKey: "quantity",
    header: () => <div className="text-center">Quantity</div>,
    cell: ({ row }) => (
      <div className="text-center">{row.original.quantity}</div>
    ),
  },
  {
    accessorKey: "isArchived",
    header: () => <div className="text-center">Archived</div>,
  },
];
