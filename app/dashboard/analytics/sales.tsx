import { TotalOrders } from "@/lib/infer-types";

import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
  CardHeader,
} from "@/components/ui/card";

import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
  TableHead,
} from "@/components/ui/table";
import Image from "next/image";
import placeholderUser from "@/public/placeholder-user.jpg";

export default function Sales({ totalOrders }: { totalOrders: TotalOrders[] }) {
  console.log(totalOrders);
  return (
    <div>
      <Card className="flex-1 shrink-0">
        <CardHeader>
          <CardTitle>New sales</CardTitle>
          <CardDescription>Here are your recent sales</CardDescription>
        </CardHeader>
        <CardContent className="">
          <Table>
            <TableHeader> 
              <TableRow>
                <TableHead>Customer</TableHead>
                <TableHead>Item</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Quantity</TableHead>
                <TableHead>Image</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {totalOrders.map(
                ({id, order, product, quantity, productVariants }) => (
                  <TableRow key={id} className=" font-medium">
                    <TableCell>
                      {order.user.image && order.user.name ? (
                        <div className=" flex gap-2 items-center w-32 ">
                          <Image
                            src={order.user.image}
                            alt={order.user.name}
                            className=" rounded-full"
                            height={25}
                            width={25}
                          />
                          <p className="text-xs font-medium">
                            {order.user.name}{" "}
                          </p>
                        </div>
                      ) : (
                        <div className="">
                          <Image
                            src={placeholderUser}
                            width={25}
                            height={25}
                            alt="User not found"
                            className=" rounded-full"
                          />
                          <p className="text-xs font-medium">User not found</p>
                        </div>
                      )}
                    </TableCell>
                    <TableCell>{product.title}</TableCell>
                    <TableCell>${product.price}</TableCell>
                    <TableCell>{quantity}</TableCell>
                    <TableCell>
                      <Image
                        src={productVariants.variantImages[0].url}
                        width={48}
                        height={48}
                        alt={product.title}
                        className=" rounded-md"
                      />
                    </TableCell>
                  </TableRow>
                )
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
