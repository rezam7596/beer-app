import { createTheme } from '@mui/material/styles';
import { green, blue } from '@mui/material/colors';
import { PaletteMode } from "@mui/material";
import { ThemeOptions } from "@mui/material/styles/createTheme";

const getTheme = (mode: PaletteMode) => createTheme({
  ...(mode === "light" ? {
    palette: {
      mode,
      background: {
        default: '#f7f7f7',
      },
      primary: {
        main: blue[800],
      },
      secondary: {
        main: green[500],
      },
    },
    ...getSharedOptions(),
  } : {
    palette: {
      mode,
    },
    ...getSharedOptions(),
  })
});

function getSharedOptions(): ThemeOptions {
  return {
    components: {
      MuiLink: {
        styleOverrides: {
          root: {
            textDecoration: 'none',
          },
        },
      },
    },
  }
}

export { getTheme };
