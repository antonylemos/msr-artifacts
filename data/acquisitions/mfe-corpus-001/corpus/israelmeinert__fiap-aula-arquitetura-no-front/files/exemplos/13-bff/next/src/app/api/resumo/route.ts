import { montarResumo } from '../../../server/montar-resumo';
import { api } from '../../../server/upstreams';
export async function GET() {
  try { return Response.json(await montarResumo(api), { headers: { 'Cache-Control': 'no-store' } }); }
  catch (error) { console.error('Falha ao montar resumo:', error); return Response.json({ erro: 'Resumo indisponível' }, { status: 502 }); }
}
