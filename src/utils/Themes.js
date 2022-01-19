const availableThemes = [
  // red
  {
    'primary': '#f44336',
    'primary-light': '#ffcdd2',
    'primary-dark': '#d32f2f',
    'secondary': '#FBFBF8',
    'secondary-light': '#ffffff',
    'secondary-dark': '#f5f5f5',
    'text-primary': '#212121',
    'text-secondary': '#9e9e9e',
  },
  // pink
  {
    'primary': '#f06292',
    'primary-light': '#fce4ec',
    'primary-dark': '#c2185b',
    'secondary': '#FBFBF8',
    'secondary-light': '#ffffff',
    'secondary-dark': '#f5f5f5',
    'text-primary': '#212121',
    'text-secondary': '#9e9e9e',
  },
  // purple
  {
    'primary': '#ba68c8',
    'primary-light': '#e1bee7',
    'primary-dark': '#9c27b0',
    'secondary': '#FBFBF8',
    'secondary-light': '#ffffff',
    'secondary-dark': '#f5f5f5',
    'text-primary': '#212121',
    'text-secondary': '#9e9e9e',
  },
  // deep purple
  {
    'primary': '#7e57c2',
    'primary-light': '#d1c4e9',
    'primary-dark': '#5e35b1',
    'secondary': '#FBFBF8',
    'secondary-light': '#ffffff',
    'secondary-dark': '#f5f5f5',
    'text-primary': '#212121',
    'text-secondary': '#9e9e9e',
  },
  // indigo
  {
    'primary': '#3f51b5',
    'primary-light': '#c5cae9',
    'primary-dark': '#303f9f',
    'secondary': '#FBFBF8',
    'secondary-light': '#ffffff',
    'secondary-dark': '#f5f5f5',
    'text-primary': '#212121',
    'text-secondary': '#9e9e9e',
  },
  // lightblue
  {
    'primary': '#03a9f4',
    'primary-light': '#b3e5fc',
    'primary-dark': '#0288d1',
    'secondary': '#FBFBF8',
    'secondary-light': '#ffffff',
    'secondary-dark': '#f5f5f5',
    'text-primary': '#212121',
    'text-secondary': '#9e9e9e',
  },
  // cyan
  {
    'primary': '#00bcd4',
    'primary-light': '#b2ebf2',
    'primary-dark': '#0097a7',
    'secondary': '#FBFBF8',
    'secondary-light': '#ffffff',
    'secondary-dark': '#f5f5f5',
    'text-primary': '#212121',
    'text-secondary': '#9e9e9e',
  },
  // teal
  {
    'primary': '#009688',
    'primary-light': '#b2dfdb',
    'primary-dark': '#00796b',
    'secondary': '#FBFBF8',
    'secondary-light': '#ffffff',
    'secondary-dark': '#f5f5f5',
    'text-primary': '#212121',
    'text-secondary': '#9e9e9e',
  },
  // green
  {
    'primary': '#4caf50',
    'primary-light': '#c8e6c9',
    'primary-dark': '#388e3c',
    'secondary': '#FBFBF8',
    'secondary-light': '#ffffff',
    'secondary-dark': '#f5f5f5',
    'text-primary': '#212121',
    'text-secondary': '#9e9e9e',
  },
  // lightgreen
  {
    'primary': '#8bc34a',
    'primary-light': '#dcedc8',
    'primary-dark': '#689f38',
    'secondary': '#FBFBF8',
    'secondary-light': '#ffffff',
    'secondary-dark': '#f5f5f5',
    'text-primary': '#212121',
    'text-secondary': '#9e9e9e',
  },
  // lime
  {
    'primary': '#cddc39',
    'primary-light': '#f0f4c3',
    'primary-dark': '#afb42b',
    'secondary': '#FBFBF8',
    'secondary-light': '#ffffff',
    'secondary-dark': '#f5f5f5',
    'text-primary': '#212121',
    'text-secondary': '#9e9e9e',
  },
  // yellow
  {
    'primary': '#ffeb3b',
    'primary-light': '#fff9c4',
    'primary-dark': '#fbc02d',
    'secondary': '#FBFBF8',
    'secondary-light': '#ffffff',
    'secondary-dark': '#f5f5f5',
    'text-primary': '#212121',
    'text-secondary': '#9e9e9e',
  },
  // amber
  {
    'primary': '#ffc107',
    'primary-light': '#ffecb3',
    'primary-dark': '#ffa000',
    'secondary': '#FBFBF8',
    'secondary-light': '#ffffff',
    'secondary-dark': '#f5f5f5',
    'text-primary': '#212121',
    'text-secondary': '#9e9e9e',
  },
  // orange
  {
    'primary': '#ff9800',
    'primary-light': '#ffe0b2',
    'primary-dark': '#f57c00',
    'secondary': '#FBFBF8',
    'secondary-light': '#ffffff',
    'secondary-dark': '#f5f5f5',
    'text-primary': '#212121',
    'text-secondary': '#9e9e9e',
  },
  // deep orange
  {
    'primary': '#ff5722',
    'primary-light': '#ffccbc',
    'primary-dark': '#e64a19',
    'secondary': '#FBFBF8',
    'secondary-light': '#ffffff',
    'secondary-dark': '#f5f5f5',
    'text-primary': '#212121',
    'text-secondary': '#9e9e9e',
  },
  // brown
  {
    'primary': '#8d6e63',
    'primary-light': '#d7ccc8',
    'primary-dark': '#6d4c41',
    'secondary': '#FBFBF8',
    'secondary-light': '#ffffff',
    'secondary-dark': '#f5f5f5',
    'text-primary': '#212121',
    'text-secondary': '#9e9e9e',
  },
  // bluegray
  {
    'primary': '#607d8b',
    'primary-light': '#cfd8dc',
    'primary-dark': '#455a64',
    'secondary': '#FBFBF8',
    'secondary-light': '#ffffff',
    'secondary-dark': '#f5f5f5',
    'text-primary': '#212121',
    'text-secondary': '#9e9e9e',
  },
  // dark
  {
    'primary': 'rgba(66, 66, 66, 0.85)',
    'primary-light': '#cfd8dc',
    'primary-dark': '#455a64',
    'secondary': '#121212',
    'secondary-light': '#ffffff',
    'secondary-dark': '#f5f5f5',
    'text-primary': '#e0e0e0',
    'text-secondary': '#9e9e9e',
  },
];

export default availableThemes;
