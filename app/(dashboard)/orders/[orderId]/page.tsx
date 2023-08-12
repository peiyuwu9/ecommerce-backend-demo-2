import { Order } from "@prisma/client";
import { notFound } from "next/navigation";

import { getOrder } from "@/actions/order/getOrder";

import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";

import { dateFormatter } from "@/lib/utils";

export default async function Order({
  params,
}: {
  params: { orderId: string };
}) {
  const order = await getOrder(params.orderId);

  if (!order) notFound();

  console.log("order", order);

  return (
    <>
      <Heading title={`Order#${order.id}`}></Heading>
      <Separator />
      <p>{dateFormatter.format(order.createdAt)}</p>
      <p>{order.username}</p>
      <p>{order.phone}</p>
      <p>{order.address}</p>
      <p>{order.productIds}</p>
      <p>{order.amount}</p>
      <p>{order.status}</p>
    </>
  );
}
