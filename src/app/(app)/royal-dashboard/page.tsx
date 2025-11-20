// import RoyalDashboardClient from "@/Components/RoyalAnalyticsClient";
// import { cookies } from "next/headers";
// import { redirect } from "next/navigation";
// import { jwtDecode } from "jwt-decode";

// import {
//   Notification,
//   RoyaltiesData,
//   ShopProductData,
//   TokenPayload,
// } from "@/lib/type";

// function normalizeRoyalty(royalty: RoyaltiesData) {
//   if (!royalty) return { amount: 0, currency: "USD", usdAmount: 0 };
//   if (typeof royalty === "object") return royalty;
//   try {
//     return JSON.parse(royalty);
//   } catch {
//     return { amount: 0, currency: "USD", usdAmount: 0 };
//   }
// }

// interface PageProps {
//   searchParams: Promise<{ shop?: string }>;
// }

// export default async function RoyalDashboardPage({ searchParams }: PageProps) {
//   // Get cookies on server
//   const cookieStore = await cookies();
//   const token = cookieStore.get("auth_token")?.value;

//   if (!token) redirect("/login");

//   let decoded: TokenPayload;
//   try {
//     decoded = jwtDecode<TokenPayload>(token);
//   } catch {
//     redirect("/login");
//   }

//   // Fetch user
//   const userRes = await fetch(
//     `${process.env.NEXT_PUBLIC_API_URL}/api/user/me?id=${decoded.id}`,
//     { cache: "no-store" }
//   );
//   const userData = await userRes.json();

//   const email = userData.user.email;
//   const royalId = userData.user.royalId;
//   const phoneNumber = userData.user.phoneNumber; 


//   // Fetch royalty data
//   const { shop } = (await searchParams) || { shop: "" };
//   const royaltyRes = await fetch(
//     `${process.env.NEXT_PUBLIC_API_URL}/api/product/allproductbyShop?shop=${shop}&designerId=${royalId}`,
//     { cache: "no-store" }
//   );
//   const royaltyData: ShopProductData[] = await royaltyRes.json();

//   const allProducts = royaltyData.flatMap((entry) => entry.products);

//   // Sales by product
//   const salesByProductData = allProducts
//     .map((product) => {
//       const royalty = normalizeRoyalty(product.totalRoyaltyEarned);
//       return {
//         name:
//           product.title.length > 15
//             ? product.title.substring(0, 15) + "..."
//             : product.title,
//         value: Number(royalty.usdAmount ?? 0),
//       };
//     })
//     .filter((d) => !isNaN(d.value))
//     .sort((a, b) => b.value - a.value)
//     .slice(0, 5);

//   // Sales by client
//   const clientSalesMap = new Map<string, number>();
//   royaltyData.forEach((shopData) => {
//     const shopName = shopData.shop.replace(".myshopify.com", "");
//     const totalSales = shopData.products.reduce((sum, product) => {
//       const royalty = normalizeRoyalty(product.totalRoyaltyEarned);
//       return sum + (royalty?.usdAmount ?? 0);
//     }, 0);
//     clientSalesMap.set(shopName, totalSales);
//   });

//   const salesByClientData = Array.from(clientSalesMap.entries())
//     .map(([name, value]) => ({ name, value }))
//     .sort((a, b) => b.value - a.value)
//     .slice(0, 5);

//   // Fetch latest notifications
//   const latestRes = await fetch(
//     `${process.env.NEXT_PUBLIC_API_URL}/api/notification?designerId=${royalId}`,
//     { cache: "no-store" }
//   );

//   const notifications: Notification[] = await latestRes.json();

//   const accountRes = await fetch(
//     `${process.env.NEXT_PUBLIC_API_URL}/api/user/accounts?designerId=${royalId}`,
//     { cache: "no-store" }
//   );

//   const { account } = await accountRes.json();

//   return (
//     <div className="w-full lg:max-w-[90%] mx-auto">
//       <RoyalDashboardClient
//         phoneNumber={phoneNumber}
//         email={email}
//         account={account || null}
//         royalId={royalId}
//         allProducts={allProducts}
//         salesByProductData={salesByProductData}
//         salesByClientData={salesByClientData}
//         notifications={notifications}
//       />
//     </div>
//   );
// }
import RoyalDashboardClient from "@/Components/RoyalAnalyticsClient";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import {
  Notification,
  RoyaltiesData,
  ShopProductData,
} from "@/lib/type";

function normalizeRoyalty(royalty: RoyaltiesData | string | null | undefined) {
  if (!royalty) return { amount: 0, currency: "USD", usdAmount: 0 };
  if (typeof royalty === "object") return royalty;
  try {
    return JSON.parse(royalty) as RoyaltiesData;
  } catch {
    return { amount: 0, currency: "USD", usdAmount: 0 };
  }
}

interface PageProps {
  searchParams: Promise<{ shop?: string }>;
}

export default async function RoyalDashboardPage({ searchParams }: PageProps) {
  // 🔥 Use NextAuth session (no cookies / jwtDecode)
  const session = await getServerSession(authOptions);
  if (!session) redirect("/login");

  const royalId = session.user.royalId;
  const email = session.user.email;
  const phoneNumber = session.user.phoneNumber;

  // Fetch royalty data
  const { shop = "" } = await searchParams;
  const royaltyRes = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/product/allproductbyShop?shop=${shop}&designerId=${royalId}`,
    { cache: "no-store" }
  );
  const royaltyData: ShopProductData[] = await royaltyRes.json();

  // 🔥 Infer product type from ShopProductData (no manual Product type needed)
  type ProductType = ShopProductData["products"][number];
  const allProducts: ProductType[] = royaltyData.flatMap(
    (entry: ShopProductData) => entry.products
  );

  // Sales by product
  const salesByProductData = allProducts
    .map((product: ProductType) => {
      const royalty = normalizeRoyalty(product.totalRoyaltyEarned);
      return {
        name:
          product.title.length > 15
            ? product.title.substring(0, 15) + "..."
            : product.title,
        value: Number(royalty.usdAmount ?? 0),
      };
    })
    .filter((p) => !isNaN(p.value))
    .sort((a, b) => b.value - a.value)
    .slice(0, 5);

  // Sales by client
  const clientSalesMap = new Map<string, number>();
  royaltyData.forEach((shopData: ShopProductData) => {
    const shopName = shopData.shop.replace(".myshopify.com", "");
    const totalSales = shopData.products.reduce((sum: number, product: ProductType) => {
      const royalty = normalizeRoyalty(product.totalRoyaltyEarned);
      return sum + (royalty.usdAmount ?? 0);
    }, 0);
    clientSalesMap.set(shopName, totalSales);
  });

  const salesByClientData = Array.from(clientSalesMap.entries())
    .map(([name, value]) => ({ name, value }))
    .sort((a, b) => b.value - a.value)
    .slice(0, 5);

  // Notifications
  const notificationsRes = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/notification?designerId=${royalId}`,
    { cache: "no-store" }
  );
  const notifications: Notification[] = await notificationsRes.json();

  // Account details
  const accountRes = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/user/accounts?designerId=${royalId}`,
    { cache: "no-store" }
  );
  const { account } = await accountRes.json();

  return (
    <div className="w-full lg:max-w-[90%] mx-auto">
      <RoyalDashboardClient
        phoneNumber={phoneNumber}
        email={email}
        account={account || null}
        royalId={royalId}
        allProducts={allProducts}
        salesByProductData={salesByProductData}
        salesByClientData={salesByClientData}
        notifications={notifications}
      />
    </div>
  );
}
