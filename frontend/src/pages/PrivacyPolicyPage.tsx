import Header from '../components/header/Header';
import AnnouncementBar from '../components/announcement/AnnouncementBar';
import Footer from '../components/footer/Footer';

const Section = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <div className="mb-8">
    <h2 className="text-xl font-bold text-teal-900 mb-3 pb-2 border-b border-yellow-300">{title}</h2>
    <div className="text-gray-700 leading-relaxed space-y-3">{children}</div>
  </div>
);

const PrivacyPolicyPage = () => {
  return (
    <div className="min-h-screen bg-green-50">
      <AnnouncementBar />
      <Header />

      {/* Hero */}
      <div className="bg-teal-900 py-14">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-white">Privacy Policy</h1>
          <p className="text-yellow-400 mt-3 text-sm">Last updated: April 15, 2026</p>
          <p className="text-gray-300 mt-2 text-sm max-w-xl mx-auto">
            Your privacy matters to us. Learn how Skaviyo collects, uses, and protects your information.
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="bg-white rounded-2xl shadow-sm p-8 md:p-12">

          <Section title="1. Introduction">
            <p>
              Skaviyo ("we", "our", "us") is committed to protecting your personal information and your right
              to privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your
              information when you visit our website <strong>www.skaviyo.com</strong> or make a purchase.
            </p>
            <p>
              This policy is compliant with the Information Technology Act, 2000, and the Information Technology
              (Reasonable Security Practices and Procedures and Sensitive Personal Data or Information)
              Rules, 2011 of India.
            </p>
          </Section>

          <Section title="2. Information We Collect">
            <p><strong>Personal Information you provide directly:</strong></p>
            <ul className="list-disc pl-6 space-y-1">
              <li>Name, email address, and phone number (for account creation and order processing)</li>
              <li>Billing and shipping address</li>
              <li>Payment information (processed securely via Razorpay — we do not store card details)</li>
              <li>Order history and purchase preferences</li>
              <li>Messages and enquiries sent to our support team</li>
              <li>Newsletter subscription preferences</li>
            </ul>
            <p className="mt-3"><strong>Information collected automatically:</strong></p>
            <ul className="list-disc pl-6 space-y-1">
              <li>IP address and browser type</li>
              <li>Pages viewed, time spent, and referring URLs</li>
              <li>Device type and operating system</li>
              <li>Cookies and similar tracking technologies (see our <a href="/cookie-policy" className="text-teal-700 underline">Cookie Policy</a>)</li>
            </ul>
          </Section>

          <Section title="3. How We Use Your Information">
            <p>We use the information we collect to:</p>
            <ul className="list-disc pl-6 space-y-1">
              <li>Process and fulfil your orders, including payment and delivery</li>
              <li>Send order confirmations, shipping updates, and delivery notifications</li>
              <li>Respond to customer service queries and support requests</li>
              <li>Send marketing communications (only if you have opted in)</li>
              <li>Improve our website, products, and customer experience</li>
              <li>Detect and prevent fraud or misuse</li>
              <li>Comply with legal and regulatory obligations</li>
              <li>Analyse website usage and trends (using anonymised data)</li>
            </ul>
          </Section>

          <Section title="4. Sharing Your Information">
            <p>
              We do <strong>not sell, trade, or rent</strong> your personal information to third parties.
              We may share your information only in the following circumstances:
            </p>
            <ul className="list-disc pl-6 space-y-1">
              <li>
                <strong>Payment Processors:</strong> Razorpay processes payments on our behalf and is
                subject to their own privacy and security policies.
              </li>
              <li>
                <strong>Logistics Partners:</strong> Courier and shipping providers receive your name,
                address, and contact number for delivery purposes only.
              </li>
              <li>
                <strong>Service Providers:</strong> We may use third-party services for email, analytics,
                and customer support under strict data protection agreements.
              </li>
              <li>
                <strong>Legal Requirements:</strong> We may disclose information if required by law, court
                order, or government authority.
              </li>
            </ul>
          </Section>

          <Section title="5. Data Security">
            <p>
              We implement industry-standard security measures including SSL/TLS encryption, secure servers,
              and access controls to protect your personal information from unauthorised access, alteration,
              disclosure, or destruction.
            </p>
            <p>
              While we take every precaution, no method of transmission over the internet is 100% secure.
              We encourage you to use a strong, unique password for your account.
            </p>
          </Section>

          <Section title="6. Data Retention">
            <p>
              We retain your personal data for as long as necessary to fulfil the purposes outlined in this
              policy, maintain your account, and comply with legal obligations. Order records are typically
              retained for 7 years in accordance with Indian accounting requirements.
            </p>
            <p>
              You may request deletion of your account and personal data at any time (subject to legal
              retention requirements) by emailing us at <a href="mailto:support@skaviyo.com" className="text-teal-700 underline">support@skaviyo.com</a>.
            </p>
          </Section>

          <Section title="7. Cookies">
            <p>
              We use cookies to enhance your browsing experience, remember your preferences, and analyse
              site traffic. For full details on the cookies we use, please read our{' '}
              <a href="/cookie-policy" className="text-teal-700 underline">Cookie Policy</a>.
            </p>
            <p>
              You can control or disable cookies through your browser settings, though this may affect
              certain website functionality.
            </p>
          </Section>

          <Section title="8. Third-Party Links">
            <p>
              Our website may contain links to third-party websites (e.g. social media platforms). We are
              not responsible for the privacy practices or content of these external sites. We encourage you
              to review their privacy policies before sharing any personal information.
            </p>
          </Section>

          <Section title="9. Children's Privacy">
            <p>
              Our website is not directed at children under the age of 18. We do not knowingly collect
              personal information from minors. If you believe a minor has provided us with personal data,
              please contact us and we will promptly delete it.
            </p>
          </Section>

          <Section title="10. Your Rights">
            <p>As a user, you have the right to:</p>
            <ul className="list-disc pl-6 space-y-1">
              <li><strong>Access</strong> the personal information we hold about you</li>
              <li><strong>Correct</strong> any inaccurate or incomplete data</li>
              <li><strong>Delete</strong> your account and associated personal data</li>
              <li><strong>Opt out</strong> of marketing communications at any time</li>
              <li><strong>Object</strong> to processing of your personal data</li>
            </ul>
            <p>
              To exercise any of these rights, email us at{' '}
              <a href="mailto:support@skaviyo.com" className="text-teal-700 underline">support@skaviyo.com</a>.
            </p>
          </Section>

          <Section title="11. Changes to This Policy">
            <p>
              We may update this Privacy Policy from time to time. Changes will be reflected on this page
              with the updated date. We encourage you to review this policy periodically. Continued use of
              the website after changes constitutes your acceptance.
            </p>
          </Section>

          <Section title="12. Contact Us">
            <p>For any privacy-related questions or concerns, please contact us:</p>
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

export default PrivacyPolicyPage;
