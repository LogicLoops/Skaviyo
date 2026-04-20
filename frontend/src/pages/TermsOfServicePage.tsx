import Header from '../components/header/Header';
import AnnouncementBar from '../components/announcement/AnnouncementBar';
import Footer from '../components/footer/Footer';

const Section = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <div className="mb-8">
    <h2 className="text-xl font-bold text-teal-900 mb-3 pb-2 border-b border-yellow-300">{title}</h2>
    <div className="text-gray-700 leading-relaxed space-y-3">{children}</div>
  </div>
);

const TermsOfServicePage = () => {
  return (
    <div className="min-h-screen bg-green-50">
      <AnnouncementBar />
      <Header />

      {/* Hero */}
      <div className="bg-teal-900 py-14">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-white">Terms of Service</h1>
          <p className="text-yellow-400 mt-3 text-sm">Last updated: April 15, 2026</p>
          <p className="text-gray-300 mt-2 text-sm max-w-xl mx-auto">
            Please read these terms carefully before using the Skaviyo website or placing an order.
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="bg-white rounded-2xl shadow-sm p-8 md:p-12">

          <Section title="1. Acceptance of Terms">
            <p>
              By accessing or using the Skaviyo website (<strong>www.skaviyo.com</strong>), you agree to be bound by
              these Terms of Service ("Terms") and all applicable laws and regulations of India. If you do not agree
              with any part of these terms, please do not use our website or services.
            </p>
            <p>
              These Terms apply to all visitors, users, and customers of Skaviyo.
            </p>
          </Section>

          <Section title="2. About Skaviyo">
            <p>
              Skaviyo is an Indian premium sustainable fashion brand offering a range of T-shirts and apparel
              for men, women, couples, groups, and custom designs. We are committed to quality craftsmanship,
              sustainable practices, and modern design.
            </p>
            <div className="bg-green-50 rounded-xl p-4 text-sm space-y-1">
              <p><strong>Business Name:</strong> Skaviyo</p>
              <p><strong>Country:</strong> India</p>
              <p><strong>Email:</strong> <a href="mailto:support@skaviyo.com" className="text-teal-700 underline">support@skaviyo.com</a></p>
              <p><strong>Website:</strong> www.skaviyo.com</p>
            </div>
          </Section>

          <Section title="3. Use of the Website">
            <p>You agree to use this website only for lawful purposes and in a manner that does not infringe the rights of others. You must not:</p>
            <ul className="list-disc pl-6 space-y-1">
              <li>Use the site for any fraudulent or unlawful purpose</li>
              <li>Attempt to gain unauthorised access to any part of the website</li>
              <li>Transmit any harmful, offensive, or disruptive content</li>
              <li>Copy, reproduce, or redistribute our content without written permission</li>
              <li>Use automated tools to scrape, crawl, or extract data from the site</li>
            </ul>
          </Section>

          <Section title="4. Account Registration">
            <p>
              To place an order, you may be required to create an account. You are responsible for maintaining
              the confidentiality of your account credentials and for all activities conducted under your account.
            </p>
            <p>
              You must provide accurate and complete information during registration. Skaviyo reserves the right
              to suspend or terminate accounts that violate these Terms or provide false information.
            </p>
          </Section>

          <Section title="5. Products and Pricing">
            <p>
              All prices on our website are displayed in <strong>Indian Rupees (INR)</strong> and are inclusive
              of applicable GST unless stated otherwise. Prices are subject to change without prior notice.
            </p>
            <p>
              We make every effort to display accurate product images and descriptions. However, colours may
              vary slightly due to monitor settings. Product availability is not guaranteed until order confirmation.
            </p>
            <p>
              Skaviyo reserves the right to refuse or cancel orders in cases of pricing errors, suspected fraud,
              or if items are out of stock.
            </p>
          </Section>

          <Section title="6. Order Placement and Confirmation">
            <p>
              Placing an order constitutes an offer to purchase. An order is confirmed only upon receipt of a
              written confirmation email from Skaviyo. We reserve the right to cancel orders prior to dispatch
              with a full refund.
            </p>
            <p>
              Please ensure all shipping and contact details are accurate at the time of ordering. Skaviyo is
              not responsible for delivery failures due to incorrect information provided by the customer.
            </p>
          </Section>

          <Section title="7. Payment">
            <p>
              We accept payments via Credit/Debit Cards, UPI, Net Banking, and popular digital wallets through
              our secure payment partner <strong>Razorpay</strong>. All transactions are encrypted using
              industry-standard SSL technology.
            </p>
            <p>
              By providing payment information, you represent that you are authorised to use the payment method.
              Skaviyo does not store card details on our servers.
            </p>
          </Section>

          <Section title="8. Shipping and Delivery">
            <p>
              Delivery timelines and shipping charges are outlined in our <a href="/shipping-policy" className="text-teal-700 underline">Shipping Policy</a>.
              Skaviyo is not liable for delays caused by third-party courier services or force majeure events.
            </p>
          </Section>

          <Section title="9. Returns, Refunds, and Cancellations">
            <p>
              Our returns and refund process is governed by our <a href="/refund-policy" className="text-teal-700 underline">Refund & Cancellation Policy</a>,
              which is incorporated into these Terms by reference. Please review it before making a purchase.
            </p>
          </Section>

          <Section title="10. Intellectual Property">
            <p>
              All content on the Skaviyo website — including text, images, graphics, logos, and designs —
              is the exclusive property of Skaviyo and is protected under Indian copyright and trademark laws.
            </p>
            <p>
              You may not use, copy, reproduce, or distribute any content without our express written consent.
            </p>
          </Section>

          <Section title="11. Disclaimer of Warranties">
            <p>
              The Skaviyo website and its content are provided "as is" without any warranties of any kind,
              express or implied. We do not warrant that the site will be uninterrupted, error-free, or free
              of viruses or other harmful components.
            </p>
          </Section>

          <Section title="12. Limitation of Liability">
            <p>
              To the fullest extent permitted by law, Skaviyo shall not be liable for any indirect, incidental,
              special, consequential, or punitive damages arising from your use of our website or products.
              Our total liability shall not exceed the amount paid by you for the specific order in question.
            </p>
          </Section>

          <Section title="13. Governing Law and Dispute Resolution">
            <p>
              These Terms are governed by the laws of India. Any disputes arising under these Terms shall first
              be attempted to be resolved amicably. If unresolved within 30 days, disputes shall be subject to
              the exclusive jurisdiction of the courts in India.
            </p>
          </Section>

          <Section title="14. Changes to These Terms">
            <p>
              Skaviyo reserves the right to update these Terms at any time. Changes will be posted on this page
              with the updated date. Continued use of the website after changes constitutes acceptance of the
              revised Terms.
            </p>
          </Section>

          <Section title="15. Contact Us">
            <p>For any queries regarding these Terms, contact us at:</p>
            <div className="bg-green-50 rounded-xl p-4 mt-3 space-y-1 text-sm">
              <p><strong>Email:</strong> <a href="mailto:support@skaviyo.com" className="text-teal-700 underline">support@skaviyo.com</a></p>
              <p><strong>Support Hours:</strong> Monday – Saturday, 10:00 AM – 6:00 PM IST</p>
              <p><strong>Website:</strong> www.skaviyo.com/support</p>
            </div>
          </Section>

        </div>
      </div>

      <Footer />
    </div>
  );
};

export default TermsOfServicePage;
