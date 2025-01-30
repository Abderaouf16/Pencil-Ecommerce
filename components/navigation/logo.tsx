"use client";
import React from "react";

import Image from "next/image";
import logoIconBlack from "@/public/logoIconBlack.png";
import logoIconWhite from "@/public/logoIconWhite.png";
import { Meow_Script } from "next/font/google";

import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";
import Link from "next/link";

const meowScript = Meow_Script({
  subsets: ["latin"],
  weight: "400",
});

export default function Logo() {
  const { theme } = useTheme();

  return (
    <div>
      <Link
        href="/"
        className={cn(meowScript.className, "md:text-3xl text-2xl flex  gap-1")}
      >
        Excellence
        {theme === "light" ? (
          <div className="">
            <Image src={logoIconBlack} width={30} height={30} alt="logo" />
          </div>
        ) : (
          <div className="">
            <Image src={logoIconWhite} width={30} height={30} alt="logo" />
          </div>
        )}
      </Link>
    </div>
  );
}
