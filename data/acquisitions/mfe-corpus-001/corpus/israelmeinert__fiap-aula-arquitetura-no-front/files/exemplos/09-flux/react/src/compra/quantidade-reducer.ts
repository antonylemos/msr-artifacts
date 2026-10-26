export type Acao = { type: 'adicionar' } | { type: 'reiniciar' };
export function quantidadeReducer(qtd: number, acao: Acao): number {
  switch (acao.type) {
    case 'adicionar': return Math.min(6, qtd + 1);
    case 'reiniciar': return 1;
    default: return qtd;
  }
}
