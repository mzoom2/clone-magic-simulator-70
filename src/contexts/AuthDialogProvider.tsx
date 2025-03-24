
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
  
  // Close the dialog if user becomes authenticated
  useEffect(() => {
    if (isAuthenticated && isDialogOpen) {
      closeAuthDialog();
      authCheckPerformed.current = true;
    }
  }, [isAuthenticated, isDialogOpen, closeAuthDialog]);
  
  // Prevent reopening the dialog immediately after authentication
  useEffect(() => {
    if (isAuthenticated && authCheckPerformed.current) {
      const timeoutId = setTimeout(() => {
        authCheckPerformed.current = false;
      }, 1000);
      
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
