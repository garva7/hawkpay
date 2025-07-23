import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  HelpCircle, 
  MessageCircle, 
  Phone, 
  Mail, 
  ChevronDown, 
  ChevronRight,
  Search,
  Send
} from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';

const contactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  category: z.string().min(1, 'Please select a category'),
  subject: z.string().min(5, 'Subject must be at least 5 characters'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
});

type ContactFormData = z.infer<typeof contactSchema>;

const faqData = [
  {
    question: "How do I add money to my wallet?",
    answer: "You can add money to your wallet by clicking the 'Top Up' button on your dashboard. We accept credit cards, debit cards, and bank transfers. All transactions are secure and processed instantly."
  },
  {
    question: "What payment methods are accepted?",
    answer: "We accept all major credit cards (Visa, MasterCard, American Express), debit cards, and bank transfers. We also support popular digital wallets like PayPal and Apple Pay."
  },
  {
    question: "How do I track my transactions?",
    answer: "All your transactions are automatically recorded and can be viewed in the 'Transaction History' section. You can filter by date, amount, status, and transaction type. You can also export your transaction history as a PDF or CSV file."
  },
  {
    question: "What should I do if a payment fails?",
    answer: "If a payment fails, first check your internet connection and try again. If the problem persists, verify that your payment method has sufficient funds and hasn't expired. Contact support if you continue experiencing issues."
  },
  {
    question: "How secure are my transactions?",
    answer: "We use bank-level encryption and security measures to protect your transactions. All sensitive data is encrypted, and we never store your payment card information. We also use real-time fraud detection to monitor for suspicious activity."
  },
  {
    question: "Can I get a refund for a transaction?",
    answer: "Refund policies depend on the specific service or merchant. For university fees and services, contact the relevant department. For other transactions, please contact our support team with your transaction details."
  },
  {
    question: "How do I enable two-factor authentication?",
    answer: "Go to Security Center in your account settings and toggle on 'Two-Factor Authentication'. You'll need to verify your phone number to complete the setup. This adds an extra layer of security to your account."
  },
  {
    question: "What are the transaction limits?",
    answer: "Daily transaction limits vary by account type and verification level. Standard accounts have a $1,000 daily limit, while verified accounts can transact up to $5,000 per day. Contact support to increase your limits if needed."
  }
];

export default function Support() {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState('');
  const [openFaq, setOpenFaq] = useState<string[]>([]);

  const form = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactFormData) => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    console.log('Support request:', data);
    form.reset();
    
    toast({
      title: "Message Sent!",
      description: "We've received your message and will get back to you within 24 hours.",
    });
  };

  const filteredFaqs = faqData.filter(faq =>
    faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
    faq.answer.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <h1 className="text-3xl font-bold mb-2">How can we help you?</h1>
        <p className="text-muted-foreground">
          Find answers to common questions or get in touch with our support team
        </p>
      </motion.div>

      {/* Contact Options */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="grid md:grid-cols-3 gap-6 mb-8"
      >
        <Card className="text-center hover:shadow-lg transition-shadow">
          <CardContent className="p-6">
            <div className="w-12 h-12 mx-auto mb-4 bg-primary/10 rounded-full flex items-center justify-center">
              <MessageCircle className="w-6 h-6 text-primary" />
            </div>
            <h3 className="font-semibold mb-2">Live Chat</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Chat with our support team in real-time
            </p>
            <Button size="sm" className="w-full">
              Start Chat
            </Button>
          </CardContent>
        </Card>

        <Card className="text-center hover:shadow-lg transition-shadow">
          <CardContent className="p-6">
            <div className="w-12 h-12 mx-auto mb-4 bg-primary/10 rounded-full flex items-center justify-center">
              <Phone className="w-6 h-6 text-primary" />
            </div>
            <h3 className="font-semibold mb-2">Phone Support</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Call us during business hours
            </p>
            <Button size="sm" variant="outline" className="w-full">
              (555) 123-4567
            </Button>
          </CardContent>
        </Card>

        <Card className="text-center hover:shadow-lg transition-shadow">
          <CardContent className="p-6">
            <div className="w-12 h-12 mx-auto mb-4 bg-primary/10 rounded-full flex items-center justify-center">
              <Mail className="w-6 h-6 text-primary" />
            </div>
            <h3 className="font-semibold mb-2">Email Support</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Get help via email within 24 hours
            </p>
            <Button size="sm" variant="outline" className="w-full">
              support@campuspal.com
            </Button>
          </CardContent>
        </Card>
      </motion.div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* FAQ Section */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <HelpCircle className="w-5 h-5" />
                Frequently Asked Questions
              </CardTitle>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Search FAQs..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </CardHeader>
            <CardContent>
              <Accordion type="multiple" value={openFaq} onValueChange={setOpenFaq}>
                {filteredFaqs.map((faq, index) => (
                  <AccordionItem key={index} value={`item-${index}`}>
                    <AccordionTrigger className="text-left">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
              
              {filteredFaqs.length === 0 && (
                <div className="text-center py-8 text-muted-foreground">
                  No FAQs found matching your search.
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>

        {/* Contact Form */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card>
            <CardHeader>
              <CardTitle>Contact Support</CardTitle>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Name</FormLabel>
                          <FormControl>
                            <Input placeholder="Your full name" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <Input placeholder="your@email.com" type="email" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="category"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Category</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select an issue category" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="payment">Payment Issues</SelectItem>
                            <SelectItem value="account">Account Problems</SelectItem>
                            <SelectItem value="security">Security Concerns</SelectItem>
                            <SelectItem value="technical">Technical Support</SelectItem>
                            <SelectItem value="general">General Inquiry</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="subject"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Subject</FormLabel>
                        <FormControl>
                          <Input placeholder="Brief description of your issue" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Message</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="Please describe your issue in detail..."
                            className="min-h-[120px]"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Button type="submit" className="w-full" disabled={form.formState.isSubmitting}>
                    <Send className="w-4 h-4 mr-2" />
                    {form.formState.isSubmitting ? 'Sending...' : 'Send Message'}
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}