"use client";

import { useState, useEffect } from "react";
import { ShoppingCart, Search, ShieldCheck, Truck, Plus, Star, X, MessageCircle, Video, Users, Sparkles, Store as StoreIcon, ChevronLeft, ChevronRight, ArrowRight, Compass, Zap, Radio } from "lucide-react";
import { products, Product } from "../lib/products";

export default function Store() {
  const [cart, setCart] = useState<{ product: Product; quantity: number }[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<"store" | "guide">("store");
  
  const [activeProduct, setActiveProduct] = useState<Product | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const [customerName, setCustomerName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");

  const [carouselIndex, setCarouselIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCarouselIndex((prev) => (prev + 1) % products.length);
    }, 4500);
    return () => clearInterval(timer);
  }, []);

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSearch;
  });

  const addToCart = (product: Product) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { product, quantity: 1 }];
    });
    setIsCartOpen(true);
    setActiveProduct(null);
  };

  const removeFromCart = (id: string) => {
    setCart((prev) => prev.filter((item) => item.product.id !== id));
  };

  const totalCartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

  const handleWhatsAppCheckout = () => {
    if (cart.length === 0) return;
    
    let message = `⚡ *PEDIDO REVOLUCIONÁRIO - MUNDOTECH.IG* ⚡\n`;
    if (customerName) message += `👤 *Cliente:* ${customerName}\n`;
    if (customerPhone) message += `📱 *WhatsApp:* ${customerPhone}\n`;
    message += `\n`;

    cart.forEach((item) => {
      message += `• ${item.quantity}x ${item.product.name} — R$ ${(item.product.price * item.quantity).toFixed(2)}\n`;
    });
    message += `\n💎 *Total Geral:* R$ ${totalPrice.toFixed(2)}`;

    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/5577988755324?text=${encodedMessage}`, "_blank");
  };

  const openWhatsAppGeneral = (customText?: string) => {
    const text = customText || "Olá MundoTech.ig! Vim pelo radar tecnológico da loja e quero saber mais sobre os produtos e atacado.";
    window.open(`https://wa.me/5577988755324?text=${encodeURIComponent(text)}`, "_blank");
  };

  return (
    <div className="min-h-screen bg-[#030712] text-slate-100 flex flex-col font-sans selection:bg-cyan-500 selection:text-black">
      
      {/* Background Ambience Glows */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute -top-40 -left-40 w-96 h-96 bg-blue-600/15 rounded-full blur-[120px]" />
        <div className="absolute top-1/3 -right-40 w-96 h-96 bg-cyan-500/15 rounded-full blur-[140px]" />
        <div className="absolute -bottom-40 left-1/3 w-96 h-96 bg-purple-600/10 rounded-full blur-[160px]" />
      </div>

      {/* Top Banner Cybernético */}
      <div className="relative z-20 bg-gradient-to-r from-blue-900 via-indigo-900 to-cyan-900 text-xs py-2 px-4 font-semibold tracking-wider flex justify-center gap-8 overflow-x-auto border-b border-cyan-500/20 text-cyan-200 shadow-lg shadow-cyan-950/50">
        <span className="flex items-center gap-1.5 whitespace-nowrap"><Truck className="w-3.5 h-3.5 text-cyan-400" /> Envio Flash para todo o Brasil</span>
        <span className="flex items-center gap-1.5 whitespace-nowrap"><ShieldCheck className="w-3.5 h-3.5 text-cyan-400" /> Selo de Qualidade Absoluta</span>
        <span className="flex items-center gap-1.5 whitespace-nowrap"><Zap className="w-3.5 h-3.5 text-cyan-400" /> Condições Exclusivas Atacado</span>
      </div>

      {/* Header Revolucionário com Abas Inteligentes */}
      <header className="sticky top-0 z-40 bg-[#030712]/80 backdrop-blur-xl border-b border-slate-800/80 px-4 lg:px-8 py-3.5 shadow-2xl">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          
          <div className="flex items-center gap-3.5">
            <div className="relative group cursor-pointer" onClick={() => setActiveTab("store")}>
              <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full blur opacity-70 group-hover:opacity-100 transition duration-500"></div>
              <div className="relative w-12 h-12 rounded-full bg-slate-950 flex items-center justify-center overflow-hidden border border-cyan-500/50">
                <img src="/banner-mundotech.jpeg" alt="Logo" className="w-full h-full object-cover" />
              </div>
            </div>
            <div>
              <h1 className="text-xl lg:text-2xl font-black tracking-widest bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-400 bg-clip-text text-transparent drop-shadow">
                MUNDO TECH
              </h1>
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
                <span className="text-[9px] text-cyan-300 font-bold uppercase tracking-widest">Next-Gen Store</span>
              </div>
            </div>
          </div>

          {/* Navegação por Abas Revolucionária */}
          <div className="hidden md:flex items-center bg-slate-900/90 border border-slate-800 p-1 rounded-2xl shadow-inner">
            <button
              onClick={() => setActiveTab("store")}
              className={`flex items-center gap-2 px-5 py-2 rounded-xl text-xs font-bold transition-all duration-300 ${
                activeTab === "store" 
                  ? "bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-md shadow-cyan-500/25" 
                  : "text-slate-400 hover:text-white"
              }`}
            >
              <StoreIcon className="w-4 h-4" /> Loja Principal
            </button>

            <button
              onClick={() => setActiveTab("guide")}
              className={`flex items-center gap-2 px-5 py-2 rounded-xl text-xs font-bold transition-all duration-300 ${
                activeTab === "guide" 
                  ? "bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-md shadow-cyan-500/25" 
                  : "text-slate-400 hover:text-white"
              }`}
            >
              <Compass className="w-4 h-4" /> Radar Tech (Guia)
            </button>
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden lg:flex relative w-56">
              <input
                type="text"
                placeholder="Buscar no radar..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-slate-900/90 border border-slate-800 rounded-xl py-2 pl-3 pr-8 text-xs text-slate-200 focus:outline-none focus:border-cyan-500 transition"
              />
              <Search className="absolute right-2.5 top-2.5 w-3.5 h-3.5 text-cyan-400" />
            </div>

            <button
              onClick={() => setIsCartOpen(true)}
              className="relative flex items-center gap-2 bg-gradient-to-r from-cyan-500/20 to-blue-600/20 border border-cyan-500/40 hover:border-cyan-400 text-cyan-300 px-4 py-2 rounded-xl transition shadow-lg shadow-cyan-500/10"
            >
              <ShoppingCart className="w-4 h-4" />
              <span className="font-bold text-xs">{totalCartCount}</span>
            </button>
          </div>
        </div>

        {/* Mobile Navigation Tabs */}
        <div className="flex md:hidden items-center justify-center bg-slate-900 border border-slate-800 p-1 rounded-xl mt-3">
          <button
            onClick={() => setActiveTab("store")}
            className={`flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg text-xs font-bold transition ${
              activeTab === "store" ? "bg-cyan-500 text-slate-950 shadow" : "text-slate-400"
            }`}
          >
            <StoreIcon className="w-3.5 h-3.5" /> Loja
          </button>
          <button
            onClick={() => setActiveTab("guide")}
            className={`flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg text-xs font-bold transition ${
              activeTab === "guide" ? "bg-cyan-500 text-slate-950 shadow" : "text-slate-400"
            }`}
          >
            <Compass className="w-3.5 h-3.5" /> Radar Tech
          </button>
        </div>
      </header>

      {/* CONTEÚDO DINÂMICO (LOJA OU GUIA/RADAR) */}
      <main className="max-w-7xl mx-auto px-4 py-8 flex-1 w-full relative z-10 space-y-12">
        
        {activeTab === "store" ? (
          <>
            {/* HERO SECTION FUTURISTA */}
            <section className="relative bg-gradient-to-b from-slate-900/80 to-slate-950 border border-cyan-500/20 rounded-3xl p-8 md:p-14 overflow-hidden text-center shadow-2xl backdrop-blur-md">
              <div className="absolute inset-0 z-0 opacity-20">
                <img 
                  src="https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=1200&auto=format&fit=crop" 
                  alt="Neon Background" 
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#030712] via-transparent to-[#030712]" />
              </div>

              <div className="relative z-10 max-w-3xl mx-auto space-y-6 flex flex-col items-center">
                <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 rounded-full text-xs font-bold uppercase tracking-widest shadow-inner">
                  <Sparkles className="w-3.5 h-3.5 text-cyan-400 animate-spin" /> A Nova Era dos Acessórios
                </span>
                
                <h2 className="text-3xl md:text-5xl font-black text-slate-100 leading-tight">
                  Inovação, estilo e preço imbatível na <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">MundoTech</span>
                </h2>

                <p className="text-slate-400 text-sm max-w-xl">
                  Escolha seus produtos direto pelo catálogo interativo ou acesse nosso <button onClick={() => setActiveTab("guide")} className="text-cyan-400 underline font-semibold hover:text-cyan-300">Radar Tech</button> para dicas exclusivas.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-left w-full max-w-2xl mt-4">
                  <div className="bg-slate-900/90 border border-cyan-500/30 hover:border-cyan-400/60 p-4 rounded-2xl flex items-start gap-3.5 shadow-xl transition group">
                    <div className="p-2.5 bg-cyan-500/10 rounded-xl text-cyan-400 group-hover:scale-110 transition shrink-0">
                      <Video className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-bold text-xs text-slate-100 uppercase tracking-wide">Transparência Total</h4>
                      <p className="text-xs text-slate-400 mt-1">Quer ver o produto em mãos? Chame a gente para uma <b>chamada de vídeo</b> no WhatsApp.</p>
                    </div>
                  </div>

                  <div className="bg-slate-900/90 border border-emerald-500/30 hover:border-emerald-400/60 p-4 rounded-2xl flex items-start gap-3.5 shadow-xl transition group">
                    <div className="p-2.5 bg-emerald-500/10 rounded-xl text-emerald-400 group-hover:scale-110 transition shrink-0">
                      <Users className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-bold text-xs text-slate-100 uppercase tracking-wide">Revenda & Atacado</h4>
                      <p className="text-xs text-slate-400 mt-1">Condições e margens diferenciadas para lojistas e revendedores em todo o país.</p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* CARROSSEL DE DESTAQUE SUPER CHARMOSO */}
            <div className="relative bg-gradient-to-r from-slate-900/90 via-slate-900/60 to-slate-950 border border-slate-800 rounded-3xl p-6 md:p-10 overflow-hidden shadow-2xl flex flex-col md:flex-row items-center gap-8">
              <div className="w-full md:w-1/2 h-72 bg-slate-950/90 rounded-2xl border border-cyan-500/20 flex items-center justify-center p-4 relative overflow-hidden shadow-inner group">
                <div className="absolute top-4 left-4 bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 text-[10px] font-black uppercase px-3 py-1 rounded-full z-10 shadow">
                  ⚡ Destaque da Semana
                </div>
                <img 
                  src={products[carouselIndex].image} 
                  alt={products[carouselIndex].name} 
                  className="w-full h-full object-contain transition-all duration-700 group-hover:scale-105"
                />
              </div>

              <div className="w-full md:w-1/2 space-y-4 text-center md:text-left">
                <span className="text-xs font-bold text-cyan-400 uppercase tracking-widest">{products[carouselIndex].category}</span>
                <h3 className="text-2xl md:text-3xl font-extrabold text-slate-100">{products[carouselIndex].name}</h3>
                <p className="text-slate-300 text-sm leading-relaxed">{products[carouselIndex].description}</p>
                
                <div className="flex flex-col sm:flex-row items-center justify-center md:justify-between pt-2 gap-4">
                  <span className="text-2xl font-extrabold text-cyan-400">R$ {products[carouselIndex].price.toFixed(2)}</span>
                  <div className="flex gap-2 w-full sm:w-auto">
                    <button
                      onClick={() => {
                        setActiveProduct(products[carouselIndex]);
                        setCurrentImageIndex(0);
                      }}
                      className="flex-1 sm:flex-none bg-slate-800 hover:bg-slate-700 text-slate-200 font-medium py-2.5 px-4 rounded-xl text-xs transition border border-slate-700"
                    >
                      Detalhes
                    </button>
                    <button
                      onClick={() => addToCart(products[carouselIndex])}
                      className="flex-1 sm:flex-none bg-gradient-to-r from-cyan-500 to-blue-600 hover:opacity-90 text-white font-bold py-2.5 px-5 rounded-xl text-xs transition flex items-center justify-center gap-2 shadow-lg shadow-cyan-500/25"
                    >
                      <Plus className="w-4 h-4" /> Comprar
                    </button>
                  </div>
                </div>
              </div>

              {/* Setas do Carrossel */}
              <div className="absolute bottom-4 right-6 flex gap-2">
                <button 
                  onClick={() => setCarouselIndex((prev) => (prev === 0 ? products.length - 1 : prev - 1))}
                  className="bg-slate-800/90 hover:bg-cyan-500 hover:text-slate-950 text-slate-300 p-2 rounded-full border border-slate-700 transition shadow"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button 
                  onClick={() => setCarouselIndex((prev) => (prev + 1) % products.length)}
                  className="bg-slate-800/90 hover:bg-cyan-500 hover:text-slate-950 text-slate-300 p-2 rounded-full border border-slate-700 transition shadow"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* CATALOGO DE PRODUTOS */}
            <div className="space-y-6">
              <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                <div className="flex items-center gap-2">
                  <Radio className="w-5 h-5 text-cyan-400 animate-pulse" />
                  <h4 className="text-xl font-bold text-slate-100 tracking-tight">Catálogo de Produtos</h4>
                </div>
                <span className="text-xs text-cyan-400 bg-cyan-500/10 border border-cyan-500/30 px-3 py-1 rounded-full font-semibold">{filteredProducts.length} itens disponíveis</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {filteredProducts.map((product) => (
                  <div
                    key={product.id}
                    className="bg-slate-900/60 backdrop-blur-md border border-slate-800/80 hover:border-cyan-500/50 rounded-3xl p-5 transition duration-300 group flex flex-col justify-between shadow-xl hover:shadow-cyan-500/10"
                  >
                    <div 
                      className="cursor-pointer space-y-4"
                      onClick={() => {
                        setActiveProduct(product);
                        setCurrentImageIndex(0);
                      }}
                    >
                      <div className="relative aspect-square overflow-hidden bg-slate-950/80 rounded-2xl border border-slate-800/50 flex items-center justify-center p-4">
                        {product.badge && (
                          <span className="absolute top-3 left-3 z-10 bg-cyan-500 text-slate-950 text-[10px] font-black uppercase px-2.5 py-1 rounded-md shadow">
                            {product.badge}
                          </span>
                        )}
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-full h-full object-contain group-hover:scale-105 transition duration-500"
                        />
                      </div>

                      <div className="space-y-1.5">
                        <div className="flex items-center justify-between text-[11px]">
                          <span className="text-cyan-400 font-bold uppercase tracking-wider">{product.category}</span>
                          <div className="flex items-center gap-1 text-amber-400">
                            <Star className="w-3 h-3 fill-current" />
                            <span>{product.rating}</span>
                          </div>
                        </div>
                        <h3 className="font-bold text-slate-100 text-sm md:text-base line-clamp-1 group-hover:text-cyan-300 transition">{product.name}</h3>
                        <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">{product.description}</p>
                      </div>
                    </div>

                    <div className="pt-4 mt-4 border-t border-slate-800/60 flex items-center justify-between gap-3">
                      <div>
                        <span className="text-[10px] text-slate-500 block uppercase font-bold">Preço</span>
                        <span className="text-base md:text-lg font-black text-slate-100">R$ {product.price.toFixed(2)}</span>
                      </div>

                      <button
                        onClick={() => addToCart(product)}
                        className="bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold py-2 px-4 rounded-xl text-xs transition flex items-center gap-1.5 active:scale-95 shadow-md shadow-cyan-500/20"
                      >
                        <Plus className="w-3.5 h-3.5" /> Adicionar
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </>
        ) : (
          /* GUIA / RADAR TECH (ABRA REVOLUCIONÁRIA) */
          <div className="space-y-8 animate-fadeIn">
            <div className="bg-gradient-to-r from-cyan-950/40 via-slate-900 to-indigo-950/40 border border-cyan-500/30 rounded-3xl p-8 md:p-12 shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none">
                <Compass className="w-64 h-64 text-cyan-400" />
              </div>
              <div className="max-w-2xl space-y-4 relative z-10">
                <span className="text-xs font-black text-cyan-400 uppercase tracking-widest bg-cyan-500/10 border border-cyan-500/30 px-3 py-1 rounded-full">Radar Tecnológico</span>
                <h3 className="text-3xl md:text-4xl font-black text-slate-100">Guia Oficial & Dicas Inteligentes</h3>
                <p className="text-slate-300 text-sm leading-relaxed">
                  Tudo o que você precisa saber para escolher o acessório perfeito para o seu dia a dia ou para iniciar suas vendas no atacado com margens garantidas.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-slate-900/80 border border-slate-800 hover:border-cyan-500/40 p-6 rounded-3xl space-y-3 shadow-xl transition">
                <div className="w-10 h-10 rounded-2xl bg-cyan-500/10 text-cyan-400 flex items-center justify-center font-bold">01</div>
                <h4 className="font-bold text-slate-100 text-base">Como Comprar com Segurança</h4>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Escolha os itens desejados, preencha seus dados e clique em "Enviar Pedido". O pedido é direcionado automaticamente para o nosso WhatsApp oficial com os cálculos prontos.
                </p>
              </div>

              <div className="bg-slate-900/80 border border-slate-800 hover:border-cyan-500/40 p-6 rounded-3xl space-y-3 shadow-xl transition">
                <div className="w-10 h-10 rounded-2xl bg-cyan-500/10 text-cyan-400 flex items-center justify-center font-bold">02</div>
                <h4 className="font-bold text-slate-100 text-base">Chamada de Vídeo ao Vivo</h4>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Quer ver o acabamento, o funcionamento ou o tamanho real de qualquer fone ou cabo antes de fechar? Chame nossa equipe no WhatsApp para uma demonstração rápida em vídeo!
                </p>
              </div>

              <div className="bg-slate-900/80 border border-slate-800 hover:border-cyan-500/40 p-6 rounded-3xl space-y-3 shadow-xl transition">
                <div className="w-10 h-10 rounded-2xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center font-bold">03</div>
                <h4 className="font-bold text-slate-100 text-base">Vantagens para Atacado</h4>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Lojistas e revendedores contam com preços sob medida e suporte dedicado para alavancar vendas na sua região. Fale com um consultor comercial direto.
                </p>
              </div>
            </div>

            <div className="text-center pt-6">
              <button
                onClick={() => openWhatsAppGeneral("Olá! Li o Radar Tech no site da MundoTech.ig e quero tirar dúvidas sobre os produtos.")}
                className="bg-gradient-to-r from-emerald-500 to-teal-600 hover:opacity-90 text-slate-950 font-black py-3.5 px-8 rounded-2xl text-sm transition shadow-lg shadow-emerald-500/20 inline-flex items-center gap-2"
              >
                <MessageCircle className="w-5 h-5 text-slate-950" /> Conversar com Especialista no WhatsApp <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

      </main>

      {/* MODAL DE DETALHES FUTURISTA */}
      {activeProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4 overflow-y-auto">
          <div className="bg-slate-900 border border-cyan-500/40 rounded-3xl max-w-lg w-full p-6 pt-14 relative shadow-2xl space-y-4 my-auto">
            <button 
              onClick={() => setActiveProduct(null)} 
              className="absolute right-5 top-5 text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 p-2.5 rounded-full transition z-20 shadow-md border border-slate-700"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="relative h-60 w-full rounded-2xl overflow-hidden bg-slate-950 border border-slate-800 flex items-center justify-center p-3">
              <img 
                src={activeProduct.images?.[currentImageIndex] || activeProduct.image} 
                alt={activeProduct.name} 
                className="w-full h-full object-contain"
              />
            </div>

            {activeProduct.images && activeProduct.images.length > 1 && (
              <div className="flex gap-2 overflow-x-auto pb-1 justify-center">
                {activeProduct.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentImageIndex(idx)}
                    className={`w-14 h-14 rounded-xl overflow-hidden border-2 shrink-0 transition bg-slate-950 flex items-center justify-center p-1 ${
                      currentImageIndex === idx ? "border-cyan-400 scale-105" : "border-slate-800 opacity-60 hover:opacity-100"
                    }`}
                  >
                    <img src={img} alt="" className="w-full h-full object-contain" />
                  </button>
                ))}
              </div>
            )}

            <div className="space-y-2">
              <span className="text-xs text-cyan-400 font-bold uppercase tracking-wider">{activeProduct.category}</span>
              <h2 className="text-xl font-black text-slate-100">{activeProduct.name}</h2>
              <p className="text-sm text-slate-300 leading-relaxed">{activeProduct.description}</p>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-slate-800">
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-black text-cyan-400">R$ {activeProduct.price.toFixed(2)}</span>
                {activeProduct.oldPrice && (
                  <span className="text-sm text-slate-500 line-through">
                    R$ {activeProduct.oldPrice.toFixed(2)}
                  </span>
                )}
              </div>
              <button
                onClick={() => addToCart(activeProduct)}
                className="bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold py-3 px-6 rounded-xl flex items-center gap-2 transition shadow-lg shadow-cyan-500/20 text-xs"
              >
                <Plus className="w-4 h-4" /> Adicionar ao Carrinho
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Gaveta do Carrinho */}
      {isCartOpen && (
        <div className="fixed inset-0 z-50 flex justify-end bg-black/75 backdrop-blur-sm animate-fadeIn">
          <div className="w-full max-w-md bg-slate-900 border-l border-slate-800 h-full p-6 flex flex-col justify-between overflow-y-auto shadow-2xl">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                <h3 className="text-lg font-black flex items-center gap-2 text-slate-100">
                  <ShoppingCart className="w-5 h-5 text-cyan-400" /> Seu Carrinho
                </h3>
                <button onClick={() => setIsCartOpen(false)} className="text-slate-400 hover:text-white p-1">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="mt-4 space-y-3 bg-slate-950 p-4 rounded-2xl border border-slate-800">
                <p className="text-xs font-bold text-cyan-300">⚡ Informações para o atendimento rápido:</p>
                <input
                  type="text"
                  placeholder="Seu Nome Completo"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl p-2.5 text-xs text-slate-200 focus:outline-none focus:border-cyan-500 transition"
                />
                <input
                  type="text"
                  placeholder="Seu WhatsApp (com DDD)"
                  value={customerPhone}
                  onChange={(e) => setCustomerPhone(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl p-2.5 text-xs text-slate-200 focus:outline-none focus:border-cyan-500 transition"
                />
              </div>

              <div className="mt-4 space-y-3 max-h-[40vh] overflow-y-auto pr-1">
                {cart.length === 0 ? (
                  <p className="text-slate-500 text-center py-12 text-xs">Seu carrinho está vazio no momento.</p>
                ) : (
                  (cart as Array<{ product: Product; quantity: number }>).map((item) => (
                    <div key={item.product.id} className="flex items-center justify-between gap-3 bg-slate-950 p-3 rounded-2xl border border-slate-800">
                      <img src={item.product.image} alt={item.product.name} className="w-12 h-12 rounded-xl object-contain bg-black/40 p-1 border border-slate-800" />
                      <div className="flex-1 text-xs space-y-1">
                        <p className="font-bold text-slate-200 line-clamp-1">{item.product.name}</p>
                        <p className="text-cyan-400 font-semibold">{item.quantity}x R$ {item.product.price.toFixed(2)}</p>
                      </div>
                      <button onClick={() => removeFromCart(item.product.id)} className="text-rose-400 hover:text-rose-300 text-xs font-semibold px-2 py-1">
                        Remover
                      </button>
                    </div>
                  ))
                )}
              </div>
            </div>

            <div className="border-t border-slate-800 pt-4 space-y-3 mt-4">
              <div className="flex justify-between items-center text-lg font-black">
                <span className="text-slate-300">Total:</span>
                <span className="text-cyan-400">R$ {totalPrice.toFixed(2)}</span>
              </div>

              <button
                onClick={handleWhatsAppCheckout}
                disabled={cart.length === 0}
                className="w-full bg-gradient-to-r from-emerald-500 to-teal-600 hover:opacity-90 disabled:bg-slate-800 disabled:text-slate-600 text-slate-950 font-black py-3.5 rounded-xl flex items-center justify-center gap-2 transition shadow-lg shadow-emerald-500/20"
              >
                <MessageCircle className="w-5 h-5" /> Enviar Pedido no WhatsApp
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Rodapé Futurista */}
      <footer className="bg-slate-900 border-t border-slate-800 mt-12 py-8 px-4 text-center text-xs text-slate-500 space-y-2">
        <p className="font-bold text-slate-400">MundoTech.ig © 2026 — Next-Gen Electronics</p>
        <p>Tecnologia de ponta, atendimento transparente e preço justo.</p>
      </footer>
    </div>
  );
}/