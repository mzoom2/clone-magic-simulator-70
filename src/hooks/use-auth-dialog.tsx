
import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';

export const useAuthDialog = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [redirectPath, setRedirectPath] = useState<string | undefined>(undefined);
  const { isAuthenticated } = useAuth();
  
  // Close dialog if user becomes authenticated
  useEffect(() => {
    if (isAuthenticated && isDialogOpen) {
      closeAuthDialog();
    }
  }, [isAuthenticated, isDialogOpen]);
  
  const openAuthDialog = (path?: string) => {
    if (path) {
      setRedirectPath(path);
    }
    setIsDialogOpen(true);
  };
  
  const closeAuthDialog = () => {
    setIsDialogOpen(false);
    setRedirectPath(undefined);
  };
  
  const checkAuthAndProceed = (path: string, onAuthenticated: () => void) => {
    if (isAuthenticated) {
      onAuthenticated();
    } else {
      openAuthDialog(path);
    }
  };
  
  return {
    isDialogOpen,
    redirectPath,
    openAuthDialog,
    closeAuthDialog,
    checkAuthAndProceed
  };
};
