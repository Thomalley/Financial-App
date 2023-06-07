import React from 'react';
import { Router } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import { create } from 'jss';
import rtl from 'jss-rtl';
// import MomentUtils from '@date-io/moment';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { SnackbarProvider } from 'notistack';
import { ThemeProvider, StyledEngineProvider } from '@mui/material';
import createStyles from '@mui/styles/createStyles';
import jssPreset from '@mui/styles/jssPreset';
import makeStyles from '@mui/styles/makeStyles';
import StylesProvider from '@mui/styles/StylesProvider';
import { LocalizationProvider } from '@mui/x-date-pickers';
import Auth from './components/Auth/Auth';
import GoogleAnalytics from './components/Layout/GoogleAnalytics';
import ScrollReset from './components/Layout/ScrollReset';
import useSettings from './hooks/useSettings';
import { createThemes } from './theme';
import Routes from './Routes';

const history = createBrowserHistory();
const jss = create({ plugins: [...jssPreset().plugins, rtl()] });

const useStyles = makeStyles(() => createStyles({
  '@global': {
    '*': {
      boxSizing: 'border-box',
      margin: 0,
      padding: 0,
    },
    html: {
      '-webkit-font-smoothing': 'antialiased',
      '-moz-osx-font-smoothing': 'grayscale',
      height: '100%',
      width: '100%',
    },
    body: {
      height: '100%',
      width: '100%',
    },
    '#root': {
      height: '100%',
      width: '100%',
    },
  },
}));

function App() {
  useStyles();

  const { settings } = useSettings();

  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={createThemes(settings)}>
        <StylesProvider jss={jss}>
          {/* <MuiPickersUtilsProvider utils={MomentUtils}> */}
          <LocalizationProvider dateAdapter={AdapterMoment}>
            <SnackbarProvider maxSnack={1}>
              <Router history={history}>
                <Auth>
                  <ScrollReset />
                  <GoogleAnalytics />
                  <Routes />
                </Auth>
              </Router>
            </SnackbarProvider>
          </LocalizationProvider>
          {/* </MuiPickersUtilsProvider> */}
        </StylesProvider>
      </ThemeProvider>
    </StyledEngineProvider>
  );
}

export default App;
