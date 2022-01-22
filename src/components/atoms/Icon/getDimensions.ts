const mapping = {
  xl: 48,
  lg: 40,
  md: 32,
  sm: 24,
  xs: 16,
};

function getDimensions(size: 'xl' | 'lg' | 'md' | 'sm' | 'xs') {
  const width = mapping[size];
  return {
    fps: { width: width, height: width*15/16 },
    apple_pay: { width: width, height: width*123/300 },
    google_pay: { width: width, height: width*119/300 },
    samsung_pay: { width: width, height: width },
    payme: { width: width, height: width },
    octopus: { width: width, height: width*30/48 },
    undefined: { width: width, height: width }, // tricks to ensure all icons have proper size
  };
};

export default getDimensions;
