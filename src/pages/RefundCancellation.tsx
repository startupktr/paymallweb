import { Link } from "react-router-dom";
import { ArrowLeft, RotateCcw, Clock, CreditCard, CheckCircle, XCircle, HelpCircle } from "lucide-react";
import { motion } from "framer-motion";
import logo from "@/assets/logo.png";

const RefundCancellation = () => {
  const refundSteps = [
    { step: "1", title: "Initiate Request", desc: "Contact support or use the app within 24 hours" },
    { step: "2", title: "Verification", desc: "Our team reviews your request within 2 business days" },
    { step: "3", title: "Processing", desc: "Approved refunds are processed within 5-7 business days" },
    { step: "4", title: "Confirmation", desc: "Receive email confirmation once refund is complete" },
  ];

  const eligibleItems = [
    "Defective or damaged products",
    "Wrong items delivered",
    "Products significantly different from description",
    "Duplicate transactions",
    "Service fees for failed transactions",
  ];

  const nonEligibleItems = [
    "Perishable goods (food, flowers, etc.)",
    "Personal care items that have been opened",
    "Items marked as 'Final Sale' or 'Non-Refundable'",
    "Digital products after download/access",
    "Requests made after the refund window",
  ];

  return (
    <main className="min-h-screen bg-background">
      {/* Header */}
      <motion.header 
        className="bg-gradient-to-r from-secondary via-secondary to-primary py-16 md:py-24"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <div className="container px-4">
          <Link to="/" className="inline-flex items-center gap-2 text-secondary-foreground/80 hover:text-secondary-foreground mb-8 transition-colors">
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>
          <div className="flex items-center gap-4 mb-6">
            <div className="w-16 h-16 rounded-2xl bg-secondary-foreground/20 flex items-center justify-center shadow-lg">
              <RotateCcw className="w-8 h-8 text-secondary-foreground" />
            </div>
            <div>
              <h1 className="text-3xl md:text-4xl font-display font-bold text-secondary-foreground">
                Refund & Cancellation
              </h1>
              <p className="text-secondary-foreground/70 mt-1">Fair and transparent policies</p>
            </div>
          </div>
          <p className="text-lg text-secondary-foreground/80 max-w-2xl">
            We want you to be completely satisfied with your PayMall experience. Here's everything you need to know about refunds and cancellations.
          </p>
        </div>
      </motion.header>

      {/* Refund Process */}
      <section className="py-16">
        <div className="container px-4 max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-2xl font-display font-bold text-foreground mb-8 text-center">
              Refund Process
            </h2>
            <div className="grid md:grid-cols-4 gap-4 mb-16">
              {refundSteps.map((item, index) => (
                <motion.div
                  key={index}
                  className="relative bg-card rounded-2xl p-6 border border-border/50 text-center"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.1 * index }}
                >
                  <div className="w-10 h-10 rounded-full gradient-hero flex items-center justify-center mx-auto mb-4 text-primary-foreground font-bold">
                    {item.step}
                  </div>
                  <h3 className="font-semibold text-foreground mb-2">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">{item.desc}</p>
                  {index < refundSteps.length - 1 && (
                    <div className="hidden md:block absolute top-1/2 -right-2 w-4 h-0.5 bg-border" />
                  )}
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Eligibility */}
          <div className="grid md:grid-cols-2 gap-8 mb-16">
            <motion.div
              className="bg-primary/5 rounded-2xl p-6 border border-primary/20"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <div className="flex items-center gap-3 mb-4">
                <CheckCircle className="w-6 h-6 text-primary" />
                <h3 className="text-lg font-display font-bold text-foreground">Eligible for Refund</h3>
              </div>
              <ul className="space-y-3">
                {eligibleItems.map((item, index) => (
                  <li key={index} className="flex items-start gap-2 text-muted-foreground">
                    <CheckCircle className="w-4 h-4 text-primary mt-1 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.div
              className="bg-secondary/5 rounded-2xl p-6 border border-secondary/20"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <div className="flex items-center gap-3 mb-4">
                <XCircle className="w-6 h-6 text-secondary" />
                <h3 className="text-lg font-display font-bold text-foreground">Not Eligible</h3>
              </div>
              <ul className="space-y-3">
                {nonEligibleItems.map((item, index) => (
                  <li key={index} className="flex items-start gap-2 text-muted-foreground">
                    <XCircle className="w-4 h-4 text-secondary mt-1 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>

          {/* Policy Details */}
          <motion.div 
            className="space-y-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            <div className="bg-card rounded-2xl p-6 md:p-8 border border-border/50">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Clock className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-xl font-display font-bold text-foreground mb-3">Cancellation Window</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Orders can be cancelled within <strong className="text-foreground">15 minutes</strong> of placement through the app. 
                    After this window, the order enters processing and cancellation may not be possible. 
                    For in-store transactions, cancellation requests must be made before leaving the store premises.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-card rounded-2xl p-6 md:p-8 border border-border/50">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-secondary/20 flex items-center justify-center flex-shrink-0">
                  <CreditCard className="w-6 h-6 text-secondary" />
                </div>
                <div>
                  <h3 className="text-xl font-display font-bold text-foreground mb-3">Refund Methods</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Refunds are credited to the original payment method:
                  </p>
                  <ul className="mt-3 space-y-2 text-muted-foreground">
                    <li>• <strong className="text-foreground">UPI/Bank Transfer:</strong> 2-3 business days</li>
                    <li>• <strong className="text-foreground">Credit/Debit Cards:</strong> 5-7 business days</li>
                    <li>• <strong className="text-foreground">PayMall Wallet:</strong> Instant credit</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-card rounded-2xl p-6 md:p-8 border border-border/50">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-accent/20 flex items-center justify-center flex-shrink-0">
                  <HelpCircle className="w-6 h-6 text-accent-foreground" />
                </div>
                <div>
                  <h3 className="text-xl font-display font-bold text-foreground mb-3">Need Help?</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Our support team is available 24/7 to assist with refund and cancellation requests. 
                    Contact us at <a href="mailto:support@paymall.live" className="text-primary hover:underline">support@paymall.live</a> or 
                    through the in-app support chat.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
};

export default RefundCancellation;
