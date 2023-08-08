"use server";

import prismaDb from "@/lib/prismaDb";

export async function deleteCategory(id: string) {
  try {
    const category = await prismaDb.category.delete({ where: { id } });

    console.log("delete category", category);

    return category;
  } catch (error) {
    console.log("[deleteCategory]", error);
    throw error;
  }
}
