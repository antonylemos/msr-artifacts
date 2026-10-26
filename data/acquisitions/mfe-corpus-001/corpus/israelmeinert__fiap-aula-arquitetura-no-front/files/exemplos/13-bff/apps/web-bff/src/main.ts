import express from 'express';
import { resumoRouter } from './resumo-router';
const app = express();
app.use(resumoRouter);
app.listen(4011, '127.0.0.1', () => console.log('BFF: http://127.0.0.1:4011'));
