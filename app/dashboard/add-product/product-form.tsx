"use client";
import { zProductSchema } from "@/types/product-schema";
import { title } from "process";
import React from "react";
import { useForm } from "react-hook-form";
import { Textarea } from "@/components/ui/textarea";

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
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { DollarSign } from "lucide-react";

export default function ProductForm() {
  const form = useForm<zProductSchema>({
    defaultValues: {
      title: "",
      description: "",
      price: 0,
    },
  });

  function onSubmit(values: zProductSchema) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
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
                      <Input placeholder="Pencil" {...field} />
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
                        <Input  {...field}
                        placeholder="Your price in USD"
                        type="number"
                        min={0}
                        step={0.1} />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit">Create Product</Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
