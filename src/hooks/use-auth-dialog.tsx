
import { useState, useEffect, useCallback, useRef } from 'react';
import { useAuth } from '@/contexts/AuthContext';

export const useAuthDialog = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [redirectPath, setRedirectPath] = useState<string | undefined>(undefined);
  const { isAuthenticated } = useAuth();
  const lastClosedTime = useRef(0);
  
  // Close dialog if user becomes authenticated while dialog is open
  useEffect(() => {
    if (isAuthenticated && isDialogOpen) {
      closeAuthDialog();
    }
  }, [isAuthenticated, isDialogOpen]);
  
  // Reset session storage flag when authentication state changes
  useEffect(() => {
    if (isAuthenticated) {
      // If user is authenticated, store that in session storage
      sessionStorage.setItem('auth_dialog_closed', 'true');
    } else {
      // If user is not authenticated (logged out), remove the flag
      sessionStorage.removeItem('auth_dialog_closed');
    }
  }, [isAuthenticated]);
  
  const openAuthDialog = useCallback((path?: string) => {
    // Prevent reopening if already authenticated
    if (isAuthenticated) {
      return;
    }
    
    // Check if auth dialog should be shown
    // Only prevent showing if user explicitly closed it in the same session
    // AND if they're not logged out (so it will show after logout)
    if (sessionStorage.getItem('auth_dialog_closed') === 'true' && isAuthenticated) {
      return;
    }
    
    // Prevent rapid toggling
    const now = Date.now();
    if (now - lastClosedTime.current < 1000) {
      return;
    }
    
    if (path) {
      setRedirectPath(path);
    }
    setIsDialogOpen(true);
  }, [isAuthenticated]);
  
  const closeAuthDialog = useCallback(() => {
    setIsDialogOpen(false);
    setRedirectPath(undefined);
    lastClosedTime.current = Date.now();
    
    // Only store the closed flag if explicitly closed by the user (not by auth state)
    // AND only if authenticated (to allow reopening after logout)
    if (isAuthenticated) {
      sessionStorage.setItem('auth_dialog_closed', 'true');
    }
  }, [isAuthenticated]);
  
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
