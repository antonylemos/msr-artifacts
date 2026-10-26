import express from 'express';
const port = Number(process.argv[2]);
const app = express();
app.use((_req, res, next) => { res.setHeader('Access-Control-Allow-Origin', 'http://127.0.0.1:4300'); next(); });
app.use(express.static('dist'));
app.listen(port, '127.0.0.1', () => console.log(`Remoto: http://127.0.0.1:${port}/microfrontend.js`));
