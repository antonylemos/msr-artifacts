import { Router } from 'express';
import { montarResumo } from './montar-resumo';
import { api } from './upstreams';
export const resumoRouter = Router();
resumoRouter.get('/bff/resumo', async (_req, res) => {
  try { res.setHeader('Cache-Control', 'no-store'); res.json(await montarResumo(api)); }
  catch (error) { console.error('Falha ao montar resumo:', error); res.status(502).json({ erro: 'Resumo indisponível' }); }
});
