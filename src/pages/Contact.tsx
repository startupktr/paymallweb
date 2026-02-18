import { Link } from "react-router-dom";
import { ArrowLeft, Mail, Phone, MapPin, Clock, MessageSquare, Send, Building } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

const Contact = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    message: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const { error } = await supabase.from("contact_requests").insert({
        name: formData.name,
        email: formData.email,
        company: formData.company || null,
        message: formData.message,
        request_type: "contact",
      });

      if (error) throw error;

      toast.success("Message sent! We'll get back to you soon.");
      setFormData({ name: "", email: "", company: "", message: "" });
    } catch (error) {
      toast.error("Failed to send message. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactInfo = [
    {
      icon: Mail,
      title: "Email Us",
      value: "support@paymall.live",
      link: "mailto:support@paymall.live",
    },
    {
      icon: Phone,
      title: "Call Us",
      // value: "+91 ***** *****",
      // link: "tel:+919876543210",
      value: "Will be updated soon",
      link: null,
    },
    {
      icon: MapPin,
      title: "Visit Us",
      value: "Will be updated soon",
      link: null,
    },
    {
      icon: Clock,
      title: "Support Hours",
      value: "24/7 Available",
      link: null,
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
              <MessageSquare className="w-8 h-8 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-3xl md:text-4xl font-display font-bold text-primary-foreground">
                Contact Us
              </h1>
              <p className="text-primary-foreground/70 mt-1">We'd love to hear from you</p>
            </div>
          </div>
          <p className="text-lg text-primary-foreground/80 max-w-2xl">
            Have questions about PayMall? Want to partner with us? We're here to help.
          </p>
        </div>
      </motion.header>

      {/* Content */}
      <section className="py-16">
        <div className="container px-4">
          <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="bg-card rounded-2xl p-6 md:p-8 border border-border/50 shadow-sm">
                <h2 className="text-2xl font-display font-bold text-foreground mb-6">
                  Send us a Message
                </h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Your Name *
                      </label>
                      <Input
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="John Doe"
                        className="bg-background"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Email Address *
                      </label>
                      <Input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="john@example.com"
                        className="bg-background"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Company (Optional)
                    </label>
                    <Input
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      placeholder="Your company name"
                      className="bg-background"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Message *
                    </label>
                    <Textarea
                      required
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Tell us how we can help..."
                      rows={5}
                      className="bg-background resize-none"
                    />
                  </div>
                  <Button 
                    type="submit" 
                    size="lg" 
                    className="w-full"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      "Sending..."
                    ) : (
                      <>
                        Send Message
                        <Send className="w-4 h-4 ml-2" />
                      </>
                    )}
                  </Button>
                </form>
              </div>
            </motion.div>

            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="space-y-6"
            >
              <div className="grid sm:grid-cols-2 gap-4">
                {contactInfo.map((info, index) => (
                  <motion.div
                    key={index}
                    className="bg-card rounded-2xl p-6 border border-border/50"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.1 * index + 0.4 }}
                  >
                    <div className="w-12 h-12 rounded-xl gradient-hero flex items-center justify-center mb-4">
                      <info.icon className="w-6 h-6 text-primary-foreground" />
                    </div>
                    <h3 className="font-semibold text-foreground mb-1">{info.title}</h3>
                    {info.link ? (
                      <a href={info.link} className="text-muted-foreground hover:text-primary transition-colors">
                        {info.value}
                      </a>
                    ) : (
                      <p className="text-muted-foreground">{info.value}</p>
                    )}
                  </motion.div>
                ))}
              </div>

              {/* Business Inquiries */}
              <motion.div
                className="bg-gradient-to-r from-primary/10 to-secondary/10 rounded-2xl p-6 md:p-8 border border-primary/20"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center flex-shrink-0">
                    <Building className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-xl font-display font-bold text-foreground mb-2">
                      Business Partnerships
                    </h3>
                    <p className="text-muted-foreground mb-4">
                      Interested in bringing PayMall to your store? We partner with retailers of all sizes 
                      to modernize the shopping experience.
                    </p>
                    <a 
                      href="mailto:business@paymall.live" 
                      className="inline-flex items-center gap-2 text-primary font-semibold hover:text-primary/80 transition-colors"
                    >
                      support@paymall.live <ArrowLeft className="w-4 h-4 rotate-180" />
                    </a>
                  </div>
                </div>
              </motion.div>

              {/* FAQ Link */}
              <motion.div
                className="bg-muted rounded-2xl p-6 text-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.7 }}
              >
                <h3 className="font-semibold text-foreground mb-2">Looking for Quick Answers?</h3>
                <p className="text-muted-foreground mb-4">
                  Check out our blog for helpful articles and guides.
                </p>
                <Link to="/blog">
                  <Button variant="outline">
                    Visit Our Blog
                  </Button>
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Contact;
