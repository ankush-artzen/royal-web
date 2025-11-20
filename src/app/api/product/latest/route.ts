import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/prisma";
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const designerId = searchParams.get("designerId");

    if ( !designerId) {
      return NextResponse.json(
        { error: "Missing shop or designerId" },
        { status: 400 }
      );
    }

    const latestProducts = await prisma.productRoyalty.findMany({
      where: {
        designerId,
        inArchive:false
      },
      orderBy: {
        id: "desc", 
      },
      take: 2,
    });

    return NextResponse.json(latestProducts, { status: 200 });
  } catch (error) {
    console.error("Error fetching latest products:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
