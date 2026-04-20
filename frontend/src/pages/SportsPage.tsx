import CollectionPageTemplate from '../components/collection/CollectionPageTemplate';
import { PRODUCTS_BY_CATEGORY } from '../data/products';

const SportsPage = () => (
  <CollectionPageTemplate
    collectionName="Sports Collection"
    tagline="Perform. Sweat. Look great doing it."
    description="High-performance athletic wear that transitions from the gym to the street. Moisture-wicking, stretch-built, and styled for those who take their fitness seriously."
    heroBgClass="from-orange-900 via-red-900 to-orange-800"
    accentClass="bg-orange-600"
    products={PRODUCTS_BY_CATEGORY['sports'] || []}
    features={[
      { icon: '💧', title: 'Moisture-Wicking', desc: 'Advanced fabric technology keeps you dry through your toughest sessions.' },
      { icon: '🔄', title: '4-Way Stretch', desc: 'Full range of motion in every direction — built for athletic performance.' },
      { icon: '☀️', title: 'UPF Protection', desc: 'Built-in UV protection for outdoor training sessions.' },
      { icon: '♻️', title: 'Recycled Materials', desc: 'Performance fabrics made from recycled plastics. Eco-performance.' },
    ]}
  />
);

export default SportsPage;
