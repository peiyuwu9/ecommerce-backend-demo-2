"use client";

import { MouseEvent, useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-hot-toast";
import { Trash2 } from "lucide-react";
import { Category } from "@prisma/client";

import { createCategory } from "@/actions/category/createCategory";
import { updateCategory } from "@/actions/category/updateCategory";
import { deleteCategory } from "@/actions/category/deleteCategory";

import { AlertModal } from "@/components/ui/alert-modal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { routes } from "@/lib/constants";
import { CategoryFormSchemaType, categoryFormSchema } from "@/lib/zObject";

export interface ProductFormProps {
  existingCategory: Category | null;
}

const CategoryForm: React.FC<ProductFormProps> = ({ existingCategory }) => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const defaultValues = existingCategory ? { ...existingCategory } : {};

  const form = useForm<CategoryFormSchemaType>({
    resolver: zodResolver(categoryFormSchema),
    defaultValues,
  });

  async function onSubmit(data: CategoryFormSchemaType) {
    try {
      setLoading(true);
      if (existingCategory) {
        const category = await updateCategory(existingCategory.id, data.name);
        toast.success(`${category.name} is updated`);
      } else {
        const category = await createCategory(data.name);
        toast.success(`${category.name} is created`);
      }
      router.refresh();
    } catch (error) {
      console.log("category form submit error", error);
      toast.error("Something went wrong");
    } finally {
      router.push(routes.categories.pathname);
      setLoading(false);
    }
  }

  async function onDelete() {
    try {
      setLoading(true);
      if (existingCategory) {
        const category = await deleteCategory(existingCategory.id);
        toast.success(`${category.name} is updated`);
      }
      router.refresh();
    } catch (error) {
      console.log("category delete error", error);
      toast.error("Something went wrong");
    } finally {
      router.push(routes.categories.pathname);
      setLoading(false);
    }
  }

  function onCancel(event: MouseEvent<HTMLButtonElement>) {
    event.preventDefault();
    router.push(routes.categories.pathname);
  }

  return (
    <>
      <AlertModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        onConfirm={onDelete}
        loading={loading}
      />
      {existingCategory && (
        <Button
          variant={"ghost"}
          className="fixed right-6 h-6 w-6 p-0 md:h-10 md:w-10"
          onClick={() => setIsOpen(true)}
        >
          <Trash2 className="text-brand-warning md:h-7 md:w-7" />
        </Button>
      )}
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 w-full"
        >
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
                      placeholder="Category Name"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="flex gap-2">
            <Button disabled={loading} variant={"shucha"} type="submit">
              {existingCategory ? "Save" : "Create"}
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

export { CategoryForm };
