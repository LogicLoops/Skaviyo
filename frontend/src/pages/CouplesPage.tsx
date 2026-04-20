import CollectionPageTemplate from '../components/collection/CollectionPageTemplate';
import { PRODUCTS_BY_CATEGORY } from '../data/products';

const CouplesPage = () => (
  <CollectionPageTemplate
    collectionName="Couples Collection"
    tagline="Two people. One style."
    description="Coordinated sets for couples who want to complement each other without being identical. Premium cotton, complementary tones, and memories that last."
    heroBgClass="from-purple-900 via-violet-900 to-purple-800"
    accentClass="bg-purple-600"
    products={PRODUCTS_BY_CATEGORY['couples'] || []}
    features={[
      { icon: '💝', title: 'His & Hers Sizing', desc: 'Order both sizes in one checkout — perfectly matched for every body.' },
      { icon: '🎁', title: 'Gift Box Included', desc: 'Every couple\'s set ships in a premium gift box, ready to present.' },
      { icon: '✍️', title: 'Custom Printing', desc: 'Add your names, a date, or a special message to any couples set.' },
      { icon: '🚀', title: 'Priority Dispatch', desc: 'Couples orders get priority processing — perfect for gifts.' },
    ]}
  />
);

export default CouplesPage;
