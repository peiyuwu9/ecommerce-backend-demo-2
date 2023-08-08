"use server";

import prismaDb from "@/lib/prismaDb";

export async function getCategory(id: string) {
  try {
    const category = await prismaDb.category.findUnique({ where: { id } });

    return category;
  } catch (error) {
    console.log("[getCategory]", error);
    return null;
  }
}
