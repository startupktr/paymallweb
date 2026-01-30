import { motion } from 'framer-motion';
import { Info, Lightbulb, AlertTriangle, CheckCircle, Zap } from 'lucide-react';
import { ReactNode } from 'react';

interface InfoBoxProps {
  type?: 'info' | 'tip' | 'warning' | 'success' | 'highlight';
  title?: string;
  children: ReactNode;
}

const InfoBox = ({ type = 'info', title, children }: InfoBoxProps) => {
  const configs = {
    info: {
      icon: Info,
      bgClass: 'bg-accent/10 border-accent/30',
      iconClass: 'text-accent bg-accent/20',
      titleClass: 'text-accent',
    },
    tip: {
      icon: Lightbulb,
      bgClass: 'bg-primary/10 border-primary/30',
      iconClass: 'text-primary bg-primary/20',
      titleClass: 'text-primary',
    },
    warning: {
      icon: AlertTriangle,
      bgClass: 'bg-orange-500/10 border-orange-500/30',
      iconClass: 'text-orange-500 bg-orange-500/20',
      titleClass: 'text-orange-500',
    },
    success: {
      icon: CheckCircle,
      bgClass: 'bg-green-500/10 border-green-500/30',
      iconClass: 'text-green-500 bg-green-500/20',
      titleClass: 'text-green-500',
    },
    highlight: {
      icon: Zap,
      bgClass: 'bg-secondary/10 border-secondary/30',
      iconClass: 'text-secondary bg-secondary/20',
      titleClass: 'text-secondary',
    },
  };

  const config = configs[type];
  const Icon = config.icon;

  return (
    <motion.div
      className={`rounded-xl border ${config.bgClass} p-5 my-6`}
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
    >
      <div className="flex gap-4">
        <div className={`flex-shrink-0 w-10 h-10 rounded-lg ${config.iconClass} flex items-center justify-center`}>
          <Icon className="w-5 h-5" />
        </div>
        <div className="flex-1">
          {title && (
            <h4 className={`font-display font-semibold ${config.titleClass} mb-2`}>
              {title}
            </h4>
          )}
          <div className="text-foreground/80 text-sm leading-relaxed">
            {children}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default InfoBox;