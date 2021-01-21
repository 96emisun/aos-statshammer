import { red, teal } from '@material-ui/core/colors'
import { createMuiTheme, Theme, ThemeOptions } from '@material-ui/core/styles'
import ConfigStore from 'types/store/config'

const commonOtions: Partial<ThemeOptions> = {
  typography: {
    htmlFontSize: 19,
    h6: {
      fontSize: '1rem',
    },
  },
  mixins: {
    toolbar: {
      minHeight: 52,
    },
  },
  overrides: {
    MuiTooltip: {
      tooltip: {
        fontSize: '0.8rem',
      },
    },
  },
}

export const lightTheme: Theme = createMuiTheme({
  palette: {
    type: 'light',
    primary: teal,
  },
  ...commonOtions,
})

export const darkTheme: Theme = createMuiTheme({
  palette: {
    type: 'dark',
    primary: { main: teal[500] },
    secondary: { main: red[500] },
  },
  ...commonOtions,
})

const getTheme = (config: ConfigStore) => (config.darkMode ? darkTheme : lightTheme)

export default getTheme
