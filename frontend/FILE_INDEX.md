# 📑 File Index - Skaviyo Frontend

## Quick Navigation

### 🎯 Start Here
- **APP.tsx** - Main app entry point (imports HomePage)
- **pages/HomePage.tsx** - Main page (composes all components)

### 📦 Components (Reusable)

#### Shared Components
- **components/shared/Button.tsx** (106 lines)
  - Reusable button component
  - Variants: primary, secondary, tertiary
  - Sizes: sm, md, lg
  - Props: variant, size, children, onClick, className, disabled

- **components/shared/Icons.tsx** (37 lines)
  - SVG icon components
  - Icons: SearchIcon, WishlistIcon, CartIcon, ReturnIcon, MenuIcon, LocationIcon
  - Props: className (customizable)

#### Feature Components
- **components/header/Header.tsx** (88 lines)
  - Sticky navigation header
  - Logo, location, sign in, icons
  - Props: onCartClick, onWishlistClick, onSignInClick

- **components/search/SearchBar.tsx** (42 lines)
  - Full-width search input
  - Icon, placeholder, form submission
  - Props: onSearch

- **components/announcement/AnnouncementBar.tsx** (11 lines)
  - Green promotional banner
  - Fixed message about free shipping

- **components/hero/HeroSection.tsx** (59 lines)
  - Full-width hero banner
  - Background image, overlay, CTA buttons
  - Props: onShopClick, onCreateClick

- **components/category/CategoryCard.tsx** (39 lines)
  - Individual category card
  - Image, hover effects, lazy loading
  - Props: id, title, image, onClick

- **components/category/CategorySection.tsx** (57 lines)
  - Grid of 8 category cards
  - Responsive grid, skeleton loader
  - Props: onCategoryClick

- **components/index.ts** (20 lines)
  - Barrel exports for easy imports
  - Export all components and icons

### 📊 Data & Configuration

- **constants/categories.ts** (47 lines)
  - 8 category data
  - Each: id, title, image (Unsplash URL)
  - Categories: Men, Women, Couples, Group/Team, Sports, Animated, Create Your Own, Limited Edition

### 🔧 Types & Interfaces

- **types/index.ts** (26 lines)
  - CategoryCardProps
  - HeaderIconProps
  - ButtonProps

### 📚 Documentation

- **IMPLEMENTATION_GUIDE.md** (250+ lines)
  - Complete component documentation
  - Props, features, examples
  - Data handling, styling guidelines
  - Best practices, API integration points
  - Future enhancements

- **STYLING_GUIDE.md** (250+ lines)
  - Tailwind CSS conventions
  - Color palette, spacing system
  - Typography scale, animations
  - Best practices, code style
  - Performance tips, QA checklist

- **QUICK_REFERENCE.md** (200+ lines)
  - Quick lookup guide
  - Key paths, common tasks
  - Import patterns, component props
  - Responsive breakpoints
  - Debugging tips, file templates

- **PROJECT_SUMMARY.md** (400+ lines)
  - Complete project overview
  - Statistics, component details
  - Styling system, data management
  - Accessibility features
  - Getting started, next steps

- **FILE_INDEX.md** (this file)
  - File listing and purposes
  - Line counts, quick navigation

### 🔗 Configuration Files

- **package.json**
  - Dependencies: React 19, TypeScript, Tailwind v4
  - Scripts: dev, build, lint, preview
  - Versions locked

- **tsconfig.json**
  - TypeScript strict mode
  - JSX: react-jsx

- **vite.config.ts**
  - Vite configuration
  - React plugin
  - Tailwind CSS integration (@tailwindcss/vite)

- **tailwind.config.js** (if exists)
  - Tailwind CSS theme
  - Custom colors, spacing

### 🎨 Assets

