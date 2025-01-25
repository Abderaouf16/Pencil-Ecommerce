"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Badge } from "../ui/badge";
import { cn } from "@/lib/utils";

export default function ProductTags() {
  const router = useRouter();
  const params = useSearchParams();
  const tag = params.get("tag");

  const setFilter = (tag: string) => {
    if (tag) {
      router.push(`?tag=${tag}`);
    }
    if (!tag) {
      router.push("/");
    }
  };

  return (
    <div className="flex items-center gap-4 justify-center mb-8">
      <Badge
        onClick={() => setFilter("")}
        className={cn(
          "cursor-pointer bg-black hover:bg-black/75 dark:border dark:border-gray-600 hover:opacity-100 transition-all ease-in-out",
          !tag ? "opacity-100" : "opacity-50"
        )}
      >
        All
      </Badge>
      <Badge
        onClick={() => setFilter("cheap")}
        className={cn(
          "cursor-pointer bg-gray-500 hover:bg-gray-600 hover:opacity-100 transition-all ease-in-out",
          tag === "cheap" && tag ? "opacity-100" : "opacity-50"
        )}
      >
        cheap
      </Badge>
      <Badge
        onClick={() => setFilter("green")}
        className={cn(
          "cursor-pointer bg-green-500 hover:bg-green-600 hover:opacity-100 transition-all ease-in-out",
          tag === "green" && tag ? "opacity-100" : "opacity-50"
        )}
      >
        green
      </Badge>
      <Badge
        onClick={() => setFilter("red")}
        className={cn(
          "cursor-pointer bg-red-500 hover:bg-red-600 hover:opacity-100 transition-all ease-in-out",
          tag === "red" && tag ? "opacity-100" : "opacity-50"
        )}
      >
        red
      </Badge>
      <Badge
        onClick={() => setFilter("blue")}
        className={cn(
          "cursor-pointer bg-blue-500 hover:bg-blue-600 hover:opacity-100 transition-all ease-in-out",
          tag === "blue" && tag ? "opacity-100" : "opacity-50"
        )}
      >
        blue
      </Badge>
      <Badge
        onClick={() => setFilter("purple")}
        className={cn(
          "cursor-pointer bg-purple-500 hover:bg-purple-red-600 hover:opacity-100 transition-all ease-in-out",
          tag === "red" && tag ? "opacity-100" : "opacity-50"
        )}
      >
        purple
      </Badge>
    </div>
  );
}
