import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  password: string;
  createdAt: string;
}

const demoUser: User = {
  id: "demo-user-001",
  name: "Demo User",
  email: "demo@karibu.com",
  phone: "+1 234 567 8900",
  password: "demo1234",
  createdAt: "2026-01-01T00:00:00.000Z",
};

interface AuthState {
  user: User | null;
  users: User[];
  register: (name: string, email: string, phone: string, password: string) => string | null;
  login: (email: string, password: string) => boolean;
  logout: () => void;
  updateUser: (updates: Partial<Pick<User, "name" | "email" | "phone">>) => string | null;
  changePassword: (currentPassword: string, newPassword: string) => string | null;
  deleteAccount: (password: string) => string | null;
  isAuthenticated: () => boolean;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      users: [demoUser],

      register: (name, email, phone, password) => {
        const { users } = get();
        const existingUser = users.find((u) => u.email === email);
        if (existingUser) {
          return "Email already registered";
        }

        const newUser: User = {
          id: crypto.randomUUID(),
          name,
          email,
          phone,
          password,
          createdAt: new Date().toISOString(),
        };

        set((state) => ({
          users: [...state.users, newUser],
        }));

        return null;
      },

      login: (email, password) => {
        const { users } = get();
        const user = users.find((u) => u.email === email && u.password === password);
        if (user) {
          set({ user });
          return true;
        }
        return false;
      },

      logout: () => set({ user: null }),

      updateUser: (updates) => {
        const { user, users } = get();
        if (!user) return "Not logged in";

        if (updates.email && updates.email !== user.email) {
          const emailTaken = users.some((u) => u.email === updates.email && u.id !== user.id);
          if (emailTaken) return "Email already in use";
        }

        const updatedUser = { ...user, ...updates };
        set({
          user: updatedUser,
          users: users.map((u) => (u.id === user.id ? updatedUser : u)),
        });
        return null;
      },

      changePassword: (currentPassword, newPassword) => {
        const { user, users } = get();
        if (!user) return "Not logged in";
        if (user.password !== currentPassword) return "Current password is incorrect";
        if (newPassword.length < 4) return "Password must be at least 4 characters";

        const updatedUser = { ...user, password: newPassword };
        set({
          user: updatedUser,
          users: users.map((u) => (u.id === user.id ? updatedUser : u)),
        });
        return null;
      },

      deleteAccount: (password) => {
        const { user, users } = get();
        if (!user) return "Not logged in";
        if (user.password !== password) return "Incorrect password";

        set({
          user: null,
          users: users.filter((u) => u.id !== user.id),
        });
        return null;
      },

      isAuthenticated: () => get().user !== null,
    }),
    {
      name: "auth-storage",
    }
  )
);
