import { useState } from 'react';
import { CardEvento } from '../components/CardEvento';
import { eventoDemo } from '../evento';
export function App() {
  const [selecionado, selecionar] = useState('');
  return <main><h1>01 · Componentes</h1><CardEvento evento={eventoDemo} onSelecionar={selecionar} />
    <p role="status">{selecionado ? `Evento selecionado: ${selecionado}` : 'Selecione um evento'}</p></main>;
}
