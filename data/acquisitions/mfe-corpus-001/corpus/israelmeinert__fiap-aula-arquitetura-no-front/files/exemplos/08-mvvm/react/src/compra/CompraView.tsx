import { useCompraViewModel } from './useCompraViewModel';
export function App() {
  const vm = useCompraViewModel(15000);
  return <main><h1>08 · MVVM</h1><p role="status">{vm.qtd} ingresso(s) · {vm.total} centavos</p>
    <button disabled={!vm.podeAumentar} onClick={vm.aumentar}>Adicionar ingresso</button><button onClick={vm.reiniciar}>Reiniciar</button></main>;
}
