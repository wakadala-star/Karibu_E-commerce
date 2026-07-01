"use client";

import { useState, useRef } from "react";
import { useCartStore } from "@/store/cart";
import { useAuthStore } from "@/store/auth";
import { useAdminStore, Order } from "@/store/admin";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Trash2,
  Plus,
  Minus,
  ShoppingBag,
  CreditCard,
  Smartphone,
  Banknote,
  ArrowLeft,
  Check,
  X,
  Lock,
  Package,
  Clock,
  CheckCircle,
} from "lucide-react";
import { useNotificationsStore } from "@/store/notifications";

const paymentMethods = [
  {
    id: "smart-card",
    name: "Smart Card",
    icon: CreditCard,
    description: "Pay with your smart card",
  },
  {
    id: "mobile-money",
    name: "Mobile Money",
    icon: Smartphone,
    description: "Pay via mobile money",
  },
  {
    id: "cash-on-delivery",
    name: "Cash on Delivery",
    icon: Banknote,
    description: "Pay when you receive",
  },
];

export default function CartPage() {
  const {
    items,
    removeItem,
    updateQuantity,
    clearCart,
    getSubtotal,
    getTax,
    getGrandTotal,
    getTotalItems,
  } = useCartStore();
  const { user } = useAuthStore();
  const { addOrder } = useAdminStore();
  const router = useRouter();

  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState<string | null>(null);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [completedOrder, setCompletedOrder] = useState<Order | null>(null);
  const orderCounter = useRef(0);

  const subtotal = getSubtotal();
  const tax = getTax();
  const grandTotal = getGrandTotal();
  const totalItems = getTotalItems();

  const generateOrder = () => {
    orderCounter.current += 1;
    const ref = `ORD-${new Date().toISOString().slice(0, 10).replace(/-/g, "")}-${String(orderCounter.current).padStart(4, "0")}`;
    const orderItems = items.map((item) => ({
      product: item.product,
      quantity: item.quantity,
    }));

    addOrder({
      reference: ref,
      userId: user!.id,
      userName: user!.name,
      items: orderItems,
      total: grandTotal,
      paymentMethod: selectedPayment!,
      status: "pending",
    });

    const order: Order = {
      id: crypto.randomUUID(),
      reference: ref,
      userId: user!.id,
      userName: user!.name,
      items: orderItems,
      total: grandTotal,
      paymentMethod: selectedPayment!,
      status: "pending",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    return order;
  };

  const handlePaymentSelect = () => {
    if (!user) {
      setShowPaymentModal(false);
      router.push("/auth");
      return;
    }
    if (selectedPayment) {
      const order = generateOrder();
      setCompletedOrder(order);
      setShowPaymentModal(false);
      setOrderPlaced(true);
      clearCart();
      useNotificationsStore.getState().addNotification({
        userId: user.id,
        title: "Order Placed",
        message: `Your order ${order.reference} has been placed and is pending approval.`,
        type: "general",
      });
    }
  };

  const getPaymentMethodName = (id: string) => {
    return paymentMethods.find((m) => m.id === id)?.name || id;
  };

  const getPaymentMethodIcon = (id: string) => {
    const method = paymentMethods.find((m) => m.id === id);
    if (!method) return null;
    const Icon = method.icon;
    return <Icon className="w-5 h-5" />;
  };

  if (orderPlaced && completedOrder) {
    return (
      <div className="min-h-screen bg-gray-50">
        <nav className="bg-white border-b border-gray-100 sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center h-16">
              <Link href="/" className="flex items-center gap-2">
                <div className="w-8 h-8 bg-black rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">S</span>
                </div>
                <span className="text-xl font-bold text-black">Karibu</span>
              </Link>
            </div>
          </div>
        </nav>

        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center mb-8">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-10 h-10 text-green-600" />
            </div>
            <h1 className="text-3xl font-bold text-black mb-2">
              Order Placed Successfully!
            </h1>
            <p className="text-gray-500">
              Payment verified. Your order has been confirmed and is waiting for
              delivery.
            </p>
          </div>

          <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden mb-6">
            <div className="bg-black px-6 py-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-xs">Order Reference</p>
                  <p className="text-white font-bold text-lg tracking-wide">
                    {completedOrder.reference}
                  </p>
                </div>
                <Package className="w-8 h-8 text-gray-400" />
              </div>
            </div>

            <div className="p-6">
              <div className="flex items-center gap-2 mb-4 pb-4 border-b border-gray-100">
                <Clock className="w-4 h-4 text-yellow-500" />
                <span className="text-sm font-medium text-yellow-600 bg-yellow-50 px-3 py-1 rounded-full">
                  Awaiting Delivery
                </span>
              </div>

              <h3 className="font-bold text-black mb-3">Receipt</h3>

              <div className="space-y-3 mb-4">
                {completedOrder.items.map((item, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
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
                        Qty: {item.quantity} × ${item.product.price.toFixed(2)}
                      </p>
                    </div>
                    <p className="text-sm font-medium text-black">
                      ${(item.product.price * item.quantity).toFixed(2)}
                    </p>
                  </div>
                ))}
              </div>

              <div className="border-t border-gray-100 pt-4 space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Subtotal</span>
                  <span className="text-black">
                    ${completedOrder.total.toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Tax (10%)</span>
                  <span className="text-black">
                    ${(completedOrder.total * 0.1).toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Shipping</span>
                  <span className="text-green-600">Free</span>
                </div>
                <div className="flex justify-between font-bold text-black pt-2 border-t border-gray-100">
                  <span>Grand Total</span>
                  <span>${(completedOrder.total * 1.1).toFixed(2)}</span>
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-gray-100">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">Payment Method</span>
                  <div className="flex items-center gap-2">
                    {getPaymentMethodIcon(completedOrder.paymentMethod)}
                    <span className="text-sm font-medium text-black capitalize">
                      {getPaymentMethodName(completedOrder.paymentMethod)}
                    </span>
                  </div>
                </div>
                <div className="flex items-center justify-between mt-2">
                  <span className="text-sm text-gray-500">Status</span>
                  <span className="text-sm font-medium text-yellow-600">
                    Payment Verified ✓
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-blue-50 rounded-2xl p-4 mb-6 flex items-start gap-3">
            <Package className="w-5 h-5 text-blue-600 mt-0.5" />
            <div>
              <p className="text-sm font-medium text-blue-900">
                Present this code to the delivery person
              </p>
              <p className="text-xs text-blue-700 mt-1">
                Your order reference:{" "}
                <span className="font-bold">{completedOrder.reference}</span>
              </p>
            </div>
          </div>

          <div className="flex gap-3">
            <Link
              href="/"
              className="flex-1 flex items-center justify-center gap-2 py-3 bg-black text-white rounded-xl font-medium hover:bg-gray-800 transition-colors"
            >
              <ShoppingBag className="w-4 h-4" />
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center gap-4 mb-8">
          <Link
            href="/"
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <ArrowLeft className="w-5 h-5 text-gray-600" />
          </Link>
          <h1 className="text-2xl sm:text-3xl font-bold text-black">
            Shopping Cart
          </h1>
          <span className="text-sm text-gray-500">
            ({totalItems} {totalItems === 1 ? "item" : "items"})
          </span>
        </div>

        {items.length === 0 ? (
          <div className="text-center py-16">
            <ShoppingBag className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h2 className="text-xl font-semibold text-gray-600 mb-2">
              Your cart is empty
            </h2>
            <p className="text-gray-400 mb-6">
              Looks like you haven&apos;t added anything yet
            </p>
            <Link
              href="/"
              className="inline-flex items-center gap-2 px-6 py-3 bg-black text-white rounded-xl font-medium hover:bg-gray-800 transition-colors"
            >
              <ShoppingBag className="w-4 h-4" />
              Start Shopping
            </Link>
          </div>
        ) : (
          <div className="flex flex-col lg:flex-row gap-8">
            <div className="flex-1">
              <div className="space-y-4">
                {items.map((item) => (
                  <div
                    key={item.product.id}
                    className="bg-white border border-gray-100 rounded-2xl p-4 sm:p-6 flex gap-4"
                  >
                    <div className="relative w-20 h-20 sm:w-24 sm:h-24 bg-gray-50 rounded-xl overflow-hidden flex-shrink-0">
                      <Image
                        src={item.product.image}
                        alt={item.product.name}
                        fill
                        className="object-cover"
                        sizes="96px"
                      />
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <h3 className="font-semibold text-black text-sm sm:text-base truncate">
                            {item.product.name}
                          </h3>
                          <p className="text-xs text-gray-400 mt-0.5">
                            {item.product.badge}
                          </p>
                        </div>
                        <button
                          onClick={() => removeItem(item.product.id)}
                          className="p-1.5 hover:bg-red-50 rounded-lg transition-colors flex-shrink-0"
                        >
                          <Trash2 className="w-4 h-4 text-gray-400 hover:text-red-500" />
                        </button>
                      </div>

                      <div className="flex items-center justify-between mt-3">
                        <div className="flex items-center gap-2 bg-gray-50 rounded-xl px-2 py-1">
                          <button
                            onClick={() =>
                              updateQuantity(
                                item.product.id,
                                item.quantity - 1
                              )
                            }
                            className="w-8 h-8 flex items-center justify-center hover:bg-gray-200 rounded-lg transition-colors"
                          >
                            <Minus className="w-4 h-4 text-gray-600" />
                          </button>
                          <span className="w-8 text-center font-medium text-black">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() =>
                              updateQuantity(
                                item.product.id,
                                item.quantity + 1
                              )
                            }
                            className="w-8 h-8 flex items-center justify-center hover:bg-gray-200 rounded-lg transition-colors"
                          >
                            <Plus className="w-4 h-4 text-gray-600" />
                          </button>
                        </div>

                        <p className="font-bold text-black">
                          ${(item.product.price * item.quantity).toFixed(2)}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <button
                onClick={clearCart}
                className="mt-4 text-sm text-gray-400 hover:text-red-500 transition-colors"
              >
                Clear Cart
              </button>
            </div>

            <div className="w-full lg:w-80 flex-shrink-0">
              <div className="bg-gray-50 rounded-2xl p-6 sticky top-24">
                <h2 className="text-lg font-bold text-black mb-4">
                  Order Summary
                </h2>

                <div className="space-y-3 mb-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">
                      Subtotal ({totalItems} items)
                    </span>
                    <span className="font-medium text-black">
                      ${subtotal.toFixed(2)}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Tax (10%)</span>
                    <span className="font-medium text-black">
                      ${tax.toFixed(2)}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Shipping</span>
                    <span className="font-medium text-green-600">Free</span>
                  </div>
                </div>

                <div className="border-t border-gray-200 pt-4 mb-6">
                  <div className="flex justify-between">
                    <span className="font-bold text-black">Grand Total</span>
                    <span className="font-bold text-xl text-black">
                      ${grandTotal.toFixed(2)}
                    </span>
                  </div>
                </div>

                {selectedPayment && (
                  <div className="bg-white rounded-xl p-3 mb-4 flex items-center gap-3">
                    {paymentMethods.map((method) => {
                      if (method.id === selectedPayment) {
                        const Icon = method.icon;
                        return (
                          <div
                            key={method.id}
                            className="flex items-center gap-3"
                          >
                            <div className="w-10 h-10 bg-black rounded-lg flex items-center justify-center">
                              <Icon className="w-5 h-5 text-white" />
                            </div>
                            <div>
                              <p className="text-sm font-medium text-black">
                                {method.name}
                              </p>
                              <p className="text-xs text-gray-400">
                                {method.description}
                              </p>
                            </div>
                          </div>
                        );
                      }
                      return null;
                    })}
                    <button
                      onClick={() => setSelectedPayment(null)}
                      className="ml-auto p-1 hover:bg-gray-100 rounded-lg"
                    >
                      <X className="w-4 h-4 text-gray-400" />
                    </button>
                  </div>
                )}

                {!user && (
                  <div className="bg-yellow-50 rounded-xl p-3 mb-4 flex items-center gap-2">
                    <Lock className="w-4 h-4 text-yellow-600" />
                    <p className="text-xs text-yellow-700">
                      <Link href="/auth" className="font-medium underline">
                        Login
                      </Link>{" "}
                      to place your order
                    </p>
                  </div>
                )}

                <button
                  onClick={() => setShowPaymentModal(true)}
                  className="w-full py-3 bg-black text-white rounded-xl font-medium hover:bg-gray-800 transition-colors"
                >
                  {selectedPayment ? "Place Order" : "Select Payment Method"}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {showPaymentModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl w-full max-w-md p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-bold text-black">
                Select Payment Method
              </h3>
              <button
                onClick={() => setShowPaymentModal(false)}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X className="w-5 h-5 text-gray-600" />
              </button>
            </div>

            <div className="space-y-3 mb-6">
              {paymentMethods.map((method) => {
                const Icon = method.icon;
                return (
                  <button
                    key={method.id}
                    onClick={() => setSelectedPayment(method.id)}
                    className={`w-full flex items-center gap-4 p-4 rounded-xl border-2 transition-all ${
                      selectedPayment === method.id
                        ? "border-black bg-gray-50"
                        : "border-gray-100 hover:border-gray-200"
                    }`}
                  >
                    <div
                      className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                        selectedPayment === method.id
                          ? "bg-black"
                          : "bg-gray-100"
                      }`}
                    >
                      <Icon
                        className={`w-6 h-6 ${
                          selectedPayment === method.id
                            ? "text-white"
                            : "text-gray-600"
                        }`}
                      />
                    </div>
                    <div className="text-left">
                      <p className="font-medium text-black">{method.name}</p>
                      <p className="text-sm text-gray-400">
                        {method.description}
                      </p>
                    </div>
                    {selectedPayment === method.id && (
                      <div className="ml-auto">
                        <Check className="w-5 h-5 text-black" />
                      </div>
                    )}
                  </button>
                );
              })}
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setShowPaymentModal(false)}
                className="flex-1 py-3 border border-gray-200 text-gray-600 rounded-xl font-medium hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handlePaymentSelect}
                disabled={!selectedPayment}
                className="flex-1 py-3 bg-black text-white rounded-xl font-medium hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Confirm Payment
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function Navbar() {
  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-black rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">S</span>
            </div>
            <span className="text-xl font-bold text-black">Karibu</span>
          </Link>

          <div className="hidden md:flex items-center gap-8">
            <Link
              href="/"
              className="text-gray-600 hover:text-black font-medium transition-colors text-sm"
            >
              Discover
            </Link>
            <Link
              href="/admin"
              className="text-gray-600 hover:text-black font-medium transition-colors text-sm"
            >
              Shop
            </Link>
            <Link
              href="/blog"
              className="text-gray-600 hover:text-black font-medium transition-colors text-sm"
            >
              Blog
            </Link>
          </div>

          <div className="flex items-center gap-4">
            <Link href="/cart" className="p-2 hover:bg-gray-100 rounded-full transition-colors relative">
              <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
