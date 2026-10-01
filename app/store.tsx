"use client";

import React, { useState } from "react";
import { 
  ShoppingBag, 
  Search, 
  ShieldCheck, 
  Zap, 
  Star, 
  X, 
  Plus, 
  Minus, 
  MessageCircle, 
  Clock,
  Truck
} from "lucide-react";

interface Product {
  id: number;
  name: string;
  price: number;
  category: string;
  rating: number;
  image: string;
  description: string;
  badge?: string;
}

interface CartItem extends Product {
  quantity: number;
}

const PRODUCTS: Product[] = [
  {
    id: 1,
    name: "Neural Link X1 - Interface Cerebral",
    price: 2499.99,
    category: "Implantes",
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1593508512255-86ab42a8e620?auto=format&fit=crop&q=80&w=800",
    description: "Conexão de alta velocidade direta com sistemas neurais. Latência zero e criptografia quântica de ponta.",
    badge: "Mais Vendido"
  },
  {
    id: 2,
    name: "Óculos AR Holográficos Horizon Pro",
    price: 1299.50,
    category: "Visão",
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1592478411213-6153e4ebc07d?auto=format&fit=crop&q=80&w=800",
    description: "Display retinal de 16K com projeção holográfica integrada e bateria de autonomia estendida para 48 horas.",
    badge: "Lançamento"
  },
  {
    id: 3,
    name: "CyberDeck Portátil Apex Station",
    price: 4599.00,
    category: "Computação",
    rating: 5.0,
    image: "https://images.unsplash.com/photo-1587202372775-e229f172b9d7?auto=format&fit=crop&q=80&w=800",
    description: "Estação de trabalho quântica móvel para engenheiros de dados e netrunners profissionais.",
    badge: "Exclusivo"
  },
  {
    id: 4,
    name: "Drone de Escolta Autónoma Sentinel MK-V",
    price: 1899.00,
    category: "Segurança",
    rating: 4.7,
    image: "https://images.unsplash.com/photo-1527977966376-1c8408f9f108?auto=format&fit=crop&q=80&w=800",
    description: "Inteligência artificial defensiva com reconhecimento facial avançado e piloto automático integrado.",
  },
  {
    id: 5,
    name: "Luvas Hápticas CyberGlove Sense",
    price: 650.00,
    category: "Acessórios",
    rating: 4.6,
    image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=800",
    description: "Sinta texturas e peso em ambientes virtuais com feedback de alta precisão micromecânica."
  },
  {
    id: 6,
    name: "Implante Ócular Óptico CyberVision",
    price: 3100.00,
    category: "Implantes",
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1508739773434-c26b3d09e071?auto=format&fit=crop&q=80&w=800",
    description: "Visão noturna, zoom óptico de 20x e gravação de memória em tempo real direto na nuvem."
  }
];

