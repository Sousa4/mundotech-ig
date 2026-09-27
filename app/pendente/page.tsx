export default function PendingPage() {
  return (
    <main className="result-page">
      <div className="result-card">
        <div className="result-icon pending">…</div>
        <h1>Pagamento pendente</h1>
        <p>O Mercado Pago ainda está processando seu pagamento.</p>
        <a className="primary-btn" href="/">Voltar para a loja</a>
      </div>
    </main>
  );
}