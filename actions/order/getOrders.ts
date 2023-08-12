"use server";

import prismaDb from "@/lib/prismaDb";

export async function getOrders() {
  try {
    const orders = await prismaDb.order.findMany({
      orderBy: { createdAt: "desc" },
    });

    return orders;
  } catch (error) {
    console.log("[getOrders]", error);
    throw error;
  }
}
