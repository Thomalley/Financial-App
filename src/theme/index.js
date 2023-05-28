/* eslint-disable no-console */
/* eslint-disable import/prefer-default-export */
import _ from 'lodash';
import { colors, createTheme, responsiveFontSizes } from '@material-ui/core';
import typography from './typography';
import { strongShadows } from './shadows';
import { THEMES } from '../constants';

const baseConfig = {
  direction: 'ltr',
  typography,
  overrides: {
    MuiLinearProgress: {
      root: {
        borderRadius: 3,
        overflow: 'hidden',
      },
    },
    MuiListItemIcon: {
      root: {
        minWidth: 32,
      },
    },
    MuiChip: {
      root: {
        backgroundColor: 'rgba(0,0,0,0.075)',
      },
    },
  },
};

const themeConfigs = [
  {
    name: THEMES.LIGHT,
    overrides: {
      MuiInputBase: {
        input: {
          '&::placeholder': {
            opacity: 1,
            color: colors.blueGrey[600],
          },
        },
      },
    },
    palette: {
      type: 'light',
      action: {
        active: colors.blueGrey[600],
      },
      background: {
        default: colors.common.white,
        dark: '#f4f6f8',
        paper: colors.common.white,
      },
      primary: {
        main: '#22335E',
        open: '#00850d',
        close: '#bd0000',
      },
      secondary: {
        main: '#22335E',
      },
      text: {
        primary: colors.blueGrey[900],
        secondary: colors.blueGrey[600],
        tertiary: 'white',
      },
    },
    logo: {
      filter: 'brightness(0) invert(100%)',
      filterLoad: 'invert(100%)',
    },
    settings: {
      filter: '',
    },
    shadows: strongShadows,
  },
  {
    name: THEMES.ONE_DARK,
    palette: {
      type: 'dark',
      action: {
        active: 'rgba(255, 255, 255, 0.54)',
        hover: 'rgba(255, 255, 255, 0.04)',
        selected: 'rgba(255, 255, 255, 0.08)',
        disabled: 'rgba(255, 255, 255, 0.26)',
        disabledBackground: 'rgba(255, 255, 255, 0.12)',
        focus: 'rgba(255, 255, 255, 0.12)',
      },
      background: {
        default: '#282C34',
        dark: '#1c2025',
        paper: '#282C34',
        transition: '#ffffff',
      },
      primary: {
        main: '#002D3B',
        open: '#00850d',
        close: '#bd0000',
      },
      secondary: {
        button: '#003E6B',
        main: '#e6e5e8',
      },
      text: {
        primary: '#e6e5e8',
        secondary: '#adb0bb',
      },
    },
    logo: {
      filter: '',
      filterLoad: '',
    },
    settings: {
      filter: 'invert(100%)',
    },
    shadows: strongShadows,
  },
];

export function createThemes(settings = {}) {
  let themeConfig = themeConfigs.find((theme) => theme.name === settings.theme);

  if (!themeConfig) {
    console.warn(new Error(`The theme ${settings.theme} is not valid`));
    [themeConfig] = themeConfigs;
  }

  let theme = createTheme(
    _.merge(
      {},
      baseConfig,
      themeConfig,
      { direction: settings.direction },
    ),
  );

  if (settings.responsiveFontSizes) {
    theme = responsiveFontSizes(theme);
  }

  return theme;
}
