"use client";

import React, { useEffect, useState, useCallback } from "react";
import { Play } from "lucide-react";
import { ApiProduct, ApiShopEntry, RoyaltyProduct, User } from "@/lib/type";
import { BackButton } from "../Common/BackButton";
import { ProductDetails } from "./ProductDetails";
import { ClientRoyalties } from "./ClientRoyalties";
import { MyRoyalties } from "./MyRoyalties";

interface ViewRoyaltyClientProps {
  initialUser: User | null;
  initialRoyalties: ApiShopEntry[];
}

export default function ViewRoyaltyClient({
  initialUser,
}: ViewRoyaltyClientProps) {
  // State management
  const [currentPage, setCurrentPage] = useState<
    "my-royalties" | "client-royalties" | "product-details"
  >("my-royalties");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedProduct, setSelectedProduct] = useState<RoyaltyProduct | null>(
    null
  );
  const [selectedClient, setSelectedClient] = useState<string | null>(null);
  const [myRoyaltiesData, setMyRoyaltiesData] = useState<RoyaltyProduct[]>([]);
  const [clientRoyaltiesData, setClientRoyaltiesData] = useState<
    RoyaltyProduct[]
  >([]);

  const [productSalesHistory, setProductSalesHistory] = useState<
    { month: string; sales: number }[]
  >([]);

  const [royalId] = useState<string | null>(initialUser?.royalId || null);

  // Sorting
  const [sortConfig, setSortConfig] = useState<{
    key: keyof RoyaltyProduct;
    direction: "asc" | "desc";
  } | null>(null);

  // Infinite scroll states
  const [visibleCount, setVisibleCount] = useState(8);
  const [isLoading, setIsLoading] = useState(false);

  // Fetch top products across shops
  const formatShopName = (shop: string) => shop.replace(".myshopify.com", "");

  // helper: truncate long titles but keep full name for tooltip
  const truncateText = (text: string, maxLength: number = 20) =>
    text.length > maxLength ? text.substring(0, maxLength) + "..." : text;

  useEffect(() => {
    if (currentPage === "my-royalties") {
      if (!royalId) return;

      setIsLoading(true);
      fetch(`/api/product?designerId=${royalId}`)
        .then((res) => res.json())
        .then((data) => {
          const result: ApiShopEntry[] = data.result;
          console.log("data:", data);

          const mapped: RoyaltyProduct[] = result.map((entry) => {
            const productName = entry.topProduct?.title ?? "Untitled";
            return {
              id: entry.topProduct?.id ?? "unknown",
              client: formatShopName(entry.topProduct?.shop ?? ""),
              product: truncateText(productName),
              fullProductName: productName,
              percentage: entry.topProduct?.royality?.toString() ?? "0",
              salesData: `$${(
                (entry.topProduct?.totalSold ?? 0) *
                (entry.topProduct?.price?.amount ?? 0)
              ).toFixed(2)}`,
              royaltiesData: `$${
                entry.topProduct?.totalRoyaltyEarned?.usdAmount
                  ? Number(
                      entry.topProduct?.totalRoyaltyEarned?.usdAmount
                    ).toFixed(2)
                  : 0
              }`,
              retailPrice: `$${entry.topProduct?.price?.amount ?? 0}/Unit`,
              unitsSold: entry.topProduct?.totalSold?.toString() ?? "0",
              shop: entry.shop,
            };
          });

          setMyRoyaltiesData(mapped);
          setVisibleCount(8);
          setIsLoading(false);
        })
        .catch((err) => {
          console.error("Error loading top-products", err);
          setIsLoading(false);
        });
    }
  }, [currentPage, royalId]);

  useEffect(() => {
    if (currentPage === "client-royalties" && selectedClient) {
      setIsLoading(true);
      fetch(
        `/api/product/byshop?shop=${selectedClient}.myshopify.com&designerId=${royalId}`
      )
        .then((res) => res.json())
        .then((data: { products: ApiProduct[] }) => {
          const mapped: RoyaltyProduct[] = data.products.map((item) => {
            const productName = item.title ?? "Untitled";
            return {
              id: item.id ?? "unknown",
              product: truncateText(productName),
              fullProductName: productName,
              status: item.status ?? "Active",
              percentage: item.royality?.toString() ?? "0",
              // salesData: `$${
              //             (item.totalSold ?? 0) * (item.price?.amount ?? 0).toFixed(2)
              // }`,
              salesData: `$${(
                (item.totalSold ?? 0) * (item.price?.amount ?? 0)
              ).toFixed(2)}`,
              royaltiesData: `$${
                item?.totalRoyaltyEarned?.usdAmount
                  ? Number(item?.totalRoyaltyEarned?.usdAmount).toFixed(2)
                  : 0
              }`,
              retailPrice: `$${item.price?.amount ?? 0}/Unit`,
              unitsSold: item.totalSold?.toString() ?? "0",
              shop: formatShopName(item.shop),
              client: selectedClient,
            };
          });
          console.log("mapped data:", mapped);
          setClientRoyaltiesData(mapped);
          setVisibleCount(8);
          setIsLoading(false);
        })
        .catch((err) => {
          console.error("Error loading shop-products", err);
          setIsLoading(false);
        });
    }
  }, [currentPage, selectedClient, royalId]);

  // Sorting handler
  const requestSort = (key: keyof RoyaltyProduct) => {
    let direction: "asc" | "desc" = "asc";
    if (
      sortConfig &&
      sortConfig.key === key &&
      sortConfig.direction === "asc"
    ) {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  // Get sort icon based on current sort state
  const getSortIcon = (key: keyof RoyaltyProduct) => {
    if (sortConfig && sortConfig.key === key) {
      return sortConfig.direction === "asc" ? (
        // <ChevronUp className="w-4 h-4" />
        <Play
          fill="#FFFFFF"
          className="transition-transform duration-300 rotate-90   w-4 h-4
              sm:w-6 sm:h-6
              md:w-6 md:h-6 "
        />
      ) : (
        // <ChevronDown className="w-4 h-4" />
        <Play
          fill="#FFFFFF"
          className="transition-transform duration-300 rotate-0   w-4 h-4
              sm:w-6 sm:h-6
              md:w-6 md:h-6"
        />
      );
    }
    return (
      <Play
        fill="#FFFFFF"
        className={`transition-transform duration-300 rotate-0 
             w-4 h-4
              sm:w-6 sm:h-6
              md:w-6 md:h-6 `}
      />
    );
  };

  const sortedData = useCallback(
    (data: RoyaltyProduct[]) => {
      if (!sortConfig) return data;

      return [...data].sort((a, b) => {
        let aValue: string | number;
        let bValue: string | number;

        if (sortConfig.key === "percentage") {
          aValue = parseFloat(a[sortConfig.key]?.toString() || "0");
          bValue = parseFloat(b[sortConfig.key]?.toString() || "0");
        } else if (sortConfig.key === "unitsSold") {
          aValue = parseInt(a[sortConfig.key]?.toString() || "0");
          bValue = parseInt(b[sortConfig.key]?.toString() || "0");
        } else {
          aValue = (a[sortConfig.key] ?? "").toString().toLowerCase();
          bValue = (b[sortConfig.key] ?? "").toString().toLowerCase();
        }

        if (aValue < bValue) return sortConfig.direction === "asc" ? -1 : 1;
        if (aValue > bValue) return sortConfig.direction === "asc" ? 1 : -1;
        return 0;
      });
    },
    [sortConfig]
  );

  // Reset visible count when search term changes
  useEffect(() => {
    setVisibleCount(8);
  }, [searchTerm]);

  // Reset search and sort when changing pages
  useEffect(() => {
    setSearchTerm("");
    setSortConfig(null);
    setVisibleCount(8);
  }, [currentPage, selectedClient]);

  // Infinite scroll handler
  const handleScroll = useCallback(
    (e: React.UIEvent<HTMLDivElement>) => {
      const { scrollTop, clientHeight, scrollHeight } = e.currentTarget;
      if (scrollTop + clientHeight >= scrollHeight - 20 && !isLoading) {
        setVisibleCount((prev) => prev + 8);
      }
    },
    [isLoading]
  );

  // Load more handler for scroll indicator
  const handleLoadMore = () => {
    if (!isLoading) {
      setVisibleCount((prev) => prev + 8);
    }
  };

  const handleClientClick = (clientName: string) => {
    setSelectedClient(clientName);
    setCurrentPage("client-royalties");
  };

  const handleProductClick = (product: RoyaltyProduct) => {
    console.log("product:", product);
    setSelectedProduct(product);
    setCurrentPage("product-details");
    console.log(product.id, "productid");

    // Fetch sales history for this product
    fetch(`/api/product/sales-history?id=${product.id}&designerId=${royalId}`)
      .then((res) => res.json())
      .then((data: { month: string; sales: number }[]) => {
        console.log("data259*************", data);
        setProductSalesHistory(data);
      })
      .catch((err) => console.error("Error fetching sales history", err));
  };

  const handleBackToAllRoyalties = () => {
    setSelectedClient(null);
    setCurrentPage("my-royalties");
  };

  const handleBackToClientRoyalties = () => {
    setCurrentPage("client-royalties");
  };

  const formattedClient = (client: string | null) => {
    return client
      ? client.charAt(0).toUpperCase() + client.slice(1).toLowerCase()
      : "";
  };

  // --- Main Switch ---
  if (currentPage === "product-details")
    return (
      <>
        <ProductDetails
          selectedProduct={selectedProduct}
          selectedClient={selectedClient}
          productSalesHistory={productSalesHistory}
          handleBackToClientRoyalties={handleBackToClientRoyalties}
          handleBackToAllRoyalties={handleBackToAllRoyalties}
        />
        <BackButton title="Go to royal dashboard" url="royal-dashboard" />
      </>
    );
  if (currentPage === "client-royalties")
    return (
      <>
        <ClientRoyalties
          selectedClient={selectedClient}
          clientRoyaltiesData={clientRoyaltiesData}
          visibleCount={visibleCount}
          isLoading={isLoading}
          sortConfig={sortConfig}
          requestSort={requestSort}
          getSortIcon={getSortIcon}
          handleScroll={handleScroll}
          handleLoadMore={handleLoadMore}
          handleProductClick={handleProductClick}
          handleBackToAllRoyalties={handleBackToAllRoyalties}
          sortedData={sortedData}
          formattedClient={formattedClient}
        />
        <BackButton title="Go to royal dashboard" url="royal-dashboard" />
      </>
    );
  return (
    <>
      <MyRoyalties
        myRoyaltiesData={myRoyaltiesData}
        visibleCount={visibleCount}
        isLoading={isLoading}
        sortConfig={sortConfig}
        requestSort={requestSort}
        getSortIcon={getSortIcon}
        handleScroll={handleScroll}
        handleLoadMore={handleLoadMore}
        handleClientClick={handleClientClick}
        handleProductClick={handleProductClick}
        sortedData={sortedData}
        formattedClient={formattedClient}
      />
      <BackButton title="Go to royal dashboard" url="royal-dashboard" />
    </>
  );
}
