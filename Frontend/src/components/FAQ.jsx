import { useState, useEffect } from "react";
import apiService from "../services/apiService";

export default function FAQ({ productId = 1 }) {
  const [faqs, setFaqs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [openFaq, setOpenFaq] = useState(null);

  useEffect(() => {
    fetchFaqs();
  }, [productId]);

  const fetchFaqs = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await apiService.getProductFaqs(productId);
      setFaqs(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  if (loading) {
    return (
      <section className="p-6 bg-white shadow rounded-lg mb-6">
        <h3 className="text-xl font-bold mb-4">Frequently Asked Questions</h3>
        <div className="space-y-3">
          {[1, 2].map((idx) => (
            <div key={idx} className="animate-pulse">
              <div className="h-6 bg-gray-200 rounded mb-2"></div>
              <div className="h-4 bg-gray-100 rounded ml-4"></div>
            </div>
          ))}
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="p-6 bg-white shadow rounded-lg mb-6">
        <h3 className="text-xl font-bold mb-4">Frequently Asked Questions</h3>
        <div className="text-red-600">
          <p>Error loading FAQs: {error}</p>
        </div>
      </section>
    );
  }

  if (faqs.length === 0) {
    return (
      <section className="p-6 bg-white shadow rounded-lg mb-6">
        <h3 className="text-xl font-bold mb-4">Frequently Asked Questions</h3>
        <p className="text-gray-600">No FAQs available for this medicine.</p>
      </section>
    );
  }

  return (
    <section className="p-6 bg-white shadow rounded-lg mb-6">
      <h3 className="text-xl font-bold mb-4">Frequently Asked Questions</h3>
      <div className="space-y-3">
        {faqs.map((faq, index) => (
          <div key={faq.id} className="border border-gray-200 rounded-lg">
            <button
              onClick={() => toggleFaq(index)}
              className="w-full p-4 text-left flex justify-between items-center hover:bg-gray-50 transition-colors"
            >
              <span className="font-semibold text-blue-600 pr-4">
                {faq.question}
              </span>
              <span className="text-blue-600 flex-shrink-0">
                {openFaq === index ? "−" : "+"}
              </span>
            </button>
            {openFaq === index && (
              <div className="px-4 pb-4">
                <p className="text-gray-700 leading-relaxed">{faq.answer}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
