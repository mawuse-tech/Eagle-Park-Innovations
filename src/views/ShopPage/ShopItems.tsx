"use client";

import React, { useState, useEffect, useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuth } from "@/src/auth/AuthProvider";
import eggs from "../../assets/shop/eggs.jpg";
import maone from "../../assets/shop/maone.jpg";
import matwo from "../../assets/shop/corn.jpg";
import sograin from "../../assets/shop/sog.jpg";
import cow from "../../assets/shop/newbeans.jpg";
import rice from "../../assets/shop/rice.jpg";
import nut from "../../assets/shop/gnut.jpg";
import compost from "../../assets/shop/com.jpg";
import sprint from "../../assets/shop/sprint.jpg";
import Swal from "sweetalert2";
import Image, { type StaticImageData } from "next/image";

interface Product {
  id: number;
  name: string;
  image: StaticImageData;
  category: string;
  isPreOrder: boolean;
  crop?: string;
  days?: string;
  color?: string;
  color2?: string;
  potential?: string;
  des?: string;
  price?: number;
  price2?: number;
  price3?: number;
  price4?: number;
}

interface CartItem extends Product {
  quantity: number;
}

interface PaystackResponse {
  reference: string;
}

interface PaystackHandler {
  openIframe(): void;
}

interface PaystackOptions {
  key: string;
  email: string;
  amount: number;
  currency: "GHS";
  ref: string;
  callback(response: PaystackResponse): void;
  onClose(): void;
}

declare global {
  interface Window {
    PaystackPop?: { setup(options: PaystackOptions): PaystackHandler };
  }
}

const productsData: Product[] = [
  {
    id: 7,
    name: "Maize (Grains)",
    color: " Yellow",
    price2: 350,
    image: maone,
    category: "grain",
    isPreOrder: true,
  },

  {
    id: 8,
    name: "Maize (Grains)",
    color: " White",
    price2: 350,
    image: matwo,
    category: "grain",
    isPreOrder: true,
  },

  {
    id: 9,
    name: "Soyabean (Grains)",
    price2: 350,
    image: sograin,
    category: "grain",
    isPreOrder: true,
  },

  {
    id: 10,
    name: "Cowpea (Grains)",
    price2: 1000,
    image: cow,
    category: "grain",
    isPreOrder: true,
  },

  {
    id: 11,
    name: "Rice (Parboiled)",
    price2: 360,
    image: rice,
    category: "grain",
    isPreOrder: true,
  },

  {
    id: 12,
    name: "Groundnut (Grains)",
    price2: 650,
    image: nut,
    category: "grain",
    isPreOrder: true,
  },

  {
    id: 13,
    name: "Compost",
    price2: 70,
    image: compost,
    category: "poultry products",
    isPreOrder: true,
  },

  {
    id: 14,
    name: "Crate of Eggs (Unsorted)",
    price4: 57,
    image: eggs,
    category: "poultry products",
    isPreOrder: true,
  },

  {
    id: 15,
    name: "Spent Layer (For meat)",
    price3: 80,
    image: sprint,
    category: "poultry products",
    isPreOrder: true,
  },
];

