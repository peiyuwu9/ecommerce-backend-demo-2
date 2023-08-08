"use server";

import prismaDb from "@/lib/prismaDb";

export async function getCategories() {
  try {
    const categories = await prismaDb.category.findMany();

    return categories;
  } catch (error) {
    console.log("[getCategories]", error);
    return null;
  }
}
