"use client";

import { VariantsWithProduct } from "@/lib/infer-types";
import Image from "next/image";
import Link from "next/link";
import { Badge } from "../ui/badge";
import formatPrice from "@/lib/format-price";

type ProductTypes = {
  variants: VariantsWithProduct[];
};

export default function Products({ variants }: ProductTypes) {
  return (
    <main className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
      {variants.map((variant) => (
        <div key={variant.id}>
          <Link
            className="py-2"
            href={`/products/${variant.id}?id=${variant.id}&productID=${variant.productID}&price=${variant.product.price}&title=${variant.product.title}&type=${variant.productType}&image${variant.variantImages[0].url}`}
          >
            <Image
              src={variant.variantImages[0].url}
              alt={variant.product.title}
              width={720}
              height={480}
              className=" rounded-md mb-4   drop-shadow-lg "
              loading="lazy"
            />
            <div className=" flex justify-between items-center">
              <div className=" font-medium">
                <h2> {variant.product.title}</h2>
                <p className=" text-sm text-muted-foreground">
                  {variant.productType}
                </p>
              </div>
              <Badge className="text-sm ml-2" variant={"secondary"}>
                {formatPrice(variant.product.price)}
              </Badge>
            </div>
          </Link>
        </div>
      ))}
    </main>
  );
}
