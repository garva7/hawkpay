import { motion } from 'framer-motion';
import { Shield, AlertTriangle, CheckCircle } from 'lucide-react';
import { Progress } from '@/components/ui/progress';

interface PaymentRiskIndicatorProps {
  score: number; // 0-1, where 0 is lowest risk, 1 is highest risk
  factors?: string[];
  className?: string;
}

export function PaymentRiskIndicator({ score, factors = [], className = '' }: PaymentRiskIndicatorProps) {
  const getRiskLevel = (score: number) => {
    if (score <= 0.3) return { level: 'low', color: 'text-success', bgColor: 'bg-success' };
    if (score <= 0.7) return { level: 'medium', color: 'text-warning', bgColor: 'bg-warning' };
    return { level: 'high', color: 'text-destructive', bgColor: 'bg-destructive' };
  };

  const { level, color, bgColor } = getRiskLevel(score);
  const percentage = score * 100;

  const getIcon = () => {
    switch (level) {
      case 'low':
        return <CheckCircle className="w-4 h-4" />;
      case 'medium':
        return <AlertTriangle className="w-4 h-4" />;
      case 'high':
        return <Shield className="w-4 h-4" />;
      default:
        return <Shield className="w-4 h-4" />;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className={`p-4 rounded-lg border bg-card ${className}`}
    >
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <div className={color}>
            {getIcon()}
          </div>
          <span className="text-sm font-medium">
            Security Check
          </span>
        </div>
        <span className={`text-xs font-medium ${color}`}>
          {level.toUpperCase()} RISK
        </span>
      </div>

      <div className="space-y-2">
        <div className="flex justify-between text-xs">
          <span className="text-muted-foreground">Risk Score</span>
          <span className={color}>{percentage.toFixed(0)}%</span>
        </div>
        
        <Progress 
          value={percentage} 
          className="h-2"
        />
      </div>

      {factors.length > 0 && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          className="mt-3 pt-3 border-t"
        >
          <p className="text-xs text-muted-foreground mb-2">Risk Factors:</p>
          <ul className="space-y-1">
            {factors.map((factor, index) => (
              <li key={index} className="text-xs text-muted-foreground flex items-center gap-1">
                <div className="w-1 h-1 bg-muted-foreground rounded-full" />
                {factor}
              </li>
            ))}
          </ul>
        </motion.div>
      )}
    </motion.div>
  );
}