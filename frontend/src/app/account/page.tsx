"use client";

import { useState } from "react";
import { useAuthStore } from "@/store/auth";
import { useAdminStore } from "@/store/admin";
import { useNotificationsStore } from "@/store/notifications";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  User,
  Mail,
  Phone,
  Calendar,
  LogOut,
  Settings,
  Bell,
  Clock,
  Check,
  Trash2,
  Shield,
  AlertTriangle,
  Package,
  Truck,
  CheckCircle,
  XCircle,
  ShoppingBag,
} from "lucide-react";

type Tab = "profile" | "settings" | "notifications" | "history";

const statusColors: Record<string, string> = {
  pending: "bg-orange-100 text-orange-600",
  processing: "bg-yellow-100 text-yellow-600",
  shipped: "bg-blue-100 text-blue-600",
  delivered: "bg-green-100 text-green-600",
  closed: "bg-gray-100 text-gray-600",
};

export default function AccountPage() {
  const { user, logout, updateUser, changePassword, deleteAccount } = useAuthStore();
  const { orders, confirmDelivery } = useAdminStore();
  const { notifications, markAsRead, markAllAsRead, getUnreadCount, deleteNotification } =
    useNotificationsStore();
  const router = useRouter();

  const [activeTab, setActiveTab] = useState<Tab>("profile");
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deletePassword, setDeletePassword] = useState("");
  const [deleteError, setDeleteError] = useState("");

  const [editName, setEditName] = useState("");
  const [editEmail, setEditEmail] = useState("");
  const [editPhone, setEditPhone] = useState("");
  const [profileError, setProfileError] = useState("");
  const [profileSuccess, setProfileSuccess] = useState("");
  const [isEditing, setIsEditing] = useState(false);

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [passwordSuccess, setPasswordSuccess] = useState("");

  if (!user) {
    router.push("/auth");
    return null;
  }

  const userOrders = orders.filter((o) => o.userId === user.id);
  const userNotifications = notifications.filter((n) => n.userId === user.id);
  const unreadCount = getUnreadCount(user.id);

  const handleSaveProfile = () => {
    setProfileError("");
    setProfileSuccess("");

    if (!editName.trim() || !editEmail.trim() || !editPhone.trim()) {
      setProfileError("All fields are required");
      return;
    }

    const result = updateUser({
      name: editName.trim(),
      email: editEmail.trim(),
      phone: editPhone.trim(),
    });

    if (result) {
      setProfileError(result);
    } else {
      setProfileSuccess("Profile updated successfully");
      setIsEditing(false);
    }
  };

  const handleChangePassword = () => {
    setPasswordError("");
    setPasswordSuccess("");

    if (!currentPassword || !newPassword || !confirmPassword) {
      setPasswordError("All fields are required");
      return;
    }

    if (newPassword !== confirmPassword) {
      setPasswordError("New passwords do not match");
      return;
    }

    const result = changePassword(currentPassword, newPassword);
    if (result) {
      setPasswordError(result);
    } else {
      setPasswordSuccess("Password changed successfully");
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    }
  };

  const handleDeleteAccount = () => {
    setDeleteError("");
    const result = deleteAccount(deletePassword);
    if (result) {
      setDeleteError(result);
    } else {
      setShowDeleteModal(false);
      router.push("/");
    }
  };

  const handleConfirmDelivery = (orderId: string) => {
    confirmDelivery(orderId);
    addNotification({
      userId: user.id,
      title: "Delivery Confirmed",
      message: "You have confirmed delivery of your order.",
      type: "delivery_confirmed",
    });
  };

  const addNotification = (data: {
    userId: string;
    title: string;
    message: string;
    type: "order_approved" | "order_shipped" | "order_delivered" | "order_closed" | "delivery_confirmed" | "general";
  }) => {
    useNotificationsStore.getState().addNotification(data);
  };

  const tabs: { id: Tab; label: string; icon: typeof User; badge?: number }[] = [
    { id: "profile", label: "Profile", icon: User },
    { id: "settings", label: "Settings", icon: Settings },
    { id: "notifications", label: "Notifications", icon: Bell, badge: unreadCount },
    { id: "history", label: "Order History", icon: Clock },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white border-b border-gray-100 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              <Link
                href="/"
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <ArrowLeft className="w-5 h-5 text-gray-600" />
              </Link>
              <span className="text-lg font-bold text-black">My Account</span>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden mb-6">
          <div className="p-6 border-b border-gray-100">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-black rounded-full flex items-center justify-center">
                <span className="text-white text-2xl font-bold">
                  {user.name.charAt(0).toUpperCase()}
                </span>
              </div>
              <div>
                <h1 className="text-xl font-bold text-black">{user.name}</h1>
                <p className="text-sm text-gray-500">
                  Member since {new Date(user.createdAt).toLocaleDateString()}
                </p>
              </div>
            </div>
          </div>

          <div className="flex overflow-x-auto border-b border-gray-100">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-6 py-4 text-sm font-medium whitespace-nowrap border-b-2 transition-colors ${
                    activeTab === tab.id
                      ? "border-black text-black"
                      : "border-transparent text-gray-500 hover:text-gray-700"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {tab.label}
                  {tab.badge && tab.badge > 0 && (
                    <span className="bg-red-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full">
                      {tab.badge > 9 ? "9+" : tab.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {activeTab === "profile" && (
          <div className="bg-white rounded-2xl border border-gray-100 p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-bold text-black">Personal Details</h2>
              {!isEditing ? (
                <button
                  onClick={() => {
                    setEditName(user.name);
                    setEditEmail(user.email);
                    setEditPhone(user.phone);
                    setIsEditing(true);
                    setProfileError("");
                    setProfileSuccess("");
                  }}
                  className="px-4 py-2 text-sm font-medium text-black bg-gray-100 rounded-xl hover:bg-gray-200 transition-colors"
                >
                  Edit Profile
                </button>
              ) : (
                <div className="flex gap-2">
                  <button
                    onClick={() => setIsEditing(false)}
                    className="px-4 py-2 text-sm font-medium text-gray-600 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSaveProfile}
                    className="px-4 py-2 text-sm font-medium text-white bg-black rounded-xl hover:bg-gray-800 transition-colors"
                  >
                    Save Changes
                  </button>
                </div>
              )}
            </div>

            {profileError && (
              <div className="bg-red-50 text-red-600 text-sm p-3 rounded-xl mb-4 flex items-center gap-2">
                <AlertTriangle className="w-4 h-4" />
                {profileError}
              </div>
            )}

            {profileSuccess && (
              <div className="bg-green-50 text-green-600 text-sm p-3 rounded-xl mb-4 flex items-center gap-2">
                <Check className="w-4 h-4" />
                {profileSuccess}
              </div>
            )}

            <div className="space-y-4">
              <div>
                <label className="block text-xs text-gray-400 mb-1">Full Name</label>
                {isEditing ? (
                  <input
                    type="text"
                    value={editName}
                    onChange={(e) => setEditName(e.target.value)}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-black"
                  />
                ) : (
                  <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl">
                    <User className="w-5 h-5 text-gray-400" />
                    <span className="text-sm font-medium text-black">{user.name}</span>
                  </div>
                )}
              </div>

              <div>
                <label className="block text-xs text-gray-400 mb-1">Email Address</label>
                {isEditing ? (
                  <input
                    type="email"
                    value={editEmail}
                    onChange={(e) => setEditEmail(e.target.value)}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-black"
                  />
                ) : (
                  <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl">
                    <Mail className="w-5 h-5 text-gray-400" />
                    <span className="text-sm font-medium text-black">{user.email}</span>
                  </div>
                )}
              </div>

              <div>
                <label className="block text-xs text-gray-400 mb-1">Phone Number</label>
                {isEditing ? (
                  <input
                    type="tel"
                    value={editPhone}
                    onChange={(e) => setEditPhone(e.target.value)}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-black"
                  />
                ) : (
                  <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl">
                    <Phone className="w-5 h-5 text-gray-400" />
                    <span className="text-sm font-medium text-black">{user.phone}</span>
                  </div>
                )}
              </div>

              <div>
                <label className="block text-xs text-gray-400 mb-1">Registered</label>
                <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl">
                  <Calendar className="w-5 h-5 text-gray-400" />
                  <span className="text-sm font-medium text-black">
                    {new Date(user.createdAt).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === "settings" && (
          <div className="space-y-6">
            <div className="bg-white rounded-2xl border border-gray-100 p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
                  <Shield className="w-5 h-5 text-blue-600" />
                </div>
                <h2 className="text-lg font-bold text-black">Change Password</h2>
              </div>

              {passwordError && (
                <div className="bg-red-50 text-red-600 text-sm p-3 rounded-xl mb-4 flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4" />
                  {passwordError}
                </div>
              )}

              {passwordSuccess && (
                <div className="bg-green-50 text-green-600 text-sm p-3 rounded-xl mb-4 flex items-center gap-2">
                  <Check className="w-4 h-4" />
                  {passwordSuccess}
                </div>
              )}

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-black mb-1">
                    Current Password
                  </label>
                  <input
                    type="password"
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-black"
                    placeholder="Enter current password"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-black mb-1">
                    New Password
                  </label>
                  <input
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-black"
                    placeholder="Enter new password"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-black mb-1">
                    Confirm New Password
                  </label>
                  <input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-black"
                    placeholder="Confirm new password"
                  />
                </div>
                <button
                  onClick={handleChangePassword}
                  className="px-6 py-3 bg-black text-white rounded-xl text-sm font-medium hover:bg-gray-800 transition-colors"
                >
                  Update Password
                </button>
              </div>
            </div>

            <div className="bg-white rounded-2xl border border-gray-100 p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-red-100 rounded-xl flex items-center justify-center">
                  <AlertTriangle className="w-5 h-5 text-red-600" />
                </div>
                <h2 className="text-lg font-bold text-black">Danger Zone</h2>
              </div>

              <div className="bg-red-50 rounded-xl p-4 mb-4">
                <p className="text-sm text-red-700">
                  Deleting your account is permanent and cannot be undone. All your data will be
                  removed.
                </p>
              </div>

              <button
                onClick={() => setShowDeleteModal(true)}
                className="px-6 py-3 bg-red-500 text-white rounded-xl text-sm font-medium hover:bg-red-600 transition-colors"
              >
                Delete Account
              </button>
            </div>

            <div className="bg-white rounded-2xl border border-gray-100 p-6">
              <button
                onClick={() => {
                  logout();
                  router.push("/");
                }}
                className="w-full flex items-center justify-center gap-2 py-3 border border-gray-200 text-gray-600 rounded-xl font-medium hover:bg-gray-50 transition-colors"
              >
                <LogOut className="w-4 h-4" />
                Logout
              </button>
            </div>
          </div>
        )}

        {activeTab === "notifications" && (
          <div className="bg-white rounded-2xl border border-gray-100 p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-bold text-black">
                Notifications
                {unreadCount > 0 && (
                  <span className="ml-2 text-sm font-normal text-gray-500">
                    ({unreadCount} unread)
                  </span>
                )}
              </h2>
              {unreadCount > 0 && (
                <button
                  onClick={() => markAllAsRead(user.id)}
                  className="text-sm text-black font-medium hover:underline"
                >
                  Mark all as read
                </button>
              )}
            </div>

            {userNotifications.length === 0 ? (
              <div className="text-center py-12">
                <Bell className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500">No notifications yet</p>
              </div>
            ) : (
              <div className="space-y-3">
                {userNotifications.map((notification) => (
                  <div
                    key={notification.id}
                    className={`p-4 rounded-xl border transition-colors ${
                      notification.read
                        ? "bg-white border-gray-100"
                        : "bg-blue-50 border-blue-100"
                    }`}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-start gap-3">
                        <div
                          className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${
                            notification.type === "order_approved"
                              ? "bg-green-100"
                              : notification.type === "order_closed"
                              ? "bg-gray-100"
                              : notification.type === "delivery_confirmed"
                              ? "bg-blue-100"
                              : "bg-yellow-100"
                          }`}
                        >
                          {notification.type === "order_approved" ? (
                            <CheckCircle className="w-5 h-5 text-green-600" />
                          ) : notification.type === "order_closed" ? (
                            <XCircle className="w-5 h-5 text-gray-600" />
                          ) : notification.type === "delivery_confirmed" ? (
                            <Truck className="w-5 h-5 text-blue-600" />
                          ) : (
                            <Package className="w-5 h-5 text-yellow-600" />
                          )}
                        </div>
                        <div>
                          <p className="text-sm font-medium text-black">
                            {notification.title}
                          </p>
                          <p className="text-xs text-gray-500 mt-0.5">
                            {notification.message}
                          </p>
                          <p className="text-xs text-gray-400 mt-1">
                            {new Date(notification.createdAt).toLocaleString()}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-1">
                        {!notification.read && (
                          <button
                            onClick={() => markAsRead(notification.id)}
                            className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors"
                            title="Mark as read"
                          >
                            <Check className="w-4 h-4 text-gray-400" />
                          </button>
                        )}
                        <button
                          onClick={() => deleteNotification(notification.id)}
                          className="p-1.5 hover:bg-red-50 rounded-lg transition-colors"
                          title="Delete"
                        >
                          <Trash2 className="w-4 h-4 text-gray-400 hover:text-red-500" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {activeTab === "history" && (
          <div className="bg-white rounded-2xl border border-gray-100 p-6">
            <h2 className="text-lg font-bold text-black mb-6">Order History</h2>

            {userOrders.length === 0 ? (
              <div className="text-center py-12">
                <ShoppingBag className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500 mb-2">No orders yet</p>
                <Link
                  href="/"
                  className="text-sm text-black font-medium hover:underline"
                >
                  Start shopping
                </Link>
              </div>
            ) : (
              <div className="space-y-4">
                {userOrders.map((order) => (
                  <div
                    key={order.id}
                    className="border border-gray-100 rounded-xl overflow-hidden"
                  >
                    <div className="bg-gray-50 px-4 py-3 flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div>
                          <p className="text-xs text-gray-400">Order Reference</p>
                          <p className="text-sm font-bold text-black font-mono">
                            {order.reference}
                          </p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-400">Date</p>
                          <p className="text-sm text-black">
                            {new Date(order.createdAt).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium capitalize ${
                          statusColors[order.status]
                        }`}
                      >
                        {order.status}
                      </span>
                    </div>

                    <div className="p-4">
                      <div className="space-y-2 mb-3">
                        {order.items.map((item, i) => (
                          <div key={i} className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                              <img
                                src={item.product.image}
                                alt={item.product.name}
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-medium text-black truncate">
                                {item.product.name}
                              </p>
                              <p className="text-xs text-gray-400">
                                Qty: {item.quantity} x ${item.product.price.toFixed(2)}
                              </p>
                            </div>
                            <p className="text-sm font-medium text-black">
                              ${(item.product.price * item.quantity).toFixed(2)}
                            </p>
                          </div>
                        ))}
                      </div>

                      <div className="border-t border-gray-100 pt-3 flex items-center justify-between">
                        <div className="text-sm">
                          <span className="text-gray-500">Total: </span>
                          <span className="font-bold text-black">
                            ${(order.total * 1.1).toFixed(2)}
                          </span>
                          <span className="text-xs text-gray-400 ml-2">
                            ({order.paymentMethod})
                          </span>
                        </div>

                        {order.status === "delivered" && !order.deliveryConfirmed && (
                          <button
                            onClick={() => handleConfirmDelivery(order.id)}
                            className="flex items-center gap-1.5 px-4 py-2 bg-green-500 text-white rounded-xl text-xs font-medium hover:bg-green-600 transition-colors"
                          >
                            <CheckCircle className="w-3.5 h-3.5" />
                            Confirm Delivery
                          </button>
                        )}

                        {order.deliveryConfirmed && (
                          <span className="flex items-center gap-1.5 text-xs text-green-600 font-medium">
                            <CheckCircle className="w-3.5 h-3.5" />
                            Delivery Confirmed
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      {showDeleteModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl w-full max-w-md p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-red-100 rounded-xl flex items-center justify-center">
                <AlertTriangle className="w-5 h-5 text-red-600" />
              </div>
              <h3 className="text-lg font-bold text-black">Delete Account</h3>
            </div>

            <p className="text-sm text-gray-500 mb-4">
              This action is permanent. Please enter your password to confirm.
            </p>

            {deleteError && (
              <div className="bg-red-50 text-red-600 text-sm p-3 rounded-xl mb-4">
                {deleteError}
              </div>
            )}

            <input
              type="password"
              value={deletePassword}
              onChange={(e) => setDeletePassword(e.target.value)}
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-black mb-4"
              placeholder="Enter your password"
            />

            <div className="flex gap-3">
              <button
                onClick={() => {
                  setShowDeleteModal(false);
                  setDeletePassword("");
                  setDeleteError("");
                }}
                className="flex-1 py-3 border border-gray-200 text-gray-600 rounded-xl font-medium hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteAccount}
                className="flex-1 py-3 bg-red-500 text-white rounded-xl font-medium hover:bg-red-600 transition-colors"
              >
                Delete Account
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
