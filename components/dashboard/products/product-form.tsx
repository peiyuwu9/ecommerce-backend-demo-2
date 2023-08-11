"use client";

import { MouseEvent, useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { Category, Product } from "@prisma/client";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-hot-toast";
import { Check, ChevronsUpDown } from "lucide-react";
import deepEqual from "deep-equal";

import { createProduct } from "@/actions/product/createProduct";
import { updateProduct } from "@/actions/product/updateProduct";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { ImageUpload } from "@/components/dashboard/products/image-upload";
import { Input } from "@/components/ui/input";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { routes } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { ProductFormSchemaType, productFormSchema } from "@/lib/zObject";

export interface ProductFormProps {
  existingProduct: Product | null;
  categories: Category[] | null;
}

function transformIncomingData(data: Product | null) {
  if (!data) return { images: [] };
  let newData = {
    ...data,
    images: data.imageUrls
      ? data.imageUrls.map((url) => {
          return { url };
        })
      : [],
  };
  // delete newData.imageUrls;
  return newData;
}

// object index signature type
type FormatDataType = {
  [key: string]: string | Blob;
};

function transformOutgoingData(
  existingProduct: Product | null,
  existingImages: ImageObjectType[] | null,
  data: ProductFormSchemaType
) {
  const formData = new FormData();
  let formatData: FormatDataType = {};

  if (existingProduct) {
    if (data.name !== existingProduct.name) formatData.name = data.name;
    if (data.category !== existingProduct.category)
      formatData.category = data.category;
    if (data.netWeight !== existingProduct.netWeight)
      formatData.netWeight = data.netWeight.toString();
    if (data.price !== existingProduct.price)
      formatData.price = data.price.toString();
    if (data.quantity !== existingProduct.quantity)
      formatData.quantity = data.quantity.toString();
    if (data.isArchived !== existingProduct.isArchived)
      formatData.isArchived = data.isArchived ? "true" : "false";

    if (!deepEqual(existingImages, data.images)) {
      data.images.forEach((file, index: number) => {
        if (file.file) formatData["file" + (index + 1)] = file.file;
        formatData["url" + (index + 1)] = file.url;
      });
    }
  } else {
    formatData = {
      name: data.name,
      category: data.category,
      netWeight: data.netWeight.toString(),
      price: data.price.toString(),
      quantity: data.quantity.toString(),
      isArchived: data.isArchived ? "true" : "false",
    };

    data.images.forEach((file, index: number) => {
      if (file.file) formatData["file" + (index + 1)] = file.file;
      formatData["url" + (index + 1)] = file.url;
    });
  }

  for (const [key, value] of Object.entries(formatData)) {
    formData.append(key, value);
  }

  return formData;
}

const ProductForm: React.FC<ProductFormProps> = ({
  existingProduct,
  categories,
}) => {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const defaultValues = transformIncomingData(existingProduct);

  const form = useForm<ProductFormSchemaType>({
    resolver: zodResolver(productFormSchema),
    defaultValues,
  });

  async function onSubmit(data: ProductFormSchemaType) {
    try {
      setLoading(true);
      if (existingProduct) {
        let product = existingProduct;
        const formData = transformOutgoingData(
          existingProduct,
          defaultValues.images,
          data
        );
        // If there is no entry in formData, formData.entries().next().done will return true
        // Otherwise, if there is data in formData, it will return false
        if (!formData.entries().next().done) {
          product = await updateProduct(existingProduct.id, formData);
        }
        toast.success(`${product.name} is updated`);
      } else {
        const formData = transformOutgoingData(null, null, data);
        const product = await createProduct(formData);
        toast.success(`${product.name} is created`);
      }
      router.refresh();
    } catch (error) {
      console.log("product form submit error", error);
      toast.error("Something went wrong");
    } finally {
      router.push(routes.products.pathname);
      setLoading(false);
    }
  }

  function onCancel(event: MouseEvent<HTMLButtonElement>) {
    event.preventDefault();
    router.push(routes.products.pathname);
  }

  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 w-full"
        >
          <FormField
            control={form.control}
            name="images"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <ImageUpload
                    currentFiles={field.value}
                    disabled={loading}
                    onAdd={(files: ImageObjectType[]) =>
                      field.onChange([...field.value, ...files])
                    }
                    onRemove={(file: ImageObjectType) =>
                      field.onChange([
                        ...field.value.filter(
                          (current) => current.url !== file.url
                        ),
                      ])
                    }
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="space-y-6 md:space-y-0 md:grid md:grid-cols-3 gap-8">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="Product Name"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Category</FormLabel>
                  <Popover open={open} onOpenChange={setOpen}>
                    <FormControl>
                      <PopoverTrigger asChild>
                        <Button
                          variant={"combobox"}
                          role="combobox"
                          aria-expanded={open}
                          className={cn(
                            `w-full justify-between`,
                            field.value || "text-muted-foreground"
                          )}
                        >
                          {field.value || "Select Category"}
                          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                        </Button>
                      </PopoverTrigger>
                    </FormControl>
                    <PopoverContent>
                      <Command>
                        <CommandInput placeholder="Search Category"></CommandInput>
                        <CommandEmpty>No Category Found</CommandEmpty>
                        {categories && (
                          <CommandGroup>
                            {categories.map((category) => (
                              <CommandItem
                                key={category.id}
                                disabled={loading}
                                onSelect={(itemValue) => {
                                  const capitalizedValue =
                                    itemValue[0].toUpperCase() +
                                    itemValue.substring(1);
                                  field.onChange(
                                    capitalizedValue === field.value
                                      ? ""
                                      : capitalizedValue
                                  );
                                  setOpen(false);
                                }}
                              >
                                <Check
                                  className={cn(
                                    "mr-2 h-4 w-4",
                                    field.value === category.name
                                      ? "opacity-100"
                                      : "opacity-0"
                                  )}
                                />
                                {category.name}
                              </CommandItem>
                            ))}
                          </CommandGroup>
                        )}
                      </Command>
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="netWeight"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Net Weight</FormLabel>
                  <FormControl>
                    <div className="flex items-center gap-2">
                      <Input
                        type="number"
                        disabled={loading}
                        placeholder="300"
                        {...field}
                      />
                      g
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Price</FormLabel>
                  <FormControl>
                    <div className="flex items-center gap-2">
                      $
                      <Input
                        type="number"
                        disabled={loading}
                        placeholder="9.99"
                        {...field}
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="quantity"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Quantity</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      disabled={loading}
                      placeholder="100"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="isArchived"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel>Archived</FormLabel>
                    <FormDescription>
                      This product will not appear anywhere in the store.
                    </FormDescription>
                  </div>
                </FormItem>
              )}
            />
          </div>
          <div className="flex gap-2">
            <Button disabled={loading} variant={"shucha"} type="submit">
              {existingProduct ? "Save" : "Create"}
            </Button>
            <Button disabled={loading} variant={"outline"} onClick={onCancel}>
              Cnacel
            </Button>
          </div>
        </form>
      </Form>
    </>
  );
};

export { ProductForm };
