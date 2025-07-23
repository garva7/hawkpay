import { motion } from 'framer-motion';
import { SecureTransactionForm } from '@/components/payment/secure-transaction-form';
import { useAppStore } from '@/store/useAppStore';
import { PaymentFormData, Transaction } from '@/types';
import { useToast } from '@/hooks/use-toast';

export default function Payment() {
  const { addTransaction, updateWalletBalance } = useAppStore();
  const { toast } = useToast();

  const handlePaymentSubmit = async (data: PaymentFormData): Promise<void> => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Create transaction
    const transaction: Transaction = {
      id: Math.random().toString(36).substr(2, 9),
      ...data,
      status: Math.random() > 0.1 ? 'success' : 'failed', // 90% success rate
      timestamp: new Date(),
      riskScore: Math.random() * 0.5 // Low risk simulation
    };

    addTransaction(transaction);
    
    if (transaction.status === 'success') {
      updateWalletBalance(-data.amount);
      toast({
        title: "Payment Successful!",
        description: `$${data.amount.toFixed(2)} has been sent to ${data.receiver}`,
      });
    } else {
      toast({
        title: "Payment Failed",
        description: "There was an issue processing your payment. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-3xl font-bold">Make a Payment</h1>
        <p className="text-muted-foreground">Send money securely to anyone on campus</p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <SecureTransactionForm 
          onSubmit={handlePaymentSubmit}
          onCancel={() => window.history.back()}
        />
      </motion.div>
    </div>
  );
}