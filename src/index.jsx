import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

const theme = createTheme({
  palette: {
    primary: {
      main: '#bf8426',
    },
    secondary: {
      main: '#dc004e',
    },
    background: {
      default: '#dc004e',
    },
    text: {
      primary: '#1C212C',
    },
  },
  components: {
    MuiFilledInput: {
      styleOverrides: {
        root: {
          backgroundColor: '#e0f7fa',
          '&:hover': {
            backgroundColor: '#b2ebf2',
          },
          '&.Mui-focused': {
            backgroundColor: '#80deea',
          },
        },
      },
    },
    MuiSelect: {
      styleOverrides: {
        root: {
          backgroundColor: '#e0f7fa',
          '&:hover': {
            backgroundColor: '#b2ebf2',
          },
          '&.Mui-focused': {
            backgroundColor: '#80deea',
          },
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          // Зміни стилів для кореневого елемента Chip
          backgroundColor: '#1976d2',
          color: '#fff',
          '& .MuiChip-deleteIcon': {
            color: '#fff',
          },
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          backgroundColor: 'hsl(220, 23%, 90%)',
          // Зміни стилів для кореневого елемента OutlinedInput
          '& fieldset': {
            borderColor: '#1976d2',
          },
          '&:hover fieldset': {
            borderColor: '#115293',
          },
          '&.Mui-focused fieldset': {
            borderColor: '#0d47a1',
          },
        },
      },
    },
    MuiFormControl: {
      styleOverrides: {
        root: {
          margin: '0'
        },
      },
    }
  }
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <ThemeProvider theme={theme}>
      <CssBaseline />
        <App />
      </ThemeProvider>
    </BrowserRouter>
  </React.StrictMode>
);
