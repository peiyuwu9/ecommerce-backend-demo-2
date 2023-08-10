"use server";

import { imageUploader } from "@/lib/cloudflare";
import prismaDb from "@/lib/prismaDb";
import { imageProcessor } from "@/lib/utils";

export async function createProduct(formData: FormData) {
  try {
    console.log("formData", formData);
    // Prepare data for database
    const data = {
      name: formData.get("name") as string,
      category: formData.get("category") as string,
      netWeight: parseInt(formData.get("netWeight") as string),
      price: parseFloat(formData.get("price") as string),
      quantity: parseInt(formData.get("quantity") as string),
      isArchived: (formData.get("isArchived") as string) === "true",
    };

    // Prepare files for cloudflare
    const files = [];
    for (const key of formData.keys()) {
      if (!key.includes("file") && !key.includes("url")) continue;

      const matchedDigit = key.replace(/[^0-9]/g, "");
      if (!matchedDigit) continue;

      const index = parseInt(matchedDigit[0]) - 1;

      if (!files[index]) files[index] = new Map().set("index", index);

      const keyName = key.replace(/[0-9]/g, "");

      if (keyName === "file") {
        const value = formData.get(key) as File;
        files[index].set(keyName, await imageProcessor(value));
        files[index].set("type", value.type);
      } else if (keyName === "url") {
        const value = formData.get(key) as string;
        files[index].set(keyName, value);
      }
    }

    // Check missing data
    let missingInformation: string[] = [];
    for (const [key, value] of Object.entries(data)) {
      if (key === "name" && !value) {
        missingInformation.push("name");
        continue;
      }
      if (key === "catagory" && !value) {
        missingInformation.push("category");
        continue;
      }
      if (key === "netWeight" && typeof value === "number" && isNaN(value)) {
        missingInformation.push("net weight");
        continue;
      }
      if (key === "price" && typeof value === "number" && isNaN(value)) {
        missingInformation.push("price");
        continue;
      }
      if (key === "quantity" && typeof value === "number" && isNaN(value)) {
        missingInformation.push("quantity");
        continue;
      }
      if (files.length === 0) {
        missingInformation.push("image");
        continue;
      }
    }
    if (missingInformation.length > 0)
      throw new Error(`Missing ${missingInformation.join(", ")} information`);

    // Create product to get id
    const preProduct = await prismaDb.product.create({ data });

    // Upload images to Cloudflare
    const imageUrls = await imageUploader(preProduct.id, files);

    // Update image urls
    const product = await prismaDb.product.update({
      where: { id: preProduct.id },
      data: { imageUrls },
    });

    return product;
  } catch (error) {
    console.log("[createProduct]", error);
    return null;
  }
}
