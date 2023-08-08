import * as z from "zod";
import { categoryFormErrorMsg, productFormErrorMsg } from "@/lib/constants";

export const productFormSchema = z.object({
  name: z
    .string({
      required_error: productFormErrorMsg.name,
    })
    .min(1, { message: productFormErrorMsg.name }),
  category: z
    .string({
      required_error: productFormErrorMsg.category,
    })
    .min(1, { message: productFormErrorMsg.category }),
  price: z.coerce
    .number({
      invalid_type_error: productFormErrorMsg.price,
    })
    .min(1, { message: productFormErrorMsg.price }),
  netWeight: z.coerce
    .number({
      invalid_type_error: productFormErrorMsg.netWeight,
    })
    .min(1, { message: productFormErrorMsg.netWeight }),
  quantity: z.coerce
    .number({
      invalid_type_error: productFormErrorMsg.quantity,
    })
    .min(1, { message: productFormErrorMsg.quantity }),
  isArchived: z.boolean().default(false).optional(),
});

export type ProductFormSchemaType = z.infer<typeof productFormSchema>;

export const categoryFormSchema = z.object({
  name: z
    .string({
      required_error: categoryFormErrorMsg.name,
    })
    .min(1, { message: categoryFormErrorMsg.name }),
});

export type CategoryFormSchemaType = z.infer<typeof categoryFormSchema>;
