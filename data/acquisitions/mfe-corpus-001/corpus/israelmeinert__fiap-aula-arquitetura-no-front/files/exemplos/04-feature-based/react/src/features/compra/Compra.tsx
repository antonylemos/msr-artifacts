import { useState } from 'react';
import { calcularTotal } from './calcular-total';
export function Compra({ titulo, precoCentavos }: { titulo: string; precoCentavos: number }) {
  const [qtd, setQtd] = useState(1);
  return <article><h2>Compra · {titulo}</h2><p>{qtd} ingresso(s) · {calcularTotal(precoCentavos, qtd)} centavos</p>
    <button disabled={qtd >= 6} onClick={() => setQtd(q => q + 1)}>Adicionar ingresso</button></article>;
}
