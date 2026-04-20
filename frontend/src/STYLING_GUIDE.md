# Skaviyo Frontend - Styling & Best Practices Guide

## 🎨 Tailwind CSS Class Conventions

### Color Palette (Skaviyo Brand)

```
Primary (Teal):
  - text-teal-700       → Primary text/CTAs
  - bg-teal-700        → Primary buttons
  - hover:bg-teal-800  → Button hover state
  - focus:ring-teal-500 → Focus state

Accent (Yellow/Gold):
  - text-yellow-400    → Highlights ("Royalty")
  - text-yellow-500    → Secondary highlights

Neutral:
  - text-gray-900      → Headings
  - text-gray-600      → Secondary text
  - text-gray-400      → Tertiary text
  - bg-gray-50         → Light backgrounds
  - bg-gray-100        → Section separators

States:
  - text-white         → Inverse (dark backgrounds)
  - text-red-500       → Badges, alerts
```

### Spacing System

```
Padding/Margin Scale:
  xs: 0.5rem  (2px)
  sm: 1rem    (4px)
  md: 1.5rem  (6px)
  lg: 2rem    (8px)
  xl: 3rem    (12px)
  2xl: 4rem   (16px)

Responsive Padding:
  px-4 md:px-6 lg:px-8  → Horizontal
  py-6 md:py-8 lg:py-12 → Vertical
  gap-4 md:gap-6        → Grid gaps
```

## 📐 Component Sizing

### Typography

```typescript
// Headings
text-2xl md:text-3xl lg:text-4xl  // Section title
text-3xl md:text-4xl lg:text-5xl  // Hero heading
text-sm md:text-base              // Body text

// Font weights
font-bold      → Headings, CTAs
font-semibold  → Subheadings
font-medium    → Secondary text
font-normal    → Body copy
```

### Interactive Elements

```typescript
// Button sizes
sm:  px-4 py-2 text-sm        // Small buttons
md:  px-6 py-3 text-base      // Default buttons
lg:  px-8 py-4 text-lg        // Hero CTAs

// Icon sizes
w-4 h-4   → Input icons
w-5 h-5   → Header icons
w-6 h-6   → Large icons
```

### Grid Layouts

```typescript
// Category grid (responsive)
grid-cols-1        // Mobile: 1 column
sm:grid-cols-2     // Tablet: 2 columns
md:grid-cols-3     // Desktop: 3 columns
lg:grid-cols-4     // Large: 4 columns

// Gap between items
gap-4 md:gap-6     // 16px mobile, 24px desktop
```

## ✨ Transition & Animation Classes

```typescript
// All transitions should include duration and easing
transition-all duration-300       // Standard animation
transition-colors duration-200    // Color change only
transition-transform duration-300 // Scale/translate

// Scale on hover (images)
group-hover:scale-105             // 5% zoom in
transition-transform duration-300 // Smooth animation

// Opacity changes
hover:opacity-70                  // Slight fade
transition-opacity duration-300   // Smooth transition

// Shadow elevation
hover:shadow-xl                   // Lift effect on hover
shadow-sm                         // Subtle default shadow
```

## 🎯 Best Practices Applied

### 1. Component Structure

✅ **DO:**
```typescript
// Small, focused component
const CategoryCard = ({ title, image, onClick }: Props) => (
  <button onClick={onClick} className="...">
    <img src={image} alt={title} />
    <h3>{title}</h3>
  </button>
);
```

❌ **DON'T:**
```typescript
// Everything in one large component
const HomePage = () => {
  // 500+ lines of JSX mixing all features
};
```

### 2. Props & Types

✅ **DO:**
```typescript
interface ButtonProps {
  variant?: 'primary' | 'secondary';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
  onClick?: () => void;
}
```

❌ **DON'T:**
```typescript
// Implicit any types
const Button = (props: any) => {...};
```

### 3. Class Organization

✅ **DO:**
```typescript
const className = `
  base-styles
  variant-styles
  size-styles
  state-styles
  ${customClassName}
`;
```

❌ **DON'T:**
```typescript
const className = "px-4 py-2 text-sm font-bold rounded-lg bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300";
```

### 4. Responsive Design

