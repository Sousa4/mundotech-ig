import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);

  // Aqui será o ponto para salvar o pedido no banco de dados
  // depois que você colocar Supabase/PostgreSQL.
  console.log("Webhook Mercado Pago:", body);

  return NextResponse.json({ received: true });
}

export async function GET() {
  return NextResponse.json({ ok: true });
}