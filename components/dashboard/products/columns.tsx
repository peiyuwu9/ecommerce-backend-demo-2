"use client";

import { ColumnDef } from "@tanstack/react-table";
import { dollarFormatter } from "@/lib/utils";
import { Archive } from "lucide-react";
import { RowActions } from "./row-actions";

export interface ProductColumnType {
  id: string;
  name: string;
  category: string;
  netWeight: number;
  price: number;
  quantity: number;
  isArchived: boolean;
  createdAt: Date;
}

export const columns: ColumnDef<ProductColumnType>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "category",
    header: () => <div className="text-center">Category</div>,
    cell: ({ row }) => (
      <div className="text-center">{row.original.category}</div>
    ),
  },
  {
    accessorKey: "netWeight",
    header: () => <div className="text-center">Net Weight</div>,
    cell: ({ row }) => (
      <div className="text-center">{row.original.netWeight} g</div>
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
    cell: ({ row }) => (
      <div className="flex justify-center">
        {row.original.isArchived && <Archive className="text-brand-disable" />}
      </div>
    ),
  },
  {
    id: "actions",
    cell: ({ row }) => <RowActions data={row.original} />,
  },
];
