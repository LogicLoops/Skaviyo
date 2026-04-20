import Header from '../components/header/Header';
import AnnouncementBar from '../components/announcement/AnnouncementBar';
import Footer from '../components/footer/Footer';

const Section = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <div className="mb-8">
    <h2 className="text-xl font-bold text-teal-900 mb-3 pb-2 border-b border-yellow-300">{title}</h2>
    <div className="text-gray-700 leading-relaxed space-y-3">{children}</div>
  </div>
);

const ShippingPolicyPage = () => {
  return (
    <div className="min-h-screen bg-green-50">
      <AnnouncementBar />
      <Header />

      {/* Hero */}
      <div className="bg-teal-900 py-14">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-white">Shipping Policy</h1>
          <p className="text-yellow-400 mt-3 text-sm">Last updated: April 15, 2026</p>
          <p className="text-gray-300 mt-2 text-sm max-w-xl mx-auto">
            Fast, reliable delivery across India. Here's everything you need to know.
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="bg-white rounded-2xl shadow-sm p-8 md:p-12">

          {/* Quick Summary Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
            <div className="bg-teal-50 border border-teal-200 rounded-xl p-4 text-center">
              <div className="text-2xl mb-1">📦</div>
              <div className="font-bold text-teal-900 text-sm">Processing Time</div>
              <div className="text-gray-600 text-xs mt-1">1–3 Business Days</div>
            </div>
            <div className="bg-teal-50 border border-teal-200 rounded-xl p-4 text-center">
              <div className="text-2xl mb-1">🚚</div>
              <div className="font-bold text-teal-900 text-sm">Domestic Delivery</div>
              <div className="text-gray-600 text-xs mt-1">5–7 Business Days</div>
            </div>
            <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 text-center">
              <div className="text-2xl mb-1">🎁</div>
              <div className="font-bold text-teal-900 text-sm">Free Shipping</div>
              <div className="text-gray-600 text-xs mt-1">Orders above ₹999</div>
            </div>
          </div>

          <Section title="1. Order Processing">
            <p>
              All orders are processed within <strong>1–3 business days</strong> (Monday–Saturday,
              excluding public holidays) after payment confirmation. You will receive an order confirmation
              email immediately after placing your order, and a shipping confirmation email with a
              tracking number once your order is dispatched.
            </p>
            <p>
              <strong>Custom / Personalised Orders</strong> ("Create Your Own") require an additional
              <strong> 3–5 business days</strong> for production before dispatch.
            </p>
          </Section>

          <Section title="2. Domestic Shipping (India)">
            <p>We ship to all serviceable PIN codes across India. Estimated delivery timelines:</p>
            <div className="overflow-x-auto mt-3">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="bg-teal-900 text-white">
                    <th className="px-4 py-2 text-left rounded-tl-lg">Destination</th>
                    <th className="px-4 py-2 text-left">Estimated Delivery</th>
                    <th className="px-4 py-2 text-left rounded-tr-lg">Shipping Fee</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  <tr className="bg-gray-50">
                    <td className="px-4 py-2">Metro Cities (Delhi, Mumbai, Bangalore, Chennai, Hyderabad, Kolkata)</td>
                    <td className="px-4 py-2">3–5 Business Days</td>
                    <td className="px-4 py-2">₹49 (Free above ₹999)</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2">Tier 2 & Tier 3 Cities</td>
                    <td className="px-4 py-2">5–7 Business Days</td>
                    <td className="px-4 py-2">₹79 (Free above ₹999)</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="px-4 py-2">Remote / Rural Areas</td>
                    <td className="px-4 py-2">7–10 Business Days</td>
                    <td className="px-4 py-2">₹99 (Free above ₹999)</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2">North-East & J&K</td>
                    <td className="px-4 py-2">7–12 Business Days</td>
                    <td className="px-4 py-2">₹99 (Free above ₹999)</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="text-sm text-gray-500 mt-2">
              * Business days exclude Sundays and public holidays. Delivery timelines are estimates and may vary
              due to courier or weather-related delays.
            </p>
          </Section>

          <Section title="3. Free Shipping">
            <p>
              We offer <strong>free shipping on all orders above ₹999</strong> to any location within India.
              The free shipping threshold applies to the total order value after any discounts are applied.
            </p>
          </Section>

          <Section title="4. Express Shipping">
            <p>
              Express delivery (2–3 business days) is available for select PIN codes at an additional charge
              of <strong>₹149</strong>. This option will be displayed at checkout if available for your location.
            </p>
          </Section>

          <Section title="5. Order Tracking">
            <p>
              Once your order is dispatched, you will receive a tracking number via email and SMS. You can
              track your order directly on the courier partner's website or through our{' '}
              <a href="/support" className="text-teal-700 underline">Support page</a>.
            </p>
            <p>
              Tracking information may take up to <strong>24 hours</strong> to update after dispatch.
            </p>
          </Section>

          <Section title="6. Shipping Partners">
            <p>
              We work with trusted logistics partners including Delhivery, Blue Dart, Ekart, and DTDC to
              ensure safe and timely delivery. The courier partner is assigned based on your delivery location
              for the fastest available service.
            </p>
          </Section>

          <Section title="7. Cash on Delivery (COD)">
            <p>
              COD is available on select PIN codes for orders up to <strong>₹5,000</strong>. A COD convenience
              fee of <strong>₹50</strong> applies per order. COD availability will be shown at checkout.
            </p>
          </Section>

          <Section title="8. Failed Deliveries">
            <p>
              If a delivery attempt fails (e.g. due to an incorrect address or recipient unavailability),
              the courier will typically attempt delivery up to 3 times. After 3 failed attempts, the package
              will be returned to us.
            </p>
            <p>
              In such cases, we will contact you to arrange re-delivery. Re-delivery charges may apply.
              If the order is ultimately undeliverable, a refund will be issued after deducting shipping costs.
            </p>
          </Section>

          <Section title="9. Damaged in Transit">
            <p>
              If your order arrives damaged, please do not accept the package (if the damage is visible on
              arrival) and contact us immediately at{' '}
              <a href="mailto:support@skaviyo.com" className="text-teal-700 underline">support@skaviyo.com</a> with
              photographs of the damaged packaging. We will arrange a replacement or refund promptly.
            </p>
          </Section>

          <Section title="10. International Shipping">
            <p>
              International shipping is currently not available. We ship to addresses within India only.
              Stay tuned for updates on international delivery.
            </p>
          </Section>

          <Section title="11. Contact Us">
            <p>For shipping-related queries, contact our support team:</p>
            <div className="bg-green-50 rounded-xl p-4 mt-3 space-y-1 text-sm">
              <p><strong>Email:</strong> <a href="mailto:support@skaviyo.com" className="text-teal-700 underline">support@skaviyo.com</a></p>
              <p><strong>Support Hours:</strong> Monday – Saturday, 10:00 AM – 6:00 PM IST</p>
              <p><strong>Response Time:</strong> Within 1 business day</p>
            </div>
          </Section>

        </div>
      </div>

      <Footer />
    </div>
  );
};

export default ShippingPolicyPage;
