import Link from "next/link";
import { Plus } from "lucide-react";

import { columns } from "@/components/dashboard/categories/columns";
import { Button } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { DataTable } from "@/components/ui/data-table";

import prismaDb from "@/lib/prismaDb";
import { routes } from "@/lib/constants";

export default async function Products() {
  const categories = await prismaDb.category.findMany({
    orderBy: {
      name: "desc",
    },
  });

  return (
    <>
      <Heading title="Category List">
        <Link href={routes.newCategory.pathname}>
          <Button variant={"shucha"} size={"sm"}>
            <Plus className="h-4 w-4 mr-1" />
            {routes.newCategory.name}
          </Button>
        </Link>
      </Heading>
      <Separator className="opacity-0" />
      <DataTable columns={columns} data={categories} searchKey="name" />
    </>
  );
}
