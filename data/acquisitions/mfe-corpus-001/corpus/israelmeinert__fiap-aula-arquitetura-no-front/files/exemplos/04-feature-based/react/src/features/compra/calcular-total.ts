// Regra pura: valores inteiros em centavos; compra simulada de 1 a 6 ingressos.
export function calcularTotal(preco: number, qtd: number): number {
  if (!Number.isSafeInteger(qtd) || qtd < 1 || qtd > 6) throw new Error('Selecione de 1 a 6 ingressos');
  if (!Number.isSafeInteger(preco) || preco < 0) throw new Error('Preço inválido');
  const total = preco * qtd;
  if (!Number.isSafeInteger(total)) throw new Error('Total inválido');
  return total;
}
