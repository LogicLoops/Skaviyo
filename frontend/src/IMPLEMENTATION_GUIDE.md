# Skaviyo Homepage Dashboard - Implementation Guide

## 📁 Project Structure

```
src/
├── components/
│   ├── shared/
│   │   ├── Button.tsx          # Reusable button component (primary, secondary, tertiary)
│   │   └── Icons.tsx           # SVG icon components (Search, Wishlist, Cart, Return, Menu, Location)
│   ├── header/
│   │   └── Header.tsx          # Sticky header with navigation and icons
│   ├── search/
│   │   └── SearchBar.tsx       # Full-width search input with icon
│   ├── announcement/
│   │   └── AnnouncementBar.tsx # Green announcement strip
│   ├── hero/
│   │   └── HeroSection.tsx     # Large hero banner with CTA buttons
│   ├── category/
│   │   ├── CategoryCard.tsx    # Individual category card component
│   │   └── CategorySection.tsx # Category grid section
│   └── index.ts                # Barrel exports for easy imports
├── pages/
│   └── HomePage.tsx            # Main homepage composition
├── constants/
│   └── categories.ts           # Category data and configuration
├── types/
│   └── index.ts                # TypeScript interfaces and types
└── App.tsx                     # Main app component
```

## 🎯 Component Overview

### 1. **Header Component** (`components/header/Header.tsx`)
Sticky header with responsive navigation.

**Features:**
- Logo on the left
- Location display (center, hidden on mobile)
- Sign In/Join button
- Icon buttons: Wishlist, Cart (with badge), Returns
- Responsive mobile menu button
- Customer Care link

**Props:**
```typescript
interface HeaderProps {
  onCartClick?: () => void;
  onWishlistClick?: () => void;
  onSignInClick?: () => void;
}
```

### 2. **Search Bar Component** (`components/search/SearchBar.tsx`)
Full-width search input with icon.

**Features:**
- Rounded input field
- Search icon inside
- Controlled input state
- Accessible (ARIA labels)
- Responsive text sizing

**Props:**
```typescript
interface SearchBarProps {
  onSearch?: (query: string) => void;
}
```

### 3. **Announcement Bar** (`components/announcement/AnnouncementBar.tsx`)
Green banner with promotional message.

**Features:**
- Centered text
- Responsive padding
- Teal-700 background

### 4. **Hero Section** (`components/hero/HeroSection.tsx`)
Large banner with background image and CTA buttons.

**Features:**
- Full-width responsive layout
- Background image with dark overlay
- "Elevate Your Everyday" heading
- "Royalty" highlight in yellow
- Two CTA buttons (Shop Collection, Create Your Own)
- Mobile responsive heights

**Props:**
```typescript
interface HeroSectionProps {
  onShopClick?: () => void;
  onCreateClick?: () => void;
}
```

### 5. **Category Card** (`components/category/CategoryCard.tsx`)
Individual category card with image and hover effects.

**Features:**
- Image with lazy loading
- Hover scale animation
- Overlay effect on hover
- Rounded corners
- Focus states for accessibility

**Props:**
```typescript
interface CategoryCardProps {
  id: string;
  title: string;
  image: string;
  onClick?: () => void;
}
```

### 6. **Category Section** (`components/category/CategorySection.tsx`)
Grid of category cards with title.

**Features:**
- Responsive grid (1-4 columns)
- Skeleton loader state
- Maps through CATEGORIES data
- Pagination-ready

**Props:**
```typescript
interface CategorySectionProps {
  onCategoryClick?: (categoryId: string) => void;
}
```

### 7. **Button Component** (`components/shared/Button.tsx`)
Reusable button with variants and sizes.

**Variants:**
- `primary`: Teal background
- `secondary`: White with teal border
- `tertiary`: Text only

**Sizes:**
- `sm`: Small (px-4 py-2)
- `md`: Medium (px-6 py-3) - default
- `lg`: Large (px-8 py-4)

**Props:**
```typescript
interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'tertiary';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  disabled?: boolean;
}
```

## 📊 Data Management

