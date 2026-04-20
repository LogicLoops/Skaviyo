import CollectionPageTemplate from '../components/collection/CollectionPageTemplate';
import { PRODUCTS_BY_CATEGORY } from '../data/products';

const LimitedEditionPage = () => (
  <CollectionPageTemplate
    collectionName="Limited Edition"
    tagline="Rare by design. Timeless by nature."
    description="Micro-batch productions of 100–200 units each. Hand-finished, serialised, and authenticated. These are not just tees — they are collector's pieces."
    heroBgClass="from-gray-900 via-neutral-900 to-yellow-950"
    accentClass="bg-yellow-700"
    products={PRODUCTS_BY_CATEGORY['limited-edition'] || []}
    features={[
      { icon: '🏷️', title: 'Serialised & Authenticated', desc: 'Every piece comes with a unique serial number and certificate of authenticity.' },
      { icon: '🤲', title: 'Hand-Finished', desc: 'Each garment is inspected and finished by hand before leaving our studio.' },
      { icon: '📦', title: 'Collector\'s Packaging', desc: 'Rigid gift box, dust bag, and wax-sealed authentication card included.' },
      { icon: '⏳', title: 'Once Gone, Gone', desc: 'No restocks, no reprints. When a drop sells out, it\'s gone forever.' },
    ]}
  />
);

export default LimitedEditionPage;
