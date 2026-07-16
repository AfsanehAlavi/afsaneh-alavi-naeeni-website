const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "";

export async function supabaseInsert(table: string, data: Record<string, unknown>) {
  if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
    console.log("Supabase not configured. Would insert into", table, data);
    return { ok: true };
  }
  return fetch(`${SUPABASE_URL}/rest/v1/${table}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      apikey: SUPABASE_ANON_KEY,
      Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
      Prefer: "return=minimal",
    },
    body: JSON.stringify(data),
  });
}

export async function createPaymentIntent(amountCents: number, currency: string) {
  const resp = await fetch(`${SUPABASE_URL}/functions/v1/create-payment-intent`, {
    method: "POST",
    headers: { "Content-Type": "application/json", apikey: SUPABASE_ANON_KEY },
    body: JSON.stringify({ amount: amountCents, currency }),
  });
  return resp.json() as Promise<{ clientSecret: string }>;
}

export function isSupabaseConfigured() {
  return Boolean(SUPABASE_URL && SUPABASE_ANON_KEY);
}
