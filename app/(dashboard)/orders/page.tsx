import Link from "next/link";
import { Plus } from "lucide-react";

import { getOrders } from "@/actions/order/getOrders";

import { columns } from "@/components/dashboard/orders/columns";
import { Button } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { DataTable } from "@/components/ui/data-table";

import { routes } from "@/lib/constants";

export default async function Orders() {
  const orders = await getOrders();

  return (
    <>
      <Heading title="Order List">
        <Link href={routes.newProduct.pathname}>
          <Button variant={"shucha"} size={"sm"}>
            <Plus className="h-4 w-4 mr-1" />
            {routes.newProduct.name}
          </Button>
        </Link>
      </Heading>
      <Separator className="opacity-0" />
      <DataTable columns={columns} data={orders} searchKey="name" />
    </>
  );
}
