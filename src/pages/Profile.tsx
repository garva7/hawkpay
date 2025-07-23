import { useState } from 'react';
import { motion } from 'framer-motion';
import { Camera, Save, Edit } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useAppStore } from '@/store/useAppStore';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/hooks/use-toast';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';

const profileSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  phone: z.string().min(10, 'Phone number must be at least 10 digits'),
  studentId: z.string().min(1, 'Student ID is required'),
  course: z.string().min(1, 'Course is required'),
  year: z.number().min(1).max(4),
});

type ProfileFormData = z.infer<typeof profileSchema>;

export default function Profile() {
  const { profile } = useAppStore();
  const { toast } = useToast();
  const [isEditing, setIsEditing] = useState(false);

  const form = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: profile.name,
      email: profile.email,
      phone: profile.phone,
      studentId: profile.studentId,
      course: profile.course,
      year: profile.year,
    },
  });

  const onSubmit = async (data: ProfileFormData) => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    console.log('Profile updated:', data);
    setIsEditing(false);
    
    toast({
      title: "Profile Updated",
      description: "Your profile has been successfully updated.",
    });
  };

  const handleAvatarUpload = () => {
    toast({
      title: "Avatar Upload",
      description: "Avatar upload feature coming soon!",
    });
  };

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between"
      >
        <div>
          <h1 className="text-3xl font-bold">Profile Settings</h1>
          <p className="text-muted-foreground">Manage your account information and preferences</p>
        </div>
        <Button
          variant={isEditing ? "outline" : "default"}
          onClick={() => setIsEditing(!isEditing)}
        >
          <Edit className="w-4 h-4 mr-2" />
          {isEditing ? 'Cancel' : 'Edit Profile'}
        </Button>
      </motion.div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Avatar Section */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
          className="lg:col-span-1"
        >
          <Card>
            <CardHeader>
              <CardTitle>Profile Picture</CardTitle>
            </CardHeader>
            <CardContent className="text-center space-y-4">
              <div className="relative inline-block">
                <Avatar className="w-32 h-32">
                  <AvatarImage src={profile.avatar} alt={profile.name} />
                  <AvatarFallback className="text-2xl">
                    {profile.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                {isEditing && (
                  <Button
                    size="sm"
                    variant="secondary"
                    className="absolute bottom-0 right-0 rounded-full w-10 h-10 p-0"
                    onClick={handleAvatarUpload}
                  >
                    <Camera className="w-4 h-4" />
                  </Button>
                )}
              </div>
              <div>
                <h3 className="font-semibold text-lg">{profile.name}</h3>
                <p className="text-muted-foreground">{profile.course}</p>
                <p className="text-sm text-muted-foreground">Year {profile.year} • ID: {profile.studentId}</p>
              </div>
            </CardContent>
          </Card>

          {/* Quick Stats */}
          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Account Stats</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Wallet Balance</span>
                <span className="font-semibold">${profile.walletBalance.toFixed(2)}</span>
              </div>
              <Separator />
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Member Since</span>
                <span className="font-semibold">Jan 2024</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Total Transactions</span>
                <span className="font-semibold">24</span>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Profile Form */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="lg:col-span-2"
        >
          <Card>
            <CardHeader>
              <CardTitle>Personal Information</CardTitle>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Full Name</FormLabel>
                          <FormControl>
                            <Input {...field} disabled={!isEditing} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="studentId"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Student ID</FormLabel>
                          <FormControl>
                            <Input {...field} disabled={!isEditing} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email Address</FormLabel>
                          <FormControl>
                            <Input {...field} type="email" disabled={!isEditing} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Phone Number</FormLabel>
                          <FormControl>
                            <Input {...field} disabled={!isEditing} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="course"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Course/Program</FormLabel>
                          <FormControl>
                            <Input {...field} disabled={!isEditing} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="year"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Year of Study</FormLabel>
                          <FormControl>
                            <Input 
                              {...field} 
                              type="number" 
                              min="1" 
                              max="4" 
                              disabled={!isEditing}
                              onChange={(e) => field.onChange(parseInt(e.target.value))}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  {isEditing && (
                    <div className="flex gap-4 pt-4">
                      <Button type="submit" disabled={form.formState.isSubmitting}>
                        <Save className="w-4 h-4 mr-2" />
                        {form.formState.isSubmitting ? 'Saving...' : 'Save Changes'}
                      </Button>
                      <Button 
                        type="button" 
                        variant="outline" 
                        onClick={() => {
                          setIsEditing(false);
                          form.reset();
                        }}
                      >
                        Cancel
                      </Button>
                    </div>
                  )}
                </form>
              </Form>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}