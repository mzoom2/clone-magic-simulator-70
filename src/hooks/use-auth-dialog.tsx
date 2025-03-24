
import { useState, useEffect, useCallback, useRef } from 'react';
import { useAuth } from '@/contexts/AuthContext';

export const useAuthDialog = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [redirectPath, setRedirectPath] = useState<string | undefined>(undefined);
  const { isAuthenticated } = useAuth();
  const lastClosedTime = useRef(0);
  const dialogClosed = useRef(false);
  
  // Close dialog if user becomes authenticated
  useEffect(() => {
    if (isAuthenticated && isDialogOpen) {
      closeAuthDialog();
      dialogClosed.current = true;
      
      // Store authentication status in sessionStorage to prevent popup from reappearing
      sessionStorage.setItem('auth_dialog_closed', 'true');
    }
  }, [isAuthenticated, isDialogOpen]);
  
  // Check session storage on mount to prevent reopening after page refresh
  useEffect(() => {
    // Only check session storage if user is authenticated
    if (isAuthenticated) {
      sessionStorage.setItem('auth_dialog_closed', 'true');
    }
  }, [isAuthenticated]);
  
  // Reset the dialogClosed flag when dialog opens
  useEffect(() => {
    if (isDialogOpen) {
      dialogClosed.current = false;
    }
  }, [isDialogOpen]);
  
  const openAuthDialog = useCallback((path?: string) => {
    // Prevent reopening if already authenticated
    if (isAuthenticated) {
      return;
    }
    
    // Check if auth dialog should be shown - only prevent if user is authenticated
    // If the user has logged out, we should show the dialog even if it was closed before
    if (sessionStorage.getItem('auth_dialog_closed') === 'true' && isAuthenticated) {
      return;
    }
    
    // Prevent rapid toggling by checking if dialog was recently closed
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
    
    // Only set session storage flag if user is authenticated
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
