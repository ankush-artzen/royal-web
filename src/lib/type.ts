export interface TokenPayload {
  id: string;
  email: string;
  royalId: string;
  iat?: number;
  exp?: number;
}

export type RoyaltiesData = {
  amount: number;
  currency?: string;
  usdAmount: number;
};

export interface Notification {
  id: string;
  designerId: string;
  message: string;
  isRead: boolean;
}

export interface ProductRoyalty {
  title: string;
  royality: number;
  totalSold: number;
  status: string;
  price: number;
  totalRoyaltyEarned: RoyaltiesData;
  shop: string;
}

export interface ShopProductData {
  shop: string;
  products: ProductRoyalty[];
}

// Royalty Report Types
export interface RoyaltyReportProduct {
  id: string;
  name: string;
  earnings: number;
  artist: string;
  details?: {
    retailPrice: string;
    totalUnits: number;
    totalSales: string;
    royaltyPercentage: string;
  };
}

export interface RoyaltyReportShop {
  shop: string;
  product: RoyaltyReportProduct[];
}

export interface LeftPanelProps {
  expandedSections: Record<string, boolean>;
  expandedProducts: Record<string, boolean>;
  loading: boolean;
  shops: RoyaltyReportShop[];
  toggleSection: (section: string) => void;
  toggleProduct: (productId: string) => void;
  totalRoyalties: number;
  subtotal?:number;

}

export type Price = {
  amount: number;
  currency?: string;
  storeCurrency?: string;
  storeAmount?: number;
};

export type ApiProduct = {
  id?: string;
  title: string;
  shop: string;
  price?: Price;
  totalSold?: number;
  totalRoyaltyEarned?: RoyaltiesData;
  totalEarned?:number;
  totalSales?:number;
  royality?: string;
  status?: string;
};

export type ApiShopEntry = {
  id?: string;
  shop: string;
  topProduct?: ApiProduct;
  products?: ApiProduct[];
};

export type RoyaltyProduct = {
  id: string;
  product: string;
  fullProductName?: string;
  status?: string;
  percentage: string;
  salesData: string;
  royaltiesData: string;
  retailPrice: string;
  unitsSold: string;
  client: string;
  shop?: string;
};

export interface User {
  id: string;
  email: string;
  royalId: string;
}

export interface WithdrawalRequest {
  id: string;
  totalAmount: number;
  fees: number;
  depositAmount: number;
  currency: string;
  designerId: string;
  notes: string;
  requestedAt: string; // ISO date string
  status: "PENDING" | "APPROVED" | "REJECTED"; // if you have fixed statuses
}

export interface DesignerPaymentAccount {
  id: string;
  name: string;
  email: string;
  accountId: string;
  country: string;
  currency: string;
  payoutsEnabled: boolean;
  createdAt: string;
  updatedAt: string;
  royalId: string;
}

// Common Component Types

export type ToastType = "success" | "error" | "info";

export interface CustomToastProps {
  message: string;
  type?: ToastType;
}

export interface InputProps {
  type?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  isValid?: boolean;
  onKeyPress?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  placeholder?: string;
  customClass?: string;
}

export interface ToastStyles {
  bg: string;
  text: string;
}

export type ToastStylesMap = Record<ToastType, ToastStyles>;

// Sorting Types
export interface SortConfig<T> {
  key: keyof T;
  direction: "asc" | "desc";
}

export interface SortingConfig<T> {
  sortConfig: SortConfig<T> | null;
  requestSort: (key: keyof T) => void;
  getSortIcon: (key: keyof T) => React.ReactNode;
}

// Component Props Types
export interface HeaderProps {
  title: string;
  className?: string;
}

export interface EmptyStateProps {
  title?: string;
  message?: string;
}

export interface TooltipProps {
  size?: "sm" | "md" | "lg";
  color?: "primary" | "secondary";
  content: string;
  children: React.ReactNode;
}

