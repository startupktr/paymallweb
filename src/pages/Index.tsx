import { ShoppingCart, Clock, Users, Store, Smartphone, Shield, ChevronRight, Check, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import phoneMockup from "@/assets/phone-mockup.png";
import heroBg from "@/assets/hero-bg.jpg";
import { useState } from "react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 gradient-glass border-b border-border/50">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <a href="#" className="flex items-center gap-2">
          <div className="w-10 h-10 gradient-hero rounded-xl flex items-center justify-center shadow-glow">
            <ShoppingCart className="w-5 h-5 text-primary-foreground" />
          </div>
          <span className="text-xl font-display font-bold text-foreground">PayMall</span>
        </a>
        
        <div className="hidden md:flex items-center gap-8">
          <a href="#problem" className="text-muted-foreground hover:text-foreground transition-colors font-medium">Problem</a>
          <a href="#how-it-works" className="text-muted-foreground hover:text-foreground transition-colors font-medium">How It Works</a>
          <a href="#customers" className="text-muted-foreground hover:text-foreground transition-colors font-medium">Customers</a>
          <a href="#businesses" className="text-muted-foreground hover:text-foreground transition-colors font-medium">Businesses</a>
          <a href="#about" className="text-muted-foreground hover:text-foreground transition-colors font-medium">About</a>
        </div>
        
        <div className="hidden md:flex items-center gap-4">
          <Button variant="outline" size="sm">Request Demo</Button>
          <Button size="sm">Download App</Button>
        </div>
        
        <button className="md:hidden p-2" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>
      
      {isOpen && (
        <div className="md:hidden bg-card border-t border-border py-4 px-4 space-y-4">
          <a href="#problem" className="block py-2 text-muted-foreground hover:text-foreground">Problem</a>
          <a href="#how-it-works" className="block py-2 text-muted-foreground hover:text-foreground">How It Works</a>
          <a href="#customers" className="block py-2 text-muted-foreground hover:text-foreground">Customers</a>
          <a href="#businesses" className="block py-2 text-muted-foreground hover:text-foreground">Businesses</a>
          <a href="#about" className="block py-2 text-muted-foreground hover:text-foreground">About</a>
          <div className="flex flex-col gap-2 pt-4">
            <Button variant="outline" className="w-full">Request Demo</Button>
            <Button className="w-full">Download App</Button>
          </div>
        </div>
      )}
    </nav>
  );
};

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center pt-20 overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img src={heroBg} alt="" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-foreground/90 via-foreground/80 to-foreground/60" />
      </div>
      
      <div className="container relative z-10 px-4 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/20 border border-primary/30 mb-6">
              <span className="w-2 h-2 bg-primary rounded-full animate-pulse" />
              <span className="text-sm font-medium text-primary-foreground/90">Now available in select stores</span>
            </div>
            
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-primary-foreground mb-6 leading-tight">
              Skip the Queue,{" "}
              <span className="text-gradient bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                Pay Instantly
              </span>
            </h1>
            
            <p className="text-lg md:text-xl text-primary-foreground/80 mb-8 max-w-xl mx-auto lg:mx-0">
              Transform your shopping experience. Scan, pay, and go — no more waiting in checkout lines.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-8">
              <Button variant="hero" size="lg" className="group">
                Download Free
                <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button variant="hero-outline" size="lg">
                Watch Demo
              </Button>
            </div>
            
            <div className="flex items-center gap-6 justify-center lg:justify-start text-primary-foreground/70">
              <div className="flex items-center gap-2">
                <Check className="w-5 h-5 text-primary" />
                <span className="text-sm">Free Download</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-5 h-5 text-primary" />
                <span className="text-sm">No Hidden Fees</span>
              </div>
            </div>
          </div>
          
          <div className="relative flex justify-center lg:justify-end">
            <div className="relative">
              <div className="absolute inset-0 gradient-hero blur-3xl opacity-30 scale-150" />
              <img 
                src={phoneMockup} 
                alt="PayMall App Interface" 
                className="relative z-10 w-64 md:w-80 animate-float drop-shadow-2xl"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const Problem = () => {
  return (
    <section id="problem" className="py-24 gradient-subtle">
      <div className="container px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-sm font-semibold text-secondary uppercase tracking-wider">The Problem</span>
          <h2 className="font-display text-3xl md:text-4xl font-bold mt-4 mb-6 text-foreground">
            Checkout Lines Are Costing Everyone
          </h2>
          <p className="text-lg text-muted-foreground">
            Every day, millions waste precious time in frustrating queues. Businesses lose customers, and shoppers lose patience.
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              icon: Clock,
              stat: "20+ min",
              label: "Average wait time during peak hours",
              color: "text-secondary",
            },
            {
              icon: Users,
              stat: "67%",
              label: "Shoppers abandon carts due to long lines",
              color: "text-primary",
            },
            {
              icon: Store,
              stat: "$38B",
              label: "Lost annually to checkout abandonment",
              color: "text-accent",
            },
          ].map((item, index) => (
            <div 
              key={index}
              className="bg-card rounded-3xl p-8 shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border border-border/50"
            >
              <div className={`w-14 h-14 rounded-2xl gradient-hero flex items-center justify-center mb-6`}>
                <item.icon className="w-7 h-7 text-primary-foreground" />
              </div>
              <div className={`text-4xl font-display font-bold mb-2 ${item.color}`}>{item.stat}</div>
              <p className="text-muted-foreground">{item.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const HowItWorks = () => {
  const steps = [
    {
      step: "01",
      title: "Scan Products",
      description: "Use your phone camera to scan items as you shop. Instant price lookup and running total.",
      icon: Smartphone,
    },
    {
      step: "02",
      title: "Review Cart",
      description: "Check your digital cart anytime. Easy to add, remove, or adjust quantities.",
      icon: ShoppingCart,
    },
    {
      step: "03",
      title: "Pay & Go",
      description: "Complete secure payment with one tap. Walk out with your digital receipt.",
      icon: Check,
    },
  ];
  
  return (
    <section id="how-it-works" className="py-24 bg-background">
      <div className="container px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-sm font-semibold text-primary uppercase tracking-wider">How It Works</span>
          <h2 className="font-display text-3xl md:text-4xl font-bold mt-4 mb-6 text-foreground">
            Three Simple Steps to Freedom
          </h2>
          <p className="text-lg text-muted-foreground">
            Shopping has never been this seamless. Download PayMall and start scanning.
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="relative group">
              <div className="bg-card rounded-3xl p-8 border border-border/50 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-2 h-full">
                <div className="text-6xl font-display font-bold text-primary/10 mb-4">{step.step}</div>
                <div className="w-14 h-14 rounded-2xl gradient-coral flex items-center justify-center mb-6 shadow-coral">
                  <step.icon className="w-7 h-7 text-secondary-foreground" />
                </div>
                <h3 className="text-xl font-display font-bold mb-3 text-foreground">{step.title}</h3>
                <p className="text-muted-foreground">{step.description}</p>
              </div>
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-1/2 -right-4 w-8 h-0.5 bg-gradient-to-r from-primary/50 to-transparent" />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Benefits = () => {
  return (
    <>
      <section id="customers" className="py-24 gradient-subtle">
        <div className="container px-4">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <span className="text-sm font-semibold text-primary uppercase tracking-wider">For Customers</span>
              <h2 className="font-display text-3xl md:text-4xl font-bold mt-4 mb-6 text-foreground">
                Your Time, Your Way
              </h2>
              <p className="text-lg text-muted-foreground mb-8">
                Experience the joy of shopping without the frustration of waiting. PayMall puts you in control.
              </p>
              
              <div className="space-y-4">
                {[
                  "Skip all checkout lines instantly",
                  "Track spending in real-time",
                  "Digital receipts & purchase history",
                  "Exclusive in-app offers & rewards",
                  "Multiple payment options",
                ].map((benefit, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-full gradient-hero flex items-center justify-center flex-shrink-0">
                      <Check className="w-4 h-4 text-primary-foreground" />
                    </div>
                    <span className="text-foreground">{benefit}</span>
                  </div>
                ))}
              </div>
              
              <Button variant="secondary" size="lg" className="mt-8">
                Download Now
              </Button>
            </div>
            
            <div className="relative">
              <div className="absolute inset-0 gradient-coral blur-3xl opacity-20 scale-110" />
              <img 
                src={phoneMockup} 
                alt="Customer App View" 
                className="relative z-10 w-64 mx-auto animate-float-delayed drop-shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>
      
      <section id="businesses" className="py-24 bg-foreground text-primary-foreground">
        <div className="container px-4">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="order-2 lg:order-1 relative">
              <div className="grid grid-cols-2 gap-6">
                {[
                  { value: "40%", label: "Faster Checkout" },
                  { value: "25%", label: "More Throughput" },
                  { value: "3x", label: "Customer Satisfaction" },
                  { value: "50%", label: "Staff Cost Reduction" },
                ].map((stat, index) => (
                  <div 
                    key={index} 
                    className="bg-primary-foreground/10 backdrop-blur-sm rounded-2xl p-6 border border-primary-foreground/20"
                  >
                    <div className="text-3xl font-display font-bold text-primary mb-1">{stat.value}</div>
                    <div className="text-sm text-primary-foreground/70">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="order-1 lg:order-2">
              <span className="text-sm font-semibold text-primary uppercase tracking-wider">For Businesses</span>
              <h2 className="font-display text-3xl md:text-4xl font-bold mt-4 mb-6">
                Revolutionize Your Store
              </h2>
              <p className="text-lg text-primary-foreground/80 mb-8">
                Reduce operational costs while delighting customers. PayMall integrates seamlessly with your existing POS systems.
              </p>
              
              <div className="space-y-4 mb-8">
                {[
                  "Easy integration with existing systems",
                  "Real-time inventory tracking",
                  "Advanced analytics dashboard",
                  "Reduced staffing needs",
                  "Increased customer loyalty",
                ].map((benefit, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center flex-shrink-0">
                      <Check className="w-4 h-4 text-primary-foreground" />
                    </div>
                    <span className="text-primary-foreground/90">{benefit}</span>
                  </div>
                ))}
              </div>
              
              <Button variant="hero" size="lg">
                Schedule a Demo
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

const WhyPayMall = () => {
  return (
    <section className="py-24 bg-background">
      <div className="container px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-sm font-semibold text-primary uppercase tracking-wider">Why PayMall</span>
          <h2 className="font-display text-3xl md:text-4xl font-bold mt-4 mb-6 text-foreground">
            Built on Trust & Security
          </h2>
        </div>
        
        <div className="grid md:grid-cols-4 gap-6">
          {[
            { icon: Shield, title: "Bank-Level Security", desc: "256-bit encryption for all transactions" },
            { icon: Smartphone, title: "Works Everywhere", desc: "iOS, Android, and any modern device" },
            { icon: Users, title: "24/7 Support", desc: "Dedicated team ready to help" },
            { icon: Store, title: "Partner Network", desc: "Growing network of 500+ stores" },
          ].map((item, index) => (
            <div 
              key={index}
              className="text-center p-6 rounded-2xl bg-card border border-border/50 hover:shadow-md transition-all duration-300"
            >
              <div className="w-12 h-12 mx-auto rounded-xl gradient-hero flex items-center justify-center mb-4">
                <item.icon className="w-6 h-6 text-primary-foreground" />
              </div>
              <h3 className="font-display font-semibold mb-2 text-foreground">{item.title}</h3>
              <p className="text-sm text-muted-foreground">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const CTA = () => {
  return (
    <section className="py-24 gradient-hero relative overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-96 h-96 bg-primary-foreground rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-secondary rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />
      </div>
      
      <div className="container px-4 relative z-10 text-center">
        <h2 className="font-display text-3xl md:text-5xl font-bold text-primary-foreground mb-6">
          Ready to Skip the Line?
        </h2>
        <p className="text-xl text-primary-foreground/80 mb-8 max-w-2xl mx-auto">
          Join thousands of smart shoppers. Download PayMall today and transform how you shop.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
          <Button variant="glass" size="xl">
            <svg className="w-6 h-6 mr-2" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.5 12.5c0-1.58-.79-2.97-2-3.81v7.62c1.21-.84 2-2.23 2-3.81z"/>
              <path d="M4 3.6V20.4c0 .88.72 1.6 1.6 1.6h12.8c.88 0 1.6-.72 1.6-1.6V3.6c0-.88-.72-1.6-1.6-1.6H5.6C4.72 2 4 2.72 4 3.6z"/>
            </svg>
            App Store
          </Button>
          <Button variant="glass" size="xl">
            <svg className="w-6 h-6 mr-2" viewBox="0 0 24 24" fill="currentColor">
              <path d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.6 3,21.09 3,20.5M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12M20.16,10.81C20.5,11.08 20.75,11.5 20.75,12C20.75,12.5 20.53,12.9 20.18,13.18L17.89,14.5L15.39,12L17.89,9.5L20.16,10.81M6.05,2.66L16.81,8.88L14.54,11.15L6.05,2.66Z"/>
            </svg>
            Google Play
          </Button>
        </div>
        
        <p className="text-sm text-primary-foreground/60">
          Free to download • No credit card required • Available worldwide
        </p>
      </div>
    </section>
  );
};

const About = () => {
  return (
    <section id="about" className="py-24 gradient-subtle">
      <div className="container px-4">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <span className="text-sm font-semibold text-primary uppercase tracking-wider">About PayMall</span>
            <h2 className="font-display text-3xl md:text-4xl font-bold mt-4 mb-6 text-foreground">
              Reimagining Retail for the Modern Age
            </h2>
            <p className="text-lg text-muted-foreground mb-6">
              Founded in 2024, PayMall was born from a simple frustration: why do we still wait in lines 
              when technology has solved so many other problems?
            </p>
            <p className="text-muted-foreground mb-8">
              Our team of retail experts, fintech innovators, and UX designers came together to create 
              a solution that benefits everyone — shoppers save time, businesses increase efficiency, 
              and the planet benefits from reduced receipt paper waste.
            </p>
            <div className="flex gap-8">
              <div>
                <div className="text-3xl font-display font-bold text-primary">500+</div>
                <div className="text-sm text-muted-foreground">Partner Stores</div>
              </div>
              <div>
                <div className="text-3xl font-display font-bold text-primary">1M+</div>
                <div className="text-sm text-muted-foreground">App Downloads</div>
              </div>
              <div>
                <div className="text-3xl font-display font-bold text-primary">4.9★</div>
                <div className="text-sm text-muted-foreground">App Rating</div>
              </div>
            </div>
          </div>
          
          <div className="bg-card rounded-3xl p-8 shadow-lg border border-border/50">
            <h3 className="font-display text-xl font-bold mb-6 text-foreground">Request a Demo</h3>
            <form className="space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <input 
                  type="text" 
                  placeholder="First Name" 
                  className="w-full px-4 py-3 rounded-xl border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                />
                <input 
                  type="text" 
                  placeholder="Last Name" 
                  className="w-full px-4 py-3 rounded-xl border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                />
              </div>
              <input 
                type="email" 
                placeholder="Work Email" 
                className="w-full px-4 py-3 rounded-xl border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
              />
              <input 
                type="text" 
                placeholder="Company Name" 
                className="w-full px-4 py-3 rounded-xl border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
              />
              <select 
                className="w-full px-4 py-3 rounded-xl border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
              >
                <option value="">Number of Stores</option>
                <option value="1-5">1-5 locations</option>
                <option value="6-20">6-20 locations</option>
                <option value="21-50">21-50 locations</option>
                <option value="50+">50+ locations</option>
              </select>
              <textarea 
                placeholder="Tell us about your needs..." 
                rows={3}
                className="w-full px-4 py-3 rounded-xl border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 resize-none"
              />
              <Button variant="hero" size="lg" className="w-full">
                Request Demo
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer className="bg-foreground text-primary-foreground py-16">
      <div className="container px-4">
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 gradient-hero rounded-xl flex items-center justify-center">
                <ShoppingCart className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="text-xl font-display font-bold">PayMall</span>
            </div>
            <p className="text-primary-foreground/70 text-sm">
              Skip the queue, pay instantly. The future of retail checkout.
            </p>
          </div>
          
          <div>
            <h4 className="font-display font-semibold mb-4">Product</h4>
            <ul className="space-y-2 text-sm text-primary-foreground/70">
              <li><a href="#" className="hover:text-primary transition-colors">Features</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Pricing</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Security</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Enterprise</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-display font-semibold mb-4">Company</h4>
            <ul className="space-y-2 text-sm text-primary-foreground/70">
              <li><a href="#about" className="hover:text-primary transition-colors">About</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Careers</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Blog</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Press</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-display font-semibold mb-4">Contact</h4>
            <ul className="space-y-2 text-sm text-primary-foreground/70">
              <li>hello@paymall.app</li>
              <li>1-800-PAY-MALL</li>
              <li className="pt-4">
                <div className="flex gap-4">
                  <a href="#" className="w-10 h-10 rounded-full bg-primary-foreground/10 flex items-center justify-center hover:bg-primary transition-colors">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/></svg>
                  </a>
                  <a href="#" className="w-10 h-10 rounded-full bg-primary-foreground/10 flex items-center justify-center hover:bg-primary transition-colors">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
                  </a>
                  <a href="#" className="w-10 h-10 rounded-full bg-primary-foreground/10 flex items-center justify-center hover:bg-primary transition-colors">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
                  </a>
                </div>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-primary-foreground/20 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-primary-foreground/50">
            © 2024 PayMall. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm text-primary-foreground/50">
            <a href="#" className="hover:text-primary-foreground transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-primary-foreground transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-primary-foreground transition-colors">Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

const Index = () => {
  return (
    <main className="min-h-screen">
      <Navbar />
      <Hero />
      <Problem />
      <HowItWorks />
      <Benefits />
      <WhyPayMall />
      <CTA />
      <About />
      <Footer />
    </main>
  );
};

export default Index;
