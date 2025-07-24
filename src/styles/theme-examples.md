# Примеры использования тем и адаптивности

## Основной контейнер с поддержкой тем

```tsx
const ThemeProvider = styled.div<{ theme: 'light' | 'dark' }>`
  background: ${props => BrandConfig.themes[props.theme].background};
  color: ${props => BrandConfig.themes[props.theme].text.primary};
  min-height: 100vh;
  transition: all ${BrandConfig.animation.timing.normal} ${BrandConfig.animation.easing.smooth};
`;

const Container = styled.div`
  max-width: ${BrandConfig.breakpoints.desktop};
  margin: 0 auto;
  padding: 0 1rem;
  
  @media (max-width: ${BrandConfig.breakpoints.tablet}) {
    padding: 0 0.5rem;
  }
`;
```

## Адаптивная карточка с градиентным эффектом

```tsx
const AdaptiveCard = styled.div<{ theme: 'light' | 'dark' }>`
  background: ${props => BrandConfig.components.common.card[props.theme].background};
  border: ${props => BrandConfig.components.common.card[props.theme].border};
  box-shadow: ${props => BrandConfig.components.common.card[props.theme].shadow};
  border-radius: ${BrandConfig.borderRadius.lg};
  padding: 1.5rem;
  
  // Адаптивный размер для мобильных устройств
  @media (max-width: ${BrandConfig.breakpoints.mobile}) {
    padding: 1rem;
  }
  
  // Эффект при наведении
  &:hover {
    transform: ${BrandConfig.components.common.card.hover.transform};
    box-shadow: ${BrandConfig.effects.glow.default};
  }
  
  // Анимация появления
  animation: fadeIn ${BrandConfig.animation.timing.normal} ${BrandConfig.animation.easing.spring};
  
  @keyframes fadeIn {
    ${BrandConfig.animation.keyframes.fadeIn}
  }
`;
```

## Градиентный текст с поддержкой тем

```tsx
const GradientText = styled.h2<{ theme: 'light' | 'dark' }>`
  background: ${props => BrandConfig.colors.gradients.heading[props.theme]};
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  font-size: 2rem;
  
  // Адаптивный размер шрифта
  @media (max-width: ${BrandConfig.breakpoints.tablet}) {
    font-size: 1.5rem;
  }
  
  // Улучшенная читаемость на градиентном фоне
  ${props => BrandConfig.accessibility.contrast[props.theme].textOnGradient}
`;
```

## Кнопка с градиентным свечением

```tsx
const GlowButton = styled.button<{ theme: 'light' | 'dark' }>`
  ${BrandConfig.components.common.button.base}
  background: ${props => BrandConfig.components.common.button.primary[props.theme].background};
  color: ${props => BrandConfig.components.common.button.primary[props.theme].color};
  
  // Эффект свечения при наведении
  &:hover {
    ${BrandConfig.effects.gradient.hover}
    box-shadow: ${BrandConfig.effects.glow.default};
  }
  
  // Анимация пульсации
  &:active {
    animation: glow ${BrandConfig.animation.timing.slow} ${BrandConfig.animation.easing.bounce} infinite;
  }
  
  @keyframes glow {
    ${BrandConfig.animation.keyframes.glow}
  }
  
  // Фокус для доступности
  &:focus {
    outline: ${BrandConfig.accessibility.focus.outline};
    outline-offset: ${BrandConfig.accessibility.focus.outlineOffset};
    box-shadow: ${BrandConfig.accessibility.focus.boxShadow};
  }
`;
```

## Адаптивная сетка карточек

```tsx
const CardGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 1.5rem;
  
  @media (max-width: ${BrandConfig.breakpoints.tablet}) {
    grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
    gap: 1rem;
  }
  
  @media (max-width: ${BrandConfig.breakpoints.mobile}) {
    grid-template-columns: 1fr;
    gap: 0.75rem;
  }
`;
```

## Компонент переключения темы

```tsx
const ThemeToggle = styled.button<{ theme: 'light' | 'dark' }>`
  ${BrandConfig.components.common.button.base}
  background: ${props => props.theme === 'light' 
    ? BrandConfig.colors.brand.violet 
    : BrandConfig.colors.brand.pink};
  color: ${BrandConfig.themes[props.theme].text.primary};
  border-radius: ${BrandConfig.borderRadius.full};
  padding: 0.5rem;
  position: fixed;
  bottom: 1rem;
  right: 1rem;
  z-index: 1000;
  
  // Адаптивное позиционирование
  @media (max-width: ${BrandConfig.breakpoints.mobile}) {
    bottom: 0.5rem;
    right: 0.5rem;
  }
  
  // Эффект при наведении
  &:hover {
    transform: scale(1.1);
    box-shadow: ${props => props.theme === 'light'
      ? BrandConfig.effects.glow.default
      : BrandConfig.effects.glow.success};
  }
  
  // Плавная анимация при смене темы
  transition: all ${BrandConfig.animation.timing.normal} ${BrandConfig.animation.easing.spring};
`;
```

## Адаптивная навигация

```tsx
const Navigation = styled.nav<{ theme: 'light' | 'dark' }>`
  background: ${props => BrandConfig.gradients.header[props.theme]};
  padding: 1rem;
  
  // Десктопная версия
  @media (min-width: ${BrandConfig.breakpoints.desktop}) {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  
  // Планшетная версия
  @media (max-width: ${BrandConfig.breakpoints.tablet}) {
    padding: 0.75rem;
  }
  
  // Мобильная версия
  @media (max-width: ${BrandConfig.breakpoints.mobile}) {
    flex-direction: column;
    gap: 0.5rem;
  }
`;

const NavButton = styled.button<{ theme: 'light' | 'dark' }>`
  ${BrandConfig.components.common.button.base}
  background: ${props => BrandConfig.components.common.button.secondary[props.theme].background};
  color: ${props => BrandConfig.components.common.button.secondary[props.theme].color};
  border: ${props => BrandConfig.components.common.button.secondary[props.theme].border};
  
  // Адаптивный размер
  @media (max-width: ${BrandConfig.breakpoints.mobile}) {
    width: 100%;
    padding: 0.75rem;
  }
  
  &:hover {
    background: ${props => props.theme === 'light'
      ? 'rgba(255, 79, 150, 0.1)'
      : 'rgba(255, 79, 150, 0.2)'};
  }
`;
``` 