export type AppTheme = 'mar-aberto' | 'intranet' | 'admin';

export interface ThemeMeta {
  theme: AppTheme;
  label: string;
  description: string;
}

export const THEME_META: Record<AppTheme, ThemeMeta> = {
  'mar-aberto': {
    theme: 'mar-aberto',
    label: 'Mar Aberto',
    description: 'Área pública, acessível a qualquer visitante.',
  },
  intranet: {
    theme: 'intranet',
    label: 'Intranet',
    description: 'Área restrita a gerentes de conta e equipe interna.',
  },
  admin: {
    theme: 'admin',
    label: 'Administração',
    description: 'Painel de administração do sistema.',
  },
};
