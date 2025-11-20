"use client";

import React, { useEffect, useState } from "react";

import {
  ApiShopEntry,
  RoyaltyReportProduct,
  ViewRoyaltyClientProps,
} from "@/lib/type";
import Header from "../../Common/Header";
import { ForWordButton } from "../../Common/BackButton";
import LeftPanel from "./LeftPanel";
import RightPanel from "./RightPanel";

export default function RoyaltyReport({
  initialUser,
  initialProducts,
  handleSetCurrentPage,
  setWithdrawAmount,
  transactionAmount = 0,
}: ViewRoyaltyClientProps) {
  const [expandedSections, setExpandedSections] = useState<
    Record<string, boolean>
  >({
    royalties: true,
  });
  const [expandedProducts, setExpandedProducts] = useState<
    Record<string, boolean>
  >({});
  const [bankItems, setBankItems] = useState<
    { id: string; name: string; amount: number }[]
  >([]);
  const [shops, setShops] = useState<
    {
      shop: string;
      product: RoyaltyReportProduct[];
    }[]
  >([]);
  const [products, setProducts] = useState<RoyaltyReportProduct[]>([]);
  const [royalId] = useState<string | null>(initialUser?.royalId || null);

  // const router = useRouter();

  const [loading] = useState(false);
  // Fetch top products across shops
  const formatShopName = (shop: string) => shop.replace(".myshopify.com", "");

  // helper: truncate long titles
  const truncateText = (text: string, maxLength: number = 20) =>
    text.length > maxLength ? text.substring(0, maxLength) + "..." : text;

  useEffect(() => {
    console.log("initialProducts:", initialProducts);
    const formattedShops = (initialProducts as ApiShopEntry[]).map(
      (shopEntry) => ({
        shop: formatShopName(shopEntry.shop),
        product: shopEntry.products
          ? shopEntry.products.map(
              (p): RoyaltyReportProduct => ({
                id: p.id || p.title,
                name: truncateText(p.title),
                earnings: p.totalEarned || 0,
                artist: p.shop,
                details:
                  p.totalSales || p.totalSold
                    ? {
                        retailPrice: p.price?.amount.toString() || "$0",
                        totalUnits: p.totalSales ?? p.totalSold ?? 0,
                        totalSales: (
                          (p.price?.amount || 0) *
                          (p.totalSales || p.totalSold || 0)
                        ).toString(),
                        royaltyPercentage: p.royality || "0%",
                      }
                    : undefined,
              })
            )
          : [],
      })
    );

    // ✅ set shops state
    setShops(formattedShops);

    console.log(formattedShops);
    // ✅ flatten all products across shops
    const allProducts = formattedShops.flatMap(
      (shop: { product: RoyaltyReportProduct[] }) => shop.product
    );
    setProducts(allProducts);
  }, [royalId, initialProducts]);

  // Toggle section
  const toggleSection = (section: string) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  // Toggle product row
  const toggleProduct = (productId: string) => {
    setExpandedProducts((prev) => ({ ...prev, [productId]: !prev[productId] }));
  };

  // Add artist's products to bank
  // const addArtistToBank = async (artist: string) => {
  //   // Find shop entry
  //   const shopEntry = shops.find((s) => s.shop === artist);
  //   if (!shopEntry) return;

  //   // If products for this shop aren't loaded yet, fetch them
  //   if (!shopEntry.product || shopEntry.product.length === 0) {
  //     try {
  //       const res = await fetch(
  //         `/api/product/byshop?shop=${artist}&designerId=${royalId}`
  //       );
  //       const data: { products: ApiProduct[] } = await res.json();
  //       shopEntry.product = data.products.map(
  //         (p): Product => ({
  //           id: p.id || p.title,
  //           name: truncateText(p.title),
  //           earnings: p?.totalRoyaltyEarned?.usdAmount || 0,
  //           artist: p.shop,
  //           details: p.totalSold
  //             ? {
  //                 retailPrice: p.price?.toString() || "$0",
  //                 totalUnits: p.totalSold,
  //                 totalSales: (
  //                   (p.price?.amount || 0) * (p.totalSold || 0)
  //                 ).toString(),
  //                 royaltyPercentage: p.royality || "0%",
  //               }
  //             : undefined,
  //         })
  //       );
  //     } catch (err) {
  //       console.error(err);
  //     }
  //   }

  //   const newItems = shopEntry.product
  //     .filter((p) => !bankItems.find((b) => b.id === p.id))
  //     .map((p) => ({
  //       id: p.id,
  //       name: p.name.replace("Vinyl", "").replace("Product Name", "").trim(),
  //       amount: p.earnings,
  //     }));

  //   if (newItems.length > 0) setBankItems((prev) => [...prev, ...newItems]);
  // };

  // Add single product to bank
  // const addToBank = (product: Product) => {
  //   if (!bankItems.find((item) => item.id === product.id)) {
  //     setBankItems((prev) => [
  //       ...prev,
  //       {
  //         id: product.id,
  //         name: product.name
  //           .replace("Vinyl", "")
  //           .replace("Product Name", "")
  //           .trim(),
  //         amount: product.earnings,
  //       },
  //     ]);
  //   }
  // };

  // Remove from bank
  const removeFromBank = (itemId: string) => {
    setBankItems((prev) => prev.filter((item) => item.id !== itemId));
  };

  // Calculate totals
  const totalRoyalties = products.reduce((sum, p) => sum + p.earnings, 0);
  console.log("totalRoyalties", totalRoyalties, transactionAmount);
  // const totalBank = bankItems.reduce((sum, item) => sum + item.amount, 0);

  useEffect(() => {
    async function fetchWithdrawn() {
      if (!royalId) return;
      try {
        const res = await fetch(`/api/withdraw-request/${royalId}`, {
          cache: "no-store",
        });
        const data = await res.json();
        setWithdrawnTotal(data.totalAmount || 0);
      } catch (err) {
        console.error("Failed to fetch withdrawal total:", err);
      }
    }
    fetchWithdrawn();
  }, [royalId]);
  const [showError, setShowError] = useState(false);
  const [withdrawnTotal, setWithdrawnTotal] = useState<number>(0);

  const subtotal = Math.max(totalRoyalties - withdrawnTotal, 0);
  console.log("subtotal", subtotal);
  const platformFees = parseFloat((subtotal * 0.03).toFixed(2));
  console.log("platformFees", platformFees);
  const withdrawal = Math.max(totalRoyalties - subtotal, 0);

  console.log("withdrawal", withdrawal);

  const finalAmount = parseFloat((subtotal - platformFees).toFixed(2));
  console.log("finalAmount", finalAmount);

  return (
    <div className="min-h-screen  bg-primary p-4 sm:p-6">
      <div className="h-full max-w-7xl mx-auto space-y-5 ">
        {/* Header */}
        <Header title="Royalty Report" />
        <div className="grid grid-cols-12 gap-4 py-4 border-b-2 border-white mb-4"></div>
        <div className="flex items-center justify-between text-secondary mb-5">
          <h2 className="text-sm sm:text-xl font-bold ">
            My Royalties
          </h2>
          <div className="flex items-center gap-2">
            <span className="text-sm sm:text-xl font-bold ">
              $
              {Number(totalRoyalties).toLocaleString(undefined, {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </span>
          </div>
        </div>
        <div className="grid sm:grid-cols-12 gap-4 border-b-2 border-white mb-4"></div>

        <div className="h-full flex flex-col lg:flex-row gap-5">
          <LeftPanel
            expandedSections={expandedSections}
            expandedProducts={expandedProducts}
            subtotal={withdrawal}
            loading={loading}
            shops={shops}
            toggleSection={toggleSection}
            toggleProduct={toggleProduct}
            totalRoyalties={totalRoyalties}
          />

          <RightPanel
            bankItems={bankItems}
            removeFromBank={removeFromBank}
            subtotal={subtotal}
            platformFees={platformFees}
            finalAmount={finalAmount}
            showError={showError}
            setShowError={setShowError}
            setWithdrawAmount={setWithdrawAmount}
            handleSetCurrentPage={handleSetCurrentPage}
          />
        </div>
        <ForWordButton
          title="Go to transaction reports"
          url="transaction-reports"
        />
      </div>
    </div>
  );
}
