"use server";
import React from "react";
import { auth } from "@/server/auth";
import UserButton from "./user-button";
import { Button } from "../ui/button";
import Link from "next/link";
import { LogInIcon } from "lucide-react";
import CartDrawer from "../cart/cart-drawer";

export default async function nav() {
  const session = await auth();
  return (
    <header className="py-12">
      <nav>
        <ul className="flex justify-between items-center gap-4 md:gap-10">
          <li className="flex flex-1 ">
            <Link href="/">Home</Link>
          </li>
          <li className="flex items-center hover:text-primary p-2 rounded-md transition-all ease-in-out duration-300 ">
            <CartDrawer />
          </li>
          {!session ? (
            <li>
              <Button>
                <LogInIcon />
                <Link href="/auth/login">Signin</Link>
              </Button>
            </li>
          ) : (
            <li>
              <UserButton
                user={session?.user}
                expires={session?.expires || ""}
              />
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
}
