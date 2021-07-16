import { createMuiTheme } from '@material-ui/core'

const theme = createMuiTheme({
  //   palette: {
  //     primary: {
  //       main: '#2d4059',
  //     },
  //     secondary: {
  //       main: '#ea5455',
  //       contrastText: '#ffffff',
  //     },
  //   },
  //   typography: {
  //     h2: {
  //       fontSize: '3.75rem',
  //       '@media (max-width: 960px)': {
  //         fontSize: '2rem',
  //       },
  //     },
  //   },
  typography: {
    fontFamily: [
      'Quicksand',
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
  },
})

export default theme
