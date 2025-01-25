'use client'

import { useCartStore } from "@/lib/client-store"
import getStripe from "@/lib/get-stripe"
import { Elements } from "@stripe/react-stripe-js"
import { motion } from "framer-motion"
import PaymentForm from "./payment-form"
import { useTheme } from "next-themes"

const stripe = getStripe()

export default function Payment() {
    const {theme} = useTheme()
    const {cart} = useCartStore()
    const totalPrice = cart.reduce((acc, item) => {
       return acc + item.price * item.variant.quantity
    },0)
    const totalPriceCents = Math.round(totalPrice * 100);


    return(
        <motion.div className="max-w-2xl mx-auto">
            <Elements
             stripe={stripe}
            options={{
                mode: 'payment',
                currency:'usd',
                amount: totalPriceCents,
                appearance: { theme: theme === "dark" ? "night" : "flat" },

            }}>
                <PaymentForm totalPrice={totalPrice}/>
            </Elements>
        </motion.div>
    )
}