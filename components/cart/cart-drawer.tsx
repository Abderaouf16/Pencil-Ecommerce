"use client";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Button } from "../ui/button";
import { AnimatePresence, motion } from "framer-motion";
import { ShoppingCart } from "lucide-react";
import { useCartStore } from "@/lib/client-store";
import CartItem from "./cart-items";

export default function CartDrawer() {
  const { cart } = useCartStore();

  return (
    <Drawer>
      <DrawerTrigger asChild>
        <div className=" cursor-pointer relative px-2">
          <AnimatePresence>
            {cart.length > 0 && (
              <motion.span
                animate={{ scale: 1, opacity: 1 }}
                initial={{ opacity: 0, scale: 0 }}
                exit={{ scale: 0 }}
                className=" absolute flex items-center justify-center text-white font-bold rounded-full text-xs bg-primary dark:bg-primary -top-1.5 -right-0 w-4 h-4"
              >
                {cart.length}
              </motion.span>
            )}
          </AnimatePresence>
          <ShoppingCart />
        </div>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Are you absolutely sure?</DrawerTitle>
          <CartItem />
        </DrawerHeader>
        <DrawerFooter>
          <DrawerClose asChild>
            <Button variant="outline">Cancel</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
