import { useState } from 'react';
import { calcularTotal } from './calcular-total';
export function useCompraViewModel(preco: number) {
  const [qtd, setQtd] = useState(1);
  return { qtd, total: calcularTotal(preco, qtd), podeAumentar: qtd < 6,
    aumentar: () => setQtd(q => Math.min(6, q + 1)), reiniciar: () => setQtd(1) };
}
