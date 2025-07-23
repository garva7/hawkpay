import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Shield, 
  Smartphone, 
  CreditCard, 
  X,
  ChevronRight,
  Sparkles
} from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface WelcomeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function WelcomeModal({ isOpen, onClose }: WelcomeModalProps) {
  const [currentStep, setCurrentStep] = useState(0);

  const steps = [
    {
      icon: Sparkles,
      title: 'Welcome to HawkPay!',
      description: 'Your secure digital wallet for all campus payments. Let\'s get you started with a quick tour.',
      color: 'text-primary'
    },
    {
      icon: Shield,
      title: 'Bank-Level Security',
      description: 'Every transaction is protected with advanced encryption and real-time fraud detection.',
      color: 'text-success'
    },
    {
      icon: Smartphone,
      title: 'Mobile-First Design',
      description: 'Pay for anything on campus right from your phone - tuition, books, meals, and events.',
      color: 'text-primary-light'
    },
    {
      icon: CreditCard,
      title: 'All-in-One Wallet',
      description: 'Track your spending, manage your balance, and never worry about carrying cash again.',
      color: 'text-warning'
    }
  ];

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      onClose();
    }
  };

  const skipTour = () => {
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="w-full max-w-md"
          >
            <Card className="relative overflow-hidden">
              <CardHeader className="relative">
                <Button
                  variant="ghost"
                  size="sm"
                  className="absolute top-2 right-2 w-8 h-8 p-0"
                  onClick={skipTour}
                >
                  <X className="w-4 h-4" />
                </Button>
                
                <div className="text-center pt-4">
                  <motion.div
                    key={currentStep}
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className={`w-16 h-16 mx-auto mb-4 bg-primary/10 rounded-full flex items-center justify-center`}
                  >
                    {(() => {
                      const IconComponent = steps[currentStep].icon;
                      return <IconComponent className={`w-8 h-8 ${steps[currentStep].color}`} />;
                    })()}
                  </motion.div>
                  
                  <CardTitle className="text-xl mb-2">
                    {steps[currentStep].title}
                  </CardTitle>
                </div>
              </CardHeader>

              <CardContent className="space-y-6">
                <motion.p
                  key={currentStep}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-center text-muted-foreground"
                >
                  {steps[currentStep].description}
                </motion.p>

                {/* Progress Indicator */}
                <div className="flex justify-center gap-2">
                  {steps.map((_, index) => (
                    <div
                      key={index}
                      className={`w-2 h-2 rounded-full transition-colors ${
                        index <= currentStep ? 'bg-primary' : 'bg-muted'
                      }`}
                    />
                  ))}
                </div>

                <div className="flex justify-between">
                  <Button
                    variant="ghost"
                    onClick={skipTour}
                    className="text-muted-foreground"
                  >
                    Skip Tour
                  </Button>
                  
                  <Button onClick={nextStep} className="gap-2">
                    {currentStep < steps.length - 1 ? 'Next' : 'Get Started'}
                    <ChevronRight className="w-4 h-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}