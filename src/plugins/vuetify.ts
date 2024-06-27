import { createVuetify, ThemeDefinition } from 'vuetify';
import '@mdi/font/css/materialdesignicons.css';
import 'vuetify/styles';

const myCustomDarkTheme: ThemeDefinition = {
  dark: true,
  colors: {
    background: '#121212',
    surface: '#121212',
    primary: '#ED0280',
    'primary-darken-1': '#0D47A1',
    secondary: '#f9f9f9',
    'secondary-darken-1': '#FFA000',
    error: '#FF5252',
    info: '#2196F3',
    success: '#4CAF50',
    warning: '#FF9800',
  },
};

export default createVuetify({
  theme: {
    defaultTheme: 'myCustomDarkTheme',
    themes: {
      myCustomDarkTheme,
    },
  },
});
