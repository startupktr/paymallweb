import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, ArrowRight, CheckCircle, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { z } from 'zod';

const emailSchema = z.string().email('Please enter a valid email address');

const NewsletterSignup = () => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate email
    const validation = emailSchema.safeParse(email);
    if (!validation.success) {
      toast.error(validation.error.errors[0].message);
      return;
    }

    setIsLoading(true);
    
    try {
      const { error } = await supabase
        .from('newsletter_subscribers')
        .insert({ email: email.toLowerCase().trim(), source: 'blog' });

      if (error) {
        if (error.code === '23505') {
          // Unique constraint violation - email already exists
          toast.info('You\'re already subscribed!');
          setIsSubscribed(true);
        } else {
          throw error;
        }
      } else {
        setIsSubscribed(true);
        toast.success('Welcome! You\'re now subscribed to our newsletter.');
      }
    } catch (err) {
      console.error('Newsletter signup error:', err);
      toast.error('Something went wrong. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  if (isSubscribed) {
    return (
      <motion.div
        className="relative overflow-hidden rounded-3xl gradient-hero p-8 md:p-12 text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
          className="w-16 h-16 mx-auto mb-4 rounded-full bg-white/20 flex items-center justify-center"
        >
          <CheckCircle className="w-8 h-8 text-white" />
        </motion.div>
        <h3 className="font-display text-2xl font-bold text-white mb-2">
          You're In! 🎉
        </h3>
        <p className="text-white/80">
          Thanks for subscribing. We'll send you the latest insights and updates.
        </p>
      </motion.div>
    );
  }

  return (
    <motion.div
      className="relative overflow-hidden rounded-3xl gradient-hero p-8 md:p-12"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full blur-2xl translate-y-1/2 -translate-x-1/2" />
      
      <div className="relative z-10">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center">
            <Mail className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="font-display text-xl md:text-2xl font-bold text-white">
              Stay Updated
            </h3>
            <p className="text-sm text-white/70">Join our newsletter</p>
          </div>
        </div>
        
        <p className="text-white/80 mb-6 max-w-lg">
          Get the latest insights on retail technology, shopping innovation, and exclusive updates delivered straight to your inbox.
        </p>
        
        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="pl-12 h-12 bg-white/95 border-0 text-foreground placeholder:text-muted-foreground rounded-xl"
              required
            />
          </div>
          <Button
            type="submit"
            size="lg"
            className="h-12 px-6 bg-foreground text-background hover:bg-foreground/90 rounded-xl group"
            disabled={isLoading}
          >
            {isLoading ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              <>
                Subscribe
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </>
            )}
          </Button>
        </form>
        
        <p className="text-xs text-white/50 mt-4">
          No spam, ever. Unsubscribe anytime.
        </p>
      </div>
    </motion.div>
  );
};

export default NewsletterSignup;