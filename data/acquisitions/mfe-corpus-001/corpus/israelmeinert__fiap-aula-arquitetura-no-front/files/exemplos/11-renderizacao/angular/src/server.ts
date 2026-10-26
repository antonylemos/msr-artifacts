import { AngularNodeAppEngine, createNodeRequestHandler, writeResponseToNodeResponse, isMainModule } from '@angular/ssr/node';
import express from 'express';
import { fileURLToPath } from 'node:url';
const app = express();
const engine = new AngularNodeAppEngine({ allowedHosts: ['127.0.0.1', 'localhost'] });
app.use(express.static(fileURLToPath(new URL('../browser', import.meta.url)), { index: false, redirect: false, maxAge: '1h' }));
app.use((req, res, next) => {
  engine.handle(req).then(response => response ? writeResponseToNodeResponse(response, res) : next()).catch(next);
});
if (isMainModule(import.meta.url)) app.listen(4200, '127.0.0.1');
export const reqHandler = createNodeRequestHandler(app);
