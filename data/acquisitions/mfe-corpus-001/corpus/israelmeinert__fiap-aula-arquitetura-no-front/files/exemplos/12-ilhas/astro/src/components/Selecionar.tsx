import { useEffect, useState } from 'react';
export function Selecionar() {
  const [qtd, setQtd] = useState(1);
  const [pronto, setPronto] = useState(false);
  // O HTML existe antes da hidratação; habilite a ação depois de conectar seus eventos.
  useEffect(() => setPronto(true), []);
  return <section aria-busy={!pronto}><h2>Seleção de ingressos</h2><p role="status">{qtd} ingresso(s)</p><button disabled={!pronto || qtd >= 6} onClick={() => setQtd(q => Math.min(6, q + 1))}>Adicionar ingresso</button></section>;
}