- **src/assets/** - Folder for images, icons, fonts
  - Currently: empty (ready for assets)

### 🎯 Other Files

- **src/main.tsx** - React root entry
- **src/index.css** - Global styles
- **.eslintrc** - ESLint configuration
- **.gitignore** - Git ignore rules

---

## 📋 Component Sizes

| File | Lines | Type |
|------|-------|------|
| Button.tsx | 106 | Shared |
| Icons.tsx | 37 | Shared |
| Header.tsx | 88 | Feature |
| SearchBar.tsx | 42 | Feature |
| AnnouncementBar.tsx | 11 | Feature |
| HeroSection.tsx | 59 | Feature |
| CategoryCard.tsx | 39 | Feature |
| CategorySection.tsx | 57 | Feature |
| HomePage.tsx | 80 | Page |
| categories.ts | 47 | Data |
| types/index.ts | 26 | Types |
| components/index.ts | 20 | Exports |
| **TOTAL** | **~690** | **Code** |

---

## 🎯 Functional Hierarchy

```
App.tsx
└── HomePage.tsx
    ├── Header
    ├── SearchBar
    ├── AnnouncementBar
    ├── HeroSection
    │   └── Button (2 instances)
    ├── CategorySection
    │   └── CategoryCard × 8
    │       └── (uses data from categories.ts)
    └── Footer
```

---

## 🔗 File Dependencies

```
App.tsx
├── pages/HomePage.tsx
    ├── components/header/Header.tsx
    │   └── components/shared/Icons.tsx
    ├── components/search/SearchBar.tsx
    │   └── components/shared/Icons.tsx
    ├── components/announcement/AnnouncementBar.tsx
    ├── components/hero/HeroSection.tsx
    │   └── components/shared/Button.tsx
    ├── components/category/CategorySection.tsx
    │   ├── components/category/CategoryCard.tsx
    │   │   └── types/index.ts
    │   └── constants/categories.ts
    └── types/index.ts
```

---

## 📊 Statistics

- **Total Files**: 17 (excluding config)
- **Components**: 8
- **Shared Components**: 2 (Button, Icons)
- **Feature Components**: 6
- **Page Components**: 1
- **Type Files**: 1
- **Constant Files**: 1
- **Documentation Files**: 4
- **Total Lines of Code**: ~690 (components only)
- **Total Lines of Docs**: ~1,000+ (guides)

---

## 🚀 Key Files to Modify

### To Add a New Component
1. Create file in `src/components/feature/NewComponent.tsx`
2. Add types in `src/types/index.ts`
3. Export in `src/components/index.ts`
4. Use in `pages/HomePage.tsx`

### To Add More Categories
1. Edit `src/constants/categories.ts`
2. Add new object to `CATEGORIES` array
3. Component auto-renders in grid

### To Change Colors
1. Edit Tailwind classes in component files
2. All colors use `teal-*` and `yellow-*` prefixes
3. Consider updating `STYLING_GUIDE.md`

### To Add New Functionality
1. Create callback handler in `HomePage.tsx`
2. Pass to component via props
3. Component calls callback on event
4. Implement navigation/API call

---

## ♿ Accessibility

Each component includes:
- ✅ ARIA labels
- ✅ Focus states
- ✅ Alt text (images)
- ✅ Semantic HTML
- ✅ Color contrast

---

## 📱 Responsive Breakpoints

| Component | Mobile | Tablet | Desktop | Large |
|-----------|--------|--------|---------|-------|
| Header | Compact | Full | Full | Full |
| Search | Full width | Full width | Full width | Full width |
| Hero | h-96 | h-[500px] | h-[600px] | h-[600px] |
| Categories | 1 col | 2 col | 3 col | 4 col |

---

## 🔄 Import Patterns

### Recommended
```typescript
// Use barrel exports
import { Button, Header, SearchBar } from '@/components';
import type { ButtonProps, CategoryCardProps } from '@/types';
import { CATEGORIES } from '@/constants/categories';
```

### Works But Less Recommended
```typescript
// Direct imports
import Button from '@/components/shared/Button';
import type { ButtonProps } from '@/types';
```

---

## 🐛 Quick Debugging

**Component not rendering?**
- Check import in barrel export (`components/index.ts`)
- Check export statement in component file
- Verify component is used in `HomePage.tsx`

**Styling not applied?**
- Check Tailwind syntax
- Verify no conflicting classes
- Check responsive prefix (md:, lg:)
- View in browser DevTools

**Types error?**
- Check interface definition in `types/index.ts`
- Verify prop names match interface
- Check if optional (`?`)

**Image not loading?**
- Check URL in `constants/categories.ts`
- Verify image exists (Unsplash)
- Check `alt` text is present

---

## 📝 Next Files to Create

When expanding:

1. **src/pages/ProductPage.tsx** - Product detail page
2. **src/pages/CartPage.tsx** - Shopping cart
3. **src/components/product/ProductCard.tsx** - Product card
4. **src/components/footer/Footer.tsx** - Footer section
5. **src/hooks/useCart.ts** - Cart management
6. **src/services/api.ts** - API calls
7. **src/context/CartContext.tsx** - Global state

---

**Version:** 1.0.0
**Last Updated:** 2026-04-08
**Status:** ✅ Complete
