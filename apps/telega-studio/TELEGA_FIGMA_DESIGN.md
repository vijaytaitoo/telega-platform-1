# Tele•Ga Figma Design Documentation

## Design System Overview

- **Brand Colors**: Gradient #F28C38 → #6C5CE7 (Orange to Purple)
- **Typography**: Modern sans-serif, 24px headers, 18px body text
- **Layout**: Clean, card-based design with 16px padding
- **Style**: Professional, modern, Telegram-integrated

---

## Page Designs

### 1. Wallet Page

**Purpose**: User balance management and transaction history

**Components**:

- **Header**: "Кошелёк" (24px, #000000)
- **Balance Display**: "Баланс: 0 Teleton" (18px)
- **Top-up Button**: Gradient background (#F28C38 → #6C5CE7)
- **Transaction List**: Scrollable history of transactions

**Design Notes**:

- Clean, minimal interface
- Prominent balance display
- Easy access to top-up functionality
- Transaction history for transparency

---

### 2. Studio Page (Shop Constructor)

**Purpose**: Drag-and-drop shop creation interface

**Components**:

- **Header**: "Конструктор" (24px, #000000)
- **Drag-Drop Area**: Product Block, Text Block components
- **Save Button**: Gradient background (#F28C38 → #6C5CE7)

**Design Notes**:

- Intuitive drag-and-drop interface
- Visual component library
- Real-time preview
- One-click save functionality

---

### 3. Marketbase Page

**Purpose**: Product and service discovery marketplace

**Components**:

- **Header**: "Маркетбейс" (24px, #000000)
- **Filter System**: Category, City options
- **Product Grid**: Product 1, Product 2, Service 1

**Design Notes**:

- Advanced filtering capabilities
- Grid layout for product display
- Search and filter functionality
- Responsive design for mobile

---

### 4. CRM Page

**Purpose**: Customer relationship management

**Components**:

- **Header**: "CRM" (24px, #000000)
- **Data Table**: Name, Email, Segment columns
- **Notification Button**: Gradient background (#F28C38 → #6C5CE7)

**Design Notes**:

- Professional data management interface
- Client segmentation tools
- Push notification system
- Export functionality

---

### 5. Affiliate Page

**Purpose**: Referral program management

**Components**:

- **Header**: "Партнёрская программа" (24px, #000000)
- **Generate Link Button**: Gradient background (#F28C38 → #6C5CE7)
- **Stats Display**: "Рефералы: 0" (18px)
- **Earnings Display**: "Заработано Teleton: 0" (18px)

**Design Notes**:

- Clear referral link generation
- Real-time statistics display
- Earnings tracking
- Social sharing integration

---

### 6. Landing Page

**Purpose**: Main entry point and feature showcase

**Components**:

- **Header**: "Tele•Ga" (36px, #000000)
- **Tagline**: "Создайте свой бизнес в Telegram" (24px)
- **CTA Button**: "Открыть приложение" (Gradient background)
- **Feature Grid**: Constructor, CRM, Affiliate Program

**Design Notes**:

- Strong brand presence
- Clear value proposition
- Feature highlights
- Direct app access

---

## Design Specifications

### Color Palette

```css
Primary Gradient: linear-gradient(90deg, #F28C38, #6C5CE7)
Background: #FFFFFF
Text Primary: #000000
Text Secondary: #666666
```

### Typography Scale

```css
Header Large: 36px (Landing)
Header Medium: 24px (Page titles)
Body Large: 18px (Important text)
Body Regular: 16px (Default text)
```

### Component Library

- **Buttons**: Gradient background, rounded corners
- **Cards**: White background, subtle shadows
- **Tables**: Clean borders, readable data
- **Forms**: Consistent input styling
- **Lists**: Clear hierarchy, easy scanning

### Responsive Design

- **Mobile First**: Optimized for Telegram WebApp
- **Touch Friendly**: Large tap targets
- **Readable**: Adequate contrast ratios
- **Fast Loading**: Optimized assets

---

## User Experience Flow

### Primary User Journey

1. **Landing** → Discover Tele•Ga features
2. **Studio** → Create shop with drag-and-drop
3. **Marketbase** → Browse and purchase
4. **Wallet** → Manage transactions
5. **CRM** → Manage customers
6. **Affiliate** → Earn through referrals

### Key Interactions

- **Drag & Drop**: Intuitive shop building
- **One-Tap**: Quick service booking
- **Real-time**: Live balance updates
- **Push Notifications**: Customer engagement

---

## Technical Implementation

### Component Architecture

```typescript
interface Component {
  type: 'header' | 'text' | 'button' | 'list' | 'grid' | 'table';
  text?: string;
  style?: StyleObject;
  items?: string[];
}
```

### Style System

```typescript
interface StyleObject {
  fontSize?: number;
  color?: string;
  background?: string;
  padding?: number;
}
```

---

## Design Principles

### 1. Simplicity

- Clean, uncluttered interfaces
- Clear visual hierarchy
- Minimal cognitive load

### 2. Consistency

- Unified color scheme
- Standardized typography
- Consistent component patterns

### 3. Accessibility

- High contrast ratios
- Readable font sizes
- Touch-friendly targets

### 4. Performance

- Optimized assets
- Fast loading times
- Smooth animations

---

_Design Documentation for Tele•Ga_
_Target Launch: July 21, 2025_
