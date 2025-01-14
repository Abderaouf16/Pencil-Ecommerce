"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { VariantsWithImagesTags } from "@/lib/infer-types";
import { createVariant } from "@/server/actions/create-variant";
import { productVariants } from "@/server/schema";
import { VariantSchema, zVariantSchema } from "@/types/variant-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAction } from "next-safe-action/hooks";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { InputTags } from "./input-tags";
import VariantImages from "./variant-images";

export default function ProductVariant({
  children,
  editMode,
  productID,
  variant,
}: {
  children: React.ReactNode;
  editMode: boolean;
  productID?: number;
  variant?: VariantsWithImagesTags;
}) {
  const form = useForm<zVariantSchema>({
    resolver: zodResolver(VariantSchema),
    defaultValues: {
      editMode,
      tags: [],
      productType: "black note book",
      variantImages: [],
      id: undefined,
      color: "#000000",
      productID,
    },
  });

  const {status, execute} = useAction(createVariant, {
    onSuccess: (data) => {
        toast.dismiss(); // Dismiss the loading message
  
        if (data.data?.error) {
          toast.error(data.data.error);
        }
        if (data.data?.success) {
          toast.success(data.data.success);
        }
      },
      onExecute: () => {
        toast.dismiss(); // Dismiss the loading message  
          toast.loading("Editing Product");
  
      },
  })

  function onSubmit(values: zVariantSchema) {
    execute(values);
  }

  return (
    <Dialog >
      <DialogTrigger>{children}</DialogTrigger>
      <DialogContent className="lg:max-w-screen-lg overflow-y-scroll max-h-[660px]">
        <DialogHeader>
          <DialogTitle className="text-2xl"> {editMode ? "Edit" : "Create Variant"}</DialogTitle>
          <DialogDescription>
            Manage your product variants here. You can add tags, images, and
            more.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
              control={form.control}
              name="productType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Product Type</FormLabel>
                  <FormControl>
                    <Input placeholder="shadcn" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="color"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Variant Color</FormLabel>
                  <FormControl>
                    <Input type="color" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
           <FormField
              control={form.control}
              name="tags"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tags</FormLabel>
                  <FormControl>
                    <InputTags {...field}  onChange={(e) => field.onChange(e) } />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            /> 
            <VariantImages/>
            {editMode && variant && (
                <Button  type="button" onClick={(e) => e.preventDefault()}>
                    Delete Variant 
                </Button>
            ) }
            <Button 
             type="submit"   disabled={
                  status === "executing" ||
                  !form.formState.isValid ||
                  !form.formState.isDirty
                } >
                     {editMode ? 'Update Variant' : 'Create Variant'}</Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
