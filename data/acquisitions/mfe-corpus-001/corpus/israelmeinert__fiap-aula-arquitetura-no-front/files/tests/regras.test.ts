import { describe, it, expect } from 'vitest';
import { calcularTotal as react } from '../exemplos/05-clean-architecture/react/src/features/compra/domain/calcular-total';
import { calcularTotal as angular } from '../exemplos/05-clean-architecture/angular/src/app/features/compra/domain/calcular-total';
import { criarSimulador as simuladorReact } from '../exemplos/05-clean-architecture/react/src/features/compra/application/criar-simulador';
import { criarSimulador as simuladorAngular } from '../exemplos/05-clean-architecture/angular/src/app/features/compra/application/criar-simulador';
import { catalogoMemoria } from '../exemplos/06-hexagonal/react/src/features/compra/adapters/memory/catalogo';
import { quantidadeReducer as reducerReact } from '../exemplos/09-flux/react/src/compra/quantidade-reducer';
import { quantidadeReducer as reducerAngular } from '../exemplos/09-flux/angular/src/app/compra/quantidade-reducer';
import { parseEventos as parseReact } from '../exemplos/03-camadas/react/src/data/parse-eventos';
import { parseEventos as parseAngular } from '../exemplos/03-camadas/angular/src/app/data/parse-eventos';
import { montarResumo as resumoNext } from '../exemplos/13-bff/next/src/server/montar-resumo';
import { montarResumo as resumoNode } from '../exemplos/13-bff/apps/web-bff/src/montar-resumo';

describe.each([['React', react], ['Angular', angular]] as const)('Domínio %s', (_name, calcularTotal) => {
  it('calcula em centavos e permite evento gratuito', () => { expect(calcularTotal(15000, 2)).toBe(30000); expect(calcularTotal(0, 6)).toBe(0); });
  it.each([0, 7, -1, 1.5, NaN, Infinity])('rejeita quantidade %s', qtd => expect(() => calcularTotal(15000, qtd)).toThrow());
  it.each([-1, 1.5, NaN, Infinity, Number.MAX_SAFE_INTEGER + 1])('rejeita preço %s', preco => expect(() => calcularTotal(preco, 1)).toThrow());
  it('impede overflow no total', () => expect(() => calcularTotal(Number.MAX_SAFE_INTEGER, 2)).toThrow());
});
describe.each([['React', simuladorReact], ['Angular', simuladorAngular]] as const)('Caso de uso %s', (_name, criarSimulador) => {
  it('recebe adaptador sem framework ou HTTP', async () => expect(await criarSimulador(catalogoMemoria)('react-day', 2)).toBe(30000));
  it('propaga indisponibilidade do catálogo', async () => expect(criarSimulador(catalogoMemoria)('inexistente', 2)).rejects.toThrow('Evento não encontrado'));
});
describe.each([['React', reducerReact], ['Angular', reducerAngular]] as const)('Reducer %s', (_name, reducer) => {
  it('satura em seis mesmo com várias ações e reinicia', () => { let qtd = 1; for (let i = 0; i < 20; i++) qtd = reducer(qtd, { type: 'adicionar' }); expect(qtd).toBe(6); expect(reducer(qtd, { type: 'reiniciar' })).toBe(1); });
});
describe.each([['React', parseReact], ['Angular', parseAngular]] as const)('Borda HTTP %s', (_name, parseEventos) => {
  const evento = { id: 'react-day', titulo: 'React Day', precoCentavos: 15000, vagas: 40 };
  it('aceita lista vazia', () => expect(parseEventos([])).toEqual([]));
  it('remove campos além do contrato', () => expect(parseEventos([{ ...evento, interno: 'não exibir' }])).toEqual([evento]));
  it.each([null, {}, [{ ...evento, precoCentavos: '15000' }], [{ ...evento, vagas: -1 }], [{ ...evento, id: '' }]])('rejeita JSON inválido %j', v => expect(() => parseEventos(v)).toThrow());
});
describe.each([['Next', resumoNext], ['Node', resumoNode]] as const)('BFF %s', (_name, montarResumo) => {
  it('projeta disponibilidade sem expor dados internos', async () => expect(await montarResumo({ evento: async () => ({ id: 'react-day', titulo: 'React Day', segredo: 'interno' }), vagas: async () => 40 })).toEqual({ id: 'react-day', titulo: 'React Day', disponivel: true }));
  it('representa esgotamento', async () => expect((await montarResumo({ evento: async () => ({ id: 'react-day', titulo: 'React Day' }), vagas: async () => 0 })).disponivel).toBe(false));
  it('falha quando um upstream falha', async () => expect(montarResumo({ evento: async () => { throw new Error('offline'); }, vagas: async () => 40 })).rejects.toThrow('offline'));
  it('inicia as duas consultas em paralelo', async () => {
    let liberar!: (v: { id: string; titulo: string }) => void;
    let vagasIniciadas = false;
    const evento = new Promise<{ id: string; titulo: string }>(resolve => { liberar = resolve; });
    const resultado = montarResumo({ evento: () => evento, vagas: async () => { vagasIniciadas = true; return 1; } });
    expect(vagasIniciadas).toBe(true); liberar({ id: 'react-day', titulo: 'React Day' }); await resultado;
  });
});
