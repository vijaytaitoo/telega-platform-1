export const BrandConfig = {
  name: 'Tele•Ga',
  description: 'Платформа для создания и управления телеграм-магазинами',
  
  // Медиа-запросы для адаптивности
  breakpoints: {
    mobile: '320px',
    tablet: '768px',
    desktop: '1024px',
    wide: '1440px',
  },
  
  // Темы
  themes: {
    light: {
      background: '#FFFFFF',
      surface: '#F8F9FA',
      text: {
        primary: '#1F1635',
        secondary: '#475569',
      },
      gradient: {
        background: 'linear-gradient(135deg, rgba(255, 79, 150, 0.1), rgba(0, 200, 83, 0.1))',
        surface: 'linear-gradient(135deg, #FFFFFF, #F8F9FA)',
      },
    },
    dark: {
      background: '#1F1635',
      surface: '#2A1B3D',
      text: {
        primary: '#FFFFFF',
        secondary: '#CBD5E1',
      },
      gradient: {
        background: 'linear-gradient(135deg, rgba(108, 48, 255, 0.2), rgba(0, 200, 83, 0.1))',
        surface: 'linear-gradient(135deg, #1F1635, #2A1B3D)',
      },
    },
  },
  
  colors: {
    brand: {
      pink: '#FF4F96',
      purple: '#D94EFF',
      violet: '#6C30FF',
      orange: '#FF9500',
      green: '#00C853',
    },
    
    // Градиенты с поддержкой тем
    gradients: {
      header: {
        light: 'linear-gradient(to right, #FF4F96, #FF9500, #00C853, #6C30FF)',
        dark: 'linear-gradient(to right, rgba(255, 79, 150, 0.8), rgba(255, 149, 0, 0.8), rgba(0, 200, 83, 0.8), rgba(108, 48, 255, 0.8))',
      },
      workspace: {
        light: 'linear-gradient(135deg, rgba(217, 78, 255, 0.1), rgba(0, 200, 83, 0.1))',
        dark: 'linear-gradient(135deg, rgba(217, 78, 255, 0.2), rgba(0, 200, 83, 0.2))',
      },
      action: {
        light: 'linear-gradient(to bottom, #FF4F96, #6C30FF)',
        dark: 'linear-gradient(to bottom, rgba(255, 79, 150, 0.9), rgba(108, 48, 255, 0.9))',
      },
      heading: {
        light: 'linear-gradient(to right, #FF4F96, #D94EFF)',
        dark: 'linear-gradient(to right, rgba(255, 79, 150, 0.9), rgba(217, 78, 255, 0.9))',
      },
    },
    
    // Цвета интерфейса
    interface: {
      background: {
        light: '#FFFFFF',
        dark: '#1F1635',
      },
      text: {
        light: '#1F1635',
        dark: '#FFFFFF',
        accent: '#00C853', // для акций и скидок
      },
    },
  },
  
  // Анимации и эффекты
  effects: {
    glow: {
      default: '0 0 20px rgba(255, 79, 150, 0.3)',
      success: '0 0 20px rgba(0, 200, 83, 0.3)',
      warning: '0 0 20px rgba(255, 149, 0, 0.3)',
    },
    gradient: {
      hover: {
        filter: 'brightness(1.1) saturate(1.2)',
        transform: 'scale(1.02)',
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
      },
    },
  },
  
  // Компоненты с поддержкой тем
  components: {
    // Общие компоненты
    common: {
      card: {
        light: {
          background: '#FFFFFF',
          border: '1px solid rgba(255, 149, 0, 0.2)',
          shadow: '0 4px 12px rgba(0, 0, 0, 0.05)',
        },
        dark: {
          background: '#2A1B3D',
          border: '1px solid rgba(255, 149, 0, 0.3)',
          shadow: '0 4px 12px rgba(0, 0, 0, 0.2)',
        },
        hover: {
          transform: 'translateY(-4px)',
          glow: '0 0 20px rgba(255, 79, 150, 0.2)',
        },
      },
      button: {
        base: {
          borderRadius: '8px',
          padding: '12px 24px',
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        },
        primary: {
          light: {
            background: 'linear-gradient(to right, #FF4F96, #6C30FF)',
            color: '#FFFFFF',
          },
          dark: {
            background: 'linear-gradient(to right, rgba(255, 79, 150, 0.9), rgba(108, 48, 255, 0.9))',
            color: '#FFFFFF',
          },
        },
        secondary: {
          light: {
            background: 'transparent',
            border: '2px solid #FF4F96',
            color: '#FF4F96',
          },
          dark: {
            background: 'transparent',
            border: '2px solid rgba(255, 79, 150, 0.9)',
            color: '#FFFFFF',
          },
        },
      },
    },
    
    // Компоненты Studio
    studio: {
      workspace: {
        light: {
          background: 'linear-gradient(135deg, rgba(217, 78, 255, 0.1), rgba(0, 200, 83, 0.1))',
          card: {
            border: '1px solid #FF9500',
            shadow: '0 4px 12px rgba(255, 149, 0, 0.1)',
          },
        },
        dark: {
          background: 'linear-gradient(135deg, rgba(217, 78, 255, 0.2), rgba(0, 200, 83, 0.2))',
          card: {
            border: '1px solid rgba(255, 149, 0, 0.5)',
            shadow: '0 4px 12px rgba(255, 149, 0, 0.2)',
          },
        },
      },
      buttons: {
        save: {
          background: 'linear-gradient(to bottom, #FF4F96, #6C30FF)',
          color: '#FFFFFF',
          hover: {
            filter: 'brightness(1.1)',
          },
        },
        publish: {
          background: 'linear-gradient(to bottom, #FF4F96, #6C30FF)',
          color: '#FFFFFF',
          hover: {
            filter: 'brightness(1.1)',
          },
        },
        addProduct: {
          background: '#FF9500',
          color: '#FFFFFF',
          hover: {
            border: '2px solid #00C853',
            transform: 'scale(1.02)',
          },
        },
      },
    },
    
    // Компоненты Marketbase
    marketbase: {
      shop: {
        light: {
          background: '#FFFFFF',
          border: '1px solid #FF9500',
          rating: {
            color: '#00C853',
            background: 'rgba(0, 200, 83, 0.1)',
          },
        },
        dark: {
          background: '#2A1B3D',
          border: '1px solid rgba(255, 149, 0, 0.5)',
          rating: {
            color: '#00C853',
            background: 'rgba(0, 200, 83, 0.2)',
          },
        },
      },
      filters: {
        light: {
          background: '#6C30FF',
          text: '#FFFFFF',
          active: {
            background: 'linear-gradient(to right, #FF4F96, #D94EFF)',
          },
        },
        dark: {
          background: 'rgba(108, 48, 255, 0.8)',
          text: '#FFFFFF',
          active: {
            background: 'linear-gradient(to right, rgba(255, 79, 150, 0.9), rgba(217, 78, 255, 0.9))',
          },
        },
      },
      buttons: {
        subscribe: {
          background: 'linear-gradient(to bottom, #FF4F96, #6C30FF)',
          color: '#FFFFFF',
          hover: {
            filter: 'brightness(1.1)',
          },
        },
        buy: {
          background: '#FF9500',
          color: '#FFFFFF',
          shadow: '0 4px 12px rgba(0, 200, 83, 0.3)',
          hover: {
            transform: 'translateY(-2px)',
            shadow: '0 6px 16px rgba(0, 200, 83, 0.4)',
          },
        },
        review: {
          background: '#D94EFF',
          color: '#FFFFFF',
          hover: {
            filter: 'brightness(1.1)',
          },
        },
      },
      promotions: {
        background: 'rgba(0, 200, 83, 0.1)',
        color: '#00C853',
        border: '1px solid rgba(0, 200, 83, 0.2)',
      },
    },
  },
  
  // Анимации
  animation: {
    timing: {
      fast: '150ms',
      normal: '300ms',
      slow: '500ms',
    },
    easing: {
      bounce: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
      smooth: 'cubic-bezier(0.4, 0, 0.2, 1)',
      spring: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)',
    },
    keyframes: {
      fadeIn: {
        from: { opacity: 0, transform: 'translateY(-10px)' },
        to: { opacity: 1, transform: 'translateY(0)' },
      },
      glow: {
        '0%': { boxShadow: '0 0 5px rgba(255, 79, 150, 0.2)' },
        '50%': { boxShadow: '0 0 20px rgba(255, 79, 150, 0.4)' },
        '100%': { boxShadow: '0 0 5px rgba(255, 79, 150, 0.2)' },
      },
    },
  },
  
  // Тени
  shadows: {
    sm: '0 2px 4px rgba(108, 48, 255, 0.1)',
    md: '0 4px 8px rgba(108, 48, 255, 0.15)',
    lg: '0 8px 16px rgba(108, 48, 255, 0.2)',
  },
  
  // Скругления
  borderRadius: {
    sm: '0.375rem',
    md: '0.5rem',
    lg: '1rem',
    full: '9999px',
  },
  
  // Доступность
  accessibility: {
    contrast: {
      light: {
        textOnGradient: {
          color: '#FFFFFF',
          textShadow: '0 1px 2px rgba(0, 0, 0, 0.1)',
        },
      },
      dark: {
        textOnGradient: {
          color: '#FFFFFF',
          textShadow: '0 1px 2px rgba(0, 0, 0, 0.2)',
        },
      },
    },
    focus: {
      outline: '2px solid #FF4F96',
      outlineOffset: '2px',
      boxShadow: '0 0 0 4px rgba(255, 79, 150, 0.2)',
    },
  },
}; 