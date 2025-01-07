"use client";
import { ProductSchema, zProductSchema } from "@/types/product-schema";
import React from "react";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
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
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { DollarSign } from "lucide-react";
import Tiptap from "./tip-tap";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAction } from "next-safe-action/hooks";
import { createProduct } from "@/server/actions/create-product";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function ProductForm() {
  const form = useForm<zProductSchema>({
    resolver: zodResolver(ProductSchema),
    defaultValues: {
      title: "",
      description: "",
      price: 0,
    },
    mode: "onChange",
  });
  const { execute, status } = useAction(createProduct, {
    onSuccess : (data) => {
      toast.dismiss(); // Dismiss the loading message

        if(data.data?.error) {
          toast.error(data.data.error)
      }
      if(data.data?.success) {
        toast.success(data.data.success)
      }
    },
    onExecute : ( ) => {
      const toastId = toast.loading('Deleting Product');
      execute().finally(() => toast.dismiss(toastId)); 
    }
  });

  const router = useRouter();

  function onSubmit(values: zProductSchema) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    execute(values);
  }
  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle>Create Product</CardTitle>
          <CardDescription>Add a brand new product</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel> Product Title</FormLabel>
                    <FormControl>
                      <Input placeholder="Pencil" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel> Description</FormLabel>
                    <FormControl>
                      <Tiptap val={field.value} />
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
                    <FormLabel>Product Price</FormLabel>
                    <FormControl>
                      <div className=" flex items-center gap-2">
                        <DollarSign
                          size={36}
                          className="p-2 bg-muted rounded-md"
                        />
                        <Input
                          {...field}
                          placeholder="Your price in USD"
                          type="number"
                          min={0}
                          step={0.1}
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button
                type="submit"
                disabled={
                  status === "executing" ||
                  !form.formState.isValid ||
                  !form.formState.isDirty
                }
              >
                Create Product
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
