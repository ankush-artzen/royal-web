
"use client";
import React from "react";

import { useState } from "react";
import { Play, Search } from "lucide-react";
import { ClientRoyaltiesProps } from "@/lib/type";
import { Tooltip } from "../Common/Tooltip";
import Header from "../Common/Header";
import { EmptyState } from "./EmptyState";

export const ClientRoyalties = ({
  selectedClient,
  clientRoyaltiesData,
  visibleCount,
  isLoading,
  requestSort,
  getSortIcon,
  handleScroll,
  handleLoadMore,
  handleProductClick,
  handleBackToAllRoyalties,
  sortedData,
  formattedClient,
}: ClientRoyaltiesProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const filtered = clientRoyaltiesData.filter((item) =>
    item.product.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sortedFiltered = sortedData(filtered);
  const data = sortedFiltered.slice(0, visibleCount);
  const hasMore = visibleCount < sortedFiltered.length;

  return (
    <div className="min-h-screen bg-primary text-secondary px-1 sm:px-6">
      {/* Header */}
      <div className="px-4 sm:px-6 lg:px-8 pt-2 pb-0">
        {/* <div className="bg-secondary rounded-3xl px-6 py-4 mb-6">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-black">
            {formattedClient(selectedClient)} Royalties
          </h1>
        </div> */}
        <Header
          title={`${formattedClient(selectedClient)} Royalties`}
          className="mt-4"
        />
        <div className="hidden sm:grid grid-cols-12 gap-4 py-4 border-b-2 border-white mb-4"></div>

        {/* Back + Search */}
        <div className="hidden sm:flex justify-between items-center border-b border-white pb-4 ">
          <button
            onClick={handleBackToAllRoyalties}
            className="flex items-center"
          >
            {/* <ArrowLeft className="mr-2 w-4 h-4" /> */}
            <Play
              fill="#FFFFFF"
              className={`transition-transform mr-2 duration-300 rotate-180`}
            />
            <span className="text-sm lg:text-[18px]">
              back to all royalties
            </span>
          </button>
          <div className="flex">
            <input
              type="text"
              placeholder="search product"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="bg-transparent  text-sm border-none outline-none"
            />
            <Search />
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="px-4 sm:px-6 lg:px-8 space-y-4">
        <div className="grid grid-cols-12 gap-4 py-4 border-b-2 border-white">
          <div className="col-span-6 flex flex-col">
            <button className="flex items-center gap-2 text-2xl lg:text-[80px] font-semibold">
              Product
            </button>
          </div>
          <div className="col-span-3 flex flex-col">
            <button className="flex items-center gap-2 text-2xl lg:text-[80px] font-semibold">
              Status
            </button>
          </div>
          <div className="col-span-3 flex flex-col text-right">
            <button className="flex items-center gap-2 text-2xl lg:text-[80px]  font-semibold ml-auto">
              %
            </button>
          </div>
        </div>

        {/* <div className="grid grid-cols-12 gap-4 pb-2  border-b-2 border-white flex justify-center items-center">
          <div className="col-span-6 flex flex-col">
            <div
              className="flex gap-2 cursor-pointer"
              onClick={() => requestSort("product")}
            >
              {getSortIcon("product")}
              <p className="text-sm font-normal ">arrange by product name</p>
            </div>
          </div>
          <div className="col-span-3 flex flex-col ">
            <div
              className="flex gap-2 cursor-pointer"
              onClick={() => requestSort("status")}
            >
              {getSortIcon("status")}
              <p className="text-sm font-normal ">arrange by status</p>
            </div>
          </div>
          <div className="col-span-3 flex flex-col text-right lg:ml-48 md:ml-24">
            <div
              className="flex gap-2 cursor-pointer"
              onClick={() => requestSort("percentage")}
            >
              {getSortIcon("percentage")}
              <p className="text-sm font-normal ">arrange by %</p>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-12 gap-4 py-2 border-b-2 border-white "></div> */}
<div className="grid grid-cols-12 gap-4 pb-2 border-b-2 border-white">
  {/* Product */}
  <div className="col-span-6">
    <div
      className="flex items-center gap-1 sm:gap-2 cursor-pointer"
      onClick={() => requestSort("product")}
    >
      <span className="w-3 h-3 sm:w-4 sm:h-4 flex items-center justify-center">
        {getSortIcon("product")}
      </span>
      <p className="text-[10px] sm:text-[12px] lg:text-sm font-normal leading-none">
        arrange by product name
      </p>
    </div>
  </div>

  {/* Status */}
  <div className="col-span-3">
    <div
      className="flex items-center gap-1 sm:gap-2 cursor-pointer"
      onClick={() => requestSort("status")}
    >
      <span className="w-3 h-3 sm:w-4 sm:h-4 flex items-center justify-center">
        {getSortIcon("status")}
      </span>
      <p className="text-[10px] sm:text-[12px] lg:text-sm font-normal leading-none">
        arrange by status
      </p>
    </div>
  </div>

  {/* Percentage */}
  <div className="col-span-3 text-right">
    <div
      className="flex items-center justify-end gap-1 sm:gap-2 cursor-pointer"
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


{/* Next Row — perfectly aligned with the one above */}
<div className="grid grid-cols-12 gap-4 py-2 border-b-2 border-white"></div>

        {/* Scrollable Table Content */}
        <div className="max-h-96 overflow-y-auto" onScroll={handleScroll}>
          {data.length === 0 ? (
            <EmptyState
              title="No client royalties found"
              message="Royalties for this client will appear here"
            />
          ) : (
            data.map((item, index) => (
              <div
                key={`${item.product}-${index}`}
                onClick={() => handleProductClick(item)}
                className="grid grid-cols-12 gap-4 py-3 border-b border-white cursor-pointer lg:text-[31px] font-light hover:bg-white/10 transition-colors"
              >
                <span className="col-span-6 pl-4">
                  <Tooltip
                    size="lg"
                    color="secondary"
                    content={item.fullProductName || item.product}
                  >
                    <span>{item.product}</span>
                  </Tooltip>
                </span>
                <span className="col-span-3 pl-5">{item.status}</span>
                <span className="col-span-3 text-right pr-4">
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
              className="text-secondary text-xl font-normal cursor-pointer disabled:opacity-50"
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

        <div className="bg-stone-200 rounded-3xl p-3 text-start flex sm:hidden justify-between mt-5">
          <button
            onClick={handleBackToAllRoyalties}
            className="flex items-center gap-8"
          >
            {/* <ArrowLeft className="mr-2 w-4 h-4 text-black" /> */}
            <Play
              fill="#000000"
              className={`transition-transform mr-2 duration-300 rotate-180`}
            />
            <span className="text-xl text-black font-medium">
              back to all royalties
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};
