import { Order } from "@prisma/client";
import { notFound } from "next/navigation";

import { getOrder } from "@/actions/order/getOrder";

import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";

import { cn, dateFormatter } from "@/lib/utils";

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
      <Heading title={`Order#${order.id}`}>
        <p
          className={`${cn(
            "text-2xl",
            order.status === "Accepted" && "text-red-500"
          )}`}
        >
          {order.status}
        </p>
      </Heading>
      <Separator />
      <p>Order Date: {dateFormatter.format(order.createdAt)}</p>
      <p>Name: {order.username}</p>
      <p>Phone Number: {order.phone}</p>
      <p>Address: {order.address}</p>
      <p>{order.productIds}</p>
      <p>Total: {order.amount}</p>
    </>
  );
}
