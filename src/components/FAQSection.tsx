import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { ScrollAnimation } from "@/components/ScrollAnimation";

const faqs = [
  {
    question: "What is PayMall?",
    answer:
      "PayMall is an in-store shopping app that lets customers scan products, pay digitally, and skip billing queues.",
  },
  {
    question: "Do I need to stand in billing lines?",
    answer:
      "No. Simply scan items, pay through the app, and exit the store using your digital receipt.",
  },
  {
    question: "Is PayMall secure for payments?",
    answer:
      "Yes. All transactions are processed through secure third-party payment gateways.",
  },
  {
    question: "Which stores support PayMall?",
    answer:
      "PayMall works with partnered supermarkets and retail stores.",
  },
  {
    question: "How do I download PayMall?",
    answer:
      "You can download PayMall from the Google Play Store or Apple App Store.",
  },
  {
    question: "Can I remove items from my cart?",
    answer:
      "Yes. You can easily add, remove, or adjust quantities before checkout.",
  },
  {
    question: "Do I get a receipt after payment?",
    answer:
      "Yes. A digital receipt is generated instantly after checkout.",
  },
  {
    question: "Is PayMall free to use?",
    answer:
      "Yes. Customers can use PayMall for free while shopping in partner stores.",
  },
];

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const [visibleCount, setVisibleCount] = useState(4);

  const visibleFaqs = faqs.slice(0, visibleCount);

  return (
    <section className="py-24 bg-background">
      <div className="container px-4 max-w-4xl">

        <ScrollAnimation className="text-center mb-14">
          <span className="text-sm font-semibold text-primary uppercase tracking-wider">
            FAQs
          </span>

          <h2 className="font-display text-3xl md:text-4xl font-bold mt-4">
            Frequently Asked Questions
          </h2>

          <p className="text-muted-foreground mt-4">
            Everything you need to know about PayMall.
          </p>
        </ScrollAnimation>

        <div className="space-y-4">
          {visibleFaqs.map((faq, index) => (
            <div
              key={index}
              className="border border-border rounded-xl overflow-hidden"
            >
              <button
                onClick={() =>
                  setOpenIndex(openIndex === index ? null : index)
                }
                className="w-full flex justify-between items-center p-5 text-left hover:bg-muted/40 transition"
              >
                <span className="font-medium">{faq.question}</span>

                <ChevronDown
                  className={`w-5 h-5 transition-transform duration-300 ${
                    openIndex === index ? "rotate-180" : ""
                  }`}
                />
              </button>

              <div
                className={`px-5 transition-all duration-300 ${
                  openIndex === index
                    ? "max-h-40 pb-5 opacity-100"
                    : "max-h-0 opacity-0 overflow-hidden"
                }`}
              >
                <p className="text-muted-foreground text-sm">
                  {faq.answer}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Buttons */}
        <div className="text-center mt-10">

          {visibleCount < faqs.length ? (
            <button
              onClick={() => setVisibleCount((prev) => prev + 4)}
              className="text-primary font-medium hover:underline"
            >
              View More FAQs →
            </button>
          ) : (
            <button
              onClick={() => {
                setVisibleCount(4);
                setOpenIndex(null);
              }}
              className="text-primary font-medium hover:underline"
            >
              View Less FAQs ↑
            </button>
          )}

        </div>
      </div>
    </section>
  );
}
