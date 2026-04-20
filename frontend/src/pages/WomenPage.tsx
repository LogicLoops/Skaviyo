import CollectionPageTemplate from '../components/collection/CollectionPageTemplate';
import { PRODUCTS_BY_CATEGORY } from '../data/products';

const WomenPage = () => (
  <CollectionPageTemplate
    collectionName="Women's Collection"
    tagline="Designed for her. Worn with confidence."
    description="Premium sustainable fashion crafted for the modern woman. From everyday elegance to bold statements — discover styles that move with you."
    heroBgClass="from-rose-900 via-pink-900 to-rose-800"
    accentClass="bg-rose-600"
    products={PRODUCTS_BY_CATEGORY['women'] || []}
    features={[
      { icon: '🌿', title: 'Sustainable Fabrics', desc: 'GOTS-certified organic cotton and eco-friendly dyes in every piece.' },
      { icon: '✂️', title: 'Designed for Women', desc: 'Cuts and silhouettes crafted specifically for the female form.' },
      { icon: '🎨', title: 'Original Prints', desc: 'In-house designed prints, exclusive to Skaviyo Women\'s Collection.' },
      { icon: '📦', title: 'Free Returns', desc: 'Easy 7-day returns on all women\'s collection orders.' },
    ]}
  />
);

export default WomenPage;