// Client Royalties Types
export interface ClientRoyaltiesProps extends SortingConfig<RoyaltyProduct> {
  selectedClient: string | null;
  clientRoyaltiesData: RoyaltyProduct[];
  visibleCount: number;
  isLoading: boolean;
  handleScroll: (e: React.UIEvent<HTMLDivElement>) => void;
  handleLoadMore: () => void;
  handleProductClick: (product: RoyaltyProduct) => void;
  handleBackToAllRoyalties: () => void;
  sortedData: (data: RoyaltyProduct[]) => RoyaltyProduct[];
  formattedClient: (client: string | null) => string;
}

// Button Types
export interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
  type?: "button" | "submit" | "reset";
}

export interface RoundButtonProps extends ButtonProps {
  variant?: "primary" | "secondary";
  size?: "sm" | "md" | "lg";
}

// Analytics Types
export interface SalesData {
  name: string;
  value: number;
}

export interface RoyalAnalyticsProps {
  email: string;
  royalId: string;
  phoneNumber: string;
  account: DesignerPaymentAccount | null;
  allProducts: ProductRoyalty[];
  salesByProductData: SalesData[];
  salesByClientData: SalesData[];
  notifications: Notification[];
}

// Modal Props
export interface ChangePasswordModalProps {
  isOpen: boolean;
  onClose: () => void;
  userId: string;
  email: string;
}

export interface ChangePhoneModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (newNumber: string) => void;
  email: string;
  phoneNumber: string;
}

export interface ChangeEmailModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (updatedEmail: string) => void;
  userId: string;
  email: string;
}

export interface PaymentAccountSetupProps {
  isOpen: boolean;
  onClose: () => void;
  royalId: string;
  email: string;
  account: DesignerPaymentAccount | null;
}

export interface ErrorPopupProps {
  isOpen: boolean;
  onClose: () => void;
}

export interface ConfirmBoxProps {
  isOpen: boolean;
  onClose: () => void;
}

// Common Button Props
export interface ForwardButtonProps {
  title: string;
  url: string;
}

// Royalty Report View Props
export interface ViewRoyaltyClientProps {
  initialUser: User | null;
  handleSetCurrentPage: React.Dispatch<React.SetStateAction<string>>;
  initialProducts: ApiShopEntry[];
  setWithdrawAmount: React.Dispatch<React.SetStateAction<string>>;
  transactionAmount: string | number | null;
}

// Right Panel Types
export interface BankItem {
  id: string;
  name: string;
  amount: number;
}

export interface RightPanelProps {
  bankItems: BankItem[];
  removeFromBank: (itemId: string) => void;
  subtotal: number;
  platformFees: number;
  finalAmount: number;
  showError: boolean;
  setShowError: (show: boolean) => void;
  setWithdrawAmount: (amount: string) => void;
  handleSetCurrentPage: (page: string) => void;
}

// Info Row Props
export interface InfoRowProps {
  label: string;
  value: string;
}

// Product Details Types
export interface ProductSalesHistory {
  month: string;
  sales: number;
}

export interface ProductDetailsProps {
  selectedProduct: RoyaltyProduct | null;
  selectedClient: string | null;
  productSalesHistory: ProductSalesHistory[];
  handleBackToClientRoyalties: () => void;
  handleBackToAllRoyalties: () => void;
}

// My Royalties Props
export interface MyRoyaltiesProps {
  myRoyaltiesData: RoyaltyProduct[];
  visibleCount: number;
  isLoading: boolean;
  sortConfig?: {
    key: keyof RoyaltyProduct;
    direction: "asc" | "desc";
  } | null;
  requestSort: (key: keyof RoyaltyProduct) => void;
  getSortIcon: (key: keyof RoyaltyProduct) => React.ReactNode;
  handleScroll: (e: React.UIEvent<HTMLDivElement>) => void;
  handleLoadMore: () => void;
  handleClientClick: (clientName: string) => void;
  handleProductClick: (product: RoyaltyProduct) => void;
  sortedData: (data: RoyaltyProduct[]) => RoyaltyProduct[];
  formattedClient: (client: string | null) => string;
}

