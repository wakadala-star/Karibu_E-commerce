export interface Product {
  id: string;
  name: string;
  price: number;
  rating: number;
  reviewCount: string;
  category: string;
  image: string;
  badge?: string;
  stockQuantity: number;
}

export interface Category {
  id: string;
  name: string;
  icon: string;
  count?: number;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface Notification {
  id: string;
  userId: string;
  title: string;
  message: string;
  type: "order_approved" | "order_shipped" | "order_delivered" | "order_closed" | "delivery_confirmed" | "general";
  read: boolean;
  createdAt: string;
}

export interface ActivityOrder {
  id: string;
  reference: string;
  items: { product: Product; quantity: number }[];
  total: number;
  paymentMethod: string;
  status: string;
  createdAt: string;
  deliveryConfirmed?: boolean;
}
