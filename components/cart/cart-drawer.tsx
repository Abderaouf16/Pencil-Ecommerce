"use client";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { AnimatePresence, motion } from "framer-motion";
import { ShoppingCart } from "lucide-react";
import { useCartStore } from "@/lib/client-store";
import CartItem from "./cart-items";
import CartMessage from "./cart-message";
import Payment from "./payment";
import OrderConfirmed from "./order-confirmed";

export default function CartDrawer() {
  const { cart, checkoutProgress,setCartOpen ,cartOpen } = useCartStore();

  return (
    <Drawer open={cartOpen} onOpenChange={setCartOpen}>
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
      <DrawerContent className="min-h-50vh">
        <DrawerHeader>
          <CartMessage/>
        </DrawerHeader>
        <div className=" overflow-auto p-8 ">
        {checkoutProgress === "cart-page" && <CartItem />}
        {checkoutProgress === "payment-page" && <Payment />}
        {checkoutProgress === "confirmation-page" && <OrderConfirmed/>}
        </div>
      </DrawerContent>
    </Drawer>
  );
}
