"use client";

import ChangeEmailModal from "@/Components/Popup/ChangeEmailPopup";
import ChangePasswordModal from "@/Components/Popup/ChangePassword";
import ChangePhoneNumberModal from "@/Components/Popup/ChangePhoneNumber";
import { jwtDecode } from "jwt-decode";
import { useState } from "react";
import { useSelector } from "react-redux";
import ConfirmBox from "../Popup/ConfirmBox";
import Button from "../Common/Button";

import { RootState } from "../../redux/store";
import {
  Bar,
  XAxis,
  YAxis,
  ResponsiveContainer,
  BarChart,
  LabelList,
} from "recharts";
import { TokenPayload, RoyalAnalyticsProps, Notification } from "@/lib/type";
import ErrorPopup from "../Popup/ErrorPopup";
import { ForWordButton } from "../Common/BackButton";
import PaymentAccountSetup from "../Popup/PaymentAccountSetup";

function RoyalAnalyticsClient({
  email,
  royalId,
  phoneNumber,
  account,
  allProducts,
  salesByProductData,
  salesByClientData,
  notifications,
}: RoyalAnalyticsProps) {

  const [isPasswordModalOpen, setPasswordModalOpen] = useState(false);
  const [isPhoneModalOpen, setIsPhoneModalOpen] = useState(false);
  const [isEmailModalOpen, setIsEmailModalOpen] = useState(false);
  const [isPaymentAccountModalOpen, setIsPaymentAccountModalOpen] =
    useState(false);
  const [isErrorModalOpen, setIsErrorModalOpen] = useState(false);
  const token = useSelector((state: RootState) => state.auth.token);
  const [open, setOpen] = useState(false);
  const [userData, setUserData] = useState({
    email,
    phoneNumber,
    royalId,
    account,
  });
  const [latestNotifications, setLatestNotifications] = useState<
    Notification[]
  >(notifications || []);

  const markAsRead = async (id: string) => {
    const notification = latestNotifications.find((n) => n.id === id);
    console.log("notification", notification, id);
    if (!notification) return;

    // 1️⃣ Update UI immediately
    setLatestNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, isRead: true } : n))
    );

    // 2️⃣ Send update to backend
    try {
      await fetch("/api/notification", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          designerId: notification.designerId,
          notificationId: notification.id,
        }),
      });
    } catch (error) {
      console.error("❌ Failed to update notification:", error);
    }
  };

  const fetchUser = async () => {
    if (!token) return;

    try {
      const decoded = jwtDecode<TokenPayload>(token);
      const id = decoded.id;
      const res = await fetch(`/api/user/me?id=${id}`);
      const data = await res.json();

      if (data?.user) {
        setUserData((prev) => ({
          ...prev,
          email: data.user.email,
          phoneNumber: data.user.phoneNumber,
          account: data.user.account || null,
        }));
      }
    } catch (err) {
      console.error("Invalid token", err);
    }
  };

  function normalizeRoyalty(royalty: object) {
    if (!royalty) return { amount: 0, currency: "USD", usdAmount: 0 };

    // If it's already an object
    if (typeof royalty === "object") return royalty;

    // If it's a string (stringified JSON)
    try {
      return JSON.parse(royalty);
    } catch {
      return { amount: 0, currency: "USD", usdAmount: 0 };
    }
  }


  const totalRoyalties = allProducts.reduce((sum, p) => {
    const royalty = normalizeRoyalty(p.totalRoyaltyEarned);
    return sum + (royalty.usdAmount ?? 0);
  }, 0);
  // Calculate total royalties in last 30 days (this would need actual date data from API)
  // For now, using a placeholder calculation
  const totalLast30Days =
    allProducts.length > 0
      ? allProducts.reduce((sum, p) => {
          const royalty = normalizeRoyalty(p.totalRoyaltyEarned);
          return sum + (royalty.usdAmount ?? 0) * 0.3;
        }, 0)
      : 0.0;

  //   if (loading) {
  //     return (
  //       <div className="min-h-screen bg-[#0037e1] text-secondary font-sans px-4 flex items-center justify-center">
  //         <div className="text-xl">Loading...</div>
  //       </div>
  //     );
  //   }

  return (
    <div className="min-h-screen bg-primary text-secondary font-sans px-4">
      {/* Header */}
      <div className="px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex justify-between items-start">
          <h1 className="text-6xl sm:text-[114px] font-bold">Royal</h1>
          <div className="text-right">
            <div className="text-xl sm:text-[45px]">Current Royalties</div>
            <div className="text-xl sm:text-[53px] font-bold">
              ${totalRoyalties.toFixed(2)}
            </div>
          </div>
        </div>
      </div>

      <div className="px-4 sm:px-6 lg:px-8 py-4 space-y-6">
        {/* Notification Center */}
        <div className="border-b border-white pb-6">
          <div className="px-4 sm:px-6 lg:px-8 border-b border-white"></div>

          <p className="text-lg lg:text-[38px] font-semibold mb-2 pt-2 flex items-baseline">
            Notification Center
          </p>
          <div className="border-b border-white pb-2"></div>

          <div className="space-y-3 pt-4 ">
            {latestNotifications &&
              latestNotifications
                .filter((n) => !n.isRead)
                .map((n, i) => (
                  <div
                    key={i}
                    className="flex items-baseline cursor-pointer"
                    onClick={() => markAsRead(n.id)}
                  >
                    <div
                      className={`w-3 h-3 border border-white rounded-full mt-2 mr-3 flex-shrink-0 ${
                        n.isRead ? "bg-white" : "bg-transparent"
                      }`}
                    ></div>
                    <p
                      className={`text-lg lg:text-[31px] ${
                        n.isRead ? "line-through opacity-60" : ""
                      }`}
                    >
                      {n.message}
                    </p>
                  </div>
                ))}
            {latestNotifications &&
              !latestNotifications.filter((n) => !n.isRead).length && (
                <div className="flex items-center cursor-pointer">
                  <div
                    className={` mr-3 flex-shrink-0 bg-transparent
                   `}
                  ></div>
                  <p
                    className={`text-lg lg:text-[18px] line-through opacity-60`}
                  >
                    No new notifications
                  </p>
                </div>
              )}
          </div>
        </div>

        {/* Analytics */}
        <div className="pb-6">
          <h2 className="text-lg lg:text-[38px] font-semibold mb-4 flex items-center">
            Analytics
          </h2>
          <div className="px-4 sm:px-6 lg:px-8 border-b border-white pb-2"></div>

          <div className="space-y-6 mb-6 mt-6">
            <div className="text-lg lg:text-[31px]">
              <span>Total Royalties Currently Available: </span>
              <span className="font-bold"> ${totalRoyalties.toFixed(2)}</span>
            </div>
            <div className="text-lg lg:text-[31px]">
              <span>Total Royalties In The Last 30 Days: </span>
              <span className="font-bold">${totalLast30Days.toFixed(2)}</span>
            </div>
            <div className="text-lg lg:text-[31px]">
              <span>Total Royalties To Date: </span>
              <span className="font-bold">${totalRoyalties.toFixed(2)}</span>
            </div>
          </div>
          <div className="px-4 sm:px-6 lg:px-8 border-b border-white pb-2 mb-8"></div>

          {/* Charts Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Sales By Product */}
            <div className="bg-primary rounded-2xl border border-white p-4">
              <h3 className="text-sm font-semibold lg:text-[31px] mb-4 border-b border-white pb-2 text-secondary">
                Top Sales By Product
              </h3>
              <div className="h-64 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={salesByProductData}
                    layout="vertical"
                    margin={{ top: 5, right: 20, left: 5, bottom: 5 }}
                  >
                    <XAxis type="number" stroke="var(--color-secondary)" />
                    <YAxis
                      type="category"
                      dataKey="name"
                      tick={false}
                      width={0}
                    />
                    <Bar
                      dataKey="value"
                      fill="var(--color-secondary)"
                      radius={[0, 4, 4, 0]}
                    >
                      <LabelList
                        dataKey="name"
                        position="insideLeft"
                        className="text-[14px] sm:text-sm"
                        style={{ fill: "#1e40af", fontWeight: 600 }}
                        formatter={(label: React.ReactNode) => {
                          if (typeof label === "string" && label.length > 15) {
                            return label.substring(0, 12) + "...";
                          }
                          return label;
                        }}
                      />
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Sales By Client */}
            <div className="bg-primary rounded-2xl border border-white p-4">
              <h3 className="text-sm font-semibold lg:text-[31px] mb-4 border-b border-white pb-2 text-secondary">
                Top Sales By Client
              </h3>
              <div className="h-64 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={salesByClientData}
                    layout="vertical"
                    margin={{ top: 5, left: 5, bottom: 5 }}
                  >
                    <XAxis type="number" stroke="var(--color-secondary)" />
                    <YAxis
                      type="category"
                      dataKey="name"
                      tick={false}
                      width={0}
                    />
                    <Bar
                      dataKey="value"
                      fill="var(--color-secondary)"
                      radius={[0, 4, 4, 0]}
                    >
                      <LabelList
                        dataKey="name"
                        position="insideLeft"
                        className="text-[14px] sm:text-sm"
                        style={{ fill: "#1e40af", fontWeight: 600 }}
                      />
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </div>
        <div className="px-4 sm:px-6 lg:px-4 border-b border-white pb-2 mb-8"></div>

        {/* My Account */}
        <h2 className="text-lg lg:text-[38px] font-semibold mb-4 flex justify-between items-center">
          <span>My Account</span>
          <Button
            title="Logout"
            variant="secondary"
            size="sm"
            onClick={() => setOpen(true)}
          />
        </h2>
        <ConfirmBox isOpen={open} onClose={() => setOpen(false)} />

        <div className="px-4 sm:px-6 lg:px-8 border-b border-white pb-2 mb-8"></div>

        <div className="px-4 sm:px-6 lg:px-8 border-b border-white "></div>

        <div className="text-sm my-2 lg:text-[18px]">
          Click to edit any of your account details
        </div>
        <div className="px-4 sm:px-6 lg:px-8 border-b border-white mb-4"></div>

        <div className="space-y-3">
          <div
            className="flex flex-row sm:items-center gap-2"
            onClick={() => setIsErrorModalOpen(true)}
          >
            <span className="text-lg lg:text-[31px] font-light w-fit">
              My ID:
            </span>
            <span className="text-lg lg:text-[31px] font-bold">
              {royalId ? royalId : "Loading..."}
            </span>
          </div>
          <div
            onClick={() => setPasswordModalOpen(true)}
            className="flex flex-row sm:items-center gap-2 cursor-pointer hover:opacity-80 transition-opacity"
          >
            <span className="text-lg lg:text-[31px] font-light w-fit">
              Password:
            </span>
            <span className="text-lg lg:text-[31px]">**************</span>
          </div>
          <div
            onClick={() => setIsPhoneModalOpen(true)}
            className="flex flex-row sm:items-center gap-1 cursor-pointer hover:opacity-80 transition-opacity"
          >
            <span className="text-lg lg:text-[31px] font-light w-fit">
              Recovery Phone Number:
            </span>
            <span className="text-lg lg:text-[31px]">
              {userData.phoneNumber || "Loading..."}
            </span>
          </div>
          <div
            onClick={() => setIsEmailModalOpen(true)}
            className="flex flex-row sm:items-center gap-1 cursor-pointer hover:opacity-80 transition-opacity"
          >
            <span className="text-lg lg:text-[31px] font-light w-fit">
              Recovery Email:
            </span>
            <span className="text-lg lg:text-[31px]">
              {userData.email || "Loading..."}
            </span>
          </div>
          {/* <div
            onClick={() => setIsPaymentAccountModalOpen(true)}
            className="flex flex-row sm:items-center gap-2 cursor-pointer hover:opacity-80 transition-opacity"
          >
            <span className="text-lg lg:text-[31px] font-light w-fit">
              Payment Account Setup:
            </span>
            <span className="text-lg lg:text-[31px]">
              {account?.accountId || "Add account"}
            </span> */}
          <div
            onClick={() => setIsPaymentAccountModalOpen(true)}
            className="flex flex-row sm:items-center gap-2 cursor-pointer hover:opacity-80 transition-opacity"
          >
            <span className="text-lg lg:text-[31px] font-light w-fit">
              Payment Account Setup:
            </span>
            <span className="text-lg lg:text-[31px]">
              {account?.accountId || "Add account"}
            </span>
          </div>
        </div>
      </div>

      <ForWordButton title="Go to view Royalties" url="view-royalities" />

      <ErrorPopup
        isOpen={isErrorModalOpen}
        onClose={() => {
          setIsErrorModalOpen(false);
        }}
      />

      {email && (
        <PaymentAccountSetup
          isOpen={isPaymentAccountModalOpen}
          onClose={() => {
            setIsPaymentAccountModalOpen(false);
          }}
          royalId={royalId}
          email={email}
          account={account || null}
        />
      )}

      {userData && (
        <ChangePasswordModal
          isOpen={isPasswordModalOpen}
          onClose={() => {
            setPasswordModalOpen(false);
            fetchUser();
          }}
          royalId={royalId}
        />
      )}

      <ChangePhoneNumberModal
        isOpen={isPhoneModalOpen}
        onClose={() => setIsPhoneModalOpen(false)}
        onSuccess={(newNumber) => {
          setUserData((prev) => ({
            ...prev,
            phoneNumber: newNumber,
          }));
        }}
        email={userData.email}
        phoneNumber={userData.phoneNumber}
      />
      {email && (
        <ChangeEmailModal
          isOpen={isEmailModalOpen}
          onClose={() => {
            setIsEmailModalOpen(false);
            fetchUser();
          }}
          onSuccess={(updatedEmail) => {
            setUserData((prev) => ({ ...prev, email: updatedEmail }));
          }}
          userId={royalId}
          email={email}
        />
      )}
    </div>
  );
}

export default RoyalAnalyticsClient;
