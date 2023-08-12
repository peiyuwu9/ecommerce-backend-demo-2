import { Category, Product } from "@prisma/client";
import { notFound } from "next/navigation";

import { getCategories } from "@/actions/category/gatCategoryies";

import { ProductForm } from "@/components/dashboard/products/product-form";
import { Heading } from "@/components/ui/heading";
import { getProduct } from "@/actions/product/getProduct";
import { Separator } from "@/components/ui/separator";

type Data = {
  product: Product | null;
  categories: Category[] | null;
};

export default async function Product({
  params,
}: {
  params: { productId: string };
}) {
  const isEdit = params.productId !== "new";
  let data: Data = {
    product: null,
    categories: null,
  };

  if (isEdit) {
    const res = await Promise.all([
      getProduct(params.productId),
      getCategories(),
    ]);
    if (!res[0]) notFound();
    data.product = res[0];
    data.categories = res[1];
  } else {
    const categories = await getCategories();
    data.product = null;
    data.categories = categories;
  }

  return (
    <>
      <Heading title={`${isEdit ? "Edit Product" : "New Product"}`}></Heading>
      <Separator />
      <ProductForm
        existingProduct={data.product}
        categories={data.categories}
      />
    </>
  );
}
