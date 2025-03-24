
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
  const prevAuthState = useRef(isAuthenticated);
  
  // Track authentication status changes
  useEffect(() => {
    // If authentication state changed (login or logout)
    if (isAuthenticated !== prevAuthState.current) {
      prevAuthState.current = isAuthenticated;
      
      // Update session storage based on current auth state
      if (isAuthenticated) {
        // When user logs in, store authentication status
        sessionStorage.setItem('auth_dialog_closed', 'true');
      } else {
        // When user logs out, remove the auth_dialog_closed flag
        sessionStorage.removeItem('auth_dialog_closed');
      }
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
