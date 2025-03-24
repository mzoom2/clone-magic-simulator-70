
import { useState, useEffect, useCallback, useRef } from 'react';
import { useAuth } from '@/contexts/AuthContext';

export const useAuthDialog = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [redirectPath, setRedirectPath] = useState<string | undefined>(undefined);
  const { isAuthenticated } = useAuth();
  const lastClosedTime = useRef(0);
  
  // Close dialog if user becomes authenticated
  useEffect(() => {
    if (isAuthenticated && isDialogOpen) {
      closeAuthDialog();
    }
  }, [isAuthenticated, isDialogOpen]);
  
  const openAuthDialog = useCallback((path?: string) => {
    // Prevent rapid toggling by checking if dialog was recently closed
    const now = Date.now();
    if (now - lastClosedTime.current < 500) {
      return;
    }
    
    if (path) {
      setRedirectPath(path);
    }
    setIsDialogOpen(true);
  }, []);
  
  const closeAuthDialog = useCallback(() => {
    setIsDialogOpen(false);
    setRedirectPath(undefined);
    lastClosedTime.current = Date.now();
  }, []);
  
  const checkAuthAndProceed = useCallback((path: string, onAuthenticated: () => void) => {
    if (isAuthenticated) {
      onAuthenticated();
    } else {
      openAuthDialog(path);
    }
  }, [isAuthenticated, openAuthDialog]);
  
  return {
    isDialogOpen,
    redirectPath,
    openAuthDialog,
    closeAuthDialog,
    checkAuthAndProceed
  };
};
