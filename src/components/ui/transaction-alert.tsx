import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, XCircle, Clock, AlertTriangle } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { TransactionStatus } from '@/types';

interface TransactionAlertProps {
  type: TransactionStatus;
  message: string;
  show: boolean;
  onClose?: () => void;
}

export function TransactionAlert({ type, message, show, onClose }: TransactionAlertProps) {
  const icons = {
    success: CheckCircle,
    failed: XCircle,
    pending: Clock,
    processing: AlertTriangle
  };

  const variants = {
    success: 'bg-success/10 text-success border-success/20',
    failed: 'bg-destructive/10 text-destructive border-destructive/20',
    pending: 'bg-warning/10 text-warning border-warning/20',
    processing: 'bg-primary/10 text-primary border-primary/20'
  };

  const Icon = icons[type];

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, y: -50, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -50, scale: 0.95 }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          className="fixed top-4 right-4 z-50 max-w-md"
        >
          <Alert className={`${variants[type]} shadow-lg`}>
            <Icon className="h-4 w-4" />
            <AlertDescription className="flex items-center justify-between">
              {message}
              {onClose && (
                <button
                  onClick={onClose}
                  className="ml-4 text-sm opacity-70 hover:opacity-100"
                >
                  ✕
                </button>
              )}
            </AlertDescription>
          </Alert>
        </motion.div>
      )}
    </AnimatePresence>
  );
}