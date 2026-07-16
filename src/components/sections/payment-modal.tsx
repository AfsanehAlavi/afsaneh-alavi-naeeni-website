"use client";

import { useEffect, useRef, useState } from "react";
import Script from "next/script";
import { X } from "lucide-react";
import { createPaymentIntent, isSupabaseConfigured } from "@/lib/supabase";
import type { BookingData } from "./booking";

const STRIPE_PUBLISHABLE_KEY = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY ?? "";

// Minimal ambient shape for Stripe.js — loaded globally via <Script>, not the npm package.
interface StripeCardElement {
  mount: (selector: string) => void;
  unmount: () => void;
}
interface StripeElements {
  create: (type: "card", options: Record<string, unknown>) => StripeCardElement;
}
interface StripeClient {
  elements: () => StripeElements;
  confirmCardPayment: (
    clientSecret: string,
    data: Record<string, unknown>
  ) => Promise<{ error?: { message: string }; paymentIntent?: { status: string; id: string } }>;
}
declare global {
  interface Window {
    Stripe?: (key: string) => StripeClient;
  }
}

export function PaymentModal({
  booking,
  onClose,
  onSuccess,
}: {
  booking: BookingData;
  onClose: () => void;
  onSuccess: (paymentIntentId: string) => void;
}) {
  const [stripeReady, setStripeReady] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const stripeRef = useRef<StripeClient | null>(null);
  const cardElRef = useRef<StripeCardElement | null>(null);
  const mountedCardRef = useRef(false);

  useEffect(() => {
    if (!stripeReady || !STRIPE_PUBLISHABLE_KEY || mountedCardRef.current) return;
    if (typeof window === "undefined" || !window.Stripe) return;

    stripeRef.current = window.Stripe(STRIPE_PUBLISHABLE_KEY);
    const elements = stripeRef.current.elements();
    const card = elements.create("card", {
      style: { base: { fontFamily: "Lato, sans-serif", fontSize: "15px", color: "#0D1F3C" } },
    });
    card.mount("#card-element");
    cardElRef.current = card;
    mountedCardRef.current = true;

    return () => {
      cardElRef.current?.unmount();
      mountedCardRef.current = false;
    };
  }, [stripeReady]);

  async function processPayment() {
    if (!stripeRef.current || !cardElRef.current) {
      setError("Payment system not configured. Please contact Afsaneh directly.");
      return;
    }
    setProcessing(true);
    setError(null);

    try {
      if (!isSupabaseConfigured()) {
        throw new Error("Payment backend not configured.");
      }
      const { clientSecret } = await createPaymentIntent(booking.price * 100, "cad");
      const result = await stripeRef.current.confirmCardPayment(clientSecret, {
        payment_method: {
          card: cardElRef.current,
          billing_details: {
            name: `${booking.firstName} ${booking.lastName}`,
            email: booking.email,
          },
        },
      });

      if (result.error) {
        setError(result.error.message);
        setProcessing(false);
      } else if (result.paymentIntent?.status === "succeeded") {
        onSuccess(result.paymentIntent.id);
      }
    } catch {
      setError("Payment failed. Please try again or contact us.");
      setProcessing(false);
    }
  }

  return (
    <>
      <Script src="https://js.stripe.com/v3/" onReady={() => setStripeReady(true)} />
      <div className="fixed inset-0 z-[2000] bg-navy/70 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl w-full max-w-[480px] p-10 relative">
          <button
            onClick={onClose}
            aria-label="Close"
            className="absolute top-5 right-5 text-text-muted hover:text-navy"
          >
            <X size={22} />
          </button>
          <h3 className="text-xl font-bold text-navy mb-2 font-heading-brand">
            Complete your booking
          </h3>
          <p className="text-sm text-text-muted mb-6">
            You&apos;re booking a {booking.sessionLabel} for CAD ${booking.price}.
          </p>
          <div
            id="card-element"
            className="p-3.5 border-[1.5px] border-cream-mid rounded-lg bg-cream mb-5 min-h-[44px]"
          >
            {!STRIPE_PUBLISHABLE_KEY && (
              <p className="text-[13px] text-red-700">
                Stripe key not configured. Set NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY in .env.local.
              </p>
            )}
          </div>
          {error && <p className="text-[13px] text-red-700 mb-4">{error}</p>}
          <button
            onClick={processPayment}
            disabled={processing}
            className="w-full py-3.5 bg-orange text-white font-heading-brand text-sm font-bold rounded-lg tracking-wide hover:bg-orange-warm disabled:opacity-60 transition"
          >
            {processing ? "Processing..." : "Pay & Confirm Booking"}
          </button>
        </div>
      </div>
    </>
  );
}
