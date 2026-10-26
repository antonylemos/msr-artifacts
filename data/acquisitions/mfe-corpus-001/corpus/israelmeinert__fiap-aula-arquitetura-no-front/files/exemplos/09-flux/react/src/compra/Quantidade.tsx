import { useReducer } from 'react';
import { quantidadeReducer } from './quantidade-reducer';
export function App() {
  const [qtd, dispatch] = useReducer(quantidadeReducer, 1);
  return <main><h1>09 · Flux e estado</h1><p role="status">{qtd} ingresso(s)</p>
    <button disabled={qtd >= 6} onClick={() => dispatch({ type: 'adicionar' })}>Adicionar ingresso</button>
    <button onClick={() => dispatch({ type: 'reiniciar' })}>Reiniciar</button></main>;
}
