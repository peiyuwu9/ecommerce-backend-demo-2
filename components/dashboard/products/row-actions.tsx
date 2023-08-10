"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { MoreVertical, PencilLine, Trash2 } from "lucide-react";
import { toast } from "react-hot-toast";
import { ProductColumnType } from "./columns";

import { deleteProduct } from "@/actions/product/deleteProduct";

import { Button } from "@/components/ui/button";
import { AlertModal } from "@/components/ui/alert-modal";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { routes } from "@/lib/constants";

export interface RowActionsProps {
  data: ProductColumnType;
}

const RowActions: React.FC<RowActionsProps> = ({ data }) => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  async function onDelete() {
    try {
      setLoading(true);
      if (data) {
        const product = await deleteProduct(data.id);
        toast.success(`${product.name} is deleted`);
      }
      router.refresh();
    } catch (error) {
      console.log("product delete error", error);
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
      setIsOpen(false);
    }
  }

  return (
    <>
      <AlertModal
        title={"Delete Product"}
        description={"Are you sure you want to delete this product?"}
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        onConfirm={onDelete}
        loading={loading}
      />
      <div className="flex justify-end">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Actions</span>
              <MoreVertical className="h-5 w-5" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem
              onClick={() =>
                router.push(`${routes.products.pathname}/${data.id}`)
              }
            >
              <PencilLine className="mr-2 h-4 w-4" /> Edit
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setIsOpen(true)}>
              <Trash2 className="mr-2 h-4 w-4" /> Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </>
  );
};

export { RowActions };