✅ **DO:**
```typescript
<div className="
  px-4 md:px-6 lg:px-8
  py-6 md:py-8 lg:py-12
  text-base md:text-lg
">
```

❌ **DON'T:**
```typescript
// Hard-coded sizes for single breakpoint
<div className="px-8 py-12 text-lg">
```

### 5. Accessibility

✅ **DO:**
```typescript
<button
  onClick={handleClick}
  aria-label="Add to cart"
  className="focus:ring-2 focus:ring-offset-2"
>
  <CartIcon alt="" />
</button>

<img src={url} alt="Product image" loading="lazy" />
```

❌ **DON'T:**
```typescript
<div onClick={handleClick} className="...">
  Add to cart
</div>

<img src={url} />
```

### 6. Performance

✅ **DO:**
```typescript
// Lazy load images
<img loading="lazy" src={url} alt={title} />

// Memoize expensive computations
const memoizedValue = useMemo(() => expensiveCalc(), [deps]);

// Use skeleton loaders
{isLoading && <div className="animate-pulse" />}
```

❌ **DON'T:**
```typescript
// Blocking image loads
<img src={url} alt={title} />

// Inline calculations in render
{complexCalculation().map(item => ...)}
```

### 7. Constants & Data

✅ **DO:**
```typescript
// Separate data from components
// constants/categories.ts
export const CATEGORIES = [{ id: '1', title: 'Men', image: 'url' }];

// components/CategorySection.tsx
import { CATEGORIES } from '../constants/categories';
```

❌ **DON'T:**
```typescript
// Hardcoded data in components
const CategorySection = () => {
  const categories = [{ id: '1', title: 'Men', image: 'url' }];
  return categories.map(cat => ...);
};
```

## 🎨 Design Tokens

### Colors
```typescript
const colors = {
  primary: 'teal-700',
  primaryHover: 'teal-800',
  secondary: 'gray-100',
  accent: 'yellow-400',
  text: {
    primary: 'gray-900',
    secondary: 'gray-600',
    tertiary: 'gray-400',
  },
};
```

### Spacing
```typescript
const spacing = {
  xs: '0.5rem',
  sm: '1rem',
  md: '1.5rem',
  lg: '2rem',
  xl: '3rem',
};
```

### Shadows
```typescript
const shadows = {
  sm: 'shadow-sm',      // Subtle
  md: 'shadow',         // Default
  lg: 'shadow-lg',      // Strong
  xl: 'shadow-xl',      // Hero sections
};
```

## 📝 Code Style Guidelines

### Formatting

```typescript
// Multi-line JSX
<div
  className="
    px-4 md:px-6
    py-3 md:py-4
    rounded-lg
    bg-teal-700
    text-white
  "
>
  Content
</div>

// Event handlers
const handleClick = () => {
  // Implementation
};

// Conditional rendering
{isVisible && <Component />}

// Lists
{items.map((item) => (
  <Item key={item.id} {...item} />
))}
```

### Comments

```typescript
// Use comments for WHY, not WHAT
// ✅ Explain business logic
// Shows only active products after filtering
const activeProducts = products.filter(p => p.active);

// ❌ Don't explain obvious code
// Filter products
const filteredProducts = products.filter(p => p.active);
```

## 🚀 Performance Tips

1. **Images**
   - Use `loading="lazy"`
   - Provide proper `alt` text
   - Use appropriate image sizes
   - Consider WebP format

2. **CSS**
   - Tailwind purges unused classes in production
   - No inline styles
   - Use CSS modules if needed

3. **React**
   - Avoid unnecessary re-renders with `useMemo` and `useCallback`
   - Lazy load routes with `React.lazy()`
   - Use proper key props in lists

4. **Bundle Size**
   - Tree-shake unused exports
   - Dynamic imports for heavy components
   - Code splitting by route

## 🔍 QA Checklist

- [ ] All interactive elements have focus states
- [ ] Images have alt text
- [ ] Responsive design tested on mobile/tablet/desktop
- [ ] Color contrast meets WCAG standards
- [ ] No console errors or warnings
- [ ] Page loads within acceptable time
- [ ] All links and buttons are clickable
- [ ] Touch targets are at least 44x44px (mobile)

---

**Last Updated:** 2026-04-08
**Version:** 1.0.0
