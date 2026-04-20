import CollectionPageTemplate from '../components/collection/CollectionPageTemplate';
import { PRODUCTS_BY_CATEGORY } from '../data/products';

const AnimatedPage = () => (
  <CollectionPageTemplate
    collectionName="Animated Collection"
    tagline="Wear your imagination."
    description="Original comic, manga, and pixel art printed on premium cotton. Each design is commissioned from independent artists and produced in limited runs. Wearable art."
    heroBgClass="from-purple-900 via-blue-900 to-indigo-900"
    accentClass="bg-indigo-600"
    products={PRODUCTS_BY_CATEGORY['animated'] || []}
    features={[
      { icon: '🎨', title: 'Original Artwork', desc: 'Every design is commissioned from independent artists — never generic.' },
      { icon: '🔢', title: 'Limited Runs', desc: 'Each animated design is produced in limited quantities. Own something rare.' },
      { icon: '🌱', title: 'Eco-Ink Printing', desc: 'Water-based, eco-friendly inks that are safe for skin and the planet.' },
      { icon: '💪', title: 'Print Durability', desc: 'Tested to maintain vivid colour for 100+ washes without fading.' },
    ]}
  />
);

export default AnimatedPage;
