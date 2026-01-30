import { Twitter, Linkedin, Facebook, MessageCircle, Share2, Link2, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface SocialShareButtonsProps {
  url: string;
  title: string;
  variant?: 'horizontal' | 'vertical';
}

const SocialShareButtons = ({ url, title, variant = 'horizontal' }: SocialShareButtonsProps) => {
  const [copied, setCopied] = useState(false);

  const shareLinks = {
    twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
    whatsapp: `https://wa.me/?text=${encodeURIComponent(`${title} - ${url}`)}`,
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      toast.success('Link copied to clipboard!');
      setTimeout(() => setCopied(false), 2000);
    } catch {
      toast.error('Failed to copy link');
    }
  };

  const socialButtons = [
    { name: 'Twitter', icon: Twitter, href: shareLinks.twitter, color: 'hover:bg-[#1DA1F2] hover:text-white' },
    { name: 'LinkedIn', icon: Linkedin, href: shareLinks.linkedin, color: 'hover:bg-[#0A66C2] hover:text-white' },
    { name: 'Facebook', icon: Facebook, href: shareLinks.facebook, color: 'hover:bg-[#1877F2] hover:text-white' },
    { name: 'WhatsApp', icon: MessageCircle, href: shareLinks.whatsapp, color: 'hover:bg-[#25D366] hover:text-white' },
  ];

  const containerClass = variant === 'vertical' 
    ? 'flex flex-col gap-3' 
    : 'flex flex-wrap items-center gap-3';

  return (
    <div className={containerClass}>
      <span className="flex items-center gap-2 text-muted-foreground text-sm font-medium">
        <Share2 className="w-4 h-4" />
        Share this article:
      </span>
      
      <div className="flex items-center gap-2">
        {socialButtons.map((social) => (
          <motion.a
            key={social.name}
            href={social.href}
            target="_blank"
            rel="noopener noreferrer"
            className={`w-10 h-10 rounded-full bg-muted flex items-center justify-center text-muted-foreground transition-all duration-300 ${social.color}`}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            title={`Share on ${social.name}`}
          >
            <social.icon className="w-4 h-4" />
          </motion.a>
        ))}
        
        <motion.button
          onClick={copyToClipboard}
          className="w-10 h-10 rounded-full bg-muted flex items-center justify-center text-muted-foreground transition-all duration-300 hover:bg-primary hover:text-primary-foreground"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          title="Copy link"
        >
          <AnimatePresence mode="wait">
            {copied ? (
              <motion.div
                key="check"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0 }}
              >
                <Check className="w-4 h-4" />
              </motion.div>
            ) : (
              <motion.div
                key="link"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0 }}
              >
                <Link2 className="w-4 h-4" />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.button>
      </div>
    </div>
  );
};

export default SocialShareButtons;