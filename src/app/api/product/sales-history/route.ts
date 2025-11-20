import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/prisma";
import { getMonth } from "date-fns";

export async function GET(req: NextRequest) {
  try {
    const productId = req.nextUrl.searchParams.get("id");
    const designerId = req.nextUrl.searchParams.get("designerId");

    if (!productId || !designerId) {
      return NextResponse.json(
        { error: "Missing product id or designer id" },
        { status: 400 }
      );
    }

    // ✅ 1. Fetch product (optional check)
    const product = await prisma.productRoyalty.findUnique({
      where: { id: productId },
    });

    if (!product) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    // ✅ 2. Fetch all royalty orders that include this product and designer
    const sales = await prisma.royaltyOrder.findMany({
      where: {
        lineItem: {
          some: {
            productId: product?.productId,
            designerId,
          },
        },
      },
    });

    // ✅ 3. Define months
    const months = [
      "JAN",
      "FEB",
      "MAR",
      "APR",
      "MAY",
      "JUN",
      "JUL",
      "AUG",
      "SEP",
      "OCT",
      "NOV",
      "DEC",
    ];

    // ✅ 4. Initialize sales history object
    const salesHistory = Array.from({ length: 12 }, (_, i) => ({
      month: months[i],
      sales: 0,
    }));

    // ✅ 5. Aggregate total sales per month
    for (const order of sales) {
      if (!order.lineItem || !Array.isArray(order.lineItem)) continue;

      // Find all line items for this product + designer
      const matchedItems = order.lineItem.filter(
        (li) =>
          li.productId === product?.productId && li.designerId === designerId
      );

      // Calculate total sales amount for these line items
      const totalForOrder = matchedItems.reduce((sum, li) => {
        // Check if product.price is a non-null object with an amount property
        const price =
          product &&
          product.price &&
          typeof product.price === "object" &&
          "amount" in product.price
            ? Number((product.price as { amount: number }).amount)
            : 0;
        return sum + price * li.quantity;
      }, 0);

      console.log("totalForOrder", totalForOrder);

      // Get month index from order.createdAt
      const monthIndex = getMonth(order.createdAt); // 0–11
      salesHistory[monthIndex].sales += totalForOrder;
    }

    const formattedData = salesHistory.map((item) => ({
      ...item,
      sales: parseFloat(item.sales.toFixed(2)), // ✅ round to 2 decimals
    }));

    // ✅ 6. Return final response
    return NextResponse.json(formattedData);
  } catch (error) {
    console.error("Error fetching sales history:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
