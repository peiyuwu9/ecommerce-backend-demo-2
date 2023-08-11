"use server";

import prismaDb from "@/lib/prismaDb";

export async function updateCategory(id: string, name: string) {
  try {
    if (!name) throw new Error("Missing name");

    const category = await prismaDb.category.update({
      where: { id },
      data: { name },
    });

    return category;
  } catch (error) {
    console.log("[updateCategory]", error);
    throw error;
  }
}