const ShopItems = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { user, isLoading: isAuthLoading } = useAuth();
  const hasResumedIntent = useRef(false);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [hasLoadedCart, setHasLoadedCart] = useState(false);
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [showCart, setShowCart] = useState(false);
  const [email, setEmail] = useState("");
  const [wantsReceipt, setWantsReceipt] = useState(false);
  const [phone, setPhone] = useState("");

  useEffect(() => {
    const savedCart = localStorage.getItem("grainCart");
    let restoredCart: CartItem[] = [];
    if (savedCart) {
      try {
        const parsed: unknown = JSON.parse(savedCart);
        if (Array.isArray(parsed)) {
          restoredCart = parsed.filter(
            (item): item is CartItem =>
              typeof item === "object" &&
              item !== null &&
              "category" in item &&
              item.category !== "seeds" &&
              "quantity" in item &&
              typeof item.quantity === "number",
          );
        }
      } catch {
        localStorage.removeItem("grainCart");
      }
    }
    queueMicrotask(() => {
      setCart(restoredCart);
      setHasLoadedCart(true);
    });
  }, []);

  useEffect(() => {
    if (hasLoadedCart) localStorage.setItem("grainCart", JSON.stringify(cart));
  }, [cart, hasLoadedCart]);

  useEffect(() => {
    if (isAuthLoading || !user || !hasLoadedCart || hasResumedIntent.current)
      return;
    const intent = searchParams.get("intent");
    if (intent === "add-to-cart") {
      const productId = Number(searchParams.get("product"));
      const product = productsData.find((item) => item.id === productId);
      if (product) {
        hasResumedIntent.current = true;
        queueMicrotask(() => {
          setCart((currentCart) =>
            currentCart.some((item) => item.id === product.id)
              ? currentCart
              : [...currentCart, { ...product, quantity: 1 }],
          );
          void Swal.fire({
            icon: "success",
            timer: 2000,
            showConfirmButton: false,
            text: `${product.name} is added to cart`,
          });
          router.replace("/shop", { scroll: false });
        });
      }
    } else if (intent === "checkout") {
      hasResumedIntent.current = true;
      queueMicrotask(() => {
        setShowCart(true);
        router.replace("/shop", { scroll: false });
      });
    }
  }, [hasLoadedCart, isAuthLoading, router, searchParams, user]);

  const filteredProducts = productsData.filter((product) => {
    const matchesSearch = product.name
      .toLowerCase()
      .includes(search.toLowerCase());
    const matchesCategory =
      selectedCategory === "All" ||
      product.category.toLowerCase() === selectedCategory.toLowerCase();
    return matchesSearch && matchesCategory;
  });

  const handleAddOrRemove = (product: Product) => {
    if (isAuthLoading) return;
    if (!user) {
      const returnTo = `/shop?intent=add-to-cart&product=${product.id}`;
      router.push(`/login?returnTo=${encodeURIComponent(returnTo)}`);
      return;
    }
    const exists = cart.find((item) => item.id === product.id);
    if (exists) {
      setCart(cart.filter((item) => item.id !== product.id));
      Swal.fire({
        icon: "warning",
        timer: 2000,
        showConfirmButton: false,
        text: `${product.name} is removed from cart`,
      });
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
      Swal.fire({
        icon: "success",
        timer: 2000,
        showConfirmButton: false,
        text: `${product.name} is added to cart`,
      });
    }
  };

  const handleIncrease = (id: number) => {
    const updatedCart = cart.map((item) =>
      item.id === id ? { ...item, quantity: item.quantity + 1 } : item,
    );
    setCart(updatedCart);
  };

  const handleDecrease = (id: number) => {
    const updatedCart = cart
      .map((item) =>
        item.id === id ? { ...item, quantity: item.quantity - 1 } : item,
      )
      .filter((item) => item.quantity > 0);
    setCart(updatedCart);
  };

  const total = cart.reduce((acc, item) => {
    const unitPrice =
      item.price || item.price2 || item.price3 || item.price4 || 0;
    return acc + unitPrice * item.quantity;
  }, 0);

  const handlePaystackPayment = () => {
    if (isAuthLoading) return;
    if (!user) {
      router.push(
        `/login?returnTo=${encodeURIComponent("/shop?intent=checkout")}`,
      );
      return;
    }
    // Safety check: Make sure Paystack is loaded
    if (!window.PaystackPop) {
      Swal.fire({
        text: '"Paystack is not ready. Please try again in a few seconds.',
        timer: 2000,
      });
      return;
    }

    // If user wants a receipt but did not enter email, prompt them
    if (wantsReceipt && email.trim() === "") {
      Swal.fire({
        text: "Please enter your email to receive a receipt.",
      });
      return;
    }

    // Set user email based on whether they want a receipt
    const userEmail =
      wantsReceipt && email.trim() !== ""
        ? email.trim()
        : `guest_${Date.now()}@noemail.com`;

    const userPhone = phone.trim() || "No phone number provided";

    if (phone.trim() === "") {
      Swal.fire({
        text: "Please enter your phone number.",
      });
      return;
    }

    const paystack = window.PaystackPop;
    const publicKey = process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY;
    if (!paystack || !publicKey) {
      Swal.fire({ text: "Payment is not configured. Please contact support." });
      return;
    }

    const handler = paystack.setup({
      key: publicKey,
      email: userEmail,
      amount: total * 100, // Convert to pesewas
      currency: "GHS",
      ref: "ref_" + Math.floor(Math.random() * 1000000000 + 1),
      callback: function (response: PaystackResponse) {
        // 1. Show success alert
        Swal.fire({
          text: "🎉 Payment successful! Reference: " + response.reference,
          timer: 2000,
          icon: "success",
        });

        // 2. Build item summary
        const orderDetails = cart
          .map(
            (item) =>
              `${item.name} x ${item.quantity} = GHS ${(item.price || item.price2 || item.price3 || item.price4 || 0) * item.quantity}`,
          )
          .join("\n");

        // 3. Prepare form data for Formspree
        const formData = new FormData();
        formData.append("Customer Email", userEmail);
        formData.append("Customer Phone", userPhone);
        formData.append("Payment Reference", response.reference);
        formData.append("Total Amount", `GHS ${total}`);
        formData.append("Order Details", orderDetails);

        // 4. Send to Formspree
        fetch("https://formspree.io/f/mnnvkwly", {
          method: "POST",
          body: formData,
          headers: {
            Accept: "application/json",
          },
        });

        // 5. Reset cart and form fields
        setCart([]);
        localStorage.removeItem("grainCart");
        setShowCart(false);
        setEmail("");
        setPhone("");
        setWantsReceipt(false);
      },
      onClose: function () {
        Swal.fire({
          icon: "warning",
          text: "Payment popup closed. Transaction not completed",
        });
      },
    });

    handler.openIframe();
  };

  return (
    <div className="shop-page">
      <div className="editorial-width grid grid-cols-[240px_minmax(0,1fr)] gap-8 py-12 pb-24 max-[1199px]:grid-cols-[200px_minmax(0,1fr)] max-[1199px]:gap-6 max-[767px]:flex max-[767px]:flex-col max-[767px]:gap-7 max-[767px]:py-9 max-[767px]:pb-14">
        <aside className="self-start rounded-xl bg-[#f2f6f3] px-6 py-[30px] max-[767px]:w-full max-[767px]:p-5">
          <p className="eyebrow">Find your next harvest</p>
          <h2 className="mb-6 text-xl max-[767px]:mb-4 max-[767px]:text-base">
            Shop by category
          </h2>
          <fieldset className="grid gap-4 max-[767px]:flex max-[767px]:flex-wrap max-[767px]:gap-x-5 max-[767px]:gap-y-2">
            <legend className="sr-only">Product category</legend>
            {[
              ["All", "All products"],
              ["grain", "Grains"],
              ["poultry products", "Poultry products"],
            ].map(([value, label]) => (
              <label
                className="flex min-h-[30px] cursor-pointer items-center gap-[10px] text-sm max-[767px]:text-xs"
                key={value}
              >
                <input
                  className="size-[17px] accent-[#386347]"
                  type="radio"
                  name="category"
                  value={value}
                  checked={selectedCategory === value}
                  onChange={() => setSelectedCategory(value)}
                />
                {label}
              </label>
            ))}
          </fieldset>
          <div className="mt-[30px] border-t border-[#dce5de] pt-[26px] max-[767px]:hidden">
            <i
              className="ri-customer-service-2-line text-[32px] text-[#386347]"
              aria-hidden="true"
            />
            <h3 className="my-3">Need a hand?</h3>
            <p className="text-[13px] text-[#626c65]">
              We’re here to help you find the right products.
            </p>
            <a href="/contact" className="text-link">
              Talk to our team{" "}
              <i className="ri-arrow-right-line" aria-hidden="true" />
            </a>
          </div>
        </aside>
        <section aria-label="Products">
          <div className="flex items-center justify-between gap-6 max-[767px]:gap-3">
            <div>
              <p className="eyebrow mb-[10px] max-[767px]:text-[9px]">
                From our farms to you
              </p>
              <h1 className="text-[clamp(30px,3vw,42px)] leading-[1.1] max-[767px]:text-[29px]">
                Shop our products
              </h1>
            </div>
            <button
              onClick={() => setShowCart(!showCart)}
              className="primary-link shrink-0 max-[767px]:gap-2 max-[767px]:px-[14px] max-[767px]:text-[10px]"
            >
              <i className="ri-shopping-bag-line" aria-hidden="true" />
              Cart ({cart.length})
            </button>
          </div>
          <div className="mb-7 flex items-center justify-between gap-6 border-b border-[#dce5de] py-6 max-[767px]:gap-3">
            <p className="text-[13px] text-[#626c65]" role="status">
              {filteredProducts.length} products
            </p>
            <label className="flex max-w-[300px] items-center gap-3 rounded-3xl border border-[#dce5de] px-4 py-[10px] max-[767px]:max-w-[230px]">
              <i className="ri-search-line" aria-hidden="true" />
              <span className="sr-only">Search products</span>
              <input
                className="w-full min-w-0 text-[13px]"
                type="search"
                placeholder="Search products…"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
              />
            </label>
          </div>
          <div className="grid grid-cols-3 gap-6 max-[1199px]:grid-cols-2 max-[767px]:gap-[14px] max-[479px]:grid-cols-1">
            {filteredProducts.map((product) => {
              const inCart = cart.find((item) => item.id === product.id);
              const price =
                product.price ||
                product.price2 ||
                product.price3 ||
                product.price4 ||
                0;
              const unit = product.price
                ? "kg"
                : product.price2
                  ? "50kg"
                  : product.price3
                    ? "bird"
                    : "crate";
              return (
                <article
                  className="relative flex min-w-0 flex-col overflow-hidden rounded-2xl border border-[#dce5de]"
                  key={product.id}
                >
                  {product.isPreOrder && (
                    <div className="bg-[#edf5ee] px-3 py-2 text-[10px] text-[#163e2a]">
                      Pre-order · 70% advance payment
                    </div>
                  )}
                  <Image
                    src={product.image}
                    alt={product.name}
                    sizes="(max-width: 479px) 100vw, (max-width: 1199px) 40vw, 25vw"
                    className="h-[180px] w-full bg-white px-5 pt-7 pb-4 object-contain max-[767px]:h-40 max-[767px]:px-3 max-[767px]:pt-5 max-[767px]:pb-0 max-[479px]:h-[220px]"
                  />
                  <div className="flex-1 p-5 max-[767px]:p-4">
                    <p className="eyebrow mb-2 text-[9px]">
                      {product.category}
                    </p>
                    <h2 className="mb-4 text-[22px] leading-[1.15] max-[767px]:text-xl max-[479px]:text-2xl">
                      {product.name}
                    </h2>
                    <dl className="empty:hidden border-t border-[#dce5de] pt-3.5">
                      {[
                        ["Crop", product.crop],
                        ["Days to maturity", product.days],
                        ["Grain colour", product.color],
                        ["Hilum colour", product.color2],
                        ["Potential yield", product.potential],
                      ]
                        .filter(([, value]) => value)
                        .map(([label, value]) => (
                          <div className="mb-3 text-xs" key={label}>
                            <dt className="text-[#626c65]">{label}</dt>
                            <dd className="mt-[3px] font-semibold">{value}</dd>
                          </div>
                        ))}
                    </dl>
                    {product.des && (
                      <p className="text-[13px] text-[#626c65]">
                        {product.des}
                      </p>
                    )}
                  </div>
                  <div className="bg-[#386347] p-5 text-white max-[767px]:p-4">
                    <p className="text-xs">
                      GH₵{" "}
                      <strong className="text-[26px] max-[767px]:text-[23px]">
                        {price}
                      </strong>
                      <span> / {unit}</span>
                    </p>
                    <button
                      onClick={() => handleAddOrRemove(product)}
                      disabled={isAuthLoading}
                      className="mt-3 flex min-h-11 w-full items-center justify-between border-t border-white/25 pt-3.5 text-xs hover:underline disabled:cursor-wait disabled:opacity-60"
                    >
                      {inCart ? "Remove from cart" : "Add to cart"}
                      <i
                        className={
                          inCart ? "ri-subtract-line" : "ri-arrow-right-line"
                        }
                        aria-hidden="true"
                      />
                    </button>
                  </div>
                </article>
              );
            })}
            {filteredProducts.length === 0 && (
              <div className="col-span-full p-16 px-5 text-center">
                <i
                  className="ri-search-line text-[40px] text-[#386347]"
                  aria-hidden="true"
                />
                <h2 className="mt-5 text-[26px]">No products found</h2>
                <p className="mt-4 mb-6">
                  Try another search or browse all our products.
                </p>
                <button
                  className="primary-link"
                  onClick={() => {
                    setSearch("");
                    setSelectedCategory("All");
                  }}
                >
                  Clear filters
                </button>
              </div>
            )}
          </div>
        </section>
      </div>

      {showCart && (
        <div className="fixed right-0 top-0 w-full sm:w-[400px] h-full bg-white shadow-lg border-l p-6 overflow-y-auto z-50">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">Your Cart</h2>
            <button
              onClick={() => setShowCart(false)}
              className="text-green-800 hover:text-red-600 text-2xl font-bold"
              aria-label="Close cart"
            >
              &times;
            </button>
          </div>

          {cart.length === 0 ? (
            <p>Your cart is empty.</p>
          ) : (
            <>
              {cart.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between mb-4 border-b pb-2"
                >
                  <div>
                    <h3 className="font-semibold">{item.name}</h3>
                    <p>
                      GH₵
                      {item.price || item.price2 || item.price3 || item.price4}{" "}
                      x {item.quantity}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleDecrease(item.id)}
                      className="px-2 py-1 bg-gray-200 rounded-md"
                    >
                      -
                    </button>
                    <span>{item.quantity}</span>
                    <button
                      onClick={() => handleIncrease(item.id)}
                      className="px-2 py-1 bg-gray-200 rounded-md"
                    >
                      +
                    </button>
                  </div>
                </div>
              ))}

              <div className="mt-6">
                {/* Phone number input */}
                <input
                  type="tel"
                  placeholder="Enter your phone number"
                  className="w-full border p-2 rounded mb-4"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  required
                />

                {/* Email receipt checkbox */}
                <label className="flex items-center gap-2 mb-2">
                  <input
                    type="checkbox"
                    checked={wantsReceipt}
                    onChange={(e) => setWantsReceipt(e.target.checked)}
                    className="accent-green-700"
                  />
                  <span className="text-sm">Email me a receipt</span>
                </label>

                {/* Email input (optional) */}
                {wantsReceipt && (
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="w-full border p-2 rounded mb-4"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                )}

                <div className="font-semibold mb-2">Total: GH₵{total}</div>
                <button
                  onClick={handlePaystackPayment}
                  className="w-full bg-green-800 text-white py-2 rounded-md hover:bg-green-900"
                >
                  Click to Pay
                </button>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default ShopItems;
