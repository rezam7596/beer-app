import React, {createContext, useCallback, useContext, useMemo} from "react";
import { PaletteMode } from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider as MuiThemeProvider } from "@emotion/react";
import { getTheme } from "../../styles/theme";
import { useLocalStorage } from "../../hooks";

interface ThemeModeContext {
  themeMode: PaletteMode,
  toggleThemeMode: () => void,
}
const ThemeModeContext = createContext<ThemeModeContext>({
  themeMode: 'light',
  toggleThemeMode: () => {},
});

interface Props {
  children: React.ReactNode;
}

const ThemeProvider = (props: Props) => {
  const [mode, setMode] = useLocalStorage<PaletteMode>('themeMode', getSystemThemeMode());

  const toggleThemeMode = useCallback(() => {
    setMode( prevMode => prevMode === 'light' ? 'dark' : 'light')
  }, [setMode])

  const contextValue = useMemo(() => ({
    themeMode: mode, toggleThemeMode
  }), [mode, toggleThemeMode])

  return (
    <MuiThemeProvider theme={getTheme(mode)}>
      <CssBaseline/>
      <ThemeModeContext.Provider value={contextValue} >
        {props.children}
      </ThemeModeContext.Provider>
    </MuiThemeProvider>
  );
};

export function useThemeMode() {
  return useContext(ThemeModeContext);
}

function getSystemThemeMode() {
  return window.matchMedia?.('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

export default ThemeProvider;
