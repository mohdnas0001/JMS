'use client';

import * as React from 'react';

import { AuthGuard } from '@/components/auth/auth-guard';

interface LayoutProps {
  children: React.ReactNode;
  allowedRoles?: string[]; // Optional prop for allowed roles
}

const Layout: React.FC<LayoutProps> = ({ children, allowedRoles }) => {
  return <AuthGuard allowedRoles={allowedRoles}>{children}</AuthGuard>;
};

export default Layout;
