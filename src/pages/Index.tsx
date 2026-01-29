import { ShoppingCart, Clock, Users, Store, Smartphone, Shield, ChevronRight, Check, Menu, X } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ScrollAnimation, StaggerContainer, StaggerItem } from "@/components/ScrollAnimation";
import CustomerFeedbackForm from "@/components/CustomerFeedbackForm";
import DemoRequestForm from "@/components/DemoRequestForm";
import FeaturedBlogs from "@/components/blog/FeaturedBlogs";
import phoneMockup from "@/assets/phone-mockup.png";
import heroBg from "@/assets/hero-bg.jpg";
import logo from "@/assets/logo.png"
import { useState } from "react";
import { motion } from "framer-motion";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.nav
      className="fixed top-0 left-0 right-0 z-50 gradient-glass border-b border-border/50"
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.25, 0.4, 0.25, 1] }}
    >
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <a href="#" className="flex items-center gap-2">
          <div className="w-10 h-10 gradient-hero rounded-xl flex items-center justify-center shadow-glow">
            <img src={logo} alt="" className="w-full h-full object-cover rounded-sm" />
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
        <motion.div
          className="md:hidden bg-card border-t border-border py-4 px-4 space-y-4"
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
        >
          <a href="#problem" className="block py-2 text-muted-foreground hover:text-foreground">Problem</a>
          <a href="#how-it-works" className="block py-2 text-muted-foreground hover:text-foreground">How It Works</a>
          <a href="#customers" className="block py-2 text-muted-foreground hover:text-foreground">Customers</a>
          <a href="#businesses" className="block py-2 text-muted-foreground hover:text-foreground">Businesses</a>
          <a href="#about" className="block py-2 text-muted-foreground hover:text-foreground">About</a>
          <div className="flex flex-col gap-2 pt-4">
            <Button variant="outline" className="w-full">Request Demo</Button>
            <Button className="w-full">Download App</Button>
          </div>
        </motion.div>
      )}
    </motion.nav>
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
            <motion.div
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/20 border border-primary/30 mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <span className="w-2 h-2 bg-primary rounded-full animate-pulse" />
              <span className="text-sm font-medium text-primary-foreground/90">Now available in selected stores</span>
            </motion.div>

            <motion.h1
              className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-primary-foreground mb-6 leading-tight"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              Skip the Queue,{" "}
              <span className="text-gradient bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                Pay Instantly
              </span>
            </motion.h1>

            <motion.p
              className="text-lg md:text-xl text-primary-foreground/80 mb-8 max-w-xl mx-auto lg:mx-0"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              PayMall is India’s 1st in-store grocery shopping convenience app, built to revolutionize the way people shop inside stores.
            </motion.p>

            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-8"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              <Button variant="hero" size="lg" className="group">
                Download Free
                <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button variant="hero-outline" size="lg">
                Watch Demo
              </Button>
            </motion.div>

            <motion.div
              className="flex items-center gap-6 justify-center lg:justify-start text-primary-foreground/70"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <div className="flex items-center gap-2">
                <Check className="w-5 h-5 text-primary" />
                <span className="text-sm">Free Download</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-5 h-5 text-primary" />
                <span className="text-sm">No Hidden Fees</span>
              </div>
            </motion.div>
          </div>

          <motion.div
            className="relative flex justify-center lg:justify-end"
            initial={{ opacity: 0, scale: 0.8, x: 50 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: [0.25, 0.4, 0.25, 1] }}
          >
            <div className="relative">
              <div className="absolute inset-0 gradient-hero blur-3xl opacity-30 scale-150" />
              <img
                src={phoneMockup}
                alt="PayMall App Interface"
                className="relative z-10 w-64 md:w-80 animate-float drop-shadow-2xl rounded-xl"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const Problem = () => {
  const stats = [
    {
      icon: Clock,
      stat: "20+ min",
      label: "Average wait time during peak hours",
      color: "text-secondary",
    },
    {
      icon: Users,
      stat: "25%",
      label: "Shoppers abandon carts due to long lines",
      color: "text-primary",
    },
    {
      icon: Store,
      stat: "$38B",
      label: "Lost annually to checkout abandonment",
      color: "text-accent",
    },
  ];

  return (
    <section id="problem" className="py-24 gradient-subtle">
      <div className="container px-4">
        <ScrollAnimation className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-sm font-semibold text-secondary uppercase tracking-wider">The Problem</span>
          <h2 className="font-display text-3xl md:text-4xl font-bold mt-4 mb-6 text-foreground">
            Checkout Lines Are Costing Everyone
          </h2>
          <p className="text-lg text-muted-foreground">
            Every day, millions waste precious time in frustrating queues. Businesses lose customers, and shoppers lose patience.
          </p>
        </ScrollAnimation>

        <StaggerContainer className="grid md:grid-cols-3 gap-8" staggerDelay={0.15}>
          {stats.map((item, index) => (
            <StaggerItem key={index}>
              <div className="bg-card rounded-3xl p-8 shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border border-border/50 h-full">
                <div className="w-14 h-14 rounded-2xl gradient-hero flex items-center justify-center mb-6">
                  <item.icon className="w-7 h-7 text-primary-foreground" />
                </div>
                <div className={`text-4xl font-display font-bold mb-2 ${item.color}`}>{item.stat}</div>
                <p className="text-muted-foreground">{item.label}</p>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
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
        <ScrollAnimation className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-sm font-semibold text-primary uppercase tracking-wider">How It Works</span>
          <h2 className="font-display text-3xl md:text-4xl font-bold mt-4 mb-6 text-foreground">
            Three Simple Steps to Freedom
          </h2>
          <p className="text-lg text-muted-foreground">
            Shopping has never been this seamless. Download PayMall and start scanning.
          </p>
        </ScrollAnimation>

        <StaggerContainer className="grid md:grid-cols-3 gap-8" staggerDelay={0.15}>
          {steps.map((step, index) => (
            <StaggerItem key={index}>
              <div className="relative group h-full">
                <div className="bg-card rounded-3xl p-8 border border-border/50 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-2 h-full">
                  <div className="text-6xl font-display font-bold text-primary/40 mb-4">{step.step}</div>
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
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
};

const Benefits = () => {
  const customerBenefits = [
    "Skip all checkout lines instantly",
    "Track spending in real-time",
    "Digital receipts & purchase history",
    "Exclusive in-app offers & rewards",
    "Multiple payment options",
  ];

  const businessBenefits = [
    "Get your own Market Place access",
    "Advanced analytics dashboard",
    "Real-time inventory tracking",
    "Increased customer loyalty",
    "Reduced staffing needs",
  ];

  const businessStats = [
    { value: "60%", label: "Faster Checkout" },
    { value: "25%", label: "More Throughput" },
    { value: "3x", label: "Customer Satisfaction" },
    { value: "50%", label: "Staff Cost Reduction" },
  ];

  return (
    <>
      <section id="customers" className="py-24 gradient-subtle">
        <div className="container px-4">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <ScrollAnimation direction="left">
              <span className="text-sm font-semibold text-primary uppercase tracking-wider">For Customers</span>
              <h2 className="font-display text-3xl md:text-4xl font-bold mt-4 mb-6 text-foreground">
                Your Time, Your Way
              </h2>
              <p className="text-lg text-muted-foreground mb-8">
                Experience the joy of shopping without the frustration of waiting. PayMall puts you in control.
              </p>

              <StaggerContainer className="space-y-4" staggerDelay={0.1}>
                {customerBenefits.map((benefit, index) => (
                  <StaggerItem key={index}>
                    <div className="flex items-center gap-3">
                      <div className="w-6 h-6 rounded-full gradient-hero flex items-center justify-center flex-shrink-0">
                        <Check className="w-4 h-4 text-primary-foreground" />
                      </div>
                      <span className="text-foreground">{benefit}</span>
                    </div>
                  </StaggerItem>
                ))}
              </StaggerContainer>

              <Button variant="secondary" size="lg" className="mt-8">
                Download Now
              </Button>
            </ScrollAnimation>

            <ScrollAnimation direction="right" delay={0.2}>
              <div className="relative">
                <div className="absolute inset-0 gradient-coral blur-3xl opacity-20 scale-110" />
                <img
                  src={phoneMockup}
                  alt="Customer App View"
                  className="relative z-10 w-64 mx-auto animate-float-delayed drop-shadow-2xl rounded-xl"
                />
              </div>
            </ScrollAnimation>
          </div>
        </div>
      </section>

      <section id="businesses" className="py-24 bg-foreground text-primary-foreground">
        <div className="container px-4">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <ScrollAnimation direction="left" className="order-2 lg:order-1">
              <StaggerContainer className="grid grid-cols-2 gap-6" staggerDelay={0.1}>
                {businessStats.map((stat, index) => (
                  <StaggerItem key={index}>
                    <div className="bg-primary-foreground/10 backdrop-blur-sm rounded-2xl p-6 border border-primary-foreground/20">
                      <div className="text-3xl font-display font-bold text-primary mb-1">{stat.value}</div>
                      <div className="text-sm text-primary-foreground/70">{stat.label}</div>
                    </div>
                  </StaggerItem>
                ))}
              </StaggerContainer>
            </ScrollAnimation>

            <ScrollAnimation direction="right" delay={0.2} className="order-1 lg:order-2">
              <span className="text-sm font-semibold text-primary uppercase tracking-wider">For Businesses</span>
              <h2 className="font-display text-3xl md:text-4xl font-bold mt-4 mb-6">
                Revolutionize Your Store
              </h2>
              <p className="text-lg text-primary-foreground/80 mb-8">
                Reduce operational costs while delighting customers. PayMall makes your presence online.
              </p>

              <div className="space-y-4 mb-8">
                {businessBenefits.map((benefit, index) => (
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
            </ScrollAnimation>
          </div>
        </div>
      </section>
    </>
  );
};

const WhyPayMall = () => {
  const features = [
    { icon: Shield, title: "Bank-Level Security", desc: "256-bit encryption for all transactions" },
    { icon: Smartphone, title: "Works Everywhere", desc: "iOS, Android, and any modern device" },
    { icon: Users, title: "24/7 Support", desc: "Dedicated team ready to help" },
    { icon: Store, title: "Partner Network", desc: "More than 10+ stores in our network" },
  ];

  return (
    <section className="py-24 bg-background">
      <div className="container px-4">
        <ScrollAnimation className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-sm font-semibold text-primary uppercase tracking-wider">Why PayMall</span>
          <h2 className="font-display text-3xl md:text-4xl font-bold mt-4 mb-6 text-foreground">
            Built on Trust & Security
          </h2>
        </ScrollAnimation>

        <StaggerContainer className="grid md:grid-cols-4 gap-6" staggerDelay={0.1}>
          {features.map((item, index) => (
            <StaggerItem key={index}>
              <div className="text-center p-6 rounded-2xl bg-card border border-border/50 hover:shadow-md transition-all duration-300 h-full">
                <div className="w-12 h-12 mx-auto rounded-xl gradient-hero flex items-center justify-center mb-4">
                  <item.icon className="w-6 h-6 text-primary-foreground" />
                </div>
                <h3 className="font-display font-semibold mb-2 text-foreground">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.desc}</p>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
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
        <ScrollAnimation>
          <h2 className="font-display text-3xl md:text-5xl font-bold text-primary-foreground mb-6">
            Ready to Skip the Line?
          </h2>
          <p className="text-xl text-primary-foreground/80 mb-8 max-w-2xl mx-auto">
            Join thousands of smart shoppers. Download PayMall app today and transform how you shop.
          </p>
        </ScrollAnimation>

        <ScrollAnimation delay={0.2}>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button variant="glass" size="xl">
              <svg className="w-6 h-6 mr-2" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.5 12.5c0-1.58-.79-2.97-2-3.81v7.62c1.21-.84 2-2.23 2-3.81z" />
                <path d="M4 3.6V20.4c0 .88.72 1.6 1.6 1.6h12.8c.88 0 1.6-.72 1.6-1.6V3.6c0-.88-.72-1.6-1.6-1.6H5.6C4.72 2 4 2.72 4 3.6z" />
              </svg>
              App Store
            </Button>
            <Button variant="glass" size="xl">
              <svg className="w-6 h-6 mr-2" viewBox="0 0 24 24" fill="currentColor">
                <path d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.6 3,21.09 3,20.5M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12M20.16,10.81C20.5,11.08 20.75,11.5 20.75,12C20.75,12.5 20.53,12.9 20.18,13.18L17.89,14.5L15.39,12L17.89,9.5L20.16,10.81M6.05,2.66L16.81,8.88L14.54,11.15L6.05,2.66Z" />
              </svg>
              Google Play
            </Button>
          </div>

          <p className="text-sm text-primary-foreground/60">
            Free to download • No credit card required • Available worldwide
          </p>
        </ScrollAnimation>
      </div>
    </section>
  );
};

const About = () => {
  const aboutStats = [
    { value: "10+", label: "Partner Stores" },
    { value: "1000+", label: "App Downloads" },
    { value: "4.5★", label: "App Rating" },
  ];

  return (
    <section id="about" className="py-24 gradient-subtle">
      <div className="container px-4">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <ScrollAnimation direction="left">
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
            <StaggerContainer className="flex gap-8" staggerDelay={0.1}>
              {aboutStats.map((stat, index) => (
                <StaggerItem key={index}>
                  <div>
                    <div className="text-3xl font-display font-bold text-primary">{stat.value}</div>
                    <div className="text-sm text-muted-foreground">{stat.label}</div>
                  </div>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </ScrollAnimation>

          <ScrollAnimation direction="right" delay={0.2}>
            <DemoRequestForm />
          </ScrollAnimation>
        </div>
      </div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer className="bg-foreground text-primary-foreground py-16">
      <div className="container px-4">
        <ScrollAnimation>
          <div className="grid md:grid-cols-4 gap-12 mb-12">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-10 h-10 gradient-hero rounded-xl flex items-center justify-center">
                  <img src={logo} alt="" className="w-full h-full object-cover rounded" />
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
                <li><Link to="/blog" className="hover:text-primary transition-colors">Blog</Link></li>
                <li><a href="#" className="hover:text-primary transition-colors">Careers</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Press</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-display font-semibold mb-4">Contact</h4>
              <ul className="space-y-2 text-sm text-primary-foreground/70">
                <li>support@paymall.live</li>
                {/* <li>1-800-PAY-MALL</li> */}
                <li className="pt-4">
                  <div className="flex gap-4">
                    <a href="https://youtube.com/@paymallofficial?si=eyYatKgVlKYLxYi1" className="w-10 h-10 rounded-full bg-primary-foreground/10 flex items-center justify-center hover:bg-primary transition-colors">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                      </svg>
                    </a>
                    <a href="#" className="w-10 h-10 rounded-full bg-primary-foreground/10 flex items-center justify-center hover:bg-primary transition-colors">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z" />
                      </svg>
                    </a>
                    <a href="https://www.instagram.com/paymall_official?igsh=MW03N2Ywc3gzbXBuMA==" className="w-10 h-10 rounded-full bg-primary-foreground/10 flex items-center justify-center hover:bg-primary transition-colors">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" /></svg>
                    </a>
                    <a href="https://www.facebook.com/share/17jhfHMpVo/" className="w-10 h-10 rounded-full bg-primary-foreground/10 flex items-center justify-center hover:bg-primary transition-colors">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                      </svg>
                    </a>
                    <a href="#" className="w-10 h-10 rounded-full bg-primary-foreground/10 flex items-center justify-center hover:bg-primary transition-colors">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" /></svg>
                    </a>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </ScrollAnimation>

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
      <FeaturedBlogs />
      <CustomerFeedbackForm />
      <About />
      <Footer />
    </main>
  );
};

export default Index;
