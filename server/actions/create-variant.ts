"use server"; // don't forget to add this!

import { createSafeActionClient } from "next-safe-action";
import { db } from "..";
import { eq } from "drizzle-orm";
import { VariantSchema } from "@/types/variant-schema";
import { productVariants } from "../schema";

const actionClient = createSafeActionClient();

export const createVariant = actionClient
  .schema(VariantSchema)
  .action(async ({parsedInput: { productType, variantImages, tags, color, editMode, productID}}) => {

    try {

        if(!editMode) {
            const newVariant = await db.insert(productVariants).values({
                color,productType,productID
            }).returning()
            return {success: "Product Variant Created"}
        }
    } catch (error) {
         return {error: "Error Creating Product Variant"}
    }
  })