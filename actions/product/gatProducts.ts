"use server";

import prismaDb from "@/lib/prismaDb";

export async function getProducts() {
  try {
    const products = await prismaDb.product.findMany({
      orderBy: { createdAt: "desc" },
    });

    return products;
  } catch (error) {
    console.log("[getProducts]", error);
    throw error;
  }
}
