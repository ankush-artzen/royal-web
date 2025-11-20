// src/app/api/shop/top-products/route.ts
// import { NextRequest, NextResponse } from "next/server";
// import prisma from "@/prisma/prisma";

// // Define interface for the product structure
// interface TopProduct {
//   id: string;
//   title: string;
//   royality: number;
//   price: number;
//   totalSold?: number;
//   status: string;
//   totalRoyaltyEarned: number;
//   shop: string | null;
//   totalSales?: number;
//   productId?: string;
//   totalEarned?: number;
// }

// export async function GET(req: NextRequest) {
//   try {
//     const { searchParams } = new URL(req.url);
//     const designerId = searchParams.get("designerId");

//     if (!designerId) {
//       return NextResponse.json(
//         { error: "Missing designerId" },
//         { status: 400 }
//       );
//     }

//     // 1. Fetch all products for this designer
//     const products = await prisma.productRoyalty.findMany({
//       where: { designerId,inArchive:false },
//       orderBy: { createdAt: "desc" },
//       select: {
//         id: true,
//         title: true,
//         royality: true,
//         price: true,
//         totalSold: true,
//         status: true,
//         totalRoyaltyEarned: true,
//         shop: true,
//       },
//     });
//     // const products = (await prisma.productRoyalty.aggregateRaw({
//     //   pipeline: [
//     //     {
//     //       $match: { designerId, inArchive: false }, // vendor filter
//     //     },
//     //     { orderBy: { createdAt: "desc" } },
//     //     {
//     //       $lookup: {
//     //         from: "RoyaltyTransaction", // your orders collection
//     //         localField: "productId",
//     //         foreignField: "productId",
//     //         as: "transactions",
//     //       },
//     //     },
//     //     {
//     //       $addFields: {
//     //         totalSales: { $size: "$transactions" },
//     //         totalEarned: {
//     //           $sum: ["$transactions.price.usd"],
//     //         },
//     //       },
//     //     },
//     //     {
//     //       $project: {
//     //         _id: 0,
//     //         id: { $toString: "$_id" },
//     //         title: 1,
//     //         designerId: 1,
//     //         totalSold: 1,
//     //         totalSales: 1,
//     //         productId: 1,
//     //         totalEarned: 1,
//     //         royality: 1,
//     //         status: 1,
//     //         price: 1,
//     //         totalRoyaltyEarned: 1,
//     //         shop: 1,
//     //       },
//     //     },
//     //   ],
//     // })) as unknown as TopProduct[];

//     const _products: any = await prisma.productRoyalty.aggregateRaw({
//       pipeline: [
//         {
//           $match: { designerId, inArchive: false }, // vendor filter
//         },
//         {
//           $lookup: {
//             from: "RoyaltyTransaction", // your orders collection
//             localField: "productId",
//             foreignField: "productId",
//             as: "transactions",
//           },
//         },
//         {
//           $addFields: {
//             totalSales: { $size: "$transactions" },
//             totalEarned: {
//               $sum: ["$transactions.price.usd"],
//             },
//           },
//         },
//         {
//           $project: {
//             _id: 0,
//             id: { $toString: "$_id" },
//             title: 1,
//             designerId: 1,
//             totalSales: 1,
//             productId: 1,
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

//     console.log(products, "*(*****");

//     // 2. Group by shop and pick top product
//     const shopMap: Record<string, TopProduct> = {};
//     for (const product of products) {
//       if (!product.shop) continue;
//       if (!shopMap[product.shop]) {
//         shopMap[product.shop] = product as TopProduct;
//       }
//     }

//     // 3. Convert to array of shops with topProduct
//     const result = Object.entries(shopMap).map(([shop, topProduct]) => ({
//       shop,
//       topProduct,
//     }));

//     return NextResponse.json({result, _products});
//   } catch (error) {
//     console.error("❌ Error fetching top products:", error);
//     return NextResponse.json(
//       { error: "Internal Server Error" },
//       { status: 500 }
//     );
//   }
// }

import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/prisma";

// Define interface for the product structure
// interface TopProduct {
//   id: string;
//   title: string;
//   royality: number;
//   price: any; // Changed to any since price is an object in your data
//   totalSold?: number;
//   status: string;
//   totalRoyaltyEarned: number | null;
//   shop: string | null;
//   totalSales?: number;
//   productId?: string;
//   totalEarned?: number;
//   designerId?: string;
// }

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

    // Get top products by shop using aggregation
    const topProductsByShops = await prisma.productRoyalty.aggregateRaw({
      pipeline: [
        {
          $match: {
            designerId: designerId,
            inArchive: false,
          },
        },
        {
          $lookup: {
            from: "RoyaltyTransaction",
            localField: "productId",
            foreignField: "productId",
            as: "transactions",
          },
        },
        {
          $addFields: {
            totalSales: { $size: "$transactions" },
            totalEarned: {
              $sum: {
                $map: {
                  input: "$transactions",
                  as: "transaction",
                  in: {
                    $ifNull: [
                      "$$transaction.price.usd",
                      {
                        $multiply: [
                          "$$transaction.unitPrice",
                          "$$transaction.quantity",
                        ],
                      },
                    ],
                  },
                },
              },
            },
          },
        },
        // Sort by totalSales descending before grouping
        {
          $sort: { totalSales: -1 },
        },
        // Group by shop and get the first (top) product for each shop
        {
          $group: {
            _id: "$shop",
            topProduct: { $first: "$$ROOT" },
            allProducts: { $push: "$$ROOT" },
            totalShopSales: { $sum: "$totalSales" },
          },
        },
        {
          $project: {
            _id: 0,
            shop: "$_id",
            topProduct: {
              id: { $toString: "$topProduct._id" },
              title: "$topProduct.title",
              royality: "$topProduct.royality",
              price: "$topProduct.price",
              totalSold: "$topProduct.totalSold",
              status: "$topProduct.status",
              totalRoyaltyEarned: "$topProduct.totalRoyaltyEarned",
              shop: "$topProduct.shop",
              totalSales: "$topProduct.totalSales",
              productId: "$topProduct.productId",
              totalEarned: "$topProduct.totalEarned",
              designerId: "$topProduct.designerId",
            },
            productCount: { $size: "$allProducts" },
            totalShopSales: 1,
          },
        },
        {
          $sort: { "topProduct.totalSales": -1 },
        },
      ],
    });

    console.log("Top products by shop:", topProductsByShops);

    return NextResponse.json({
      result: topProductsByShops,
      message: "Top products by shop retrieved successfully",
    });
  } catch (error) {
    console.error("❌ Error fetching top products:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
