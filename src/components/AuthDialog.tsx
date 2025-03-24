import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LogIn, UserPlus, Loader2 } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';

interface AuthDialogProps {
  isOpen: boolean;
  onClose: () => void;
  redirectPath?: string;
}

const AuthDialog = ({ isOpen, onClose, redirectPath }: AuthDialogProps) => {
  const [activeTab, setActiveTab] = useState<string>("login");
  
  // Login state
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  
  // Register state
  const [registerEmail, setRegisterEmail] = useState('');
  const [registerPassword, setRegisterPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [isRegistering, setIsRegistering] = useState(false);
  
  const { login, register, isAuthenticated } = useAuth();
  const { toast } = useToast();
  
  // Close dialog automatically if user becomes authenticated
  useEffect(() => {
    if (isAuthenticated && isOpen) {
      // Small delay to ensure stable state before closing
      const timer = setTimeout(() => {
        handleSuccessfulAuth();
      }, 100);
      
      return () => clearTimeout(timer);
    }
  }, [isAuthenticated, isOpen]);
  
  // Reset form fields when dialog opens/closes
  useEffect(() => {
    if (!isOpen) {
      // Reset form fields when dialog closes
      setLoginEmail('');
      setLoginPassword('');
      setRegisterEmail('');
      setRegisterPassword('');
      setFirstName('');
      setLastName('');
      setIsLoggingIn(false);
      setIsRegistering(false);
    }
  }, [isOpen]);

  const handleDialogClose = () => {
    // Only close if we're not in the middle of authentication
    if (!isLoggingIn && !isRegistering) {
      onClose();
    }
  };

  const handleSuccessfulAuth = () => {
    onClose();
    
    // If we have a redirectPath, navigate to it
    if (redirectPath) {
      // Small delay to ensure dialog is fully closed
      setTimeout(() => {
        window.location.href = redirectPath;
      }, 150);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoggingIn(true);
    
    try {
      const success = await login(loginEmail, loginPassword);
      if (!success) {
        // Reset loading state but keep dialog open if login fails
        setIsLoggingIn(false);
      }
      // If success, the useEffect will handle dialog closing
    } catch (error) {
      console.error("Login error:", error);
      setIsLoggingIn(false);
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsRegistering(true);
    
    try {
      const success = await register(registerEmail, registerPassword, firstName, lastName);
      if (!success) {
        // Reset loading state but keep dialog open if registration fails
        setIsRegistering(false);
      }
      // If success, the useEffect will handle dialog closing
    } catch (error) {
      console.error("Registration error:", error);
      setIsRegistering(false);
    }
  };

  // The rest of the component remains unchanged
  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && handleDialogClose()}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-center">Authentication Required</DialogTitle>
          <DialogDescription className="text-center">
            Please log in or create an account to continue with enrollment.
          </DialogDescription>
        </DialogHeader>
        
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="login">Login</TabsTrigger>
            <TabsTrigger value="register">Register</TabsTrigger>
          </TabsList>
          
          <TabsContent value="login">
            <form onSubmit={handleLogin} className="space-y-4 py-2">
              <div className="space-y-2">
                <Label htmlFor="login-email">Email</Label>
                <Input
                  id="login-email"
                  type="email"
                  value={loginEmail}
                  onChange={(e) => setLoginEmail(e.target.value)}
                  placeholder="your@email.com"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="login-password">Password</Label>
                <Input
                  id="login-password"
                  type="password"
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  required
                />
              </div>
              
              <Button 
                type="submit" 
                className="w-full bg-forest hover:bg-forest/90"
                disabled={isLoggingIn}
              >
                {isLoggingIn ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Signing in...
                  </>
                ) : (
                  <>
                    <LogIn className="mr-2 h-4 w-4" />
                    Sign In
                  </>
                )}
              </Button>
            </form>
          </TabsContent>
          
          <TabsContent value="register">
            <form onSubmit={handleRegister} className="space-y-4 py-2">
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-2">
                  <Label htmlFor="first-name">First Name</Label>
                  <Input
                    id="first-name"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="last-name">Last Name</Label>
                  <Input
                    id="last-name"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    required
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="register-email">Email</Label>
                <Input
                  id="register-email"
                  type="email"
                  value={registerEmail}
                  onChange={(e) => setRegisterEmail(e.target.value)}
                  placeholder="your@email.com"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="register-password">Password</Label>
                <Input
                  id="register-password"
                  type="password"
                  value={registerPassword}
                  onChange={(e) => setRegisterPassword(e.target.value)}
                  required
                />
              </div>
              
              <Button 
                type="submit" 
                className="w-full bg-forest hover:bg-forest/90"
                disabled={isRegistering}
              >
                {isRegistering ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Creating account...
                  </>
                ) : (
                  <>
                    <UserPlus className="mr-2 h-4 w-4" />
                    Create Account
                  </>
                )}
              </Button>
            </form>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};

export default AuthDialog;
