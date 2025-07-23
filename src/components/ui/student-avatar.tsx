import { motion } from 'framer-motion';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

interface StudentAvatarProps {
  name: string;
  avatar?: string;
  status?: 'online' | 'offline' | 'away';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export function StudentAvatar({ 
  name, 
  avatar, 
  status = 'online', 
  size = 'md',
  className = '' 
}: StudentAvatarProps) {
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-12 h-12',
    lg: 'w-16 h-16'
  };

  const statusColors = {
    online: 'bg-success',
    offline: 'bg-muted-foreground',
    away: 'bg-warning'
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <div className={`relative ${className}`}>
      <motion.div
        whileHover={{ scale: 1.05 }}
        transition={{ type: 'spring', stiffness: 300 }}
      >
        <Avatar className={sizeClasses[size]}>
          <AvatarImage src={avatar} alt={name} />
          <AvatarFallback className="bg-primary text-primary-foreground font-semibold">
            {avatar || getInitials(name)}
          </AvatarFallback>
        </Avatar>
      </motion.div>
      
      {status && (
        <div 
          className={`absolute -bottom-1 -right-1 w-3 h-3 rounded-full border-2 border-card ${statusColors[status]}`}
          aria-label={`Status: ${status}`}
        />
      )}
    </div>
  );
}