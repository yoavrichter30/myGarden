import ButtonAppBar from "./Appbar/Appbar";
import { StyledEngineProvider } from '@mui/material/styles';

export default function PublicLayout() {
    return (    
      <>
    <StyledEngineProvider injectFirst>
      <ButtonAppBar />
    </StyledEngineProvider>
{/*   
      <CssBaseline />
  
      <ThemeProvider theme={baseTheme}>
        <Outlet />
      </ThemeProvider> */}
      </>
    )
  }
  
  