import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Shield, 
  Zap, 
  Smartphone, 
  GraduationCap,
  CreditCard,
  Lock,
  Users,
  TrendingUp
} from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import Dashboard from './Dashboard';
import Payment from './Payment';
import campusHero from '@/assets/campus-hero.jpg';

type AppView = 'landing' | 'dashboard' | 'payment';

const Index = () => {
  const [currentView, setCurrentView] = useState<AppView>('landing');

  if (currentView === 'dashboard') {
    window.location.href = '/dashboard';
    return null;
  }

  if (currentView === 'payment') {
    window.location.href = '/payment';
    return null;
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <motion.section 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="relative overflow-hidden bg-gradient-to-br from-primary-light to-primary"
      >
        <div className="absolute inset-0">
          <img 
            src={campusHero} 
            alt="Campus students using mobile payments"
            className="w-full h-full object-cover opacity-20"
          />
        </div>
        
        <div className="relative container mx-auto px-4 py-20">
          <div className="max-w-4xl mx-auto text-center text-primary-foreground">
            <motion.div
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <h1 className="text-4xl md:text-6xl font-bold mb-6">
                Campus Payments Made 
                <span className="block text-accent-foreground">Simple & Secure</span>
              </h1>
              <p className="text-xl md:text-2xl mb-8 text-primary-foreground/90">
                Pay for tuition, books, meals, and events with zero fraud risk. 
                Designed specifically for students, by students.
              </p>
            </motion.div>

            <motion.div
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Button 
                size="lg" 
                variant="secondary"
                className="text-lg px-8 py-6 bg-white/20 hover:bg-white/30 text-primary-foreground border-white/30"
                onClick={() => setCurrentView('dashboard')}
              >
                <GraduationCap className="w-5 h-5 mr-2" />
                Enter Campus Wallet
              </Button>
              <Button 
                size="lg" 
                variant="outline"
                className="text-lg px-8 py-6 bg-white/10 hover:bg-white/20 text-primary-foreground border-white/30"
              >
                <Shield className="w-5 h-5 mr-2" />
                Learn About Security
              </Button>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Features Section */}
      <motion.section 
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="py-20 bg-card/30"
      >
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Why Students Choose CampusPal
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Built with student life in mind - secure, intuitive, and designed to make 
              campus payments stress-free.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: Shield,
                title: 'Zero Fraud Protection',
                description: 'Advanced security measures with real-time fraud detection and secure transaction processing.'
              },
              {
                icon: Zap,
                title: 'Lightning Fast',
                description: 'Complete payments in seconds with our streamlined interface designed for busy students.'
              },
              {
                icon: Smartphone,
                title: 'Mobile First',
                description: 'Fully responsive design that works perfectly on your phone, tablet, or laptop.'
              },
              {
                icon: CreditCard,
                title: 'All-in-One Wallet',
                description: 'Pay for tuition, books, meals, events, and more from one secure digital wallet.'
              },
              {
                icon: Lock,
                title: 'Bank-Level Security',
                description: 'Your data is protected with the same security standards used by major banks.'
              },
              {
                icon: Users,
                title: 'Student Support',
                description: '24/7 support team that understands student needs and campus life.'
              }
            ].map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="h-full hover:shadow-lg transition-shadow">
                  <CardContent className="p-6 text-center">
                    <div className="w-16 h-16 mx-auto mb-4 bg-primary/10 rounded-full flex items-center justify-center">
                      <feature.icon className="w-8 h-8 text-primary" />
                    </div>
                    <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                    <p className="text-muted-foreground">{feature.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Stats Section */}
      <motion.section 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="py-16 bg-primary text-primary-foreground"
      >
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            {[
              { number: '50,000+', label: 'Students Trust Us' },
              { number: '99.9%', label: 'Uptime Reliability' },
              { number: '$2M+', label: 'Processed Safely' },
              { number: '0', label: 'Fraud Incidents' }
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ scale: 0.8, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="text-4xl font-bold mb-2">{stat.number}</div>
                <div className="text-primary-foreground/80">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* CTA Section */}
      <motion.section 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="py-20 text-center"
      >
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Simplify Your Campus Payments?
          </h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Join thousands of students who have made the switch to secure, 
            convenient campus payments.
          </p>
          <Button 
            size="lg"
            className="text-lg px-8 py-6 bg-gradient-to-r from-primary to-primary-dark hover:from-primary-dark hover:to-primary"
            onClick={() => setCurrentView('dashboard')}
          >
            <TrendingUp className="w-5 h-5 mr-2" />
            Get Started Now
          </Button>
        </div>
      </motion.section>

      {/* Footer */}
      <footer className="bg-card border-t py-12">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <GraduationCap className="w-6 h-6 text-primary" />
            <span className="text-xl font-bold">CampusPal</span>
          </div>
          <p className="text-muted-foreground">
            Secure campus payments for the digital generation.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
