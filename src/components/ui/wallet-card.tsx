import { motion } from 'framer-motion';
import { Wallet, TrendingUp, Plus } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface WalletCardProps {
  balance: number;
  onTopUp: () => void;
}

export function WalletCard({ balance, onTopUp }: WalletCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="relative overflow-hidden bg-gradient-to-br from-primary to-primary-dark text-primary-foreground shadow-lg">
        <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16" />
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/5 rounded-full translate-y-12 -translate-x-12" />
        
        <CardContent className="relative p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-white/20 rounded-full">
                <Wallet className="w-5 h-5" />
              </div>
              <div>
                <p className="text-sm text-primary-foreground/80">Campus Wallet</p>
                <p className="text-xs text-primary-foreground/60">Available Balance</p>
              </div>
            </div>
            <TrendingUp className="w-5 h-5 text-primary-foreground/60" />
          </div>
          
          <div className="mb-6">
            <motion.h2 
              className="text-3xl font-bold"
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
            >
              ${balance.toFixed(2)}
            </motion.h2>
          </div>
          
          <Button 
            onClick={onTopUp}
            variant="secondary"
            className="w-full bg-white/20 hover:bg-white/30 text-primary-foreground border-white/30"
          >
            <Plus className="w-4 h-4 mr-2" />
            Top Up Wallet
          </Button>
        </CardContent>
      </Card>
    </motion.div>
  );
}