// Tipos dos módulos expostos pelos remotes via Module Federation.
// Eles não existem em disco no host (chegam pela rede em runtime), então
// declaramos manualmente para o TypeScript/editor conhecerem os imports.
declare module 'checkin/CheckInStack' {
  import type { ComponentType } from 'react';
  export const CheckInStack: ComponentType;
}

declare module 'dashboard/DashboardStack' {
  import type { ComponentType } from 'react';
  export const DashboardStack: ComponentType;
}
