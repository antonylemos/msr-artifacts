import type { Config } from 'tailwindcss';
import sharedConfig from '@microfrontend/tailwind-config';

const config = {
  content: {
    relative: true,
    files: [
      './index.html',
      './src/**/*.{ts,tsx}',
      '../../packages/**/*.{ts,tsx}',
    ],
  },
  presets: [sharedConfig],
} satisfies Pick<Config, 'content' | 'presets'>;

export default config;
