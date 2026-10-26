'use client';
import { useState } from 'react';
export function Selecionar() { const [qtd, setQtd] = useState(1); return <section><p role="status">{qtd} ingresso(s)</p><button disabled={qtd >= 6} onClick={() => setQtd(q => Math.min(6, q + 1))}>Adicionar ingresso</button></section>; }
