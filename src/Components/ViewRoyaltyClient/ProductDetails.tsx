
"use client";
import React from "react";
import { Play } from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Tooltip as RechartsTooltip,
} from "recharts";
import { ProductDetailsProps, InfoRowProps } from "@/lib/type";
import { Tooltip } from "../Common/Tooltip";
import Header from "../Common/Header";
import { EmptyState } from "./EmptyState";

const InfoRow = ({ label, value }: InfoRowProps) => (
  <div className="border-b border-white pb-2 lg:text-[31px] flex gap-2 pl-3">
    <span>{label}</span>
    <span className="font-bold pb-2">{value}</span>
  </div>
);

export const ProductDetails = ({
  selectedProduct,
  selectedClient,
  productSalesHistory,
  handleBackToClientRoyalties,
  handleBackToAllRoyalties,
}: ProductDetailsProps) => (
  <div className="h-full  bg-primary text-secondary">
    {/* Header */}
    <div className="px-4 sm:px-6 lg:px-8 py-4">
      <Header title={`Product Details`} className="mb-6 mt-2" />

      {/* Back Navigation */}
      <div className="grid grid-cols-12 border-b-2 border-white hidden sm:block"></div>

      <div className="mb-3 mt-3 hidden sm:block">
        <button
          onClick={
            selectedClient
              ? handleBackToClientRoyalties
              : handleBackToAllRoyalties
          }
          className="flex items-center text-secondary hover:text-gray-200 transition-colors  pb-1"
        >
          {/* <ArrowLeft className="mr-2 w-4 h-4" /> */}
          <Play
            fill="#FFFFFF"
            className={`transition-transform mr-2 duration-300 rotate-180`}
          />
          <span className="text-sm lg:text-[18px]">
            back to {selectedClient || "client"} royalties
          </span>
        </button>
      </div>
      <div className="grid grid-cols-12  border-b-2 border-white "></div>
    </div>

    {/* Main Content */}
    <div className="px-4 sm:px-6 lg:px-8  pb-8 grid grid-cols-1 lg:grid-cols-6 gap-8">
      <div className="lg:col-span-3">
        <h2 className="text-2xl sm:text-3xl lg:text-[80px] font-normal mb-2">
          <Tooltip
            size="lg"
            color="secondary"
            content={selectedProduct?.fullProductName || ""}
          >
            <span>
              {selectedProduct?.product &&
              selectedProduct?.product?.length > 10
                ? selectedProduct.product.slice(0, 15) + "..."
                : selectedProduct?.product}
            </span>
          </Tooltip>
        </h2>
        <div className="border-b border-white pb-2 flex gap-2 mb-4"></div>

        <div className="space-y-8">
          <InfoRow
            label="Total Sales To Date"
            value={selectedProduct?.salesData ?? "-"}
          />
          <InfoRow
            label="Total Royalties To Date"
            value={selectedProduct?.royaltiesData ?? "-"}
          />
          <InfoRow
            label="Retail Price"
            value={selectedProduct?.retailPrice ?? "-"}
          />
          <InfoRow
            label="Total Units Sold"
            value={selectedProduct?.unitsSold ?? "-"}
          />
          <InfoRow
            label="Royalty Percentage"
            value={`${selectedProduct?.percentage ?? 0}%`}
          />
        </div>
        <div className="text-center py-6">
          <p className="text-secondary text-xl font-normal">
            scroll to view more
          </p>
        </div>
      </div>

      <div className="lg:col-span-3">
        <h2 className="text-2xl sm:text-3xl lg:text-[80px] font-normal mb-2 ">
          Sales History
        </h2>
        <div className="border-b border-white pb-2 flex gap-2 mb-8"></div>

        <div className="w-full bg-primary rounded-lg border border-white h-50 sm:h-97 py-2">
          <h3 className="text-sm lg:text-[31px] font-light border-b border-white mb-4 pb-2">
            &nbsp;&nbsp;&nbsp;{selectedProduct?.product} Sales History
          </h3>

          {productSalesHistory.length === 0 ? (
            <EmptyState
              title="No sales data available"
              message="This product has no sales history yet"
            />
          ) : (
            <ResponsiveContainer className="pr-2" width="100%" height="97%">
              <LineChart
                data={productSalesHistory}
                margin={{ top: 20, right: 10, bottom: 40 }}
              >
                <XAxis
                  dataKey="month"
                  tick={{ fontSize: 10, fill: "white" }}
                  axisLine={{ stroke: "#fff" }}
                  tickLine
                />
                <YAxis
                  tick={{ fontSize: 10, fill: "white" }}
                  axisLine={{ stroke: "#fff" }}
                  tickLine={false}
                />
                <Line
                  type="monotone"
                  dataKey="sales"
                  stroke="white"
                  strokeWidth={2}
                  dot={{ r: 0 }}
                />
                <RechartsTooltip
                  contentStyle={{
                    backgroundColor: "var(--primary)",
                    border: "1px solid white",
                    borderRadius: "4px",
                  }}
                  itemStyle={{ color: "white" }}
                />
              </LineChart>
            </ResponsiveContainer>
          )}
        </div>
      </div>
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