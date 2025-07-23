import { ReactNode } from 'react';
import { 
  Home, 
  CreditCard, 
  History, 
  Calendar, 
  User, 
  Shield, 
  HelpCircle,
  Bell,
  ChevronDown,
  Menu
} from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { AppSidebar } from './app-sidebar';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useAppStore } from '@/store/useAppStore';

interface DashboardLayoutProps {
  children: ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const { profile } = useAppStore();
  const location = useLocation();

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <AppSidebar />
        
        <main className="flex-1 flex flex-col">
          {/* Top Navigation */}
          <header className="h-16 border-b bg-card/50 backdrop-blur-sm sticky top-0 z-40 flex items-center justify-between px-4">
            <div className="flex items-center gap-4">
              <SidebarTrigger className="lg:hidden" />
              <div className="flex items-center gap-2">
                <Link to="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
                  <Button variant="ghost" size="sm">
                    <Home className="w-4 h-4 mr-2" />
                    Back to Homepage
                  </Button>
                </Link>
              </div>
            </div>

            <div className="flex items-center gap-4">
              {/* Notifications */}
              <Button variant="ghost" size="sm" className="relative">
                <Bell className="w-4 h-4" />
                <Badge variant="destructive" className="absolute -top-1 -right-1 w-5 h-5 flex items-center justify-center text-xs p-0">
                  3
                </Badge>
              </Button>

              {/* User Menu */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="flex items-center gap-2 h-8 px-2">
                    <Avatar className="w-8 h-8">
                      <AvatarImage src={profile.avatar} alt={profile.name} />
                      <AvatarFallback>{profile.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                    </Avatar>
                    <span className="hidden md:inline text-sm font-medium">{profile.name.split(' ')[0]}</span>
                    <ChevronDown className="w-4 h-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link to="/profile">
                      <User className="w-4 h-4 mr-2" />
                      Profile Settings
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/security">
                      <Shield className="w-4 h-4 mr-2" />
                      Security Center
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </header>

          {/* Main Content */}
          <div className="flex-1 p-6">
            {children}
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
}