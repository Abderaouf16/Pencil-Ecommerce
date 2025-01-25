"use client";
import { Session } from "next-auth";
import { signOut } from "next-auth/react";
import React, { useState } from "react";
import { Button } from "../ui/button";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Image from "next/image";
import { LogOut, Moon, Settings, Sun, TruckIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { Switch } from "@/components/ui/switch"
import { useTheme } from "next-themes";


export default function UserButton({ user }: Session) {
  const router = useRouter();
  const { setTheme, theme } = useTheme()
  const [checked, setChecked] = useState(false)
  function setSwitchState() {
    switch (theme) {
      case "dark":
        return setChecked(true)
      case "light":
        return setChecked(false)
      case "system":
        return setChecked(false)
    }
  }

  return (
    <div>
      <DropdownMenu modal={false}>
        <DropdownMenuTrigger>
          <Avatar>
            {user?.image && (
              <Image src={user.image} alt={user.name!} width={40} height={35} />
            )}
            {!user?.image && (
              <AvatarFallback className=" bg-primary/25">
                <div className=" font-bold">
                  {user?.name?.charAt(0).toLocaleUpperCase()}
                </div>
              </AvatarFallback>
            )}
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-64 p-6" align="end">
          <div className=" mb-4 p-4 flex flex-col gap-1 items-center rounded-lg  bg-primary/10">
           
            <Avatar>
            {user?.image && (
              <Image
                className=" rounded-full"
                src={user.image}
                alt={user.name!}
                width={40}
                height={40}
              />
            )}
          </Avatar>
            <p className=" font-bold text-xs mt-2">{user?.name}</p>
            <span className=" text-xs  font-normal  text-secondary-foreground">
              {user?.email}
            </span>
          </div>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onClick={() => router.push("/dashboard/orders")}
            className="group py-2 font-normal cursor-pointer"
          >
            <TruckIcon
              size={14}
              className="mr-3 group-hover:translate-x-1 transition-all ease-in-out duration-500 "
            />
            My orders
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => router.push("/dashboard/settings")}
            className="group py-3  font-normal cursor-pointer"
          >
            <Settings
              size={14}
              className="mr-3 group-hover:rotate-90 transition-all ease-in-out duration-500 "
            />
            Settings
          </DropdownMenuItem>
          {theme && (
            <DropdownMenuItem className="py-2 font-medium cursor-pointer  ease-in-out">
              <div
                onClick={(e) => e.stopPropagation()}
                className="flex items-center group "
              >
                <div className="relative flex mr-3">
                  <Sun
                    className="group-hover:text-yellow-600  absolute group-hover:rotate-180  dark:scale-0 dark:rotate-90 transition-all duration-750 ease-in-out"
                    size={14}
                  />
                  <Moon
                    className="group-hover:text-blue-400  scale-0 rotate-90 dark:rotate-0  dark:scale-100 transition-all ease-in-out duration-750"
                    size={14}
                  />
                </div>
                <p className="dark:text-blue-400 mr-3 text-secondary-foreground/75   text-yellow-600">
                  {theme[0].toUpperCase() + theme.slice(1)} Mode
                </p>
                <Switch
                  className="scale-75 "
                  checked={checked}
                  onCheckedChange={(e) => {
                    setChecked((prev) => !prev)
                    if (e) setTheme("dark")
                    if (!e) setTheme("light")
                  }}
                />
              </div>
            </DropdownMenuItem>
          )}
          <DropdownMenuItem
            onClick={() => {
              signOut()
              router.push('/auth/login')
            } 
          }
            className="py-2 group focus:bg-destructive/15 font-medium cursor-pointer"
          >
            <LogOut
              size={14}
              className="mr-3  group-hover:scale-75 transition-all duration-300 ease-in-out "
            />
            Sign out
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
