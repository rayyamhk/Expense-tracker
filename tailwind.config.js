const palettes = {
  'primary': 'var(--primary)',
  'primary-light': 'var(--primary-light)',
  'primary-dark': 'var(--primary-dark)',
  'on-primary': 'var(--on-primary)',
  'layout': 'var(--layout)',
  'on-layout': 'var(--on-layout)',
  'background': 'var(--background)',
  'on-background': 'var(--on-background)',
  'surface': 'var(--surface)',
  'on-surface': 'var(--on-surface)',
  'on-surface-light': 'var(--on-surface-light)',
  'disabled': 'var(--disabled)',
  'black': 'var(--black)',
  'white': 'var(--white)',
  'overlay': 'var(--overlay)',
  'border': 'var(--border)',
  'error': 'var(--error)',
  'error-light': 'var(--error-light)',
  'error-dark': 'var(--error-dark)',
  'on-error': 'var(--on-error)',
  'success': 'var(--success)',
  'success-light': 'var(--success-light)',
  'success-dark': 'var(--success-dark)',
  'on-success': 'var(--on-success)',
  'warning': 'var(--warning)',
  'warning-light': 'var(--warning-light)',
  'warning-dark': 'var(--warning-dark)',
  'on-warning': 'var(--on-warning)',
}

module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {
      colors: palettes,
      animation: {
        progress: 'shrink-x 1.25s ease-in-out 0s 1 normal forwards',
      },
      keyframes: {
        'shrink-x': {
          '0%': { transform: 'scaleX(1)' },
          '100%': { transform: 'scaleX(0)' },
        },
      }
    },
    fontFamily: {
      'primary': ["'Roboto'", 'sans-serif']
    },
  },
  plugins: [],
}
