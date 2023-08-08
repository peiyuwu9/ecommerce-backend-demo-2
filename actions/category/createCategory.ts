"use server";

import prismaDb from "@/lib/prismaDb";

export async function createCategory(name: string) {
  try {
    if (!name) throw new Error("Missing name");

    const category = await prismaDb.category.create({ data: { name } });

    return category;
  } catch (error) {
    console.log("[createCategory]", error);
    throw error;
  }
}
