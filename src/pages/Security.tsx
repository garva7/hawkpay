import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Shield, 
  Smartphone, 
  Lock, 
  Eye, 
  EyeOff, 
  MapPin, 
  Clock,
  AlertTriangle,
  CheckCircle
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';

interface SecurityEvent {
  id: string;
  type: 'login' | 'password_change' | 'payment' | 'suspicious';
  description: string;
  location: string;
  timestamp: Date;
  status: 'success' | 'failed' | 'blocked';
}

const mockSecurityEvents: SecurityEvent[] = [
  {
    id: '1',
    type: 'login',
    description: 'Successful login from Chrome browser',
    location: 'Campus Library, Room 201',
    timestamp: new Date('2024-01-20T14:30:00'),
    status: 'success'
  },
  {
    id: '2',
    type: 'payment',
    description: 'Payment of $150 to University Bookstore',
    location: 'Mobile App, iPhone',
    timestamp: new Date('2024-01-19T16:45:00'),
    status: 'success'
  },
  {
    id: '3',
    type: 'login',
    description: 'Failed login attempt',
    location: 'Unknown location (IP: 185.xxx.xxx.xxx)',
    timestamp: new Date('2024-01-18T23:15:00'),
    status: 'blocked'
  }
];

export default function Security() {
  const { toast } = useToast();
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);
  const [smsNotifications, setSmsNotifications] = useState(true);
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);

  const handleTwoFactorToggle = () => {
    setTwoFactorEnabled(!twoFactorEnabled);
    toast({
      title: twoFactorEnabled ? "2FA Disabled" : "2FA Enabled",
      description: twoFactorEnabled 
        ? "Two-factor authentication has been disabled." 
        : "Two-factor authentication has been enabled for enhanced security.",
    });
  };

  const handlePasswordReset = () => {
    toast({
      title: "Password Reset",
      description: "Password reset instructions will be sent to your email.",
    });
  };

  const getEventIcon = (type: SecurityEvent['type']) => {
    switch (type) {
      case 'login':
        return <Shield className="w-4 h-4" />;
      case 'password_change':
        return <Lock className="w-4 h-4" />;
      case 'payment':
        return <CheckCircle className="w-4 h-4" />;
      case 'suspicious':
        return <AlertTriangle className="w-4 h-4" />;
    }
  };

  const getStatusColor = (status: SecurityEvent['status']) => {
    switch (status) {
      case 'success':
        return 'bg-success/10 text-success border-success/20';
      case 'failed':
        return 'bg-warning/10 text-warning border-warning/20';
      case 'blocked':
        return 'bg-destructive/10 text-destructive border-destructive/20';
    }
  };

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between"
      >
        <div>
          <h1 className="text-3xl font-bold">Security Center</h1>
          <p className="text-muted-foreground">Manage your account security and privacy settings</p>
        </div>
        <Button variant="outline">
          <AlertTriangle className="w-4 h-4 mr-2" />
          Security Checkup
        </Button>
      </motion.div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Security Settings */}
        <div className="space-y-6">
          {/* Two-Factor Authentication */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
          >
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Smartphone className="w-5 h-5" />
                  Two-Factor Authentication
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <Label>Enable 2FA</Label>
                    <p className="text-sm text-muted-foreground">
                      Add an extra layer of security to your account
                    </p>
                  </div>
                  <Switch 
                    checked={twoFactorEnabled} 
                    onCheckedChange={handleTwoFactorToggle}
                  />
                </div>
                {twoFactorEnabled && (
                  <div className="p-4 bg-success/10 rounded-lg border border-success/20">
                    <div className="flex items-center gap-2 text-success">
                      <CheckCircle className="w-4 h-4" />
                      <span className="text-sm font-medium">2FA is active</span>
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">
                      Your account is protected with two-factor authentication
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </motion.div>

          {/* Password Management */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Lock className="w-5 h-5" />
                  Password Management
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="space-y-2">
                    <Label>Current Password</Label>
                    <div className="relative">
                      <Input 
                        type={showCurrentPassword ? "text" : "password"} 
                        placeholder="Enter current password"
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="absolute right-2 top-1/2 transform -translate-y-1/2 h-8 w-8 p-0"
                        onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                      >
                        {showCurrentPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </Button>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label>New Password</Label>
                    <div className="relative">
                      <Input 
                        type={showNewPassword ? "text" : "password"} 
                        placeholder="Enter new password"
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="absolute right-2 top-1/2 transform -translate-y-1/2 h-8 w-8 p-0"
                        onClick={() => setShowNewPassword(!showNewPassword)}
                      >
                        {showNewPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </Button>
                    </div>
                  </div>
                </div>
                
                <div className="flex gap-2 pt-2">
                  <Button onClick={handlePasswordReset}>
                    Update Password
                  </Button>
                  <Button variant="outline" onClick={handlePasswordReset}>
                    Reset Password
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Notification Preferences */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Card>
              <CardHeader>
                <CardTitle>Notification Preferences</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <Label>SMS Notifications</Label>
                    <p className="text-sm text-muted-foreground">
                      Receive security alerts via SMS
                    </p>
                  </div>
                  <Switch 
                    checked={smsNotifications} 
                    onCheckedChange={setSmsNotifications}
                  />
                </div>
                
                <Separator />
                
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <Label>Email Notifications</Label>
                    <p className="text-sm text-muted-foreground">
                      Receive security alerts via email
                    </p>
                  </div>
                  <Switch 
                    checked={emailNotifications} 
                    onCheckedChange={setEmailNotifications}
                  />
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Security Activity */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card className="h-fit">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="w-5 h-5" />
                Recent Security Activity
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockSecurityEvents.map((event, index) => (
                  <motion.div
                    key={event.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-start gap-3 p-3 rounded-lg border"
                  >
                    <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center">
                      {getEventIcon(event.type)}
                    </div>
                    <div className="flex-1 space-y-1">
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-medium">{event.description}</p>
                        <Badge variant="outline" className={getStatusColor(event.status)}>
                          {event.status}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-4 text-xs text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <MapPin className="w-3 h-3" />
                          <span>{event.location}</span>
                        </div>
                        <span>{event.timestamp.toLocaleDateString()} at {event.timestamp.toLocaleTimeString()}</span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
              
              <Button variant="outline" className="w-full mt-4">
                View All Activity
              </Button>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}