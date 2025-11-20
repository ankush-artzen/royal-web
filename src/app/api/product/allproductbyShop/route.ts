import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/prisma";

type ShopEntry = {
  shop: string | null;
};

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const designerId = searchParams.get("designerId");

    if (!designerId) {
      return NextResponse.json(
        { error: "Missing designerId" },
        { status: 400 }
      );
    }

    // ✅ Get distinct shops only for this designer
    const shops = await prisma.productRoyalty.findMany({
      distinct: ["shop"],
      select: { shop: true },
      where: {
        shop: { not: null },
        designerId, // filter by designerId
        inArchive: false,
      },
    });

    // ✅ Only loop through shops belonging to this designer
    const results = await Promise.all(
      shops.map(async (shopEntry: ShopEntry) => {
        const shop = shopEntry.shop!;

        // const products = await prisma.productRoyalty.findMany({
        //   where: {
        //     shop,
        //     designerId,
        //     inArchive: false,
        //   },
        //   select: {
        //     id: true,
        //     title: true,
        //     royality: true,
        //     totalSold: true,
        //     status: true,
        //     price: true,
        //     totalRoyaltyEarned: true,
        //     shop: true,
        //   },
        // });

        const products = await prisma.productRoyalty.aggregateRaw({
          pipeline: [
            {
              $match: { designerId, shop, inArchive: false }, // vendor filter
            },
            {
              $lookup: {
                from: "RoyaltyTransaction", // your orders collection
                localField: "productId",
                foreignField: "productId",
                as: "transactions",
              },
            },
            {
              $addFields: {
                totalSales: { $size: "$transactions" },
                totalEarned: {
                  $sum: ["$transactions.price.usd"],
                },
              },
            },
            {
              $project: {
                _id: 0,
                id: { $toString: "$_id" },
                inArchive: 1,
                title: 1,
                designerId: 1,
                totalSales: 1,
                productId: 1,
                totalEarned: 1,
                royality: 1,
                status: 1,
                price: 1,
                totalRoyaltyEarned: 1,
                shop: 1,
              },
            },
          ],
        });

        return { shop, products };
      })
    );

    return NextResponse.json(results);
  } catch (error) {
    console.error("❌ Error fetching top products:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
