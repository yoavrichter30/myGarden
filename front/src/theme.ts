import { createTheme } from '@mui/material/styles';

const baseTheme = createTheme({
  typography: {
    fontFamily: ["Roboto", "sans-serif"].join(","),
  },
  palette: {
    primary: {
      main: "#A6CF98"
    },
    secondary: {
      main: "#bdbdbd"
    },
  }
});

export default baseTheme;