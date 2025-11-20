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
        // inArchive: false,
      },
    });

    // ✅ Only loop through shops belonging to this designer
    // const results = await Promise.all(
    //   shops.map(async (shopEntry: ShopEntry) => {
    //     const shop = shopEntry.shop!;
    //     const products = await prisma.productRoyalty.aggregateRaw({
    //       pipeline: [
    //         {
    //           $match: { designerId }, // vendor filter
    //         },
    //         {
    //           $lookup: {
    //             from: "RoyaltyOrder", // your orders collection
    //             localField: "productId",
    //             foreignField: "lineItem.productId",
    //             as: "orders",
    //           },
    //         },
    //         {
    //           $addFields: {
    //             fulfilledOrders: {
    //               $filter: {
    //                 input: "$orders",
    //                 as: "order",
    //                 cond: {
    //                   $gt: [
    //                     {
    //                       $size: {
    //                         $filter: {
    //                           input: "$$order.lineItem",
    //                           as: "li",
    //                           cond: {
    //                             $and: [
    //                               { $eq: ["$$li.productId", "$productId"] },
    //                               // { $eq: ["$$li.fulfilled", true] },
    //                             ],
    //                           },
    //                         },
    //                       },
    //                     },
    //                     0,
    //                   ],
    //                 },
    //               },
    //             },
    //           },
    //         },
    //         {
    //           $addFields: {
    //             totalSales: {
    //               $sum: {
    //                 $map: {
    //                   input: "$fulfilledOrders",
    //                   as: "o",
    //                   in: {
    //                     $sum: {
    //                       $map: {
    //                         input: {
    //                           $filter: {
    //                             input: "$$o.lineItem",
    //                             as: "li",
    //                             cond: {
    //                               $and: [
    //                                 { $eq: ["$$li.productId", "$productId"] },
    //                                 // { $eq: ["$$li.fulfilled", true] },
    //                               ],
    //                             },
    //                           },
    //                         },
    //                         as: "li",
    //                         in: "$$li.quantity",
    //                       },
    //                     },
    //                   },
    //                 },
    //               },
    //             },
    //           },
    //         },
    //         {
    //           $addFields: {
    //             totalEarned: {
    //               $multiply: [
    //                 "$price.amount",
    //                 { $divide: ["$royality", 100] },
    //                 "$totalSales",
    //               ],
    //             },
    //           },
    //         },
    //         {
    //           $project: {
    //             title: 1,
    //             designerId: 1,
    //             totalSales: 1,
    //             // fulfilledOrders: 1,
    //             totalEarned: 1,
    //             royality: 1,
    //             status: 1,
    //             price: 1,
    //             totalRoyaltyEarned: 1,
    //             shop: 1,
    //           },
    //         },
    //       ],
    //     });

    //     return { shop, products };
    //   })
    // );

    const results = await Promise.all(
      shops.map(async (shopEntry: ShopEntry) => {
        const shop = shopEntry.shop!;
        const products = await prisma.productRoyalty.aggregateRaw({
          pipeline: [
            {
              $match: { designerId, shop }, // vendor filter
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

                title: 1,
                designerId: 1,
                totalSales: 1,
                productId: 1,
                totalEarned: 1,
                // transactions: 1,
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

    const WithdrwnResult = await prisma.withdrawRequest.aggregate({
      where: {
        designerId,
        NOT: {
          status: "REJECTED",
        },
      },
      _sum: {
        totalAmount: true,
      },
    });

    const transactionAmount = WithdrwnResult?._sum?.totalAmount || 0;

    // return NextResponse.json({ initialProducts: results, transactionAmount });
    return NextResponse.json({
      initialProducts: results,
      // results1,
      transactionAmount,
    });
  } catch (error) {
    console.error("❌ Error fetching top products:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
