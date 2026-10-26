// @mygym/shared-deps — fonte única do objeto `shared` do Module Federation.
// Host e mini-apps chamam sharedDeps({ eager }) em vez de repetir esta lista,
// evitando que as versões/flags divirjam entre os rspack.config de cada app.
//
// Versões: a fonte única é o `pnpm catalog:` (pnpm-workspace.yaml), que resolve
// o que vai pro node_modules. O Module Federation, porém, NÃO lê `catalog:` — ele
// precisa de um número real no `requiredVersion`. Então este helper faz a ponte:
// lê a versão INSTALADA de cada lib (do package.json em node_modules) e a entrega
// ao MF. É um "getSharedDependencies" enxuto, sem o SDK/align-deps do showcase.

import { readFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
// node_modules da raiz do workspace (com node-linker=hoisted, tudo vive aqui).
const ROOT_NODE_MODULES = path.resolve(__dirname, '../../node_modules');

/** Lê a versão exata instalada de uma lib (ex.: '7.2.2'). */
function installedVersion(name) {
  const pkgJson = path.join(ROOT_NODE_MODULES, ...name.split('/'), 'package.json');
  return JSON.parse(readFileSync(pkgJson, 'utf8')).version;
}

// Libs externas que precisam ser instância única (singleton) no super app.
// Para elas damos `version`/`requiredVersion` reais → o MF consegue verificar
// incompatibilidade (host velho × remote novo) e avisar no load.
const RUNTIME_LIBS = [
  'react',
  'react-native',
  '@react-navigation/native',
  '@react-navigation/native-stack',
  '@react-navigation/bottom-tabs',
  'react-native-safe-area-context',
  'react-native-screens',
  'react-native-svg',
  // Libs com view nativa: precisam ser singleton, senão dois bundles registram
  // a mesma view (ex.: "Tried to register two views with the same name
  // BVLinearGradient") e o container quebra ao avaliar.
  'react-native-linear-gradient',
  '@react-native-community/blur',
  // Lib comum pesada: usada por host e ambos os remotes. Não registra view
  // nativa (é JS sobre react-native-svg), mas se não for singleton cada remote
  // baixa a própria cópia inteira da biblioteca de ícones (~MBs por remote).
  'phosphor-react-native',
  'zustand',
];

// Pacotes locais @mygym/* — contrato de domínio compartilhado.
// Versão cerimonial (0.0.0, sempre co-compilados) → requiredVersion: false
// desliga uma checagem que não protegeria de nada neste cenário.
const LOCAL_PACKAGES = [
  '@mygym/store',
  '@mygym/theme',
  '@mygym/ui',
  '@mygym/navigation',
  '@mygym/data',
  '@mygym/utils',
];

/**
 * Monta o objeto `shared` do ModuleFederationPluginV2.
 * @param {{ eager: boolean }} opts - eager: true no host (fornecedor),
 *   false nos mini-apps (consumidores que usam a instância do host).
 * @returns {Record<string, object>}
 */
export function sharedDeps({ eager }) {
  const shared = {};

  for (const name of RUNTIME_LIBS) {
    const version = installedVersion(name);
    shared[name] = { singleton: true, eager, version, requiredVersion: version };
  }

  for (const name of LOCAL_PACKAGES) {
    shared[name] = { singleton: true, eager, requiredVersion: false };
  }

  return shared;
}
