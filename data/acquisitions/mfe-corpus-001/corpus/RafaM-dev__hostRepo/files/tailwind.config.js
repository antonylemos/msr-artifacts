module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'design-primary-100': 'var(--color-design-primary-100)',
        'design-primary-300': 'var(--color-design-primary-300)',
        'design-primary-500': 'var(--color-design-primary-500)',
        'design-primary-700': 'var(--color-design-primary-700)',
        'design-primary-900': 'var(--color-design-primary-900)',
        'design-neutral-50': 'var(--color-design-neutral-50)',
        'design-neutral-100': 'var(--color-design-neutral-100)',
        'design-neutral-300': 'var(--color-design-neutral-300)',
        'design-neutral-400': 'var(--color-design-neutral-400)',
        'design-neutral-600': 'var(--color-design-neutral-600)',
        'design-neutral-800': 'var(--color-design-neutral-800)',
      },
    },
  },
  plugins: [],
}