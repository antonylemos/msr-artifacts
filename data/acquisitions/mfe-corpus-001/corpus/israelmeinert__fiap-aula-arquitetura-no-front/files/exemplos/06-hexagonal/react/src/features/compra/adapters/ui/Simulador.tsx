import { useState } from 'react';
import type { Simular } from '../../core/criar-simulador';
// A apresentação recebe uma operação. Não sabe qual adaptador foi escolhido.
export function Simulador({ simular }: { simular: Simular }) {
  const [mensagem, setMensagem] = useState('Pronto'); const [qtd, setQtd] = useState(2); const [ocupado, setOcupado] = useState(false);
  async function executar() {
    setOcupado(true); setMensagem('Calculando');
    try { setMensagem(`Total: ${await simular('react-day', qtd)} centavos`); }
    catch { setMensagem('Não foi possível simular'); } finally { setOcupado(false); }
  }
  return <section><label>Quantidade de ingressos<input type="number" min="1" max="6" value={qtd} onChange={e => setQtd(Number(e.target.value))} /></label>
    <button disabled={ocupado} onClick={executar}>Simular compra</button><p role="status">{mensagem}</p></section>;
}
