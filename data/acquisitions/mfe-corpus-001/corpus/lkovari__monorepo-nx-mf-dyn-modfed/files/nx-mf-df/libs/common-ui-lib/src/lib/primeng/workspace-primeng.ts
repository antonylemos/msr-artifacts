import { EnvironmentProviders } from '@angular/core';
import Aura from '@primeuix/themes/aura';
import { providePrimeNG } from 'primeng/config';

export function provideWorkspacePrimeNG(): EnvironmentProviders {
  return providePrimeNG({
    theme: {
      preset: Aura,
    },
  });
}
