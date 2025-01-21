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

export default function CartDrawer() {
  const { cart } = useCartStore();

  return (
    <Drawer>
      <DrawerTrigger>
        <div className=" relative px-2">
          <AnimatePresence>
            {cart.length > 0 && (
                <motion.span
                animate={{ scale: 1, opacity: 1 }}
                initial={{ opacity: 0, scale: 0 }}
                exit={{ scale: 0 }}
                className=" absolute flex items-center justify-center text-white font-bold rounded-full text-xs bg-primary dark:bg-primary -top-1.5 -right-0 w-4 h-4">
                    {cart.length}
                </motion.span>
            )}
            <ShoppingCart />
          </AnimatePresence>
        </div>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Are you absolutely sure?</DrawerTitle>
          <DrawerDescription>This action cannot be undone.</DrawerDescription>
        </DrawerHeader>
        <DrawerFooter>
          <Button>Submit</Button>
          <DrawerClose>
            <Button variant="outline">Cancel</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
