"use server";

import { createSafeActionClient } from "next-safe-action";
import { auth } from "../auth";
import { db } from "..";
import { orderProduct, orders } from "../schema";
import { createOrderSchema } from "@/types/order.schema";


const actionClient = createSafeActionClient();

export const createOrder = actionClient
  .schema(createOrderSchema)
  .action(
    async ({ parsedInput: { status, total, paymentIntentID, products } }) => {
      const user = await auth();
      if (!user) return { error: "User not found" };

      const order = await db
        .insert(orders)
        .values({
          status,
          paymentIntentID,
          total,
          userID: user.user.id,
          
        })
        .returning();
       products.map(
        async ({ productID, quantity, variantID }) => {
          await db.insert(orderProduct).values({
            quantity,
            orderID: order[0].id,
            productID: productID,
            productVariantID: variantID,
          });
        }
      );
      return { success: "Order has been added" };
    }
  );
