import { build } from 'esbuild';
import { transformAsync } from '@babel/core';
import angularLinker from '@angular/compiler-cli/linker/babel';
import { readFile } from 'node:fs/promises';
import path from 'node:path';
const angular = process.argv[2] === 'angular';
// ngc compila o componente local. O linker finaliza as bibliotecas Angular,
// distribuídas em compilação parcial, antes de gerar o módulo remoto.
const linker = {
  name: 'angular-linker',
  setup(builder) {
    builder.onLoad({ filter: /\.m?js$/ }, async args => {
      const source = await readFile(args.path, 'utf8');
      if (!source.includes('ɵɵngDeclare')) return undefined;
      const result = await transformAsync(source, { filename: args.path,
        configFile: false, babelrc: false, plugins: [angularLinker], compact: false });
      return { contents: result.code, loader: 'js' };
    });
  },
};
await build({ entryPoints: [angular ? 'dist/compiled/mount.js' : 'src/mount.tsx'],
  outfile: 'dist/microfrontend.js', bundle: true, format: 'esm', platform: 'browser',
  target: 'es2022', sourcemap: true, minify: true, jsx: 'automatic', plugins: angular ? [linker] : [],
  define: { 'process.env.NODE_ENV': '"production"', ...(angular ? { ngDevMode: 'false' } : {}) },
  tsconfig: path.resolve('tsconfig.json'),
});
