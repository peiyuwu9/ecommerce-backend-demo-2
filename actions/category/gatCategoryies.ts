"use server";

import prismaDb from "@/lib/prismaDb";

export async function getCategories() {
  try {
    const categories = await prismaDb.category.findMany({
      orderBy: { name: "asc" },
    });

    return categories;
  } catch (error) {
    console.log("[getCategories]", error);
    throw error;
  }
}
