import CollectionPageTemplate from '../components/collection/CollectionPageTemplate';
import { PRODUCTS_BY_CATEGORY } from '../data/products';

const GroupTeamPage = () => (
  <CollectionPageTemplate
    collectionName="Group & Team Collection"
    tagline="Stronger together. Dressed together."
    description="Bulk orders for sports teams, corporate events, friend groups, and celebrations. Custom branding, mixed sizing, premium quality — all in one order."
    heroBgClass="from-blue-900 via-indigo-900 to-blue-800"
    accentClass="bg-blue-600"
    products={PRODUCTS_BY_CATEGORY['group-team'] || []}
    features={[
      { icon: '👕', title: 'Mixed Sizing', desc: 'Order different sizes in one bundle — everyone gets the right fit.' },
      { icon: '🖨️', title: 'Free Logo Print', desc: 'Add your team logo or event name on every tee at no extra cost.' },
      { icon: '💰', title: 'Bulk Savings', desc: 'Save up to 20% compared to individual pricing on group orders.' },
      { icon: '📅', title: 'Event Delivery', desc: 'Tell us your event date — we\'ll make sure your order arrives on time.' },
    ]}
  />
);

export default GroupTeamPage;
