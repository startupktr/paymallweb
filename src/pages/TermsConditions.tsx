import { Link } from "react-router-dom";
import { ArrowLeft, FileText, Scale, Shield, AlertTriangle, Users, Globe } from "lucide-react";
import { motion } from "framer-motion";
import logo from "@/assets/logo.png";

const TermsConditions = () => {
  const sections = [
    {
      icon: FileText,
      title: "1. Acceptance of Terms",
      content: `By accessing and using the PayMall application and services, you acknowledge that you have read, understood, and agree to be bound by these Terms and Conditions. If you do not agree to these terms, please do not use our services.

These terms apply to all users of the PayMall platform, including customers, merchants, and business partners. We reserve the right to modify these terms at any time, and your continued use of the service constitutes acceptance of any modifications.`
    },
    {
      icon: Users,
      title: "2. User Accounts",
      content: `To use PayMall services, you must create an account by providing accurate and complete information. You are responsible for:

• Maintaining the confidentiality of your account credentials
• All activities that occur under your account
• Notifying us immediately of any unauthorized use
• Ensuring your account information remains current and accurate

You must be at least 18 years old to create an account. One person may only maintain one active account.`
    },
    {
      icon: Shield,
      title: "3. Service Usage",
      content: `PayMall provides an in-store shopping convenience application that allows users to scan products, create digital carts, and complete transactions. You agree to:

• Use the service only for lawful purposes
• Not attempt to circumvent any security measures
• Not use automated systems to access the service
• Not interfere with other users' access to the service
• Comply with all applicable laws and regulations

We reserve the right to suspend or terminate accounts that violate these terms.`
    },
    {
      icon: Scale,
      title: "4. Payment Terms",
      content: `All transactions processed through PayMall are subject to our payment terms:

• Payments are processed through secure, encrypted channels
• You authorize us to charge your selected payment method
• All prices displayed include applicable taxes unless stated otherwise
• Transaction fees may apply as disclosed during checkout
• Refunds are processed according to our Refund & Cancellation Policy

We partner with trusted payment processors to ensure secure transactions.`
    },
    {
      icon: AlertTriangle,
      title: "5. Limitation of Liability",
      content: `To the maximum extent permitted by law, PayMall and its affiliates shall not be liable for:

• Any indirect, incidental, or consequential damages
• Loss of data, profits, or business opportunities
• Service interruptions or system failures
• Actions of third-party merchants or partners
• Unauthorized access to your account

Our total liability shall not exceed the amount you paid for services in the preceding 12 months.`
    },
    {
      icon: Globe,
      title: "6. Governing Law",
      content: `These Terms and Conditions shall be governed by and construed in accordance with the laws of India. Any disputes arising from these terms shall be subject to the exclusive jurisdiction of the courts in [Your City], India.

If any provision of these terms is found to be unenforceable, the remaining provisions shall continue in full force and effect. Our failure to enforce any right shall not constitute a waiver of that right.`
    }
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
