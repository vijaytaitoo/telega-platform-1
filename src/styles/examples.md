# Примеры использования стилей Tele•Ga

## Studio

### Рабочая область

```tsx
const Workspace = styled.div`
  background: ${BrandConfig.studio.workspace.background};
  min-height: 100vh;
  padding: 2rem;
`;

const ProductCard = styled.div`
  background: ${BrandConfig.studio.workspace.card.background};
  border: 1px solid ${BrandConfig.studio.workspace.card.border};
  border-radius: ${BrandConfig.borderRadius.lg};
  padding: 1.5rem;
  transition: all ${BrandConfig.animation.timing.normal} ${BrandConfig.animation.easing.smooth};
  
  &:hover {
    transform: ${BrandConfig.studio.workspace.card.hover.transform};
    box-shadow: ${BrandConfig.studio.workspace.card.hover.shadow};
  }
`;

const GradientHeading = styled.h2`
  background: ${BrandConfig.components.heading.background};
  -webkit-background-clip: ${BrandConfig.components.heading.webkitBackgroundClip};
  -webkit-text-fill-color: ${BrandConfig.components.heading.webkitTextFillColor};
  font-weight: ${BrandConfig.components.heading.fontWeight};
  margin-bottom: 1.5rem;
`;
```

### Кнопки действий

```tsx
const SaveButton = styled.button`
  background: ${BrandConfig.studio.buttons.save.background};
  color: ${BrandConfig.studio.buttons.save.color};
  padding: 0.75rem 1.5rem;
  border-radius: ${BrandConfig.borderRadius.md};
  transition: all ${BrandConfig.animation.timing.fast} ${BrandConfig.animation.easing.default};
  
  &:hover {
    filter: ${BrandConfig.studio.buttons.save.hover.filter};
  }
`;

const AddProductButton = styled.button`
  background: ${BrandConfig.studio.buttons.addProduct.background};
  color: ${BrandConfig.studio.buttons.addProduct.color};
  padding: 0.75rem 1.5rem;
  border-radius: ${BrandConfig.borderRadius.md};
  transition: all ${BrandConfig.animation.timing.fast} ${BrandConfig.animation.easing.default};
  
  &:hover {
    border: ${BrandConfig.studio.buttons.addProduct.hover.border};
    transform: ${BrandConfig.studio.buttons.addProduct.hover.transform};
  }
`;
```

## Marketbase

### Каталог магазинов

```tsx
const ShopCard = styled.div`
  background: ${BrandConfig.marketbase.catalog.shop.background};
  border: 1px solid ${BrandConfig.marketbase.catalog.shop.border};
  border-radius: ${BrandConfig.borderRadius.lg};
  padding: 1.5rem;
  color: ${BrandConfig.interface.text.dark};
`;

const ShopRating = styled.div`
  background: ${BrandConfig.marketbase.catalog.shop.rating.background};
  color: ${BrandConfig.marketbase.catalog.shop.rating.color};
  padding: 0.25rem 0.5rem;
  border-radius: ${BrandConfig.borderRadius.sm};
  display: inline-flex;
  align-items: center;
  gap: 0.25rem;
`;
```

### Фильтры

```tsx
const FiltersPanel = styled.div`
  background: ${BrandConfig.marketbase.filters.background};
  padding: 1rem;
  border-radius: ${BrandConfig.borderRadius.lg};
`;

const FilterButton = styled.button<{ active?: boolean }>`
  background: ${props => props.active 
    ? BrandConfig.marketbase.filters.active.background 
    : BrandConfig.marketbase.filters.inactive.background};
  color: ${props => props.active 
    ? BrandConfig.marketbase.filters.active.color 
    : BrandConfig.marketbase.filters.inactive.color};
  padding: 0.5rem 1rem;
  border-radius: ${BrandConfig.borderRadius.full};
  transition: all ${BrandConfig.animation.timing.fast} ${BrandConfig.animation.easing.default};
  
  &:hover {
    background: ${props => props.active 
      ? BrandConfig.marketbase.filters.active.background 
      : BrandConfig.marketbase.filters.inactive.hover.background};
  }
`;
```

### Кнопки действий

```tsx
const BuyButton = styled.button`
  background: ${BrandConfig.marketbase.buttons.buy.background};
  color: ${BrandConfig.marketbase.buttons.buy.color};
  padding: 0.75rem 1.5rem;
  border-radius: ${BrandConfig.borderRadius.md};
  box-shadow: ${BrandConfig.marketbase.buttons.buy.shadow};
  transition: all ${BrandConfig.animation.timing.fast} ${BrandConfig.animation.easing.default};
  
  &:hover {
    transform: ${BrandConfig.marketbase.buttons.buy.hover.transform};
    box-shadow: ${BrandConfig.marketbase.buttons.buy.hover.shadow};
  }
`;

const SubscribeButton = styled.button`
  background: ${BrandConfig.marketbase.buttons.subscribe.background};
  color: ${BrandConfig.marketbase.buttons.subscribe.color};
  padding: 0.75rem 1.5rem;
  border-radius: ${BrandConfig.borderRadius.md};
  transition: all ${BrandConfig.animation.timing.fast} ${BrandConfig.animation.easing.default};
  
  &:hover {
    filter: ${BrandConfig.marketbase.buttons.subscribe.hover.filter};
  }
`;

const ReviewButton = styled.button`
  background: ${BrandConfig.marketbase.buttons.review.background};
  color: ${BrandConfig.marketbase.buttons.review.color};
  padding: 0.75rem 1.5rem;
  border-radius: ${BrandConfig.borderRadius.md};
  transition: all ${BrandConfig.animation.timing.fast} ${BrandConfig.animation.easing.default};
  
  &:hover {
    filter: ${BrandConfig.marketbase.buttons.review.hover.filter};
  }
`;
```

### Акции и промо

```tsx
const PromoTag = styled.div`
  background: ${BrandConfig.marketbase.promotions.background};
  color: ${BrandConfig.marketbase.promotions.color};
  border: ${BrandConfig.marketbase.promotions.border};
  padding: 0.25rem 0.75rem;
  border-radius: ${BrandConfig.borderRadius.full};
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
`;
```

## Общие компоненты

### Шапка

```tsx
const Header = styled.header`
  background: ${BrandConfig.components.header.background};
  padding: 1rem;
  display: flex;
  align-items: center;
  gap: 1rem;
  color: ${BrandConfig.components.header.text};
`;

const HeaderButton = styled.button`
  background: ${BrandConfig.components.header.buttons.categories.background};
  color: ${BrandConfig.components.header.buttons.categories.color};
  padding: 0.5rem 1rem;
  border-radius: ${BrandConfig.borderRadius.md};
  transition: all ${BrandConfig.animation.timing.fast} ${BrandConfig.animation.easing.default};
  
  &:hover {
    background: ${BrandConfig.components.header.buttons.categories.hover.background};
  }
`;

const SearchButton = styled(HeaderButton)`
  background: ${BrandConfig.components.header.buttons.search.background};
  
  &:hover {
    background: ${BrandConfig.components.header.buttons.search.hover.background};
  }
`;
``` 