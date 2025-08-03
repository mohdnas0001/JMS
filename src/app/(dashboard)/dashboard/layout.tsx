'use client';

import * as React from 'react';
import { SessionProvider } from 'next-auth/react'; // Import SessionProvider
import { AuthGuard } from '@/components/auth/auth-guard';
import { SnackbarProvider } from 'notistack';

interface LayoutProps {
  children: React.ReactNode;
  allowedRoles: string[]; 
}

const Layout: React.FC<LayoutProps> = ({ children, allowedRoles }) => {
  return (
    <SessionProvider>
      <AuthGuard allowedRoles={allowedRoles}>
        <SnackbarProvider maxSnack={3} autoHideDuration={3000}>
          {children}
        </SnackbarProvider>
      </AuthGuard>
    </SessionProvider>
  );
};

export default Layout;
