import { useState } from 'react';
import { EventosPage, type Evento } from '../features/eventos';
import { CompraRoot } from '../features/compra';
export function App() {
  const [evento, selecionar] = useState<Evento | null>(null);
  return <main><h1>14 · Módulos com Clean na compra</h1><EventosPage onSelecionar={selecionar} />
    {evento && <section><h2>Simulação · {evento.titulo}</h2><CompraRoot key={evento.id} eventoId={evento.id} /></section>}</main>;
}
