import Header from '../components/header/Header';
import AnnouncementBar from '../components/announcement/AnnouncementBar';
import Footer from '../components/footer/Footer';

const Section = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <div className="mb-8">
    <h2 className="text-xl font-bold text-teal-900 mb-3 pb-2 border-b border-yellow-300">{title}</h2>
    <div className="text-gray-700 leading-relaxed space-y-3">{children}</div>
  </div>
);

const CookiePolicyPage = () => {
  return (
    <div className="min-h-screen bg-green-50">
      <AnnouncementBar />
      <Header />

      {/* Hero */}
      <div className="bg-teal-900 py-14">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-white">Cookie Policy</h1>
          <p className="text-yellow-400 mt-3 text-sm">Last updated: April 15, 2026</p>
          <p className="text-gray-300 mt-2 text-sm max-w-xl mx-auto">
            How Skaviyo uses cookies to improve your browsing experience.
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="bg-white rounded-2xl shadow-sm p-8 md:p-12">

          <Section title="1. What Are Cookies?">
            <p>
              Cookies are small text files that are placed on your device (computer, smartphone, or tablet)
              when you visit a website. They help websites remember your preferences, improve functionality,
              and provide analytics to the website operator.
            </p>
            <p>
              Cookies do not contain personally identifiable information on their own, but they may be linked
              to information you have previously provided to us.
            </p>
          </Section>

          <Section title="2. How We Use Cookies">
            <p>Skaviyo uses cookies for the following purposes:</p>
            <ul className="list-disc pl-6 space-y-1">
              <li>To keep you logged in during your session</li>
              <li>To remember your cart contents and preferences</li>
              <li>To analyse how visitors use our website (page views, time on site, navigation paths)</li>
              <li>To personalise your experience (e.g. remembering your size or location)</li>
              <li>To improve website performance and resolve errors</li>
            </ul>
          </Section>

          <Section title="3. Types of Cookies We Use">
            <div className="overflow-x-auto mt-2">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="bg-teal-900 text-white">
                    <th className="px-4 py-2 text-left rounded-tl-lg">Type</th>
                    <th className="px-4 py-2 text-left">Purpose</th>
                    <th className="px-4 py-2 text-left rounded-tr-lg">Duration</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  <tr className="bg-gray-50">
                    <td className="px-4 py-2 font-medium">Essential</td>
                    <td className="px-4 py-2">Required for basic site functionality (cart, login session)</td>
                    <td className="px-4 py-2">Session</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2 font-medium">Performance</td>
                    <td className="px-4 py-2">Analytics to understand site usage (e.g. Google Analytics)</td>
                    <td className="px-4 py-2">Up to 2 years</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="px-4 py-2 font-medium">Functional</td>
                    <td className="px-4 py-2">Remember your preferences (language, location, size)</td>
                    <td className="px-4 py-2">Up to 1 year</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2 font-medium">Marketing</td>
                    <td className="px-4 py-2">Track visits to show relevant ads on other platforms</td>
                    <td className="px-4 py-2">Up to 90 days</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </Section>

          <Section title="4. Third-Party Cookies">
            <p>
              We may use third-party services that set their own cookies on your device:
            </p>
            <ul className="list-disc pl-6 space-y-1">
              <li><strong>Razorpay:</strong> Payment processing cookies for secure transactions</li>
              <li><strong>Google Analytics:</strong> Website usage analytics (anonymised data)</li>
              <li><strong>Meta Pixel (Facebook/Instagram):</strong> Social media advertising measurement</li>
            </ul>
            <p>
              These third parties have their own privacy and cookie policies, which we encourage you to review.
            </p>
          </Section>

          <Section title="5. Managing and Disabling Cookies">
            <p>
              You can control or delete cookies through your browser settings. Most browsers allow you to:
            </p>
            <ul className="list-disc pl-6 space-y-1">
              <li>View and delete cookies stored on your device</li>
              <li>Block all cookies or only third-party cookies</li>
              <li>Receive a notification when a cookie is set</li>
            </ul>
            <p>
              Please note that disabling certain cookies (especially Essential cookies) may affect the
              functionality of our website — for example, your cart may not be saved or you may be logged
              out unexpectedly.
            </p>
            <p>Instructions for managing cookies in common browsers:</p>
            <ul className="list-disc pl-6 space-y-1 text-sm">
              <li><strong>Chrome:</strong> Settings → Privacy and Security → Cookies</li>
              <li><strong>Firefox:</strong> Settings → Privacy & Security → Cookies and Site Data</li>
              <li><strong>Safari:</strong> Preferences → Privacy → Manage Website Data</li>
              <li><strong>Edge:</strong> Settings → Privacy, search and services → Cookies</li>
            </ul>
          </Section>

          <Section title="6. Your Consent">
            <p>
              By continuing to use the Skaviyo website, you consent to our use of cookies as described in
              this policy. You may withdraw consent at any time by adjusting your browser settings as outlined
              in Section 5.
            </p>
          </Section>

          <Section title="7. Changes to This Policy">
            <p>
              We may update this Cookie Policy from time to time. Any changes will be posted on this page
              with the updated effective date. We recommend reviewing this policy periodically.
            </p>
          </Section>

          <Section title="8. Contact Us">
            <p>If you have questions about our use of cookies, please contact us:</p>
            <div className="bg-green-50 rounded-xl p-4 mt-3 space-y-1 text-sm">
              <p><strong>Email:</strong> <a href="mailto:support@skaviyo.com" className="text-teal-700 underline">support@skaviyo.com</a></p>
              <p><strong>Support Hours:</strong> Monday – Saturday, 10:00 AM – 6:00 PM IST</p>
            </div>
          </Section>

        </div>
      </div>

      <Footer />
    </div>
  );
};

export default CookiePolicyPage;
