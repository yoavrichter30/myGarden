import { createTheme } from '@mui/material/styles';

const baseTheme = createTheme({
  typography: {
    fontFamily: ["Ubuntu", "sans-serif"].join(","),
  },
  palette: {
    // primary: {
    //   main: "#A6CF98"
    // },
    garden: {
      main: "#A6CF98"
    }
  }
});

export default baseTheme;