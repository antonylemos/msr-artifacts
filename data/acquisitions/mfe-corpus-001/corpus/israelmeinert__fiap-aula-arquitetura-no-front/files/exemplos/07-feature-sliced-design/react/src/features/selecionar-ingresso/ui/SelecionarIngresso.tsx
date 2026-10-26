import { useState } from 'react';
import { Button } from '../../../shared/ui';
import { aumentar } from '../model/limitar-quantidade';
export function SelecionarIngresso({ eventoId }: { eventoId: string }) {
  const [qtd, setQtd] = useState(1);
  return <section><p role="status">{qtd} ingresso(s) para {eventoId}</p><Button disabled={qtd >= 6} onClick={() => setQtd(aumentar)}>Adicionar ingresso</Button></section>;
}
