"use client";
import {
  Table,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
  TableHeader,
} from "@/components/ui/table";
import { AnimatePresence, motion } from "framer-motion";
import { Button } from "../ui/button";
import Image from "next/image";
import { useMemo } from "react";
import { useCartStore } from "@/lib/client-store";
import formatPrice from "@/lib/format-price";
import { MinusCircle, PlusCircle } from "lucide-react";

export default function CartItem() {
  const { cart, addToCart, removeFromCart } = useCartStore();

  return (
    <>
      {cart.length === 0 && (
        <div className="">
          <h2>Cart is empty</h2>
        </div>
      )}
      {cart.length > 0 && (
        <div className="">
          <Table>
            <TableHeader>
              <TableRow>
                <TableCell>Product</TableCell>
                <TableCell>Price</TableCell>
                <TableCell>Image</TableCell>
                <TableCell>Quantity</TableCell>
              </TableRow>
            </TableHeader>
            <TableBody>
              {cart.map((item) => (
                <TableRow key={item.variant.variantID}>
                  <TableCell> {item.name}</TableCell>
                  <TableCell> {formatPrice(item.price)} </TableCell>
                  <TableCell>
                    <div className="">
                      <Image
                        src={item.image}
                        alt={item.name}
                        height={48}
                        width={48}
                        className=" rounded-md"
                        priority
                      />
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className=" flex items-center justify-between">
                      <MinusCircle
                        onClick={() => {
                          removeFromCart({
                            ...item,
                            variant: {
                              quantity: 1,
                              variantID: item.variant.variantID,
                            },
                          });
                        }}
                        size={14}
                        className=" cursor-pointer hover:text-muted-foreground duration-300 transition-colors"
                      />
                      <p className="  font-bold text-md">
                        {item.variant.quantity}{" "}
                      </p>
                      <PlusCircle
                        onClick={() => {
                          addToCart({
                            ...item,
                            variant: {
                              quantity: 1,
                              variantID: item.variant.variantID,
                            },
                          });
                        }}
                        size={14}
                        className=" cursor-pointer hover:text-muted-foreground duration-300 transition-colors"
                      />
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </>
  );
}
