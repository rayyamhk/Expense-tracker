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

module.exports = pseudoPrefix({
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
});

function pseudoPrefix(twConfig) {
  if (Array.isArray(twConfig.content)) {
    const content = {};
    content.files = twConfig.content;
    content.transform = {
      DEFAULT: transformer,
    };
    twConfig.content = content;
  } else {
    if (!twConfig.content?.transform) {
      twConfig.content.transform = {
        DEFAULT: transformer,
      };
    } else if (typeof twConfig.content.transform === 'object') {
      const transform = {};
      Object.entries(twConfig.content.transform).forEach(([ext, handler]) => {
        if (typeof handler === 'function') {
          transform[ext] = (content) => {
            handler(content);
            transformer(content);
          }
        } else {
          transform[ext] = transformer;
        }
      });
      twConfig.content.transform = transform;
    }
  }
  return twConfig;
};

function transformer(content) {
  return content.replace(/prefix\(\s*['"`]([\w\s\.:/-]+)['"`]\s*,\s*['"`]([\w\s\.:/-]+)['"`]\s*\)/g, (_, prefix, classNames) => {
    prefix = prefix.trim();
    classNames = classNames.trim();
    return '"' + classNames.split(' ').filter((str) => !!str).map((str) => prefix + str).join(' ') + '"';
  });
};