# 🚀 Quick Reference - Skaviyo Frontend

## 📁 Key Paths

```
src/
├── components/
│   ├── shared/       → Button, Icons (reusable)
│   ├── header/       → Header.tsx
│   ├── search/       → SearchBar.tsx
│   ├── announcement/ → AnnouncementBar.tsx
│   ├── hero/         → HeroSection.tsx
│   ├── category/     → CategoryCard, CategorySection
│   └── index.ts      → Barrel exports
├── pages/HomePage.tsx
├── constants/categories.ts
├── types/index.ts
└── App.tsx
```

## 🔧 Common Tasks

### Add a New Component

1. Create folder: `src/components/feature/`
2. Create file: `src/components/feature/FeatureName.tsx`
3. Define interfaces in `types/index.ts`
4. Export in `components/index.ts`
5. Import in page/parent component

### Add a New Category

```typescript
// In constants/categories.ts
{
  id: 'unique-id',
  title: 'Category Name',
  image: 'https://example.com/image.jpg',
}
```

### Create a New Button Style

```typescript
// In components/shared/Button.tsx - add variant
primary: 'bg-teal-700 text-white hover:bg-teal-800',
newVariant: 'bg-blue-600 text-white hover:bg-blue-700',
```

## 🎨 Quick Styling

### Button
```typescript
<Button variant="primary" size="md">Click me</Button>
// Variants: primary, secondary, tertiary
// Sizes: sm, md, lg
```

### Icon
```typescript
<SearchIcon className="w-5 h-5" />
<CartIcon className="w-6 h-6" />
// All icons: SearchIcon, WishlistIcon, CartIcon, ReturnIcon, MenuIcon, LocationIcon
```

### Responsive Text
```typescript
<h1 className="text-2xl md:text-3xl lg:text-4xl">Heading</h1>
// Mobile: 24px | Tablet: 30px | Desktop: 36px
```

### Grid
```typescript
<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
  {/* 1 col mobile, 2 tablet, 3 desktop, 4 large */}
</div>
```

## 📦 Imports

### Components
```typescript
import { Button, SearchIcon, Header, SearchBar } from '@/components';
// or specific
import Button from '@/components/shared/Button';
```

### Types
```typescript
import type { ButtonProps, CategoryCardProps } from '@/types';
```

### Constants
```typescript
import { CATEGORIES } from '@/constants/categories';
```

## 🎯 Component Props Cheatsheet

### Button
```typescript
<Button
  variant="primary"      // 'primary' | 'secondary' | 'tertiary'
  size="md"             // 'sm' | 'md' | 'lg'
  onClick={handleClick}
  disabled={false}
  className="optional"  // Additional Tailwind classes
>
  Text
</Button>
```

### CategoryCard
```typescript
<CategoryCard
  id="unique-id"
  title="Category Name"
  image="https://url.jpg"
  onClick={() => navigate()}
/>
```

### Header
```typescript
<Header
  onCartClick={handleCart}
  onWishlistClick={handleWishlist}
  onSignInClick={handleSignIn}
/>
```

## 🎨 Color Quick Reference

```
Primary:    teal-700   (Dark teal)
Primary Hover: teal-800
Accent:     yellow-400 (Gold)
Dark:       gray-900
Medium:     gray-600
Light:      gray-50
White:      white
```

## 📱 Responsive Breakpoints

```
Mobile:   < 640px    (default styles)
Tablet:   640px-1024px (sm: md: lg:)
Desktop:  > 1024px   (xl:)
```

## ✅ Before Committing

- [ ] No console errors
- [ ] All props typed with TypeScript
- [ ] Responsive on mobile/tablet/desktop
- [ ] Accessibility: alt text, aria-labels, focus states
- [ ] No hardcoded data
- [ ] Trailing commas in multi-line JSX
- [ ] Components in separate files
- [ ] Meaningful variable names

## 🔄 Common Patterns

### Conditional Rendering
```typescript
{condition && <Component />}
{condition ? <ComponentA /> : <ComponentB />}
```

### Lists
```typescript
{items.map(item => (
  <Component key={item.id} {...item} />
))}
```

### Event Handlers
```typescript
const handleClick = (id: string) => {
  console.log('Clicked:', id);
};

<Button onClick={() => handleClick('123')}>Click</Button>
```

### Optional Props
```typescript
interface Props {
  required: string;
  optional?: string;  // Optional
  onEvent?: () => void;
}
```

## 🐛 Debugging Tips

1. **Styling not applied?**
   - Check Tailwind syntax
   - Verify class names in browser DevTools
   - Check responsive prefix (md:, lg:)

2. **Component not rendering?**
   - Check import path
   - Verify export in barrel files
   - Check props being passed

3. **Types error?**
   - Verify interface definition
   - Check prop spelling
   - Ensure types are exported/imported

4. **Performance issue?**
   - Use React DevTools Profiler
   - Check for unnecessary re-renders
   - Verify images are optimized

## 📚 File Templates

### New Component Template
```typescript
import type { CustomProps } from '../../types';

const CustomComponent = ({ prop1, prop2 }: CustomProps) => {
  return (
    <div className="flex items-center gap-4">
      {/* JSX */}
    </div>
  );
};

export default CustomComponent;
```

### New Type Template
```typescript
export interface NewComponentProps {
  required: string;
  optional?: string;
  onClick?: () => void;
}
```

## 🎓 Learning Resources

- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [React Docs](https://react.dev)
- [TypeScript Handbook](https://www.typescriptlang.org/docs)

---

**Version:** 1.0.0 | **Updated:** 2026-04-08
