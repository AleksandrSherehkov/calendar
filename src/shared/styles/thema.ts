export const theme = {
  colors: {
    white: '#FFFFFF',
    black: '#111111',
    yellow: '#FFC107',
    lightOrange: '#FDF7F2',
    lightPink: '#FEF9F9',
    blueGradient: 'linear-gradient(290deg, #419EF1 0%, #9BD0FF 107.89%)',
    blue: '#54ADFF',
    lightBlue: '#CCE4FB',
    green: '#00C3AD',
    red: '#F43F5E',
    grey: '#888888',
  },

  spacing: (value: number) => `${4 * value}px`,

  fonts: {
    manrope: {
      regular: 'Manrope-Regular, sans-serif',
      semiBold: 'Manrope-SemiBold, sans-serif',
      bold: 'Manrope-Bold, sans-serif',
      medium: 'Manrope-Medium, sans-serif',
      extraBold: 'Manrope-ExtraBold, sans-serif',
    },
    inter: {
      regular: 'Inter-Regular, sans-serif',
      medium: 'Inter-Medium, sans-serif',
    },
    poppins: {
      regular: 'Poppins-Regular, sans-serif',
    },
  },

  fontSizes: {
    xxs: '10px',
    xs: '12px',
    s: '14px',
    m: '16px',
    l: '20px',
    xl: '24px',
    xxl: '48px',
  },

  fontWeights: {
    regular: 400,
    medium: 500,
    semiBold: 600,
    bold: 700,
    extraBold: 800,
  },

  borders: {
    none: 'none',
    normal: '1px solid',
    medium: '2px solid ',
  },

  radii: {
    none: '0',
    round: '50%',
    xxs: '8px',
    xs: '16px',
    s: '20px',
    m: '24px',
    l: '40px',
  },

  shadows: {
    primary: '3px 8px 14px rgba(136, 198, 253, 0.19)',
    secondary: '7px 13px 14px rgba(116, 177, 232, 0.24)',
  },

  transitions: {
    regular: '250ms cubic-bezier(0.4, 0, 0.2, 1)',
  },
};
