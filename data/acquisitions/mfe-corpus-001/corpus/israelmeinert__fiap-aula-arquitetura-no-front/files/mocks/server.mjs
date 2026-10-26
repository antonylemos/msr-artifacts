import express from 'express';
import { pathToFileURL } from 'node:url';
export function criarApi() {
  const app = express();
  app.use(express.json({ limit: '10kb' }));
  let modo = 'normal';
  const eventos = [
    { id: 'react-day', titulo: 'React Day', precoCentavos: 15000, vagas: 40 },
    { id: 'angular-day', titulo: 'Angular Day', precoCentavos: 12000, vagas: 20 },
    { id: 'lotado', titulo: 'Workshop esgotado', precoCentavos: 9000, vagas: 0 },
  ];
  app.get('/health', (_req, res) => res.json({ ok: true, modo }));
  app.post('/__cenario', (req, res) => {
    if (!['normal', 'erro', 'invalido', 'esgotado'].includes(req.body?.modo)) {
      return res.status(400).json({ erro: 'Cenário desconhecido' });
    }
    modo = req.body.modo;
    return res.json({ modo });
  });
  app.use('/api', (_req, res, next) => {
    if (modo === 'erro') return res.status(503).json({ erro: 'Serviço indisponível' });
    if (modo === 'invalido') return res.json({ precoCentavos: '150 reais' });
    next();
  });
  app.get('/api/eventos', (_req, res) => res.json(eventos.map(e => ({ ...e, vagas: modo === 'esgotado' ? 0 : e.vagas }))));
  app.get('/api/eventos/:id', (req, res) => {
    const evento = eventos.find(e => e.id === req.params.id);
    if (!evento) return res.status(404).json({ erro: 'Evento não encontrado' });
    return res.json({ ...evento, vagas: modo === 'esgotado' ? 0 : evento.vagas });
  });
  app.get('/api/disponibilidade/:id', (req, res) => {
    const evento = eventos.find(e => e.id === req.params.id);
    if (!evento) return res.status(404).json({ erro: 'Evento não encontrado' });
    return res.json({ vagas: modo === 'esgotado' ? 0 : evento.vagas });
  });
  return app;
}
if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  criarApi().listen(4010, '127.0.0.1', () => console.log('API didática: http://127.0.0.1:4010'));
}
