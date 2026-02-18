import { Link } from "react-router-dom";
import { ArrowLeft, Shield, Eye, Lock, Database, Bell, UserCheck, Share2,Target,Clock,} from "lucide-react";
import { motion } from "framer-motion";
import logo from "@/assets/logo.png";

const PrivacyPolicy = () => {
  const sections = [
    {
      icon: Database,
      title: "1. Data We Collect",
      content: `• Name, phone number, email
• Device & app usage data
• Location (mall-level, not GPS tracking)
• Transaction history`
    },
    {
      icon: Target,
      title: "2. Purpose of Data Collection",
      content: `• User authentication
• Transaction processing
• Fraud prevention
• App functionality improvement
• Legal compliance`
    },
    {
      icon: Share2,
      title: "3. Data Sharing",
      content: `We may share limited data with:

• Participating malls (only transaction-related)
• Payment gateways
• Law enforcement (if legally required)

We never sell user data.`
    },
    {
      icon: Lock,
      title: "4. Data Storage & Security",
      content: `• Encrypted data storage
• Secure servers
• Restricted internal access
• Regular audits`
    },
    {
      icon: UserCheck,
      title: "5. User Rights",
      content: `Users can:

• Access their data
• Request corrections
• Request deletion (subject to legal retention)
• Withdraw consent`
    },
    {
      icon: Clock,
      title: "6. Data Retention",
      content: `Transaction data is retained as required by taxation and regulatory laws.`
    },
    {
      icon: Shield,
      title: "7. Children’s Privacy",
      content: `PayMall does not knowingly collect data from children under 13.`
    },
    {
      icon: Bell,
      title: "8. Policy Updates",
      content: `Users will be notified of significant changes to this Privacy Policy.`
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
