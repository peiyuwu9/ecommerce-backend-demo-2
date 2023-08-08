"use server";

import prismaDb from "@/lib/prismaDb";

export async function getProduct(id: string) {
  try {
    const product = await prismaDb.product.findUnique({
      where: { id },
    });
    return product;
  } catch (error) {
    console.log("[getProduct]", error);
    return null;
  }
}
