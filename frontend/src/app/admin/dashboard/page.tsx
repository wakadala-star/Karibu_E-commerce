"use client";

import { useState } from "react";
import { useAdminStore, Order } from "@/store/admin";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  LogOut,
  Package,
  ShoppingCart,
  Plus,
  Trash2,
  Eye,
  CheckCircle,
  Truck,
  XCircle,
  Upload,
  Image as ImageIcon,
  Bell,
} from "lucide-react";
import { products as defaultProducts } from "@/data/products";
import { useNotificationsStore } from "@/store/notifications";

type Tab = "overview" | "products" | "orders";

export default function AdminDashboard() {
  const { isAuthenticated, logout, products, orders, addProduct, removeProduct, updateOrderStatus } =
    useAdminStore();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<Tab>("overview");

  if (!isAuthenticated) {
    router.push("/admin");
    return null;
  }

  const allProducts = [...defaultProducts, ...products];
  const pendingOrders = orders.filter((o) => o.status === "pending");
  const processingOrders = orders.filter((o) => o.status === "processing");
  const deliveredOrders = orders.filter((o) => o.status === "delivered");

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
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-black rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">S</span>
                </div>
                <span className="text-lg font-bold text-black">
                  Admin Dashboard
                </span>
              </div>
            </div>
            <button
              onClick={() => {
                logout();
                router.push("/admin");
              }}
              className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100 rounded-xl transition-colors"
            >
              <LogOut className="w-4 h-4" />
              Logout
            </button>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex gap-2 mb-8 overflow-x-auto pb-2">
          {(
            [
              { id: "overview", label: "Overview" },
              { id: "products", label: "Products" },
              { id: "orders", label: "Orders" },
            ] as const
          ).map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2 rounded-xl text-sm font-medium whitespace-nowrap transition-colors ${
                activeTab === tab.id
                  ? "bg-black text-white"
                  : "bg-white text-gray-600 hover:bg-gray-100 border border-gray-200"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {activeTab === "overview" && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white rounded-2xl p-6 border border-gray-100">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
                  <Package className="w-5 h-5 text-blue-600" />
                </div>
                <span className="text-sm text-gray-500">Total Products</span>
              </div>
              <p className="text-3xl font-bold text-black">{allProducts.length}</p>
            </div>

            <div className="bg-white rounded-2xl p-6 border border-gray-100">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-orange-100 rounded-xl flex items-center justify-center">
                  <ShoppingCart className="w-5 h-5 text-orange-600" />
                </div>
                <span className="text-sm text-gray-500">Pending Orders</span>
              </div>
              <p className="text-3xl font-bold text-black">{pendingOrders.length}</p>
            </div>

            <div className="bg-white rounded-2xl p-6 border border-gray-100">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-yellow-100 rounded-xl flex items-center justify-center">
                  <Truck className="w-5 h-5 text-yellow-600" />
                </div>
                <span className="text-sm text-gray-500">Processing</span>
              </div>
              <p className="text-3xl font-bold text-black">{processingOrders.length}</p>
            </div>

            <div className="bg-white rounded-2xl p-6 border border-gray-100">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                </div>
                <span className="text-sm text-gray-500">Delivered</span>
              </div>
              <p className="text-3xl font-bold text-black">{deliveredOrders.length}</p>
            </div>
          </div>
        )}

        {activeTab === "products" && (
          <ProductsTab
            allProducts={allProducts}
            addedProducts={products}
            onAddProduct={addProduct}
            onRemoveProduct={removeProduct}
          />
        )}

        {activeTab === "orders" && (
          <OrdersTab orders={orders} onUpdateStatus={updateOrderStatus} />
        )}
      </div>
    </div>
  );
}

