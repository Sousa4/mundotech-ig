import { NextResponse } from "next/server";
import { MercadoPagoConfig, Preference } from "mercadopago";
import { products } from "@/lib/products";

export const runtime = "nodejs";

type CheckoutItem = {
  id: string;
  quantity: number;
};

export async function POST(request: Request) {
  try {
    const token = process.env.MERCADO_PAGO_ACCESS_TOKEN;
    if (!token) {
      return NextResponse.json(
        { error: "MERCADO_PAGO_ACCESS_TOKEN não configurado." },
        { status: 500 }
      );
    }

    const body = await request.json();
    const items = body.items as CheckoutItem[];

    if (!Array.isArray(items) || items.length === 0) {
      return NextResponse.json({ error: "Carrinho vazio." }, { status: 400 });
    }

    // IMPORTANTE: o preço é buscado no servidor.
    // Nunca confie no preço enviado pelo navegador.
    const mpItems = items.map((cartItem) => {
      const product = products.find((p) => p.id === cartItem.id);
      const quantity = Math.max(1, Math.min(20, Number(cartItem.quantity) || 1));

      if (!product) {
        throw new Error(`Produto inválido: ${cartItem.id}`);
      }

      return {
        id: product.id,
        title: product.name,
        description: product.description,
        quantity,
        currency_id: "BRL",
        unit_price: product.price
      };
    });

    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || new URL(request.url).origin;

    const client = new MercadoPagoConfig({ accessToken: token });
    const preference = new Preference(client);

    const result = await preference.create({
      body: {
        items: mpItems,
        external_reference: `MUNDOTECH-${Date.now()}`,
        back_urls: {
          success: `${baseUrl}/sucesso`,
          failure: `${baseUrl}/falha`,
          pending: `${baseUrl}/pendente`
        },
        auto_return: "approved"
      }
    });

    return NextResponse.json({ init_point: result.init_point });
  } catch (error) {
    console.error("Erro Mercado Pago:", error);
    return NextResponse.json(
      { error: "Não foi possível criar o pagamento." },
      { status: 500 }
    );
  }
}