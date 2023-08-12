"use server";

import prismaDb from "@/lib/prismaDb";

export async function getOrder(id: string) {
  try {
    const order = await prismaDb.order.findUnique({
      where: { id },
      include: {
        products: {
          select: {
            name: true,
            price: true,
          },
        },
      },
    });

    return order;
  } catch (error) {
    console.log("[getOrder]", error);
    throw error;
  }
}
