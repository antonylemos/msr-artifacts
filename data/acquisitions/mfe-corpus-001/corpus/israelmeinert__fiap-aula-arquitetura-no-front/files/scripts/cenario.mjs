const modo = process.argv[2] ?? 'normal';
const r = await fetch('http://127.0.0.1:4010/__cenario', {
  method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ modo }),
});
if (!r.ok) throw new Error('Use: npm run cenario -- normal|erro|invalido|esgotado');
console.log(await r.json());
