"use server";

import { imageUploader } from "@/lib/cloudflare";
import prismaDb from "@/lib/prismaDb";
import { imageProcessor } from "@/lib/utils";

type DataType = {
  [key: string]: string | number | boolean | string[];
};

export async function updateProduct(id: string, formData: FormData) {
  try {
    // Prepare data for database
    const data: DataType = {};
    for (const key of formData.keys()) {
      if (key === "name") {
        data.name = formData.get(key) as string;
        continue;
      }
      if (key === "category") {
        data.category = formData.get(key) as string;
        continue;
      }
      if (key === "netWeight") {
        data.netWeight = parseInt(formData.get(key) as string);
        continue;
      }
      if (key === "price") {
        data.price = parseFloat(formData.get(key) as string);
        continue;
      }
      if (key === "quantity") {
        data.quantity = parseInt(formData.get(key) as string);
        continue;
      }
      if (key === "isArchived") {
        data.isArchived = (formData.get(key) as string) === "true";
        continue;
      }
    }

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

    const filesNeedUpload = files.filter((file) => file.has("file"));
    const filesNoNeedUpload = files.filter((file) => !file.has("file"));

    // Prepare image urls
    if (filesNeedUpload.length > 0) {
      // Upload images to Cloudflare
      const imageUrls = await imageUploader(id, filesNeedUpload);
      filesNeedUpload.forEach((file, index) => {
        if (!data.imageUrls) data.imageUrls = [];
        if (Array.isArray(data.imageUrls))
          data.imageUrls[file.get("index") as number] = imageUrls[index];
      });
    }

    filesNoNeedUpload.forEach((file) => {
      if (!data.imageUrls) data.imageUrls = [];
      if (Array.isArray(data.imageUrls))
        data.imageUrls[file.get("index") as number] = file.get("url");
    });

    const product = await prismaDb.product.update({ where: { id }, data });

    return product;
  } catch (error) {
    console.log("[updateProduct]", error);
    throw error;
  }
}
