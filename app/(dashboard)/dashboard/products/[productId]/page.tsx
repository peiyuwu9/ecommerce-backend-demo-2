import { Category, Product } from "@prisma/client";

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
  let data: Data = {
    product: null,
    categories: null,
  };

  if (params.productId === "new") {
    const categories = await getCategories();
    data.product = null;
    data.categories = categories;
  } else {
    const res = await Promise.all([
      getProduct(params.productId),
      getCategories(),
    ]);
    data.product = res[0];
    data.categories = res[1];
  }

  return (
    <>
      <Heading
        title={`${params.productId === "new" ? "New Product" : "Edit Product"}`}
      ></Heading>
      <Separator />
      <ProductForm
        existingProduct={data.product}
        categories={data.categories}
        isEdit={false}
      />
    </>
  );
}