### Categories Data (`constants/categories.ts`)

```typescript
export const CATEGORIES = [
  { id: 'men', title: 'Men', image: 'url' },
  { id: 'women', title: 'Women', image: 'url' },
  // ... 8 categories total
];
```

**Categories:**
1. Men
2. Women
3. Couples
4. Group / Team
5. Sports
6. Animated
7. Create Your Own
8. Limited Edition

## 🎨 Styling Guidelines

### Tailwind CSS Classes Used

**Colors:**
- `text-teal-700`: Primary text
- `bg-teal-700`: Primary background
- `text-yellow-400`: Highlights
- `bg-gray-50`: Section backgrounds

**Spacing:**
- `px-4 md:px-6`: Horizontal padding (responsive)
- `py-3 md:py-6`: Vertical padding (responsive)

**Hover Effects:**
- `hover:scale-105`: Scale animation
- `hover:shadow-xl`: Shadow on hover
- `hover:opacity-70`: Opacity change

**Responsive:**
- `md:` prefix for tablet/desktop
- `lg:` prefix for large screens
- `sm:` prefix for small mobile

## 🚀 Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Run Development Server
```bash
npm run dev
```

### 3. Build for Production
```bash
npm run build
```

## 📝 Usage Examples

### Using Button Component
```typescript
import { Button } from './components';

<Button variant="primary" size="md" onClick={handleClick}>
  Shop Collection
</Button>
```

### Using Icons
```typescript
import { SearchIcon, CartIcon } from './components';

<SearchIcon className="w-5 h-5" />
<CartIcon className="w-6 h-6" />
```

### Adding a New Category
```typescript
// In constants/categories.ts
{
  id: 'new-category',
  title: 'New Category',
  image: 'https://example.com/image.jpg',
}
```

## ♿ Accessibility Features

- **ARIA Labels**: All interactive elements have `aria-label`
- **Focus States**: All buttons have focus rings (`focus:ring-2`)
- **Image Alt Text**: All images have descriptive alt text
- **Semantic HTML**: Proper use of `<button>`, `<header>`, `<section>`
- **Keyboard Navigation**: All elements are keyboard accessible

## 🔄 Component Flow

```
App.tsx
  ↓
HomePage.tsx
  ├─ Header (navigation)
  ├─ SearchBar
  ├─ AnnouncementBar
  ├─ HeroSection (CTA)
  ├─ CategorySection
  │  └─ CategoryCard × 8
  └─ Footer
```

## 🔗 API Integration Points

These are placeholder functions in `HomePage.tsx` ready for implementation:

```typescript
handleSearch(query)              // Search functionality
handleCartClick()                // Navigate to cart
handleWishlistClick()            // Navigate to wishlist
handleSignInClick()              // Navigate to sign in
handleShopClick()                // Navigate to collection
handleCreateClick()              // Navigate to create page
handleCategoryClick(categoryId)   // Navigate to category
```

## 📱 Responsive Breakpoints

- **Mobile**: < 640px (hidden elements: location, sign in text)
- **Tablet**: 640px - 1024px (md:)
- **Desktop**: > 1024px (lg:)

## ✨ Future Enhancements

1. **Skeleton Loaders**: Already prepared in CategorySection
2. **Animations**: CSS animations for cart icon, wishlist toggle
3. **Dark Mode**: Add dark mode variant using `dark:` prefix
4. **Accessibility**: Add keyboard shortcuts, screen reader support
5. **Performance**: Image optimization, lazy loading
6. **SEO**: Meta tags, structured data

## 🐛 Common Issues & Solutions

### Issue: Images not loading
**Solution**: Check image URLs in `constants/categories.ts`

### Issue: Styling not applied
**Solution**: Ensure Tailwind CSS is properly configured in vite.config.ts

### Issue: Components not rendering
**Solution**: Check imports and barrel exports in `components/index.ts`

## 📚 Additional Resources

- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [React Documentation](https://react.dev)
- [TypeScript Handbook](https://www.typescriptlang.org/docs)

---

**Last Updated:** 2026-04-08
**Version:** 1.0.0
