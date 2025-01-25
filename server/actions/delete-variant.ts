"use server";

import { createSafeActionClient } from "next-safe-action";
import { db } from "..";
import { productVariants } from "../schema";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { z } from "zod";

const actionClient = createSafeActionClient();

export const deleteVariant = actionClient
  .schema(z.object({ id: z.number() }))
  .action(async ({ parsedInput: { id } }) => {
    try {
      await db
        .delete(productVariants)
        .where(eq(productVariants.id, id))
        .returning();
      revalidatePath("/dashboard/products");
      return { success: "Product Variant Deleted" };
    } catch (error) {
      console.error(error); // Log the error
      return { error: "Field deleting variant" };
    }
  });
