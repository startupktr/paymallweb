import { Link } from "react-router-dom";
import { ArrowLeft, FileText, Scale, Shield, AlertTriangle, Users, Globe } from "lucide-react";
import { motion } from "framer-motion";
import logo from "@/assets/logo.png";
import {
  
  BookOpen,
  UserCheck,
  Smartphone,
  CreditCard,
  ShieldCheck,
  XCircle,
} from "lucide-react";

const TermsConditions = () => {
 const sections = [
    {
      icon: FileText,
      title: "1. Introduction",
      content: `Welcome to PayMall, a mobile application designed to enable customers to scan products, make digital payments, and complete in-store shopping without traditional billing queues.

By accessing or using the PayMall app, you agree to be bound by these Terms & Conditions (“Terms”). If you do not agree, you must not use the app.`
    },
    {
      icon: BookOpen,
      title: "2. Definitions",
      content: `• “Company” refers to PayMall Technologies Pvt. Ltd.
• “User” refers to any customer using the PayMall app.
• “Merchant/Mall” refers to participating supermarkets, malls, or retail partners.
• “Service” refers to scan-pay-go functionality and related features.`
    },
    
    {
      icon: UserCheck,
      title: "3. Eligibility",
      content: `• Users must be 18 years or older or use the app under parental supervision.
• Users must provide accurate and up-to-date information.`
    },
    {
      icon: Smartphone,
      title: "4. Nature of Service",
      content: `PayMall acts as a technology facilitator.

• We do not sell products, own inventory, or control pricing.
• All products are sold directly by the mall/merchant.`
    },
    {
      icon: Users,
      title: "5. User Responsibilities",
      content: `Users agree to:

• Scan only items they intend to purchase.
• Complete payment before exiting the store.
• Not misuse, manipulate, or attempt fraud through the app.
• Cooperate with store staff/security for verification if required.`
    },
    {
      icon: CreditCard,
      title: "6. Payments",
      content: `• Payments are processed via third-party payment gateways (UPI, cards, wallets).
• PayMall does not store sensitive payment credentials.
• Failed or duplicate payments must be reported immediately.`
    },
    {
      icon: ShieldCheck,
      title: "7. Verification & Exit Authorization",
      content: `• Security personnel may verify digital receipts.
• PayMall reserves the right to share transaction confirmation with the mall.`
    },
    {
      icon: AlertTriangle,
      title: "8. Prohibited Activities",
      content: `• Barcode manipulation
• Payment bypassing
• App tampering
• Fraudulent chargebacks
• Any illegal activity

Violation may result in account suspension or legal action.`
    },
    {
      icon: Scale,
      title: "9. Limitation of Liability",
      content: `PayMall is not responsible for:

• Product quality issues
• Pricing disputes
• Inventory mismatch
• Network failures
• Payment gateway downtime

Maximum liability is limited to the transaction value paid via the app.`
    },
    {
      icon: XCircle,
      title: "10. Termination",
      content: `We reserve the right to suspend or terminate accounts for violations without prior notice.`
    },
//     {
//       icon: Globe,
//       title: "11. Governing Law",
//       content: `These Terms are governed by laws of India.

// Jurisdiction: Courts of [Your City], India.`
//     }
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
            <div className="w-16 h-16 rounded-2xl overflow-hidden shadow-lg">
              <img src={logo} alt="PayMall" className="w-full h-full object-cover" />
            </div>
            <div>
              <h1 className="text-3xl md:text-4xl font-display font-bold text-primary-foreground">
                Terms & Conditions
              </h1>
              <p className="text-primary-foreground/70 mt-1">Last updated: January 2025</p>
            </div>
          </div>
          <p className="text-lg text-primary-foreground/80 max-w-2xl">
            Please read these terms carefully before using PayMall services. By using our platform, you agree to these terms.
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
                className="bg-card rounded-2xl p-6 md:p-8 border border-border/50 shadow-sm"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.1 * index }}
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl gradient-hero flex items-center justify-center flex-shrink-0">
                    <section.icon className="w-6 h-6 text-primary-foreground" />
                  </div>
                  <div>
                    <h2 className="text-xl font-display font-bold text-foreground mb-4">
                      {section.title}
                    </h2>
                    <div className="text-muted-foreground whitespace-pre-line leading-relaxed">
                      {section.content}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Contact Section */}
          <motion.div 
            className="mt-12 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-2xl p-8 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            <h3 className="text-xl font-display font-bold text-foreground mb-2">
              Questions About These Terms?
            </h3>
            <p className="text-muted-foreground mb-4">
              If you have any questions about our Terms & Conditions, please contact our legal team.
            </p>
            <Link 
              to="/contact" 
              className="inline-flex items-center gap-2 text-primary font-semibold hover:text-primary/80 transition-colors"
            >
              Contact Us <ArrowLeft className="w-4 h-4 rotate-180" />
            </Link>
          </motion.div>
        </div>
      </section>
    </main>
  );
};

export default TermsConditions;
