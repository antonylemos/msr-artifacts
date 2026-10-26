import type { Cleanup, Manifest, Remote } from '../../../packages/contracts/mount';
import '../../../../../material/estilos.css';
const host = document.querySelector<HTMLElement>('#remote')!;
const status = document.querySelector<HTMLElement>('#status')!;
let cleanup: Cleanup | undefined;
let revision = 0;
function desmontar() { cleanup?.(); cleanup = undefined; host.replaceChildren(); }
async function abrir(nome: 'catalogo' | 'checkout') {
  const atual = ++revision;
  desmontar(); status.textContent = 'Carregando';
  // Cada montagem possui um elemento próprio, evitando corrida entre carregamentos.
  const slot = document.createElement('div');
  host.append(slot);
  let dispose: Cleanup | undefined;
  try {
    const r = await fetch('/remotes.json', { cache: 'no-store', signal: AbortSignal.timeout(3000) });
    if (!r.ok) throw new Error('Manifesto indisponível');
    const manifesto: Manifest = await r.json();
    if (manifesto.version !== 1 || typeof manifesto[nome] !== 'string') throw new Error('Manifesto incompatível');
    const url = new URL(manifesto[nome]);
    // Lista de origens confiáveis deste laboratório; não aceite uma URL arbitrária do usuário.
    if (!['http://127.0.0.1:4301', 'http://127.0.0.1:4302'].includes(url.origin)) throw new Error('Origem não autorizada');
    const remote: Remote = await import(/* @vite-ignore */ url.href);
    if (atual !== revision) { slot.remove(); return; }
    if (typeof remote.mount !== 'function') throw new Error('Contrato incompatível');
    dispose = await remote.mount(slot);
    if (atual !== revision) { dispose(); slot.remove(); return; }
    cleanup = dispose;
    status.textContent = `Aplicação carregada: ${nome}`;
  } catch (error) {
    console.error('Falha ao carregar remoto:', error);
    dispose?.(); slot.remove();
    if (atual === revision) status.textContent = 'Aplicação indisponível. Tente abrir novamente.';
  }
}
document.querySelector('#catalogo')!.addEventListener('click', () => void abrir('catalogo'));
document.querySelector('#checkout')!.addEventListener('click', () => void abrir('checkout'));
document.querySelector('#desmontar')!.addEventListener('click', () => { ++revision; desmontar(); status.textContent = 'Aplicação desmontada'; });
