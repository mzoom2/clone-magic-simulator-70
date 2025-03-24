
import React, { createContext, useContext, ReactNode, useEffect, useRef } from 'react';
import { useAuthDialog } from '@/hooks/use-auth-dialog';
import AuthDialog from '@/components/AuthDialog';
import { useAuth } from '@/contexts/AuthContext';

interface AuthDialogContextType {
  openAuthDialog: (redirectPath?: string) => void;
  closeAuthDialog: () => void;
  checkAuthAndProceed: (path: string, onAuthenticated: () => void) => void;
  isDialogOpen: boolean;
}

const AuthDialogContext = createContext<AuthDialogContextType | undefined>(undefined);

export const useAuthDialogContext = () => {
  const context = useContext(AuthDialogContext);
  if (context === undefined) {
    throw new Error('useAuthDialogContext must be used within an AuthDialogProvider');
  }
  return context;
};

interface AuthDialogProviderProps {
  children: ReactNode;
}

export const AuthDialogProvider: React.FC<AuthDialogProviderProps> = ({ children }) => {
  const {
    isDialogOpen,
    redirectPath,
    openAuthDialog,
    closeAuthDialog,
    checkAuthAndProceed
  } = useAuthDialog();
  
  const { isAuthenticated } = useAuth();
  const authCheckPerformed = useRef(false);
  const wasAuthenticated = useRef(false);
  
  // Track authentication status changes
  useEffect(() => {
    // If user becomes authenticated, mark it
    if (isAuthenticated && !wasAuthenticated.current) {
      wasAuthenticated.current = true;
      authCheckPerformed.current = true;
      
      // Store authentication status in browser storage
      sessionStorage.setItem('auth_dialog_closed', 'true');
    }
  }, [isAuthenticated]);
  
  // Check localStorage on mount to prevent reopening after page refresh
  useEffect(() => {
    if (isAuthenticated) {
      // If user is authenticated, ensure we don't show the dialog
      sessionStorage.setItem('auth_dialog_closed', 'true');
    }
  }, [isAuthenticated]);
  
  // Prevent reopening the dialog immediately after authentication
  useEffect(() => {
    if (isAuthenticated && authCheckPerformed.current) {
      const timeoutId = setTimeout(() => {
        authCheckPerformed.current = false;
      }, 3000); // Longer timeout to ensure we don't reopen too quickly
      
      return () => clearTimeout(timeoutId);
    }
  }, [isAuthenticated]);
  
  return (
    <AuthDialogContext.Provider
      value={{
        openAuthDialog,
        closeAuthDialog,
        checkAuthAndProceed,
        isDialogOpen
      }}
    >
      {children}
      <AuthDialog 
        isOpen={isDialogOpen} 
        onClose={closeAuthDialog} 
        redirectPath={redirectPath}
      />
    </AuthDialogContext.Provider>
  );
};