export default function Store() {
  const [activeTab, setActiveTab] = useState<"store" | "guide">("store");
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Todos");
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  
  const [clientName, setClientName] = useState("");
  const [clientPhone, setClientPhone] = useState("");
  const [clientAddress, setClientAddress] = useState("");

  const categories = ["Todos", "Implantes", "Visão", "Computação", "Segurança", "Acessórios"];

  const filteredProducts = PRODUCTS.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          product.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "Todos" || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const addToCart = (product: Product) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => 
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
    setIsCartOpen(true);
  };

  const updateQuantity = (id: number, delta: number) => {
    setCart(prev => prev.map(item => {
      if (item.id === id) {
        const newQty = item.quantity + delta;
        return newQty > 0 ? { ...item, quantity: newQty } : null;
      }
      return item;
    }).filter(Boolean) as CartItem[]);
  };

  const totalPrice = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  const checkoutWhatsApp = () => {
    if (!clientName || !clientPhone || !clientAddress) {
      alert("Por favor, preencha seu Nome, Telefone e Endereço em Vitória da Conquista para prosseguir.");
      return;
    }

    const itemsText = cart.map(item => `▪️️ ${item.quantity}x ${item.name} - R$ ${(item.price * item.quantity).toFixed(2)}`).join("\n");
    const message = `*NOVO PEDIDO - MUNDOTECH*\n\n*Cliente:* ${clientName}\n*Telefone:* ${clientPhone}\n*Endereço:* ${clientAddress} (Vitória da Conquista - BA)\n\n*Itens do Pedido:*\n${itemsText}\n\n*Total:* R$ ${totalPrice.toFixed(2)}`;
    
    const encoded = encodeURIComponent(message);
    window.open(`https://wa.me/5500000000000?text=${encoded}`, "_blank");
  };

  return (
    <div className="min-h-screen bg-[#030712] text-slate-100 selection:bg-cyan-500 selection:text-black font-sans">
      
      {/* HEADER */}
      <header className="sticky top-0 z-40 backdrop-blur-xl bg-[#030712]/80 border-b border-cyan-950/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => setActiveTab("store")}>
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center shadow-lg shadow-cyan-500/20">
              <Zap className="w-5 h-5 text-black fill-black" />
            </div>
            <div>
              <span className="text-xl font-black tracking-wider bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-500 bg-clip-text text-transparent">
                MUNDOTECH
              </span>
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                <span className="text-[10px] uppercase tracking-widest text-emerald-400 font-semibold">Online 24H • Conquista - BA</span>
              </div>
            </div>
          </div>

          <nav className="hidden md:flex items-center gap-1 bg-slate-900/60 p-1.5 rounded-2xl border border-slate-800">
            <button 
              onClick={() => setActiveTab("store")}
              className={`px-5 py-2 rounded-xl text-sm font-medium transition-all duration-300 ${
                activeTab === "store" 
                  ? "bg-cyan-500 text-black shadow-lg shadow-cyan-500/20 font-semibold" 
                  : "text-slate-400 hover:text-white"
              }`}
            >
              Loja Virtual
            </button>
            <button 
              onClick={() => setActiveTab("guide")}
              className={`px-5 py-2 rounded-xl text-sm font-medium transition-all duration-300 ${
                activeTab === "guide" 
                  ? "bg-cyan-500 text-black shadow-lg shadow-cyan-500/20 font-semibold" 
                  : "text-slate-400 hover:text-white"
              }`}
            >
              Radar Tech (Guia)
            </button>
          </nav>

          <div className="flex items-center gap-4">
            <button 
              onClick={() => setIsCartOpen(true)}
              className="relative p-2.5 rounded-xl bg-slate-900 border border-slate-800 hover:border-cyan-500/50 transition-colors"
            >
              <ShoppingBag className="w-5 h-5 text-cyan-400" />
              {cart.length > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-cyan-500 text-black text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center shadow-md">
                  {cart.reduce((sum, item) => sum + item.quantity, 0)}
                </span>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* CONTEÚDO PRINCIPAL */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {activeTab === "store" ? (
          <>
            {/* HERO BANNER */}
            <div className="relative rounded-3xl overflow-hidden border border-cyan-900/40 bg-gradient-to-r from-slate-950 via-slate-900 to-indigo-950 p-8 sm:p-12 mb-12 shadow-2xl">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(6,182,212,0.15),transparent_50%)]"></div>
              <div className="relative z-10 max-w-2xl">
                <span className="inline-block px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-semibold tracking-wide uppercase mb-4">
                  Online 24H • Entrega Rápida em Vitória da Conquista
                </span>
                <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight mb-4 leading-tight">
                  O futuro da tecnologia ao seu alcance.
                </h1>
                <p className="text-slate-400 text-sm sm:text-base mb-8">
                  Equipamentos de alta performance, implantes neurais e hardwares avançados com entrega rápida em qualquer lugar da cidade e suporte especializado 24 horas.
                </p>
                <div className="flex flex-wrap gap-4">
                  <button 
                    onClick={() => {
                      const el = document.getElementById("catalog");
                      el?.scrollIntoView({ behavior: "smooth" });
                    }}
                    className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-black font-bold text-sm shadow-lg shadow-cyan-500/25 hover:brightness-115 transition-all"
                  >
                    Explorar Catálogo
                  </button>
                </div>
              </div>
            </div>

            {/* BARRA DE PESQUISA E FILTROS */}
            <div id="catalog" className="flex flex-col md:flex-row gap-4 items-center justify-between mb-8">
              <div className="relative w-full md:w-96">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                <input 
                  type="text"
                  placeholder="Buscar dispositivos..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 rounded-xl bg-slate-900/80 border border-slate-800 focus:border-cyan-500 text-sm focus:outline-none transition-colors"
                />
              </div>

              <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 scrollbar-none">
                {categories.map(cat => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-4 py-2 rounded-xl text-xs font-medium whitespace-nowrap transition-all ${
                      selectedCategory === cat 
                        ? "bg-cyan-500/20 text-cyan-400 border border-cyan-500/50" 
                        : "bg-slate-900/60 text-slate-400 border border-slate-800 hover:border-slate-700"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* GRADE DE PRODUTOS */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map(product => (
                <div 
                  key={product.id}
                  className="group bg-slate-900/40 rounded-2xl border border-slate-800/80 hover:border-cyan-500/40 overflow-hidden flex flex-col transition-all duration-300 hover:shadow-xl hover:shadow-cyan-950/30"
                >
                  <div className="relative aspect-video overflow-hidden bg-slate-950">
                    <img 
                      src={product.image} 
                      alt={product.name} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90 group-hover:opacity-100"
                    />
                    {product.badge && (
                      <span className="absolute top-3 left-3 px-2.5 py-1 rounded-lg bg-cyan-500 text-black text-[10px] font-bold uppercase tracking-wider shadow">
                        {product.badge}
                      </span>
                    )}
                    <div className="absolute top-3 right-3 bg-slate-950/80 backdrop-blur-md px-2 py-1 rounded-lg flex items-center gap-1 border border-slate-800 text-xs">
                      <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                      <span className="font-semibold">{product.rating}</span>
                    </div>
                  </div>

                  <div className="p-5 flex-1 flex flex-col justify-between">
                    <div>
                      <span className="text-[11px] font-semibold tracking-widest text-cyan-400 uppercase">
                        {product.category}
                      </span>
                      <h3 className="text-base font-bold text-white mt-1 mb-2 line-clamp-1">
                        {product.name}
                      </h3>
                      <p className="text-slate-400 text-xs line-clamp-2 mb-4 leading-relaxed">
                        {product.description}
                      </p>
                    </div>

                    <div className="pt-4 border-t border-slate-800/60 flex items-center justify-between">
                      <div>
                        <span className="text-[10px] text-slate-500 block uppercase">Preço</span>
                        <span className="text-lg font-black text-white">
                          R$ {product.price.toFixed(2)}
                        </span>
                      </div>
                      <div className="flex gap-2">
                        <button 
                          onClick={() => setSelectedProduct(product)}
                          className="px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold transition-colors"
                        >
                          Detalhes
                        </button>
                        <button 
                          onClick={() => addToCart(product)}
                          className="px-4 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-black text-xs font-bold transition-all shadow-md shadow-cyan-500/20"
                        >
                          Comprar
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* DIFERENCIAIS */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16 pt-16 border-t border-slate-900">
              <div className="flex items-start gap-4 p-6 rounded-2xl bg-slate-900/20 border border-slate-800/50">
                <div className="p-3 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                  <Clock className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-bold text-white text-sm mb-1">Suporte Online 24H</h4>
                  <p className="text-slate-400 text-xs">Atendimento especializado a qualquer hora do dia ou da noite para tirar dúvidas.</p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-6 rounded-2xl bg-slate-900/20 border border-slate-800/50">
                <div className="p-3 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                  <Truck className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-bold text-white text-sm mb-1">Entrega em Conquista</h4>
                  <p className="text-slate-400 text-xs">Entrega rápida para qualquer lugar de Vitória da Conquista - BA.</p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-6 rounded-2xl bg-slate-900/20 border border-slate-800/50">
                <div className="p-3 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-bold text-white text-sm mb-1">Garantia Quântica</h4>
                  <p className="text-slate-400 text-xs">Proteção total contra falhas sistêmicas e suporte a hardware por 3 anos.</p>
                </div>
              </div>
            </div>
          </>
        ) : (
          /* GUIA / RADAR TECH (Com espaçamento interno adequado ajustado) */
          <div className="max-w-4xl mx-auto space-y-8 pt-4 pb-12">
            <div className="text-center space-y-3">
              <span className="px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-400 text-xs font-semibold tracking-wide uppercase">
                Radar Tech 2026 • Guia Oficial & Dicas Inteligentes
              </span>
              <h2 className="text-3xl font-extrabold tracking-tight">Guia de Tendências Tecnológicas</h2>
              <p className="text-slate-400 text-sm max-w-xl mx-auto">
                Descubra para onde o ecossistema cibernético está caminhando nos próximos anos e prepare-se para as inovações.
              </p>
            </div>

            <div className="grid gap-6 pt-4">
              <div className="p-6 rounded-2xl bg-slate-900/40 border border-slate-800">
                <h3 className="text-lg font-bold text-cyan-400 mb-2">1. A Ascensão dos Implantes Neurais Comerciais</h3>
                <p className="text-slate-300 text-sm leading-relaxed">
                  O mercado de interfaces cérebro-computador deixou de ser exclusivo de pesquisas médicas e agora permite produtividade e entretenimento imersivo sem precedentes.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-slate-900/40 border border-slate-800">
                <h3 className="text-lg font-bold text-cyan-400 mb-2">2. Computação Espacial e Holografia Retiniana</h3>
                <p className="text-slate-300 text-sm leading-relaxed">
                  Monitores físicos estão gradualmente sendo substituídos por displays holográficos leves, integrados diretamente ao campo de visão através de lentes de contato ou óculos inteligentes.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-slate-900/40 border border-slate-800">
                <h3 className="text-lg font-bold text-cyan-400 mb-2">3. Segurança de Dados com Criptografia Pós-Quântica</h3>
                <p className="text-slate-300 text-sm leading-relaxed">
                  Com o avanço dos processadores quânticos, a segurança de dados pessoais migrou para protocolos baseados em reticulados matemáticos impossíveis de decodificar por computadores clássicos.
                </p>
              </div>
            </div>
          </div>
        )}

      </main>

      {/* MODAL DETALHES */}
      {selectedProduct && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-lg w-full overflow-hidden shadow-2xl relative">
            <button 
              onClick={() => setSelectedProduct(null)}
              className="absolute top-4 right-4 p-2 rounded-full bg-slate-800/80 hover:bg-slate-700 text-slate-300 transition-colors z-10"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="aspect-video w-full bg-slate-950">
              <img src={selectedProduct.image} alt={selectedProduct.name} className="w-full h-full object-cover" />
            </div>
            <div className="p-6 space-y-4">
              <div>
                <span className="text-xs font-semibold text-cyan-400 uppercase tracking-widest">{selectedProduct.category}</span>
                <h3 className="text-xl font-bold text-white mt-1">{selectedProduct.name}</h3>
              </div>
              <p className="text-slate-300 text-sm leading-relaxed">{selectedProduct.description}</p>
              <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
                <div>
                  <span className="text-xs text-slate-500 block">Valor do Dispositivo</span>
                  <span className="text-2xl font-black text-white">R$ {selectedProduct.price.toFixed(2)}</span>
                </div>
                <button 
                  onClick={() => {
                    addToCart(selectedProduct);
                    setSelectedProduct(null);
                  }}
                  className="px-6 py-3 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-black font-bold text-sm shadow-lg shadow-cyan-500/20 transition-all"
                >
                  Adicionar ao Carrinho
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* CARRINHO / CHECKOUT COM ENDEREÇO */}
      {isCartOpen && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex justify-end">
          <div className="w-full max-w-md bg-slate-950 border-l border-slate-800 h-full flex flex-col shadow-2xl">
            
            <div className="p-6 border-b border-slate-900 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <ShoppingBag className="w-5 h-5 text-cyan-400" />
                <h3 className="font-bold text-white text-lg">Seu Carrinho</h3>
              </div>
              <button 
                onClick={() => setIsCartOpen(false)}
                className="p-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {cart.length === 0 ? (
                <div className="text-center py-16 space-y-3">
                  <ShoppingBag className="w-12 h-12 text-slate-700 mx-auto" />
                  <p className="text-slate-400 text-sm">Seu carrinho está vazio.</p>
                </div>
              ) : (
                cart.map(item => (
                  <div key={item.id} className="flex gap-4 p-4 rounded-2xl bg-slate-900/50 border border-slate-800/80 items-center">
                    <img src={item.image} alt={item.name} className="w-16 h-16 rounded-xl object-cover bg-slate-900" />
                    <div className="flex-1 min-w-0">
                      <h4 className="font-semibold text-white text-sm truncate">{item.name}</h4>
                      <span className="text-xs font-bold text-cyan-400">R$ {item.price.toFixed(2)}</span>
                      
                      <div className="flex items-center gap-3 mt-2">
                        <button 
                          onClick={() => updateQuantity(item.id, -1)}
                          className="p-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span className="text-xs font-bold w-4 text-center">{item.quantity}</span>
                        <button 
                          onClick={() => updateQuantity(item.id, 1)}
                          className="p-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {cart.length > 0 && (
              <div className="p-6 border-t border-slate-900 bg-slate-950/80 space-y-4">
                <div className="space-y-3">
                  <div>
                    <label className="text-[11px] font-semibold text-slate-400 uppercase block mb-1">Seu Nome</label>
                    <input 
                      type="text"
                      placeholder="Ex: Alex Vance"
                      value={clientName}
                      onChange={(e) => setClientName(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-sm focus:border-cyan-500 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] font-semibold text-slate-400 uppercase block mb-1">Seu Telefone / WhatsApp</label>
                    <input 
                      type="text"
                      placeholder="Ex: (77) 99999-9999"
                      value={clientPhone}
                      onChange={(e) => setClientPhone(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-sm focus:border-cyan-500 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] font-semibold text-slate-400 uppercase block mb-1">Endereço em Vitória da Conquista</label>
                    <input 
                      type="text"
                      placeholder="Ex: Rua B, Bairro Candeias"
                      value={clientAddress}
                      onChange={(e) => setClientAddress(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-sm focus:border-cyan-500 focus:outline-none"
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between pt-2">
                  <span className="text-sm text-slate-400 font-medium">Total Estimado</span>
                  <span className="text-xl font-black text-white">R$ {totalPrice.toFixed(2)}</span>
                </div>

                <button 
                  onClick={checkoutWhatsApp}
                  className="w-full py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm shadow-lg shadow-emerald-950/50 flex items-center justify-center gap-2 transition-all"
                >
                  <MessageCircle className="w-5 h-5" />
                  Finalizar Pedido via WhatsApp
                </button>
              </div>
            )}

          </div>
        </div>
      )}

      {/* RODAPÉ */}
      <footer className="border-t border-slate-950 bg-[#02040a] py-8 text-center text-slate-600 text-xs mt-20">
        <p>&copy; 2026 MundoTech. Todos os direitos reservados. Online 24H • Entrega Rápida em Vitória da Conquista - BA.</p>
      </footer>

    </div>
  );
}