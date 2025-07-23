import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Plus, 
  History, 
  Settings, 
  CreditCard, 
  TrendingUp,
  Clock,
  CheckCircle,
  XCircle
} from 'lucide-react';

import { SecureTransactionForm } from '@/components/payment/secure-transaction-form';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { WalletCard } from '@/components/ui/wallet-card';
import { StudentAvatar } from '@/components/ui/student-avatar';
import { WelcomeModal } from '@/components/onboarding/welcome-modal';
import { useAppStore } from '@/store/useAppStore';
import { TransactionStatus, PaymentFormData, Transaction } from '@/types';

export default function Dashboard() {
  const { profile, transactions, initializeMockData, addTransaction, updateWalletBalance } = useAppStore();
  const [showWelcome, setShowWelcome] = useState(true);

  useEffect(() => {
    initializeMockData();
  }, [initializeMockData]);


  const getStatusIcon = (status: TransactionStatus) => {
    switch (status) {
      case 'success':
        return <CheckCircle className="w-4 h-4 text-success" />;
      case 'failed':
        return <XCircle className="w-4 h-4 text-destructive" />;
      case 'pending':
      case 'processing':
        return <Clock className="w-4 h-4 text-warning" />;
    }
  };

  const getStatusBadge = (status: TransactionStatus) => {
    const variants = {
      success: 'bg-success/10 text-success border-success/20',
      failed: 'bg-destructive/10 text-destructive border-destructive/20',
      pending: 'bg-warning/10 text-warning border-warning/20',
      processing: 'bg-primary/10 text-primary border-primary/20'
    };

    return (
      <Badge variant="outline" className={variants[status]}>
        {getStatusIcon(status)}
        <span className="ml-1 capitalize">{status}</span>
      </Badge>
    );
  };

  const recentTransactions = transactions.slice(0, 5);
  const totalSpent = transactions
    .filter(t => t.status === 'success')
    .reduce((sum, t) => sum + t.amount, 0);

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between"
      >
        <div className="flex items-center gap-4">
          <StudentAvatar 
            name={profile.name}
            avatar={profile.avatar}
            size="lg"
          />
          <div>
            <h1 className="text-2xl font-bold">Welcome back, {profile.name.split(' ')[0]}!</h1>
            <p className="text-muted-foreground">
              {profile.course} • Year {profile.year} • ID: {profile.studentId}
            </p>
          </div>
        </div>
      </motion.div>

      <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column - Wallet & Quick Actions */}
          <div className="lg:col-span-1 space-y-6">
            <WalletCard 
              balance={profile.walletBalance}
              onTopUp={() => console.log('Top up wallet')}
            />

            {/* Quick Actions */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Quick Actions</CardTitle>
                </CardHeader>
                <CardContent className="grid grid-cols-2 gap-3">
                  <Button 
                    variant="outline" 
                    className="h-16 flex-col gap-2"
                    onClick={() => window.location.href = '/payment'}
                  >
                    <CreditCard className="w-5 h-5" />
                    <span className="text-xs">Pay Now</span>
                  </Button>
                  <Button variant="outline" className="h-16 flex-col gap-2">
                    <History className="w-5 h-5" />
                    <span className="text-xs">History</span>
                  </Button>
                  <Button variant="outline" className="h-16 flex-col gap-2">
                    <Plus className="w-5 h-5" />
                    <span className="text-xs">Top Up</span>
                  </Button>
                  <Button variant="outline" className="h-16 flex-col gap-2">
                    <TrendingUp className="w-5 h-5" />
                    <span className="text-xs">Analytics</span>
                  </Button>
                </CardContent>
              </Card>
            </motion.div>

            {/* Quick Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">This Month</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Total Spent</span>
                    <span className="font-semibold">${totalSpent.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Transactions</span>
                    <span className="font-semibold">{transactions.length}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Saved</span>
                    <span className="font-semibold text-success">$124.50</span>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* Right Column - Main Content */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <Tabs defaultValue="overview" className="space-y-6">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="overview">Overview</TabsTrigger>
                  <TabsTrigger value="transactions">Transactions</TabsTrigger>
                  <TabsTrigger value="analytics">Analytics</TabsTrigger>
                </TabsList>

                <TabsContent value="overview" className="space-y-6">
                  {/* Recent Transactions */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center justify-between">
                        Recent Activity
                        <Button variant="ghost" size="sm">
                          View All
                        </Button>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {recentTransactions.map((transaction, index) => (
                          <motion.div
                            key={transaction.id}
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="flex items-center justify-between p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors"
                          >
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                                <span className="text-xs font-semibold text-primary">
                                  {transaction.purpose.charAt(0).toUpperCase()}
                                </span>
                              </div>
                              <div>
                                <p className="font-medium">{transaction.receiver}</p>
                                <p className="text-sm text-muted-foreground">
                                  {transaction.description || 'No description'}
                                </p>
                              </div>
                            </div>
                            <div className="text-right">
                              <p className="font-semibold">-${transaction.amount.toFixed(2)}</p>
                              {getStatusBadge(transaction.status)}
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="transactions">
                  <Card>
                    <CardHeader>
                      <CardTitle>All Transactions</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground">
                        Complete transaction history and filtering options will be available here.
                      </p>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="analytics">
                  <Card>
                    <CardHeader>
                      <CardTitle>Spending Analytics</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground">
                        Charts and insights about your spending patterns will be displayed here.
                      </p>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </motion.div>
          </div>
        </div>

      {/* Welcome Modal */}
      <WelcomeModal 
        isOpen={showWelcome}
        onClose={() => setShowWelcome(false)}
      />
    </div>
  );
}