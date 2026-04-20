import Header from '../components/header/Header';
import AnnouncementBar from '../components/announcement/AnnouncementBar';
import Footer from '../components/footer/Footer';

const Section = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <div className="mb-8">
    <h2 className="text-xl font-bold text-teal-900 mb-3 pb-2 border-b border-yellow-300">{title}</h2>
    <div className="text-gray-700 leading-relaxed space-y-3">{children}</div>
  </div>
);

const RefundPolicyPage = () => {
  return (
    <div className="min-h-screen bg-green-50">
      <AnnouncementBar />
      <Header />

      {/* Hero */}
      <div className="bg-teal-900 py-14">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-white">Refund & Cancellation Policy</h1>
          <p className="text-yellow-400 mt-3 text-sm">Last updated: April 15, 2026</p>
          <p className="text-gray-300 mt-2 text-sm max-w-xl mx-auto">
            We want you to love every Skaviyo purchase. If something isn't right, we're here to help.
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="bg-white rounded-2xl shadow-sm p-8 md:p-12">

          <Section title="1. Order Cancellation">
            <p>
              <strong>Before Shipment:</strong> Orders can be cancelled within <strong>24 hours</strong> of placement at no charge.
              To cancel, email us at <a href="mailto:support@skaviyo.com" className="text-teal-700 underline">support@skaviyo.com</a> or
              contact us through our Support page with your order number.
            </p>
            <p>
              <strong>After Shipment:</strong> Once an order has been dispatched, it cannot be cancelled.
              You may initiate a return once the product is delivered.
            </p>
            <p>
              <strong>Custom / Personalised Orders:</strong> Orders placed under the "Create Your Own" programme are
              non-cancellable once production has begun (typically within 2 hours of order confirmation), as they are
              made exclusively for you.
            </p>
          </Section>

          <Section title="2. Return Eligibility">
            <p>
              You may request a return within <strong>7 days</strong> of the delivery date. Items must be:
            </p>
            <ul className="list-disc pl-6 space-y-1">
              <li>Unworn, unwashed, and in original condition</li>
              <li>With all original tags and packaging intact</li>
              <li>Accompanied by the original invoice or order confirmation</li>
              <li>Not a customised / personalised item</li>
              <li>Not marked as a "Final Sale" or "Non-Returnable" item at the time of purchase</li>
            </ul>
            <p>
              Returns requested after 7 days of delivery will not be accepted unless the item is defective or
              incorrectly delivered (see Section 5).
            </p>
          </Section>

          <Section title="3. Exchange Policy">
            <p>
              We offer <strong>size and colour exchanges</strong> on eligible items within 7 days of delivery,
              subject to stock availability. If the requested exchange item is unavailable, a full refund will be issued.
            </p>
            <p>
              To initiate an exchange, contact <a href="mailto:support@skaviyo.com" className="text-teal-700 underline">support@skaviyo.com</a> with
              your order number, the item you received, and the exchange you require.
            </p>
            <p>
              Reverse pick-up for exchanges is <strong>free of charge</strong> for the first request per order.
            </p>
          </Section>

          <Section title="4. Refund Process & Timeline">
            <p>
              Once we receive and inspect the returned item, we will notify you of the approval or rejection of your refund.
            </p>
            <p>
              <strong>Approved refunds</strong> are processed within <strong>2 business days</strong> of inspection
              and credited back to the <em>original payment method</em>:
            </p>
            <ul className="list-disc pl-6 space-y-1">
              <li><strong>Credit / Debit Card:</strong> 5–7 business days to reflect</li>
              <li><strong>UPI / Net Banking:</strong> 3–5 business days to reflect</li>
              <li><strong>Wallets (Paytm, PhonePe, etc.):</strong> 1–3 business days</li>
              <li><strong>Cash on Delivery orders:</strong> Refunded via NEFT bank transfer within 5–7 business days (bank details required)</li>
            </ul>
            <p>
              Processing times may vary slightly depending on your bank or payment provider.
              Skaviyo is not responsible for delays caused by your bank after we initiate the transfer.
            </p>
          </Section>

          <Section title="5. Damaged, Defective, or Wrong Items">
            <p>
              If you receive an item that is damaged, defective, or different from what you ordered, please
              contact us within <strong>48 hours</strong> of delivery at <a href="mailto:support@skaviyo.com" className="text-teal-700 underline">support@skaviyo.com</a> with:
            </p>
            <ul className="list-disc pl-6 space-y-1">
              <li>Your order number</li>
              <li>A clear photograph of the damaged / defective / wrong item</li>
              <li>A brief description of the issue</li>
            </ul>
            <p>
              We will arrange a <strong>full refund or free replacement</strong> at no additional cost to you,
              including reverse pick-up charges.
            </p>
          </Section>

          <Section title="6. Non-Refundable Items">
            <p>The following items are <strong>not eligible</strong> for return or refund:</p>
            <ul className="list-disc pl-6 space-y-1">
              <li>Customised / personalised products (Create Your Own)</li>
              <li>Items marked as "Final Sale" at the time of purchase</li>
              <li>Items returned after 7 days from the delivery date</li>
              <li>Items that show signs of wear, wash, damage, or missing tags</li>
              <li>Gift cards or vouchers</li>
            </ul>
          </Section>

          <Section title="7. Return Shipping">
            <p>
              For eligible returns (other than defective/wrong items), the customer is responsible for reverse
              shipping charges unless a prepaid return label is provided by Skaviyo.
            </p>
            <p>
              We recommend using a trackable shipping service. Skaviyo is not liable for items lost in transit
              during return shipment if a non-trackable service is used.
            </p>
          </Section>

          <Section title="8. How to Initiate a Return or Refund">
            <ol className="list-decimal pl-6 space-y-2">
              <li>Email <a href="mailto:support@skaviyo.com" className="text-teal-700 underline">support@skaviyo.com</a> with subject line: <em>"Return Request – [Your Order Number]"</em></li>
              <li>Include your order number, reason for return, and photos (if defective)</li>
              <li>Our team will respond within <strong>1 business day</strong> with instructions</li>
              <li>Ship the item back (or we arrange pick-up) and share the tracking details</li>
              <li>Refund / exchange processed within 2 business days of item receipt</li>
            </ol>
          </Section>

          <Section title="9. Contact Us">
            <p>
              For any questions regarding returns, refunds, or cancellations, please reach out to us:
            </p>
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

export default RefundPolicyPage;
