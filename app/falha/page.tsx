export default function FailurePage() {
  return (
    <main className="result-page">
      <div className="result-card">
        <div className="result-icon fail">!</div>
        <h1>Pagamento não concluído</h1>
        <p>O pagamento não foi aprovado. Você pode voltar e tentar novamente.</p>
        <a className="primary-btn" href="/">Voltar para a loja</a>
      </div>
    </main>
  );
}