import { jwtDecode } from "jwt-decode";
import { TokenPayload } from "./type";

export const fetchUser = async (token: string) => {
  try {
    const decoded = jwtDecode<TokenPayload>(token);
    const id = decoded.id;
    const res = await fetch(`/api/user/me?id=${id}`);
    const data = await res.json();
    console.log("data", data.user);
    return data.user;
  } catch (err) {
    console.error("Invalid token", err);
    return null;
  }
};

export const fetchRoyaltyProducty = async (royalId: string) => {
  try {
    const productsRes = await fetch(`/api/product?designerId=${royalId}`);
    const products = await productsRes.json();
    console.log("data", products);
    return products;
  } catch (err) {
    console.error("Invalid token", err);
    return null;
  }
};

export const fetchRoyaltyProductByShop = async (
  shop: string,
  royalId: string
) => {
  try {
    const productsRes = await fetch(
      `/api/product/byshop?shop=${shop}&designerId=${royalId}`
    );
    const products = await productsRes.json();
    console.log("data", products);
    return products;
  } catch (err) {
    console.error("Invalid token", err);
    return null;
  }
};

export const fetchSalesData = async (productId: string, royalId: string) => {
  try {
    const salesRes = await fetch(
      `/api/product/sales-history?id=${productId}&designerId=${royalId}`
    );
    const saleaData = await salesRes.json();
    console.log("saleaData", saleaData);
    return saleaData;
  } catch (err) {
    console.error("Invalid token", err);
    return null;
  }
};
