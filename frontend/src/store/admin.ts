import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Product } from "@/types";

export interface Order {
  id: string;
  reference: string;
  userId: string;
  userName: string;
  items: { product: Product; quantity: number }[];
  total: number;
  paymentMethod: string;
  status: "pending" | "processing" | "shipped" | "delivered" | "closed";
  createdAt: string;
  updatedAt: string;
  deliveryConfirmed?: boolean;
}

interface AdminState {
  isAuthenticated: boolean;
  products: Product[];
  orders: Order[];
  login: (username: string, pin: string) => boolean;
  logout: () => void;
  addProduct: (product: Omit<Product, "id">) => void;
  removeProduct: (id: string) => void;
  updateProduct: (id: string, updates: Partial<Product>) => void;
  addOrder: (order: Omit<Order, "id" | "createdAt" | "updatedAt">) => void;
  updateOrderStatus: (id: string, status: Order["status"]) => void;
  confirmDelivery: (id: string) => void;
  getOrdersByUser: (userId: string) => Order[];
}

const ADMIN_USERNAME = "admin";
const ADMIN_PIN = "1234";

export const useAdminStore = create<AdminState>()(
  persist(
    (set, get) => ({
      isAuthenticated: false,
      products: [],
      orders: [],

      login: (username, pin) => {
        if (username === ADMIN_USERNAME && pin === ADMIN_PIN) {
          set({ isAuthenticated: true });
          return true;
        }
        return false;
      },

      logout: () => set({ isAuthenticated: false }),

      addProduct: (productData) => {
        const newProduct: Product = {
          ...productData,
          id: crypto.randomUUID(),
        };
        set((state) => ({
          products: [...state.products, newProduct],
        }));
      },

      removeProduct: (id) =>
        set((state) => ({
          products: state.products.filter((p) => p.id !== id),
        })),

      updateProduct: (id, updates) =>
        set((state) => ({
          products: state.products.map((p) =>
            p.id === id ? { ...p, ...updates } : p
          ),
        })),

      addOrder: (orderData) => {
        const now = new Date().toISOString();
        const newOrder: Order = {
          ...orderData,
          id: crypto.randomUUID(),
          createdAt: now,
          updatedAt: now,
        };
        set((state) => ({
          orders: [...state.orders, newOrder],
        }));
      },

      updateOrderStatus: (id, status) =>
        set((state) => ({
          orders: state.orders.map((o) =>
            o.id === id
              ? { ...o, status, updatedAt: new Date().toISOString() }
              : o
          ),
        })),

      confirmDelivery: (id) =>
        set((state) => ({
          orders: state.orders.map((o) =>
            o.id === id
              ? { ...o, deliveryConfirmed: true, updatedAt: new Date().toISOString() }
              : o
          ),
        })),

      getOrdersByUser: (userId) => {
        return get().orders.filter((o) => o.userId === userId);
      },
    }),
    {
      name: "admin-storage",
    }
  )
);
