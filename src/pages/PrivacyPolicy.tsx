import { Link } from "react-router-dom";
import { ArrowLeft, Shield, Eye, Lock, Database, Bell, UserCheck, Share2 } from "lucide-react";
import { motion } from "framer-motion";
import logo from "@/assets/logo.png";

const PrivacyPolicy = () => {
  const sections = [
    {
      icon: Database,
      title: "1. Information We Collect",
      content: `We collect information to provide and improve our services:

**Personal Information:**
• Name, email address, and phone number
• Payment and billing information
• Device identifiers and location data
• Shopping preferences and purchase history

**Automatically Collected:**
• Device type, operating system, and browser
• IP address and approximate location
• App usage patterns and interaction data
• Cookies and similar tracking technologies`
    },
    {
      icon: Eye,
      title: "2. How We Use Your Information",
      content: `Your information helps us deliver and improve PayMall services:

• Processing transactions and payments
• Personalizing your shopping experience
• Sending order confirmations and receipts
• Providing customer support
• Analyzing usage patterns to improve features
• Sending promotional offers (with your consent)
• Detecting and preventing fraud
• Complying with legal obligations`
    },
    {
      icon: Share2,
      title: "3. Information Sharing",
      content: `We share your information only in specific circumstances:

**With Merchants:** Order details necessary to fulfill your purchases
**With Payment Processors:** Secure transaction processing
**With Service Providers:** Companies that help us operate our platform
**For Legal Compliance:** When required by law or to protect rights

We never sell your personal information to third parties for marketing purposes.`
    },
    {
      icon: Lock,
      title: "4. Data Security",
      content: `We implement robust security measures to protect your data:

• 256-bit SSL/TLS encryption for all data transfers
• PCI-DSS compliant payment processing
• Regular security audits and penetration testing
• Secure data centers with 24/7 monitoring
• Access controls and employee training
• Encrypted data storage at rest

While we take extensive precautions, no system is 100% secure. We encourage you to protect your account credentials.`
    },
    {
      icon: UserCheck,
      title: "5. Your Rights & Choices",
      content: `You have control over your personal data:

• **Access:** Request a copy of your personal data
• **Correction:** Update or correct inaccurate information
• **Deletion:** Request deletion of your account and data
• **Portability:** Export your data in a readable format
• **Opt-out:** Unsubscribe from marketing communications
• **Cookies:** Manage cookie preferences in your browser

To exercise these rights, contact us at privacy@paymall.live`
    },
    {
      icon: Bell,
      title: "6. Updates to This Policy",
      content: `We may update this Privacy Policy periodically to reflect:

• Changes in our practices or services
• New legal or regulatory requirements
• Feedback from users and stakeholders

We will notify you of significant changes via email or in-app notification. Your continued use of PayMall after changes constitutes acceptance of the updated policy.

**Effective Date:** January 2025
**Last Updated:** January 31, 2025`
    }
  ];

  return (
    <main className="min-h-screen bg-background">
      {/* Header */}
      <motion.header 
        className="bg-gradient-to-r from-primary via-primary to-secondary py-16 md:py-24"
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
              <Shield className="w-8 h-8 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-3xl md:text-4xl font-display font-bold text-primary-foreground">
                Privacy Policy
              </h1>
              <p className="text-primary-foreground/70 mt-1">Your privacy matters to us</p>
            </div>
          </div>
          <p className="text-lg text-primary-foreground/80 max-w-2xl">
            We are committed to protecting your personal information and being transparent about how we collect and use your data.
          </p>
        </div>
      </motion.header>

      {/* Content */}
      <section className="py-16">
        <div className="container px-4 max-w-4xl">
          <motion.div 
            className="space-y-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {sections.map((section, index) => (
              <motion.div
                key={index}
                className="bg-card rounded-2xl p-6 md:p-8 border border-border/50 shadow-sm hover:shadow-md transition-shadow"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.1 * index }}
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <section.icon className="w-6 h-6 text-primary" />
                  </div>
                  <div className="flex-1">
                    <h2 className="text-xl font-display font-bold text-foreground mb-4">
                      {section.title}
                    </h2>
                    <div className="text-muted-foreground whitespace-pre-line leading-relaxed prose prose-sm max-w-none">
                      {section.content.split('**').map((part, i) => 
                        i % 2 === 1 ? <strong key={i} className="text-foreground">{part}</strong> : part
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Trust Badge */}
          <motion.div 
            className="mt-12 bg-muted rounded-2xl p-8 flex flex-col md:flex-row items-center gap-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            <div className="w-20 h-20 rounded-full gradient-hero flex items-center justify-center">
              <Lock className="w-10 h-10 text-primary-foreground" />
            </div>
            <div className="text-center md:text-left">
              <h3 className="text-xl font-display font-bold text-foreground mb-2">
                Your Data is Protected
              </h3>
              <p className="text-muted-foreground">
                PayMall uses bank-level encryption and is compliant with data protection regulations. 
                Your information is never sold to third parties.
              </p>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
};

export default PrivacyPolicy;
