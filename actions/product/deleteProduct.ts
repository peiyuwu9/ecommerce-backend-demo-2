"use server";

import prismaDb from "@/lib/prismaDb";

export async function deleteProduct(id: string) {
  try {
    const product = await prismaDb.product.delete({ where: { id } });

    return product;
  } catch (error) {
    console.log("[deleteProduct]", error);
    throw error;
  }
}
