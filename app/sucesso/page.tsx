export default function SuccessPage() {
  return (
    <main className="result-page">
      <div className="result-card">
        <div className="result-icon success">✓</div>
        <h1>Pagamento enviado!</h1>
        <p>Seu pagamento foi encaminhado para o Mercado Pago. Aguarde a confirmação.</p>
        <a className="primary-btn" href="/">Voltar para a loja</a>
      </div>
    </main>
  );
}