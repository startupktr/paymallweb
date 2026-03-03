import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ScrollAnimation } from "@/components/ScrollAnimation";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { z } from "zod";
import { Rocket, Gift, Store, BarChart3, Shield, MapPin, Palette, Share2, TrendingUp, Receipt, CheckCircle2, Clock, IndianRupee, ArrowLeft } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const pilotFormSchema = z.object({
  storeName: z.string().trim().min(1, "Store name is required").max(100),
  ownerName: z.string().trim().min(1, "Owner name is required").max(100),
  email: z.string().trim().email("Invalid email address").max(255),
  phone: z.string().trim().min(10, "Phone number must be at least 10 digits").max(15),
  storeAddress: z.string().trim().min(5, "Store address is required").max(500),
  storeType: z.string().min(1, "Please select store type"),
  message: z.string().trim().max(1000).optional(),
});

type PilotFormData = z.infer<typeof pilotFormSchema>;

const benefits = [
  { icon: Store, title: "Your Own Branded Digital Presence", items: ["Your mart featured inside the PayMall Customer App", "Dedicated Admin Panel for store management", "Your store brand visible to local customers"] },
  { icon: Shield, title: "Complete Store Digitisation", items: ["Online presence for your mart", "Digital product listing system", "Smart retail transformation"] },
  { icon: Gift, title: "Full Product Cataloging (FREE)", items: ["Complete product data entry handled by our team", "Organized categories & searchable products", "No cataloging charges"] },
  { icon: MapPin, title: "Local Area Marketing (5 KM Radius)", badge: "T&C applied", items: ["Targeted digital promotions around your store", "Local customer awareness campaigns", "Increased visibility in your neighbourhood"] },
  { icon: Palette, title: "Free In-Store Branding Material", items: ["Posters & display creatives", "Branding support to inform walk-in customers"] },
  { icon: Share2, title: "Social Media Feature & Promotion", items: ["Store spotlight posts", "Digital visibility boost", "Community-based promotion"] },
  { icon: TrendingUp, title: "Revenue Growth Support", items: ["Guidance to increase average billing value", "Customer retention strategies", "Support to improve repeat visits"] },
  { icon: BarChart3, title: "Data & Analytics Reports", items: ["Insights on top-selling products", "Customer purchase trends", "Performance reports for data-driven decisions"] },
  { icon: Receipt, title: "Digital Receipt & GST-Ready System", items: ["Digital billing system", "GST-compatible format", "Modern & professional checkout experience"] },
];

const whyJoin = [
  { title: "₹1 Lakh Worth Software — Free", desc: "Access premium digital infrastructure without investment during the pilot." },
  { title: "Zero Risk Participation", desc: "No mandatory continuation after pilot completion." },
  { title: "Become a Digital-First Retailer", desc: "Position your mart as a modern, tech-enabled store in your area." },
  { title: "Early Adopter Advantage", desc: "Be among the first smart retailers in your locality and build strong brand recall." },
  { title: "Compete with Modern Retail Chains", desc: "Use technology to match the experience provided by large supermarket brands." },
  { title: "Faster & Better Customer Service", desc: "Digital systems reduce manual work and improve billing efficiency." },
  { title: "Build Customer Loyalty", desc: "Improved experience leads to repeat visits and long-term customer relationships." },
];

const faqs = [
  { q: "Is there any hidden cost during the pilot?", a: "No. The pilot program is completely free." },
  { q: "What happens after pilot program is over?", a: "You can choose whether to continue with PayMall services." },
  { q: "Will my store need technical knowledge?", a: "No. Our team handles setup, cataloguing, and onboarding support." },
  { q: "Is this suitable for small kirana stores?", a: "It depends on the size and type of store. The program is specially designed for local marts, supermarkets." },
];

