import { Category } from "@prisma/client";
import { notFound } from "next/navigation";

import { getCategory } from "@/actions/category/getCategory";

import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { CategoryForm } from "@/components/dashboard/categories/category-form";

export default async function Category({
  params,
}: {
  params: { categoryId: string };
}) {
  const isEdit = params.categoryId !== "new";
  let category: Category | null = null;

  if (params.categoryId !== "new") {
    category = await getCategory(params.categoryId);
    if (!category) notFound();
  }

  return (
    <>
      <Heading title={`${isEdit ? "Edit Category" : "New Category"}`}></Heading>
      <Separator />
      <CategoryForm existingCategory={category} />
    </>
  );
}
