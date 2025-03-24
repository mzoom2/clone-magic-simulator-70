
import React, { createContext, useContext, ReactNode, useEffect } from 'react';
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
  
  // Close the dialog if user becomes authenticated
  useEffect(() => {
    if (isAuthenticated && isDialogOpen) {
      closeAuthDialog();
    }
  }, [isAuthenticated, isDialogOpen]);
  
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
