import { createMuiTheme } from '@material-ui/core';

const theme = createMuiTheme({
  typography: {
    /* Suppress error "You are using the typography
     * variant caption which will be restyled in the next major release
    */
    useNextVariants: true,
  },
  palette: {
    primary: {
      light: '#d15353',
      main: '#c62828',
      dark: '#8a1c1c',
      contrastText: '#fff',
    },
    secondary: {
      light: '#5393ff',
      main: '#2979ff',
      dark: '#1c54b2',
      contrastText: '#fff',
    },
    background: {
      default: '#ebecf0',
    },
  },
  tableCell: {
    color: 'white',
  },
});

export default theme;
