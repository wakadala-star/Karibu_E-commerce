import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Notification } from "@/types";

interface NotificationsState {
  notifications: Notification[];
  addNotification: (notification: Omit<Notification, "id" | "read" | "createdAt">) => void;
  markAsRead: (id: string) => void;
  markAllAsRead: (userId: string) => void;
  getUnreadCount: (userId: string) => number;
  getUserNotifications: (userId: string) => Notification[];
  deleteNotification: (id: string) => void;
}

export const useNotificationsStore = create<NotificationsState>()(
  persist(
    (set, get) => ({
      notifications: [],

      addNotification: (notificationData) => {
        const newNotification: Notification = {
          ...notificationData,
          id: crypto.randomUUID(),
          read: false,
          createdAt: new Date().toISOString(),
        };
        set((state) => ({
          notifications: [newNotification, ...state.notifications],
        }));
      },

      markAsRead: (id) =>
        set((state) => ({
          notifications: state.notifications.map((n) =>
            n.id === id ? { ...n, read: true } : n
          ),
        })),

      markAllAsRead: (userId) =>
        set((state) => ({
          notifications: state.notifications.map((n) =>
            n.userId === userId ? { ...n, read: true } : n
          ),
        })),

      getUnreadCount: (userId) => {
        return get().notifications.filter(
          (n) => n.userId === userId && !n.read
        ).length;
      },

      getUserNotifications: (userId) => {
        return get().notifications.filter((n) => n.userId === userId);
      },

      deleteNotification: (id) =>
        set((state) => ({
          notifications: state.notifications.filter((n) => n.id !== id),
        })),
    }),
    {
      name: "notifications-storage",
    }
  )
);
