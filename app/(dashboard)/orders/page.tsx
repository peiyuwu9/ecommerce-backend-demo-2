import { getOrders } from "@/actions/order/getOrders";

import { columns } from "@/components/dashboard/orders/columns";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { DataTable } from "@/components/ui/data-table";

export default async function Orders() {
  const orders = await getOrders();

  return (
    <>
      <Heading title="Order List"></Heading>
      <Separator className="opacity-0" />
      <DataTable columns={columns} data={orders} searchKey="status" />
    </>
  );
}
