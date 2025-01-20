import { db } from "@/server";
import Review from "./review";
import ReviewsFrom from "./reviews-form";
import { desc, eq } from "drizzle-orm";
import { reviews } from "@/server/schema";



export default async function Reviews ({productID}: {productID: number}) {

    const data = await db.query.reviews.findMany({
        with: { user: true },
        where: eq(reviews.productID, productID),
        orderBy: [desc(reviews.created)],
      })

    return(
        <section className="py-4">
            <div className=" flex flex-col gpa-2 lg:gap-12 justify-stretch lg:flex-row ">
            <div className="flex-1">
                <h2 className="text-2xl font-bold my-4">Product Reviews</h2>
                <Review reviews={data}/>
                <ReviewsFrom/>
            </div>
            <div className=" flex-1 flex flex-col gap-2 w-20 bg-red-300">
                <p>fdvfvdfv</p>
            </div>
            </div>
        </section>
    )
} 