import { extendTheme } from '@chakra-ui/react';

export const theme = extendTheme({
  colors: {
    brand: {
      gradient: {
        purple: 'linear-gradient(135deg, #6B46C1 0%, #D53F8C 100%)',
        blue: 'linear-gradient(135deg, #4A90E2 0%, #50E3C2 100%)',
        yellow: 'linear-gradient(135deg, #F6E05E 0%, #EDD75A 100%)',
        pink: 'linear-gradient(135deg, #F687B3 0%, #ED64A6 100%)',
        green: 'linear-gradient(135deg, #48BB78 0%, #38A169 100%)'
      },
      solid: {
        purple: { start: '#6B46C1', end: '#D53F8C' },
        blue: { start: '#4A90E2', end: '#50E3C2' },
        yellow: { start: '#F6E05E', end: '#EDD75A' },
        pink: { start: '#F687B3', end: '#ED64A6' },
        green: { start: '#48BB78', end: '#38A169' }
      }
    }
  },
  fonts: {
    body: 'Inter, system-ui, sans-serif',
    heading: 'Inter, system-ui, sans-serif'
  },
  components: {
    Button: {
      baseStyle: {
        borderRadius: 'md',
        fontWeight: 'medium'
      },
      variants: {
        primary: {
          bg: 'brand.gradient.yellow',
          color: 'gray.800',
          _hover: {
            opacity: 0.9
          }
        },
        secondary: {
          bg: 'brand.gradient.blue',
          color: 'white',
          _hover: {
            opacity: 0.9
          }
        }
      }
    },
    Card: {
      baseStyle: {
        container: {
          borderRadius: 'lg',
          overflow: 'hidden',
          transition: 'all 0.2s',
          _hover: {
            transform: 'translateY(-2px)',
            boxShadow: 'lg'
          }
        }
      },
      variants: {
        product: {
          container: {
            bg: 'white',
            borderWidth: '1px',
            borderColor: 'gray.100'
          }
        },
        chat: {
          container: {
            bg: 'gray.50',
            borderRadius: 'xl'
          }
        }
      }
    }
  },
  styles: {
    global: {
      body: {
        bg: 'gray.50',
        color: 'gray.900'
      }
    }
  }
});