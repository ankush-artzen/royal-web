// src/app/api/shop-products/route.ts
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/prisma";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const shop = searchParams.get("shop");
    const designerId = searchParams.get("designerId");
    if (!shop || !designerId) {
      return NextResponse.json(
        { error: "Missing 'shop' query parameter" },
        { status: 400 }
      );
    }

    // const products = await prisma.productRoyalty.findMany({
    //   where: { shop,designerId,inArchive:false},
    //   select: {
    //     id: true,
    //     productId:true,
    //     title: true,
    //     royality: true,
    //     totalSold: true,
    //     price:true,
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

    return NextResponse.json({ shop, products });
  } catch (error) {
    console.error("❌ Error fetching shop products:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
