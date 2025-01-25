import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { db } from "@/server";
import Sales from "./sales";
import { desc } from "drizzle-orm";
import { orderProduct } from "@/server/schema";

export default async function AnalyticsPage() {
  const totalOrders = await db.query.orderProduct.findMany({
    orderBy: [desc(orderProduct.id)],
    limit:10,
    with: {
      order: { with: { user: true } },
      product: true,
      productVariants: { with: { variantImages: true } },
    },
  })

  if (totalOrders.length === 0)
    return (
      <Card>
        <CardHeader>
          <CardTitle>No Orders</CardTitle>
        </CardHeader>
      </Card>
    );

    if(totalOrders)
      return (
        <Card>
        <CardHeader>
          <CardTitle>Your Analytics</CardTitle>
        </CardHeader>
        <CardContent>
          <Sales totalOrders={totalOrders} />
        </CardContent>
      </Card>
      )

}
