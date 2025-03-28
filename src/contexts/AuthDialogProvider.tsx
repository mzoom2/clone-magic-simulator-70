
import React, { createContext, useCallback, useContext, useState } from 'react';
import AuthDialog from '@/components/AuthDialog';
import { useAuth } from './AuthContext';

type AuthDialogContextType = {
  showAuthDialog: (redirectPath?: string) => void;
  checkAuthAndProceed: (redirectPath: string, onAuthenticated: () => void) => void;
  resetAuthDialogState: () => void;
  dismissAuthDialog: () => void;
};

const AuthDialogContext = createContext<AuthDialogContextType | undefined>(undefined);

export const useAuthDialogContext = () => {
  const context = useContext(AuthDialogContext);
  if (!context) {
    throw new Error('useAuthDialogContext must be used within an AuthDialogProvider');
  }
  return context;
};

export const AuthDialogProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [redirectPath, setRedirectPath] = useState<string | undefined>(undefined);
  const { isAuthenticated } = useAuth();

  const showAuthDialog = useCallback((path?: string) => {
    // Only show the dialog if the user is not already authenticated
    if (!isAuthenticated) {
      setRedirectPath(path);
      setIsDialogOpen(true);
    }
  }, [isAuthenticated]);

  const dismissAuthDialog = useCallback(() => {
    // This function just closes the dialog without setting any session storage flags
    // so it can be opened again later
    setIsDialogOpen(false);
    setRedirectPath(undefined);
  }, []);

  const resetAuthDialogState = useCallback(() => {
    // Remove any stored state that might prevent the dialog from showing again
    setIsDialogOpen(false);
    setRedirectPath(undefined);
  }, []);

  const checkAuthAndProceed = useCallback((path: string, onAuthenticated: () => void) => {
    if (isAuthenticated) {
      onAuthenticated();
    } else {
      // Show auth dialog and store the path for redirect after auth
      showAuthDialog(path);
    }
  }, [isAuthenticated, showAuthDialog]);

  return (
    <AuthDialogContext.Provider value={{ 
      showAuthDialog, 
      checkAuthAndProceed, 
      resetAuthDialogState,
      dismissAuthDialog 
    }}>
      {children}
      <AuthDialog
        isOpen={isDialogOpen}
        onClose={() => dismissAuthDialog()}
        redirectPath={redirectPath}
      />
    </AuthDialogContext.Provider>
  );
};
