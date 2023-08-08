"use server";

import { upload } from "@/lib/cloudflare";
import prismaDb from "@/lib/prismaDb";
import { imgProcessor } from "@/lib/utils";

export async function createProduct(formData: FormData) {
  try {
    const data = {
      name: formData.get("name") as string,
      category: formData.get("category") as string,
      price: parseFloat(formData.get("price") as string),
      netWeight: parseInt(formData.get("netWeight") as string),
      quantity: parseInt(formData.get("quantity") as string),
    };
    console.log("data", data);

    const file = formData.get("file") as File;
    console.log("file", file);

    if (
      !data.name ||
      !data.category ||
      isNaN(data.price) ||
      isNaN(data.netWeight) ||
      isNaN(data.quantity) ||
      !file
    )
      throw new Error(
        `Missing information, please check current form data: ${JSON.stringify({
          data,
          file,
        })}`
      );

    const preProduct = await prismaDb.product.create({ data });
    console.log("preProduct", preProduct);

    // const imgBuffer = await imgProcessor(file);
    const imgUrl = await upload(preProduct.id, file);
    console.log("imgUrl", imgUrl);

    const product = await prismaDb.product.update({
      where: { id: preProduct.id },
      data: { imgUrl },
    });
    console.log("product", product);

    return product;
  } catch (error) {
    console.log("[createProduct]", error);
  }
}
