
import { useState, useEffect, useCallback, useRef } from 'react';
import { useAuth } from '@/contexts/AuthContext';

export const useAuthDialog = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [redirectPath, setRedirectPath] = useState<string | undefined>(undefined);
  const { isAuthenticated } = useAuth();
  const lastClosedTime = useRef(0);
  const hasBeenAuthenticated = useRef(isAuthenticated);
  
  // Track when authentication state changes
  useEffect(() => {
    // If user becomes authenticated and dialog is open, close it
    if (isAuthenticated && isDialogOpen) {
      closeAuthDialog();
    }
    
    // Store auth state in session storage to prevent repeated popups
    if (isAuthenticated && !hasBeenAuthenticated.current) {
      sessionStorage.setItem('auth_dialog_closed', 'true');
    }
    
    // Update the ref when auth state changes
    hasBeenAuthenticated.current = isAuthenticated;
  }, [isAuthenticated, isDialogOpen]);
  
  const openAuthDialog = useCallback((path?: string) => {
    // Don't open if already authenticated
    if (isAuthenticated) {
      // If authenticated and path is provided, redirect directly
      if (path) {
        window.location.href = path;
      }
      return;
    }
    
    // Don't open if dialog was just closed to prevent flashing
    const now = Date.now();
    if (now - lastClosedTime.current < 1000) {
      return;
    }
    
    // Check if we've shown the dialog in this session and user closed it
    // This prevents the dialog from appearing repeatedly for authenticated users
    if (sessionStorage.getItem('auth_dialog_closed') === 'true') {
      return;
    }
    
    // Set the redirect path if provided
    if (path) {
      setRedirectPath(path);
    }
    
    // Open the dialog
    setIsDialogOpen(true);
  }, [isAuthenticated]);
  
  const closeAuthDialog = useCallback(() => {
    setIsDialogOpen(false);
    setRedirectPath(undefined);
    lastClosedTime.current = Date.now();
    
    // Mark the dialog as closed in this session
    sessionStorage.setItem('auth_dialog_closed', 'true');
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
