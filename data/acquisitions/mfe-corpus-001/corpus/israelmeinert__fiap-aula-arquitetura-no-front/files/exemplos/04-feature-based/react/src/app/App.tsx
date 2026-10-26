import { useState } from 'react';
import { EventosPage, type Evento } from '../features/eventos';
import { Compra } from '../features/compra';
export function App() {
  const [evento, selecionar] = useState<Evento | null>(null);
  return <main><h1>04 · Funcionalidades e módulos</h1><EventosPage onSelecionar={selecionar} />
    {evento && <Compra key={evento.id} titulo={evento.titulo} precoCentavos={evento.precoCentavos} />}</main>;
}
