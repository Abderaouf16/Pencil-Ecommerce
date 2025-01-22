"use client";
import {
  Table,
  TableBody,
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
import emptyBox from "@/public/empty-box.json";
import Lottie from "lottie-react";
import { createId } from "@paralleldrive/cuid2"


export default function CartItem() {
  const { cart, addToCart, removeFromCart } = useCartStore();
  const totalPrice = useMemo(() => {
    return cart.reduce((acc, item) => {
        return acc + item.price! * item.variant.quantity
    },0)
  }, [cart])

  const priceInLetters = useMemo(() => {
    return [...totalPrice.toFixed(2).toString()].map((letter) => {
      return { letter, id: createId() }
    })
  }, [totalPrice])

  return (
    <>
      <motion.div>
        {cart.length === 0 && (
          <div className=" flex flex-col w-full items-center justify-center">
            <motion.div
              animate={{ opacity: 1 }}
              initial={{ opacity: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              <h2 className=" text-center text-muted-foreground text-2xl">
                Cart is empty
              </h2>
              <Lottie className="h-64" animationData={emptyBox} />
            </motion.div>
          </div>
        )}
      </motion.div>
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
      <motion.div className="flex items-center justify-center relative my-4 overflow-hidden">
        <span className="text-md">Total: $</span>
        <AnimatePresence mode="popLayout">
          {priceInLetters.map((letter, i) => (
            <motion.div key={letter.id}>
              <motion.span
                initial={{ y: 20 }}
                animate={{ y: 0 }}
                exit={{ y: -20 }}
                transition={{ delay: i * 0.1 }}
                className="text-md inline-block"
              >
                {letter.letter}
              </motion.span>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </>
  );
}
