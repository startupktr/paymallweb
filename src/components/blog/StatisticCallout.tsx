import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';

interface StatisticCalloutProps {
  value: string;
  label: string;
  description?: string;
  trend?: 'up' | 'down' | 'neutral';
  color?: 'primary' | 'secondary' | 'accent';
}

const StatisticCallout = ({
  value,
  label,
  description,
  trend = 'neutral',
  color = 'primary',
}: StatisticCalloutProps) => {
  const colorClasses = {
    primary: 'from-primary/20 to-primary/5 border-primary/30',
    secondary: 'from-secondary/20 to-secondary/5 border-secondary/30',
    accent: 'from-accent/20 to-accent/5 border-accent/30',
  };

  const valueColorClasses = {
    primary: 'text-primary',
    secondary: 'text-secondary',
    accent: 'text-accent',
  };

  const TrendIcon = trend === 'up' ? TrendingUp : trend === 'down' ? TrendingDown : Minus;
  const trendColor = trend === 'up' ? 'text-green-500' : trend === 'down' ? 'text-red-500' : 'text-muted-foreground';

  return (
    <motion.div
      className={`relative overflow-hidden rounded-2xl bg-gradient-to-br ${colorClasses[color]} border p-6 my-6`}
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex items-start justify-between">
        <div>
          <div className={`text-4xl md:text-5xl font-display font-bold ${valueColorClasses[color]} mb-2`}>
            {value}
          </div>
          <div className="text-lg font-semibold text-foreground mb-1">{label}</div>
          {description && (
            <p className="text-sm text-muted-foreground">{description}</p>
          )}
        </div>
        <div className={`p-2 rounded-full bg-background/50 ${trendColor}`}>
          <TrendIcon className="w-5 h-5" />
        </div>
      </div>
      
      {/* Decorative element */}
      <div className="absolute -bottom-4 -right-4 w-24 h-24 rounded-full bg-gradient-to-br from-current/10 to-transparent opacity-50" />
    </motion.div>
  );
};

export default StatisticCallout;