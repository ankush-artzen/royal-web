"use client";

import React, { useState } from "react";
import { Search } from "lucide-react";
import { MyRoyaltiesProps } from "@/lib/type";
import { Tooltip } from "../Common/Tooltip";
import Header from "../Common/Header";
import { EmptyState } from "./EmptyState";

export const MyRoyalties = ({
  myRoyaltiesData,
  visibleCount,
  isLoading,
  requestSort,
  getSortIcon,
  handleScroll,
  handleLoadMore,
  handleClientClick,
  handleProductClick,
  sortedData,
  formattedClient,
}: MyRoyaltiesProps) => {
  const [searchTerm, setSearchTerm] = useState("");

  const filtered = myRoyaltiesData.filter(
    (item) =>
      item.client.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.product.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sortedFiltered = sortedData(filtered);
  const data = sortedFiltered.slice(0, visibleCount);
  const hasMore = visibleCount < sortedFiltered.length;

  return (
    <div className="min-h-screen bg-primary text-secondary px-1 sm:px-6">
      <div className="px-4 sm:px-6  lg:px-8 py-4">
        <Header title="My Royalties" className="mt-2" />
        <div className="grid grid-cols-12 gap-4 py-4 border-b-2 border-white mb-4"></div>

        {/* Search */}
        <div className="flex justify-end items-center  border-b border-white pb-4 ">
          <input
            type="text"
            placeholder="search client or product"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="bg-transparent px-2 text-sm border-none outline-none"
          />
          <Search />
        </div>
      </div>

      {/* Table */}
      <div className="px-4 sm:px-6 lg:px-8">
        {/* Table Header */}
        {/* <div className="grid grid-cols-12 gap-4 py-4 border-b-2 border-white mb-4">
          <div className="col-span-3">
            <button className="flex items-center gap-2 text-2xl sm:text-2xl lg:text-[80px] font-semibold">
              Client
            </button>
          </div>

          <div className="col-span-6">
            <button className="flex items-center gap-2 text-2xl sm:text-2xl lg:text-[80px] font-semibold">
              Product
            </button>
          </div>

          <div className="col-span-3 text-right">
            <button className="flex items-center gap-2 text-2xl sm:text-2xl lg:text-[80px] font-semibold ml-auto">
              %
            </button>
          </div>
        </div>

        {/* Sorting Row */}
        {/* <div className="grid grid-cols-12 gap-2 sm:gap-4 pb-2 border-b-2 border-white">
          <div className="col-span-3">
            <div
              className="flex items-center gap-1 sm:gap-1 cursor-pointer"
              onClick={() => requestSort("client")}
            >
              <span className="flex items-center justify-center text-[14px] sm:text-[14px]">
                {getSortIcon("client")}
              </span>
              <p className="text-[10px] sm:text-[12px] lg:text-sm font-normal">
                arrange by client
              </p>
            </div>
          </div>

          <div className="col-span-6 sm:col-span-5">
            <div
              className="flex items-center gap-1 sm:gap-2 cursor-pointer"
              onClick={() => requestSort("product")}
            >
              <span className="flex items-center justify-center text-[14px] sm:text-[14px]">
                {getSortIcon("product")}
              </span>
              <p className="text-[10px] sm:text-[12px] lg:text-sm font-normal">
                arrange by product
              </p>
            </div>
          </div>

          <div className="col-span-3 text-right">
            <div
              className="flex items-center gap-1 sm:gap-2 cursor-pointer justify-end"
              onClick={() => requestSort("percentage")}
            >
              <span className="flex items-center justify-center text-[14px] sm:text-[14px]">
                {getSortIcon("percentage")}
              </span>
              <p className="text-[10px] sm:text-[12px] lg:text-sm font-normal">
                arrange by %
              </p>
            </div>
          </div>
        </div> */}

        {/* <div className="grid grid-cols-12 gap-4 py-4 border-b-2 border-white "></div> */}
        {/* Table */}
        {/* Table Header */}
        <div className="grid grid-cols-12 gap-4 py-4 border-b-2 border-white mb-4">
          <div className="col-span-3">
            <button className="flex items-center gap-2 text-2xl sm:text-2xl lg:text-[80px] font-semibold">
              Client
            </button>
          </div>
          <div className="col-span-6">
            <button className="flex items-center gap-2 text-2xl sm:text-2xl lg:text-[80px] font-semibold">
              Product
            </button>
          </div>
          <div className="col-span-3 text-right">
            <button className="flex items-center gap-2 text-2xl sm:text-2xl lg:text-[80px] font-semibold ml-auto">
              %
            </button>
          </div>
        </div>

        {/* Sorting Row */}
        <div className="grid grid-cols-12 gap-2 sm:gap-4 pb-2 border-b-2 border-white">
          <div className="col-span-3">
            <div
              className="flex items-center gap-1 sm:gap-2 cursor-pointer"
              onClick={() => requestSort("client")}
            >
              <span className="w-3 h-3 sm:w-4 sm:h-4 flex items-center justify-center">
                {getSortIcon("client")}
              </span>
              <p className="text-[10px] sm:text-[12px] lg:text-sm font-normal leading-none">
                arrange by client
              </p>
            </div>
          </div>

          <div className="col-span-6">
            <div
              className="flex items-center gap-1 sm:gap-2 cursor-pointer"
              onClick={() => requestSort("product")}
            >
              <span className="w-3 h-3 sm:w-4 sm:h-4 flex items-center justify-center">
                {getSortIcon("product")}
              </span>
              <p className="text-[10px] sm:text-[12px] lg:text-sm font-normal leading-none">
                arrange by product
              </p>
            </div>
          </div>

          <div className="col-span-3 text-right">
            <div
              className="flex items-center gap-1 sm:gap-2 cursor-pointer justify-end"
              onClick={() => requestSort("percentage")}
            >
              <span className="w-3 h-3 sm:w-4 sm:h-4 flex items-center justify-center">
                {getSortIcon("percentage")}
              </span>
              <p className="text-[10px] sm:text-[12px] lg:text-sm font-normal leading-none">
                arrange by %
              </p>
            </div>
          </div>
        </div>

        {/* Scrollable Table Data */}
        <div className="max-h-96 overflow-y-auto" onScroll={handleScroll}>
          {data.length === 0 ? (
            <EmptyState
              title="No royalties found"
              message="Your royalty data will appear here once available"
            />
          ) : (
            data.map((item, index) => (
              <div
                key={`${item.client}-${item.product}-${index}`}
                className="grid grid-cols-12 gap-4 py-4 border-b border-white font-light"
              >
                <button
                  onClick={() => handleClientClick(item.client)}
                  className="col-span-3 text-left text-sm lg:text-[31px] pl-4 hover:text-gray-300 transition-colors"
                >
                  {formattedClient(item.client)}
                </button>
                <button
                  onClick={() => handleProductClick(item)}
                  className="col-span-6 text-left text-sm lg:text-[31px] pl-4 hover:text-gray-300 transition-colors"
                >
                  <Tooltip
                    size="lg"
                    color="secondary"
                    content={item.fullProductName || item.product}
                  >
                    <span>{item.product}</span>
                  </Tooltip>
                </button>
                <span className="col-span-3 text-right text-sm lg:text-[31px] pr-4">
                  {item.percentage}
                </span>
              </div>
            ))
          )}
        </div>

        {/* Scroll to view more indicator */}
        {hasMore && (
          <div className="text-center py-6">
            <button
              onClick={handleLoadMore}
              disabled={isLoading}
              className="text-secondary text-xl  font-normal cursor-pointer disabled:opacity-50"
            >
              {isLoading ? "Loading..." : "scroll to view more"}
            </button>
          </div>
        )}

        {isLoading && (
          <div className="text-center py-4">
            <p className="text-secondary">Loading...</p>
          </div>
        )}
      </div>
    </div>
  );
};
