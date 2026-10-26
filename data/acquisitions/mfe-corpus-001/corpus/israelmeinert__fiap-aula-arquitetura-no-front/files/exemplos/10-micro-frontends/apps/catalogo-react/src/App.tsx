import { useState } from 'react';
export function App() {
  const [selecionado, selecionar] = useState(false);
  return <section><h2>Catálogo React</h2><article><h3>React Day</h3><p>40 vagas · 15000 centavos</p><button onClick={() => selecionar(true)}>Selecionar evento</button></article><p role="status">{selecionado ? 'Evento selecionado: react-day' : 'Pronto'}</p></section>;
}
