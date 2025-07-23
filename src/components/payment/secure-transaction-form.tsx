import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { 
  GraduationCap, 
  BookOpen, 
  Calendar, 
  Coffee, 
  Bus, 
  MoreHorizontal,
  ArrowRight,
  ArrowLeft,
  Shield
} from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PaymentRiskIndicator } from './risk-indicator';
import { TransactionAlert } from '../ui/transaction-alert';
import { PaymentFormData, TransactionPurpose } from '@/types';

const purposeIcons = {
  fees: GraduationCap,
  books: BookOpen,
  events: Calendar,
  meals: Coffee,
  transport: Bus,
  other: MoreHorizontal
};

const purposeLabels = {
  fees: 'Tuition & Fees',
  books: 'Books & Supplies',
  events: 'Events & Activities',
  meals: 'Meals & Dining',
  transport: 'Transportation',
  other: 'Other'
};

const formSchema = z.object({
  purpose: z.enum(['fees', 'books', 'events', 'meals', 'transport', 'other']),
  amount: z.number().min(1, 'Amount must be at least $1').max(5000, 'Amount cannot exceed $5000'),
  receiver: z.string().min(1, 'Receiver is required').max(100),
  description: z.string().max(200, 'Description cannot exceed 200 characters').optional()
});

interface SecureTransactionFormProps {
  onSubmit: (data: PaymentFormData) => Promise<void>;
  onCancel: () => void;
}

export function SecureTransactionForm({ onSubmit, onCancel }: SecureTransactionFormProps) {
  const [step, setStep] = useState(1);
  const [showAlert, setShowAlert] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [riskScore, setRiskScore] = useState(0.2);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isValid }
  } = useForm<PaymentFormData>({
    resolver: zodResolver(formSchema),
    mode: 'onChange'
  });

  const selectedPurpose = watch('purpose');
  const amount = watch('amount');
  const receiver = watch('receiver');

  // Mock risk assessment
  const calculateRiskScore = (data: Partial<PaymentFormData>) => {
    let score = 0.1;
    if (data.amount && data.amount > 1000) score += 0.3;
    if (data.receiver && data.receiver.toLowerCase().includes('external')) score += 0.4;
    return Math.min(score, 1);
  };

  const handleFormSubmit = async (data: PaymentFormData) => {
    setIsProcessing(true);
    try {
      await onSubmit(data);
      setShowAlert(true);
    } catch (error) {
      console.error('Payment failed:', error);
    } finally {
      setIsProcessing(false);
    }
  };

  const nextStep = () => {
    if (step < 3) {
      setStep(step + 1);
      if (step === 2) {
        const currentData = { purpose: selectedPurpose, amount, receiver };
        setRiskScore(calculateRiskScore(currentData));
      }
    }
  };

  const prevStep = () => {
    if (step > 1) setStep(step - 1);
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <TransactionAlert
        type="success"
        message="Payment processed successfully!"
        show={showAlert}
        onClose={() => setShowAlert(false)}
      />

      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="w-5 h-5 text-primary" />
            Secure Payment
          </CardTitle>
          <div className="flex items-center gap-2 mt-4">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className={`h-2 flex-1 rounded-full transition-colors ${
                  i <= step ? 'bg-primary' : 'bg-muted'
                }`}
              />
            ))}
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
          <form onSubmit={handleSubmit(handleFormSubmit)}>
            <AnimatePresence mode="wait">
              {step === 1 && (
                <motion.div
                  key="step1"
                  initial={{ x: 50, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  exit={{ x: -50, opacity: 0 }}
                  className="space-y-6"
                >
                  <div>
                    <Label className="text-base font-semibold mb-4 block">
                      What are you paying for?
                    </Label>
                    <div className="grid grid-cols-2 gap-3">
                      {Object.entries(purposeIcons).map(([key, Icon]) => (
                        <Button
                          key={key}
                          type="button"
                          variant={selectedPurpose === key ? 'default' : 'outline'}
                          className="h-20 flex-col gap-2 text-sm"
                          onClick={() => setValue('purpose', key as TransactionPurpose)}
                        >
                          <Icon className="w-6 h-6" />
                          {purposeLabels[key as TransactionPurpose]}
                        </Button>
                      ))}
                    </div>
                    {errors.purpose && (
                      <p className="text-destructive text-sm mt-2">
                        {errors.purpose.message}
                      </p>
                    )}
                  </div>
                </motion.div>
              )}

              {step === 2 && (
                <motion.div
                  key="step2"
                  initial={{ x: 50, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  exit={{ x: -50, opacity: 0 }}
                  className="space-y-6"
                >
                  <div>
                    <Label htmlFor="amount" className="text-base font-semibold">
                      Amount
                    </Label>
                    <div className="relative mt-2">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                        $
                      </span>
                      <Input
                        id="amount"
                        type="number"
                        step="0.01"
                        min="1"
                        max="5000"
                        className="pl-8 text-lg h-12"
                        placeholder="0.00"
                        {...register('amount', { valueAsNumber: true })}
                      />
                    </div>
                    {errors.amount && (
                      <p className="text-destructive text-sm mt-2">
                        {errors.amount.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <Label htmlFor="receiver" className="text-base font-semibold">
                      Pay to
                    </Label>
                    <Input
                      id="receiver"
                      className="mt-2 h-12"
                      placeholder="University Bursar, Campus Bookstore, etc."
                      {...register('receiver')}
                    />
                    {errors.receiver && (
                      <p className="text-destructive text-sm mt-2">
                        {errors.receiver.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <Label htmlFor="description" className="text-base font-semibold">
                      Description (Optional)
                    </Label>
                    <Textarea
                      id="description"
                      className="mt-2"
                      placeholder="What is this payment for?"
                      rows={3}
                      {...register('description')}
                    />
                    {errors.description && (
                      <p className="text-destructive text-sm mt-2">
                        {errors.description.message}
                      </p>
                    )}
                  </div>
                </motion.div>
              )}

              {step === 3 && (
                <motion.div
                  key="step3"
                  initial={{ x: 50, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  exit={{ x: -50, opacity: 0 }}
                  className="space-y-6"
                >
                  <div className="bg-muted/50 p-4 rounded-lg">
                    <h3 className="font-semibold mb-3">Payment Summary</h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Purpose:</span>
                        <span>{purposeLabels[selectedPurpose as TransactionPurpose]}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Amount:</span>
                        <span className="font-semibold">${amount?.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Pay to:</span>
                        <span>{receiver}</span>
                      </div>
                    </div>
                  </div>

                  <PaymentRiskIndicator
                    score={riskScore}
                    factors={[
                      'Trusted receiver verified',
                      'Amount within normal range',
                      'Secure connection active'
                    ]}
                  />
                </motion.div>
              )}
            </AnimatePresence>

            <div className="flex justify-between mt-8">
              <Button
                type="button"
                variant="outline"
                onClick={step === 1 ? onCancel : prevStep}
                disabled={isProcessing}
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                {step === 1 ? 'Cancel' : 'Back'}
              </Button>

              {step < 3 ? (
                <Button
                  type="button"
                  onClick={nextStep}
                  disabled={
                    (step === 1 && !selectedPurpose) ||
                    (step === 2 && (!amount || !receiver || Object.keys(errors).length > 0))
                  }
                >
                  Next
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              ) : (
                <Button
                  type="submit"
                  disabled={!isValid || isProcessing}
                  className="bg-gradient-to-r from-primary to-primary-dark"
                >
                  {isProcessing ? 'Processing...' : 'Confirm Payment'}
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              )}
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}