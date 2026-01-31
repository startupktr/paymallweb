import { Link } from "react-router-dom";
import { ArrowLeft, Target, Heart, Lightbulb, Users, Award, Rocket, Check } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import logo from "@/assets/logo.png";

const AboutUs = () => {
  const values = [
    {
      icon: Heart,
      title: "Customer First",
      desc: "Every decision we make starts with one question: how does this help our customers?"
    },
    {
      icon: Lightbulb,
      title: "Innovation",
      desc: "We constantly push boundaries to create solutions that didn't exist before."
    },
    {
      icon: Users,
      title: "Community",
      desc: "We're building more than an app – we're building a movement to change retail."
    },
    {
      icon: Award,
      title: "Excellence",
      desc: "We hold ourselves to the highest standards in everything we do."
    },
  ];

  const milestones = [
    { year: "2023", title: "Founded", desc: "PayMall was born with a vision to eliminate checkout lines" },
    { year: "2024", title: "First Store Partner", desc: "Launched in our first retail location in Bangalore" },
    { year: "2024", title: "10+ Stores", desc: "Expanded to multiple retail partners across Karnataka" },
    { year: "2025", title: "Growing Strong", desc: "Thousands of happy customers and counting" },
  ];

  const team = [
    { role: "Founders", count: "2", desc: "Passionate entrepreneurs" },
    { role: "Engineers", count: "8", desc: "Building the future" },
    { role: "Partners", count: "10+", desc: "Retail stores" },
    { role: "Users", count: "5K+", desc: "Happy shoppers" },
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
                About PayMall
              </h1>
              <p className="text-primary-foreground/70 mt-1">Our Story & Mission</p>
            </div>
          </div>
          <p className="text-lg text-primary-foreground/80 max-w-2xl">
            We're on a mission to revolutionize the in-store shopping experience and give people back their most precious resource: time.
          </p>
        </div>
      </motion.header>

      {/* Mission Section */}
      <section className="py-16">
        <div className="container px-4 max-w-4xl">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="w-16 h-16 rounded-2xl gradient-hero flex items-center justify-center mx-auto mb-6">
              <Target className="w-8 h-8 text-primary-foreground" />
            </div>
            <h2 className="text-2xl md:text-3xl font-display font-bold text-foreground mb-4">
              Our Mission
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              To eliminate checkout lines forever and transform how people shop in physical stores. 
              We believe shopping should be enjoyable, not frustrating. With PayMall, you scan, pay, and go – 
              it's that simple.
            </p>
          </motion.div>

          {/* Story */}
          <motion.div
            className="bg-card rounded-2xl p-6 md:p-8 border border-border/50 mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-secondary/20 flex items-center justify-center flex-shrink-0">
                <Rocket className="w-6 h-6 text-secondary" />
              </div>
              <div>
                <h3 className="text-xl font-display font-bold text-foreground mb-4">Our Story</h3>
                <div className="space-y-4 text-muted-foreground">
                  <p>
                    PayMall was born from a simple frustration: waiting in checkout lines. Our founders, 
                    like millions of shoppers, spent countless hours standing in queues instead of doing 
                    what they love.
                  </p>
                  <p>
                    In 2023, we set out to solve this problem. We asked: "What if you could skip the 
                    line entirely? What if checking out was as simple as walking out?" The answer was 
                    PayMall – India's first in-store grocery shopping convenience app.
                  </p>
                  <p>
                    Today, we're proud to partner with retailers across Karnataka, helping thousands of 
                    shoppers save time every day. But this is just the beginning. Our vision is to make 
                    queue-free shopping the norm, not the exception.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Values */}
          <motion.div
            className="mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <h2 className="text-2xl font-display font-bold text-foreground mb-8 text-center">
              Our Values
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              {values.map((value, index) => (
                <motion.div
                  key={index}
                  className="bg-card rounded-2xl p-6 border border-border/50 hover:shadow-lg transition-shadow"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.1 * index + 0.5 }}
                >
                  <div className="w-12 h-12 rounded-xl gradient-hero flex items-center justify-center mb-4">
                    <value.icon className="w-6 h-6 text-primary-foreground" />
                  </div>
                  <h3 className="text-lg font-display font-bold text-foreground mb-2">{value.title}</h3>
                  <p className="text-muted-foreground">{value.desc}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Timeline */}
          <motion.div
            className="mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <h2 className="text-2xl font-display font-bold text-foreground mb-8 text-center">
              Our Journey
            </h2>
            <div className="space-y-4">
              {milestones.map((milestone, index) => (
                <motion.div
                  key={index}
                  className="flex items-start gap-4"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: 0.1 * index + 0.7 }}
                >
                  <div className="w-16 text-center flex-shrink-0">
                    <span className="text-lg font-bold text-primary">{milestone.year}</span>
                  </div>
                  <div className="w-4 h-4 rounded-full bg-primary mt-1.5 flex-shrink-0" />
                  <div className="flex-1 pb-8 border-l-2 border-border -ml-2 pl-6">
                    <h3 className="font-semibold text-foreground">{milestone.title}</h3>
                    <p className="text-muted-foreground">{milestone.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Team Stats */}
          <motion.div
            className="bg-foreground rounded-2xl p-8 text-primary-foreground"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            <h2 className="text-2xl font-display font-bold mb-8 text-center">
              PayMall in Numbers
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {team.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-3xl font-bold text-primary mb-1">{stat.count}</div>
                  <div className="font-semibold">{stat.role}</div>
                  <div className="text-sm text-primary-foreground/70">{stat.desc}</div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* CTA */}
          <motion.div
            className="mt-16 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.9 }}
          >
            <h3 className="text-xl font-display font-bold text-foreground mb-4">
              Ready to Join the Revolution?
            </h3>
            <p className="text-muted-foreground mb-6">
              Download PayMall today and experience the future of shopping.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg">
                Download App
              </Button>
              <Link to="/contact">
                <Button variant="outline" size="lg">
                  Partner With Us
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
};

export default AboutUs;
