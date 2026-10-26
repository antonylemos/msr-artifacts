export type UserRole = 'publico' | 'gerente' | 'admin';

export interface AuthUser {
  id: string;
  nome: string;
  role: UserRole;
}

export type CategoriaSeguro = 'auto' | 'moto' | 'frota';

export interface Seguradora {
  id: string;
  nome: string;
  cnpj: string;
  ativa: boolean;
}

export interface ProdutoSeguro {
  id: string;
  seguradoraId: string;
  nome: string;
  categoria: CategoriaSeguro;
  precoBase: number;
  ativo: boolean;
}

export interface OfertaSeguro {
  id: string;
  seguradora: string;
  produto: string;
  categoria: CategoriaSeguro;
  precoMensal: number;
  franquiaPercentual: number;
  avaliacao: number;
}

export type StatusApolice = 'ativa' | 'pendente' | 'cancelada';

export interface Apolice {
  id: string;
  produtoId: string;
  clienteNome: string;
  placa: string;
  premioMensal: number;
  status: StatusApolice;
}