const PilotProgram = () => {
  const [formData, setFormData] = useState<PilotFormData>({
    storeName: "", ownerName: "", email: "", phone: "", storeAddress: "", storeType: "", message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Partial<Record<keyof PilotFormData, string>>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof PilotFormData]) setErrors((prev) => ({ ...prev, [name]: undefined }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});
    const result = pilotFormSchema.safeParse(formData);
    if (!result.success) {
      const fieldErrors: Partial<Record<keyof PilotFormData, string>> = {};
      result.error.errors.forEach((err) => { fieldErrors[err.path[0] as keyof PilotFormData] = err.message; });
      setErrors(fieldErrors);
      return;
    }
    setIsSubmitting(true);
    try {
      const { error } = await supabase.from("contact_requests").insert({
        name: formData.ownerName.trim(),
        email: formData.email.trim(),
        company: formData.storeName.trim(),
        message: `[Pilot Program Application]\nStore: ${formData.storeName}\nPhone: ${formData.phone}\nAddress: ${formData.storeAddress}\nType: ${formData.storeType}\n\n${formData.message || ""}`.trim(),
        request_type: "pilot_program",
      });
      if (error) throw error;
      toast.success("Application submitted successfully!", { description: "Our team will review your details and contact you for onboarding." });
      setFormData({ storeName: "", ownerName: "", email: "", phone: "", storeAddress: "", storeType: "", message: "" });
    } catch (error) {
      console.error("Error submitting pilot application:", error);
      toast.error("Failed to submit application", { description: "Please try again later." });
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputClass = (field: keyof PilotFormData) =>
    `w-full px-4 py-3 rounded-xl border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 ${errors[field] ? "border-destructive" : "border-border"}`;

  return (
    <main className="min-h-screen bg-background">
      {/* Hero */}
      <section className="relative bg-gradient-to-br from-primary/10 via-background to-accent/10 py-20 lg:py-28">
        <div className="container px-4">
          <Link to="/" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-8">
            <ArrowLeft className="w-4 h-4" /> Back to Home
          </Link>
          <ScrollAnimation>
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-6">
                <Rocket className="w-4 h-4" /> Limited Time Initiative
              </div>
              <h1 className="font-display text-4xl lg:text-5xl font-bold text-foreground mb-6">PayMall Pilot Program</h1>
              <p className="text-lg text-muted-foreground leading-relaxed">
                The PayMall Pilot Program is a limited-time initiative designed to digitally transform selected local marts and kirana stores — at zero cost during the pilot phase.
              </p>
            </div>
          </ScrollAnimation>
        </div>
      </section>

      {/* Pilot Details */}
      <section className="py-16 bg-muted/30">
        <div className="container px-4">
          <ScrollAnimation>
            <h2 className="font-display text-3xl font-bold text-foreground mb-10 text-center">📅 Pilot Details</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-4xl mx-auto">
              {[
                { icon: Clock, label: "Duration", value: "3 Months" },
                { icon: IndianRupee, label: "Cost During Pilot", value: "₹0" },
                { icon: Gift, label: "Software Value", value: "₹1,00,000 FREE" },
                { icon: Shield, label: "Obligation", value: "No commitment" },
              ].map((item) => (
                <div key={item.label} className="bg-card rounded-2xl p-6 text-center border border-border/50 shadow-sm">
                  <item.icon className="w-8 h-8 text-primary mx-auto mb-3" />
                  <p className="text-sm text-muted-foreground mb-1">{item.label}</p>
                  <p className="text-xl font-bold text-foreground">{item.value}</p>
                </div>
              ))}
            </div>
            <p className="text-center text-muted-foreground mt-6 text-sm max-w-xl mx-auto">
              If you choose not to continue after the pilot period, you can opt out without any restrictions.
            </p>
          </ScrollAnimation>
        </div>
      </section>

      {/* What You Get */}
      <section className="py-16">
        <div className="container px-4">
          <ScrollAnimation>
            <h2 className="font-display text-3xl font-bold text-foreground mb-10 text-center">🎁 What You Get During the Pilot</h2>
          </ScrollAnimation>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {benefits.map((benefit, idx) => (
              <ScrollAnimation key={idx}>
                <div className="bg-card rounded-2xl p-6 border border-border/50 shadow-sm h-full hover:shadow-md transition-shadow">
                  <div className="flex items-start gap-3 mb-4">
                    <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <benefit.icon className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-display font-semibold text-foreground">{benefit.title}</h3>
                      {benefit.badge && <span className="text-xs bg-accent/20 text-accent-foreground px-2 py-0.5 rounded-full">{benefit.badge}</span>}
                    </div>
                  </div>
                  <ul className="space-y-2">
                    {benefit.items.map((item, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                        <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" /> {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </ScrollAnimation>
            ))}
          </div>
        </div>
      </section>

      {/* Why Join */}
      <section className="py-16 bg-muted/30">
        <div className="container px-4">
          <ScrollAnimation>
            <h2 className="font-display text-3xl font-bold text-foreground mb-10 text-center">💡 Why Join the PayMall Pilot Program?</h2>
          </ScrollAnimation>
          <div className="grid md:grid-cols-2 gap-4 max-w-4xl mx-auto">
            {whyJoin.map((item, idx) => (
              <ScrollAnimation key={idx}>
                <div className="flex items-start gap-3 bg-card rounded-xl p-5 border border-border/50">
                  <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">{item.title}</h3>
                    <p className="text-sm text-muted-foreground">{item.desc}</p>
                  </div>
                </div>
              </ScrollAnimation>
            ))}
          </div>
        </div>
      </section>

      {/* Limited Slots */}
      <section className="py-16">
        <div className="container px-4">
          <ScrollAnimation>
            <div className="max-w-2xl mx-auto text-center bg-gradient-to-br from-primary/5 to-accent/5 rounded-3xl p-10 border border-primary/20">
              <Shield className="w-12 h-12 text-primary mx-auto mb-4" />
              <h2 className="font-display text-2xl font-bold text-foreground mb-4">🔒 Limited Pilot Slots Available</h2>
              <p className="text-muted-foreground mb-4">We are selecting a limited number of marts for this transformation program.</p>
              <div className="text-left max-w-xs mx-auto space-y-2 mb-6">
                {["Store readiness", "Location potential", "Commitment to growth"].map((item) => (
                  <div key={item} className="flex items-center gap-2 text-sm text-foreground">
                    <CheckCircle2 className="w-4 h-4 text-primary" /> {item}
                  </div>
                ))}
              </div>
              <p className="font-semibold text-primary">👉 Be among the first smart retailers in your area.</p>
            </div>
          </ScrollAnimation>
        </div>
      </section>

      {/* Application Form */}
      <section className="py-16 bg-muted/30" id="apply">
        <div className="container px-4">
          <ScrollAnimation>
            <div className="max-w-2xl mx-auto">
              <h2 className="font-display text-3xl font-bold text-foreground mb-3 text-center">📞 Apply for the Pilot Program</h2>
              <p className="text-center text-muted-foreground mb-8">Our team will review your store details and contact you for onboarding.</p>
              <div className="bg-card rounded-3xl p-8 shadow-lg border border-border/50">
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium text-foreground mb-1 block">Store Name *</label>
                      <input type="text" name="storeName" placeholder="Your store name" value={formData.storeName} onChange={handleChange} className={inputClass("storeName")} />
                      {errors.storeName && <p className="text-sm text-destructive mt-1">{errors.storeName}</p>}
                    </div>
                    <div>
                      <label className="text-sm font-medium text-foreground mb-1 block">Owner Name *</label>
                      <input type="text" name="ownerName" placeholder="Full name" value={formData.ownerName} onChange={handleChange} className={inputClass("ownerName")} />
                      {errors.ownerName && <p className="text-sm text-destructive mt-1">{errors.ownerName}</p>}
                    </div>
                  </div>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium text-foreground mb-1 block">Email *</label>
                      <input type="email" name="email" placeholder="email@example.com" value={formData.email} onChange={handleChange} className={inputClass("email")} />
                      {errors.email && <p className="text-sm text-destructive mt-1">{errors.email}</p>}
                    </div>
                    <div>
                      <label className="text-sm font-medium text-foreground mb-1 block">Phone *</label>
                      <input type="tel" name="phone" placeholder="Phone number" value={formData.phone} onChange={handleChange} className={inputClass("phone")} />
                      {errors.phone && <p className="text-sm text-destructive mt-1">{errors.phone}</p>}
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-foreground mb-1 block">Store Type *</label>
                    <select name="storeType" value={formData.storeType} onChange={handleChange} className={inputClass("storeType")}>
                      <option value="">Select store type</option>
                      <option value="kirana">Kirana Store</option>
                      <option value="supermarket">Supermarket</option>
                      <option value="minimart">Mini Mart</option>
                      <option value="departmental">Departmental Store</option>
                      <option value="other">Other</option>
                    </select>
                    {errors.storeType && <p className="text-sm text-destructive mt-1">{errors.storeType}</p>}
                  </div>
                  <div>
                    <label className="text-sm font-medium text-foreground mb-1 block">Store Address *</label>
                    <textarea name="storeAddress" placeholder="Full store address with city and pincode" rows={2} value={formData.storeAddress} onChange={handleChange} className={`${inputClass("storeAddress")} resize-none`} />
                    {errors.storeAddress && <p className="text-sm text-destructive mt-1">{errors.storeAddress}</p>}
                  </div>
                  <div>
                    <label className="text-sm font-medium text-foreground mb-1 block">Additional Message</label>
                    <textarea name="message" placeholder="Anything else you'd like us to know..." rows={3} value={formData.message} onChange={handleChange} className={`${inputClass("message")} resize-none`} />
                  </div>
                  <Button variant="hero" size="lg" className="w-full" disabled={isSubmitting}>
                    {isSubmitting ? "Submitting..." : "Apply for Pilot Program"}
                  </Button>
                </form>
              </div>
            </div>
          </ScrollAnimation>
        </div>
      </section>

      {/* FAQs */}
      <section className="py-16">
        <div className="container px-4">
          <ScrollAnimation>
            <h2 className="font-display text-3xl font-bold text-foreground mb-10 text-center">Frequently Asked Questions</h2>
            <div className="max-w-2xl mx-auto">
              <Accordion type="single" collapsible className="space-y-3">
                {faqs.map((faq, idx) => (
                  <AccordionItem key={idx} value={`faq-${idx}`} className="bg-card rounded-xl border border-border/50 px-6">
                    <AccordionTrigger className="text-left font-medium text-foreground hover:no-underline">{faq.q}</AccordionTrigger>
                    <AccordionContent className="text-muted-foreground">{faq.a}</AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </ScrollAnimation>
        </div>
      </section>

      <footer className="bg-foreground text-primary-foreground py-8">
        <div className="container px-4 text-center">
          <p className="text-sm text-primary-foreground/50">© 2025 PayMall. All rights reserved.</p>
        </div>
      </footer>
    </main>
  );
};

export default PilotProgram;