function ProductsTab({
  allProducts,
  addedProducts,
  onAddProduct,
  onRemoveProduct,
}: {
  allProducts: typeof defaultProducts;
  addedProducts: typeof defaultProducts;
  onAddProduct: (product: Omit<(typeof defaultProducts)[0], "id">) => void;
  onRemoveProduct: (id: string) => void;
}) {
  const [showForm, setShowForm] = useState(false);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("home");
  const [rating, setRating] = useState("4.5");
  const [reviewCount, setReviewCount] = useState("100");
  const [badge, setBadge] = useState("Other");
  const [stockQuantity, setStockQuantity] = useState("10");
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAddProduct({
      name,
      price: parseFloat(price),
      category,
      rating: parseFloat(rating),
      reviewCount,
      image: imagePreview || "/images/speaker.jpg",
      badge,
      stockQuantity: parseInt(stockQuantity),
    });
    setShowForm(false);
    setName("");
    setPrice("");
    setStockQuantity("10");
    setImagePreview(null);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-bold text-black">Products</h2>
        <button
          onClick={() => setShowForm(!showForm)}
          className="flex items-center gap-2 px-4 py-2 bg-black text-white rounded-xl text-sm font-medium hover:bg-gray-800 transition-colors"
        >
          <Plus className="w-4 h-4" />
          Add Product
        </button>
      </div>

      {showForm && (
        <div className="bg-white rounded-2xl p-6 border border-gray-100 mb-6">
          <h3 className="font-bold text-black mb-4">New Product</h3>
          <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-black mb-1">
                Product Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-black"
                placeholder="Enter product name"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-black mb-1">
                Price ($)
              </label>
              <input
                type="number"
                step="0.01"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-black"
                placeholder="0.00"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-black mb-1">
                Category
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-black"
              >
                <option value="home">Home</option>
                <option value="music">Music</option>
                <option value="phone">Phone</option>
                <option value="storage">Storage</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-black mb-1">
                Badge
              </label>
              <select
                value={badge}
                onChange={(e) => setBadge(e.target.value)}
                className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-black"
              >
                <option value="Other">Other</option>
                <option value="Music">Music</option>
                <option value="Home">Home</option>
                <option value="Phone">Phone</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-black mb-1">
                Stock Quantity
              </label>
              <input
                type="number"
                value={stockQuantity}
                onChange={(e) => setStockQuantity(e.target.value)}
                className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-black"
                placeholder="10"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-black mb-1">
                Product Image
              </label>
              <div className="flex items-center gap-4">
                <label className="flex-1 flex items-center justify-center gap-2 px-4 py-8 bg-gray-50 border-2 border-dashed border-gray-200 rounded-xl cursor-pointer hover:border-gray-300 transition-colors">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                  {imagePreview ? (
                    <div className="relative w-full h-32">
                      <img
                        src={imagePreview}
                        alt="Preview"
                        className="w-full h-full object-contain rounded-lg"
                      />
                      <span className="absolute bottom-1 right-1 text-xs bg-black/70 text-white px-2 py-0.5 rounded-lg">
                        Change
                      </span>
                    </div>
                  ) : (
                    <div className="text-center">
                      <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                      <p className="text-sm text-gray-500">
                        Click to upload image
                      </p>
                      <p className="text-xs text-gray-400 mt-1">
                        PNG, JPG, GIF up to 5MB
                      </p>
                    </div>
                  )}
                </label>
              </div>
            </div>
            <div className="sm:col-span-2 flex gap-3">
              <button
                type="submit"
                className="px-6 py-2.5 bg-black text-white rounded-xl text-sm font-medium hover:bg-gray-800 transition-colors"
              >
                Add Product
              </button>
              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="px-6 py-2.5 border border-gray-200 text-gray-600 rounded-xl text-sm font-medium hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr>
                <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase">
                  Product
                </th>
                <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase">
                  Category
                </th>
                <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase">
                  Price
                </th>
                <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase">
                  Stock
                </th>
                <th className="text-right px-6 py-3 text-xs font-medium text-gray-500 uppercase">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {allProducts.map((product) => (
                <tr key={product.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                        {product.image.startsWith("data:") ? (
                          <img
                            src={product.image}
                            alt={product.name}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-sm font-bold text-gray-400">
                            {product.name.charAt(0)}
                          </div>
                        )}
                      </div>
                      <span className="font-medium text-black text-sm">
                        {product.name}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm text-gray-500 capitalize">
                      {product.category}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm font-medium text-black">
                      ${product.price.toFixed(2)}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`text-sm font-medium ${
                        product.stockQuantity > 10
                          ? "text-green-600"
                          : product.stockQuantity > 0
                          ? "text-yellow-600"
                          : "text-red-600"
                      }`}
                    >
                      {product.stockQuantity}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    {addedProducts.some((p) => p.id === product.id) && (
                      <button
                        onClick={() => onRemoveProduct(product.id)}
                        className="p-2 hover:bg-red-50 rounded-lg transition-colors"
                      >
                        <Trash2 className="w-4 h-4 text-gray-400 hover:text-red-500" />
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function OrdersTab({
  orders,
  onUpdateStatus,
}: {
  orders: Order[];
  onUpdateStatus: (id: string, status: Order["status"]) => void;
}) {
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  const statusColors: Record<string, string> = {
    pending: "bg-orange-100 text-orange-600",
    processing: "bg-yellow-100 text-yellow-600",
    shipped: "bg-blue-100 text-blue-600",
    delivered: "bg-green-100 text-green-600",
    closed: "bg-gray-100 text-gray-600",
  };

  const pendingCount = orders.filter((o) => o.status === "pending").length;

  return (
    <div>
      <div className="flex items-center gap-3 mb-6">
        <h2 className="text-lg font-bold text-black">Customer Orders</h2>
        {pendingCount > 0 && (
          <span className="bg-orange-500 text-white text-xs font-bold px-2.5 py-1 rounded-full animate-pulse">
            {pendingCount} new
          </span>
        )}
      </div>

      {orders.length === 0 ? (
        <div className="bg-white rounded-2xl p-12 border border-gray-100 text-center">
          <ShoppingCart className="w-12 h-12 text-gray-300 mx-auto mb-4" />
          <p className="text-gray-500">No orders yet</p>
        </div>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => (
            <div
              key={order.id}
              className={`bg-white rounded-2xl border p-6 ${
                order.status === "pending"
                  ? "border-orange-200 shadow-sm"
                  : "border-gray-100"
              }`}
            >
              {order.status === "pending" && (
                <div className="bg-orange-50 text-orange-700 text-xs font-medium px-3 py-1.5 rounded-lg mb-4 flex items-center gap-2">
                  <Bell className="w-3.5 h-3.5" />
                  New order waiting for approval
                </div>
              )}

              <div className="flex items-start justify-between gap-4 mb-4">
                <div>
                  <p className="font-bold text-black">{order.userName}</p>
                  <p className="text-sm text-gray-400 font-mono">
                    {order.reference}
                  </p>
                  <p className="text-xs text-gray-400 mt-1">
                    {new Date(order.createdAt).toLocaleString()}
                  </p>
                </div>
                <span
                  className={`px-3 py-1 rounded-full text-xs font-medium capitalize ${
                    statusColors[order.status]
                  }`}
                >
                  {order.status}
                </span>
              </div>

              <div className="flex flex-wrap gap-2 mb-4">
                {order.items.map((item, i) => (
                  <span
                    key={i}
                    className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-lg"
                  >
                    {item.product.name} x{item.quantity}
                  </span>
                ))}
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <span className="text-sm text-gray-500">Total: </span>
                  <span className="font-bold text-black">
                    ${order.total.toFixed(2)}
                  </span>
                  <span className="text-xs text-gray-400 ml-2">
                    ({order.paymentMethod})
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() =>
                      setSelectedOrder(
                        selectedOrder?.id === order.id ? null : order
                      )
                    }
                    className="flex items-center gap-1 px-3 py-1.5 border border-gray-200 text-gray-600 rounded-lg text-xs font-medium hover:bg-gray-50 transition-colors"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    Receipt
                  </button>

                  {order.status === "pending" && (
                    <button
                      onClick={() => {
                        onUpdateStatus(order.id, "processing");
                        useNotificationsStore.getState().addNotification({
                          userId: order.userId,
                          title: "Order Approved",
                          message: `Your order ${order.reference} has been approved and is now being processed.`,
                          type: "order_approved",
                        });
                      }}
                      className="flex items-center gap-1 px-3 py-1.5 bg-green-100 text-green-700 rounded-lg text-xs font-medium hover:bg-green-200 transition-colors"
                    >
                      <CheckCircle className="w-3.5 h-3.5" />
                      Approve & Ship
                    </button>
                  )}

                  {order.status === "processing" && (
                    <button
                      onClick={() => {
                        onUpdateStatus(order.id, "delivered");
                        useNotificationsStore.getState().addNotification({
                          userId: order.userId,
                          title: "Order Delivered",
                          message: `Your order ${order.reference} has been delivered. Please confirm delivery.`,
                          type: "order_delivered",
                        });
                      }}
                      className="flex items-center gap-1 px-3 py-1.5 bg-blue-100 text-blue-700 rounded-lg text-xs font-medium hover:bg-blue-200 transition-colors"
                    >
                      <Truck className="w-3.5 h-3.5" />
                      Mark Delivered
                    </button>
                  )}

                  {order.status === "delivered" && (
                    <button
                      onClick={() => {
                        onUpdateStatus(order.id, "closed");
                        useNotificationsStore.getState().addNotification({
                          userId: order.userId,
                          title: "Order Closed",
                          message: `Your order ${order.reference} has been closed. Expect your delivery soon.`,
                          type: "order_closed",
                        });
                      }}
                      className="flex items-center gap-1 px-3 py-1.5 bg-gray-100 text-gray-700 rounded-lg text-xs font-medium hover:bg-gray-200 transition-colors"
                    >
                      <XCircle className="w-3.5 h-3.5" />
                      Close Order
                    </button>
                  )}
                </div>
              </div>

              {selectedOrder?.id === order.id && (
                <div className="mt-4 pt-4 border-t border-gray-100">
                  <div className="bg-gray-50 rounded-xl p-4">
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="font-bold text-black">Receipt</h4>
                      <span className="text-xs text-gray-400 font-mono">
                        {order.reference}
                      </span>
                    </div>

                    <div className="space-y-3 mb-3">
                      {order.items.map((item, i) => (
                        <div key={i} className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-white rounded-lg overflow-hidden flex-shrink-0">
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
                              {item.quantity} × ${item.product.price.toFixed(2)}
                            </p>
                          </div>
                          <p className="text-sm font-medium text-black">
                            ${(item.product.price * item.quantity).toFixed(2)}
                          </p>
                        </div>
                      ))}
                    </div>

                    <div className="border-t border-gray-200 pt-3 space-y-1">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-500">Subtotal</span>
                        <span className="text-black">
                          ${(order.total).toFixed(2)}
                        </span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-500">Tax (10%)</span>
                        <span className="text-black">
                          ${(order.total * 0.1).toFixed(2)}
                        </span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-500">Shipping</span>
                        <span className="text-green-600">Free</span>
                      </div>
                      <div className="flex justify-between font-bold text-black pt-2 border-t border-gray-200">
                        <span>Grand Total</span>
                        <span>${(order.total * 1.1).toFixed(2)}</span>
                      </div>
                    </div>

                    <div className="mt-3 pt-3 border-t border-gray-200">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-500">Payment</span>
                        <span className="font-medium text-black capitalize">
                          {order.paymentMethod}
                        </span>
                      </div>
                      <div className="flex justify-between text-sm mt-1">
                        <span className="text-gray-500">Customer</span>
                        <span className="font-medium text-black">
                          {order.userName}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
