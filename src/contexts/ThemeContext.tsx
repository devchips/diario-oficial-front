import {Box, ThemeProvider} from '@mui/material'
import {createContext, ReactNode, useCallback, useContext, useMemo, useState} from 'react'
import {DarkTheme} from '../themes/DarkTheme'
import {LightTheme} from '../themes/LightTheme'

interface IThemeContextData {
  themeName: 'light' | 'dark'
  toggleTheme: () => void
}

const ThemeContext = createContext({} as IThemeContextData)
export const useAppThemeContext = () => {
  return useContext(ThemeContext)
}

interface IAppThemeProviderProps {
  children: ReactNode
}

export const AppThemeProvider: React.FC<IAppThemeProviderProps> = ({children}) => {
  const [themeName, setThemeName] = useState<'light' | 'dark'>('light')

  const toggleTheme = useCallback(() => {
    setThemeName((oldThemeName) => (oldThemeName === 'light' ? 'dark' : 'light'))
  }, [])

  const theme = useMemo(() => {
    if (themeName === 'light') return LightTheme
    return DarkTheme
  }, [themeName])

  return (
    <ThemeContext.Provider value={{themeName, toggleTheme}}>
      <ThemeProvider theme={theme}>
        <Box bgcolor={theme.palette.background.default}>{children}</Box>
      </ThemeProvider>
    </ThemeContext.Provider>
  )
}
