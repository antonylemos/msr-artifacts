import { useState } from 'react';
import { CompraRoot } from './features/compra';
export function App() {
  const [memoria, setMemoria] = useState(true);
  return <main><h1>06 · Hexagonal</h1>
    <button onClick={() => setMemoria(v => !v)}>Trocar adaptador</button><p role="status">Adaptador: {memoria ? 'memória' : 'HTTP'}</p><CompraRoot key={String(memoria)} memoria={memoria} />
  </main>;
}
