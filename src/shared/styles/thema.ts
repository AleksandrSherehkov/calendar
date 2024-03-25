export const theme = {
  colors: {
    darkWhite: '#e6e6e6',
    black: '#1e1f21',
    granite: '#565759',
    darkGrey: '#464648',
    grey: '#737372',
    foggyGrey: '#404040',
    hazeGray: '#272829',
    lightGrey: '#dddddd',
    red: '#de4328',
    green: '#3fc406',
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
    xl: '32px',
    xxl: '36px',
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
    xxs: '4px',
    xs: '8px',
  },

  shadows: {
    primary: '0 4px 8px rgba(0, 0, 0, 0.2);',
  },

  transitions: {
    regular: '300ms cubic-bezier(0.4, 0, 0.2, 1)',
  },
};
