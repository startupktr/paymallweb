import { Link } from "react-router-dom";
import { ArrowLeft, Tag, Percent, Receipt, Calculator, TrendingUp, Info, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

const PricingPolicy = () => {
  const pricingFeatures = [
    {
      icon: Tag,
      title: "Transparent Pricing",
      desc: "All prices shown include applicable taxes. No hidden fees or surprise charges at checkout."
    },
    {
      icon: Sparkles,
      title: "Smart Cart Optimization",
      desc: "Our system automatically applies eligible offers and discounts in real time to ensure you always get the best available deal."
    }
,
    {
      icon: Receipt,
      title: "Digital Receipts",
      desc: "Get detailed itemized receipts with tax breakdowns sent directly to your email."
    },
    {
      icon: Calculator,
      title: "Real-Time Totals",
      desc: "See your running total as you shop, so there are no surprises at checkout."
    },
  ];

  return (
    <main className="min-h-screen bg-background">
      {/* Header */}
      <motion.header 
        className="gradient-hero py-16 md:py-24"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <div className="container px-4">
          <Link to="/" className="inline-flex items-center gap-2 text-primary-foreground/80 hover:text-primary-foreground mb-8 transition-colors">
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>
          <div className="flex items-center gap-4 mb-6">
            <div className="w-16 h-16 rounded-2xl bg-primary-foreground/20 flex items-center justify-center shadow-lg">
              <Tag className="w-8 h-8 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-3xl md:text-4xl font-display font-bold text-primary-foreground">
                Pricing Policy
              </h1>
              <p className="text-primary-foreground/70 mt-1">Clear, fair, and transparent</p>
            </div>
          </div>
          <p className="text-lg text-primary-foreground/80 max-w-2xl">
            At PayMall, we believe in complete transparency. Here's how our pricing works.
          </p>
        </div>
      </motion.header>

      {/* Features Grid */}
      <section className="py-16">
        <div className="container px-4 max-w-4xl">
          <motion.div 
            className="grid md:grid-cols-2 gap-6 mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {pricingFeatures.map((feature, index) => (
              <motion.div
                key={index}
                className="bg-card rounded-2xl p-6 border border-border/50 hover:shadow-lg transition-shadow"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.1 * index }}
              >
                <div className="w-12 h-12 rounded-xl gradient-hero flex items-center justify-center mb-4">
                  <feature.icon className="w-6 h-6 text-primary-foreground" />
                </div>
                <h3 className="text-lg font-display font-bold text-foreground mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.desc}</p>
              </motion.div>
            ))}
          </motion.div>

          {/* Detailed Sections */}
          <motion.div 
            className="space-y-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <div className="bg-card rounded-2xl p-6 md:p-8 border border-border/50">
              <h2 className="text-xl font-display font-bold text-foreground mb-4">
                How Pricing Works
              </h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  <strong className="text-foreground">Product Prices:</strong> All product prices displayed in the PayMall app 
                  are synced directly from our partner stores' inventory systems. Prices are updated in real-time to ensure accuracy.
                </p>
                <p>
                  <strong className="text-foreground">Tax Calculation:</strong> Applicable GST and other taxes are calculated 
                  automatically based on product category and your location. The final price shown at checkout includes all taxes.
                </p>
                <p>
                  <strong className="text-foreground">Promotional Pricing:</strong> Store promotions, discounts, and special 
                  offers are automatically applied when you scan eligible products. You'll see the discounted price immediately.
                </p>
              </div>
            </div>

            <div className="bg-card rounded-2xl p-6 md:p-8 border border-border/50">
              <h2 className="text-xl font-display font-bold text-foreground mb-4">
                Service Fees
              </h2>
              <div className="space-y-4 text-muted-foreground">
                <div className="bg-muted rounded-xl p-4">
                  <div className="flex justify-between items-center">
                    <span className="font-semibold text-foreground">App Usage</span>
                    <span className="text-primary font-bold">FREE</span>
                  </div>
                  <p className="text-sm mt-1">Download and use PayMall at no cost</p>
                </div>
                <div className="bg-muted rounded-xl p-4">
                  <div className="flex justify-between items-center">
                    <span className="font-semibold text-foreground">Transaction Fee</span>
                    <span className="text-primary font-bold">FREE</span>
                  </div>
                  <p className="text-sm mt-1">No additional charges for using PayMall to pay</p>
                </div>
                <div className="bg-muted rounded-xl p-4">
                  <div className="flex justify-between items-center">
                    <span className="font-semibold text-foreground">Payment Processing</span>
                    <span className="text-primary font-bold">FREE</span>
                  </div>
                  <p className="text-sm mt-1">UPI, cards, and wallets – all payment methods are free</p>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-primary/10 to-secondary/10 rounded-2xl p-6 md:p-8 border border-primary/20">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center flex-shrink-0">
                  <TrendingUp className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-xl font-display font-bold text-foreground mb-3">Price Adjustments</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Prices may change based on store inventory, seasonal promotions, or market conditions. 
                    The price you see when you scan an item is the price you pay, even if it changes later. 
                    We encourage scanning items as you add them to your cart to lock in current prices.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-card rounded-2xl p-6 md:p-8 border border-border/50">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-accent/20 flex items-center justify-center flex-shrink-0">
                  <Info className="w-6 h-6 text-accent-foreground" />
                </div>
                <div>
                  <h3 className="text-xl font-display font-bold text-foreground mb-3">For Merchants</h3>
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    If you're a business interested in partnering with PayMall, we offer competitive pricing models tailored to your needs. 
                    Contact our business development team for detailed pricing information.
                  </p>
                  <Link 
                    to="/contact" 
                    className="inline-flex items-center gap-2 text-primary font-semibold hover:text-primary/80 transition-colors"
                  >
                    Contact Business Team <ArrowLeft className="w-4 h-4 rotate-180" />
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
};

export default PricingPolicy;
