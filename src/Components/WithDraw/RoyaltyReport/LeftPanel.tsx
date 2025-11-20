"use client";
import React from "react";
import { ChevronRight, ChevronDown, Play } from "lucide-react";

import { LeftPanelProps } from "@/lib/type";

export default function LeftPanel({
  expandedSections,
  expandedProducts,
  subtotal,
  loading,
  shops,
  toggleSection,
  toggleProduct,
  totalRoyalties,
}: LeftPanelProps) {
  return (
    <div className="flex-1 flex flex-col">
      <div className="h-full bg-secondary rounded-3xl p-6  flex flex-col">
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-xl sm:text-3xl font-bold text-gray-900">
            Total withdrawal{" "}
          </h2>
          <div className="flex items-center gap-2">
            <span className="text-2xl sm:text-3xl font-bold text-gray-900">
              $
              {Number(subtotal).toLocaleString(undefined, {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </span>
          </div>
        </div>

        {expandedSections.royalties && (
          <div className="border-t-2 border-black pt-5 flex-1 overflow-y-auto">
            {loading ? (
              <div className="text-center text-gray-500">Loading...</div>
            ) : (
              shops.map((shop) => (
                <div key={shop.shop} className="mb-6">
                  <div className="flex items-center justify-between w-full border-b-2 border-black pb-2">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => toggleSection(shop.shop)}
                        className="p-1 hover:bg-gray-300 rounded transition-colors"
                      >
                        {expandedSections[shop.shop] ? (
                          <Play
                            fill="#000000"
                            className={`transition-transform duration-300 rotate-90 w-4 h-4 sm:w-6 sm:h-6 md:w-6 md:h-6 `}
                          />
                        ) : (
                          <Play
                            fill="#000000"
                            className="transition-transform duration-300 rotate-0 w-4 h-4 sm:w-6 sm:h-6 md:w-6 md:h-6 "
                          />
                        )}
                      </button>
                      <span className="text-lg font-bold text-gray-900">
                        {shop.shop}
                      </span>
                    </div>
                    {/* <button
                      onClick={() => addArtistToBank(shop.shop)}
                      className="p-1 hover:bg-gray-300 rounded transition-colors"
                    >
                      <Plus className="w-5 h-5 text-gray-900" />
                    </button> */}
                  </div>

                  {expandedSections[shop.shop] && (
                    <div>
                      {/* Table Header */}
                      <div className="grid grid-cols-12 gap-2 sm:gap-4 py-2 text-sm text-gray-600 border-b-2 border-black">
                        <div className="col-span-6 sm:col-span-5 ml-6">
                          Product
                        </div>
                        <div className="col-span-3 sm:col-span-3 text-right">
                          Earnings
                        </div>
                        {/* <div className="col-span-3 sm:col-span-4 text-center">
                          Add to Bank
                        </div> */}
                      </div>
                      <div className="border border-black mt-5"></div>

                      {/* Product Rows */}
                      {shop.product.map((product) => (
                        <div
                          key={product.id}
                          className="border-b-2 border-black"
                        >
                          <div className="grid grid-cols-12 gap-2 sm:gap-4 py-3 items-center">
                            <div
                              className="col-span-6 sm:col-span-5 flex items-center gap-2 cursor-pointer hover:bg-gray-200 rounded px-1 transition"
                              // onClick={() => addToBank(product)}
                            >
                              <button
                                onClick={(e) => {
                                  e.stopPropagation(); // prevent adding to bank when expanding
                                  toggleProduct(product.id);
                                }}
                                className="p-1 hover:bg-gray-300 rounded transition-colors"
                              >
                                {expandedProducts[product.id] ? (
                                  <ChevronDown className="w-4 h-4 text-gray-900" />
                                ) : (
                                  <ChevronRight className="w-4 h-4 text-gray-900" />
                                )}
                              </button>
                              <span className="font-normal text-gray-900 text-sm sm:text-base">
                                {product.name}
                              </span>
                            </div>

                            <div className="col-span-3 sm:col-span-3 text-right text-gray-900 font-normal text-sm sm:text-base">
                              {product.earnings.toFixed(2)}
                            </div>
                            <div className="col-span-3 sm:col-span-4 text-center">
                              {/* <button
                                onClick={() => addToBank(product)}
                                className="p-1 hover:bg-gray-300 rounded transition-colors"
                              >
                                <Plus className="w-4 h-4 text-gray-900" />
                              </button> */}
                            </div>
                          </div>

                          {expandedProducts[product.id] && product.details && (
                            <div className="ml-8 mb-3 text-xs text-gray-600 leading-tight space-y-1">
                              <div>
                                Retail Price{" "}
                                <span className="font-bold text-black">
                                  {`$${parseFloat(
                                    product.details.retailPrice
                                  ).toFixed(2)}`}
                                  /Unit
                                </span>
                              </div>
                              <div>
                                Total Units Sold{" "}
                                <span className="font-bold text-black">
                                  {product.details.totalUnits}
                                </span>
                              </div>
                              <div>
                                Total Sales To Date{" "}
                                <span className="font-bold text-black">
                                  {`$${parseFloat(
                                    product.details.totalSales
                                  ).toFixed(2)}`}
                                </span>
                              </div>
                              <div>
                                Royalty Percentage{" "}
                                <span className="font-bold text-black">
                                  {product.details.royaltyPercentage}%
                                </span>
                              </div>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
}
