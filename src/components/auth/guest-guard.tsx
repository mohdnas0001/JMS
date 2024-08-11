'use client';

import * as React from 'react';
import { useRouter } from 'next/navigation';

import { paths } from '@/paths';
import { useUser } from '@/hooks/use-user';

type DashboardPath =
  | typeof paths.dashboard.author.overview
  | typeof paths.dashboard.chiefEditor.overview
  | typeof paths.dashboard.reviewer.overview;

const GuestGuard: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, isLoading } = useUser();
  const router = useRouter();

  React.useEffect(() => {
    if (isLoading) return; // Wait until loading is complete

    if (user.accessToken) {
      console.debug('[GuestGuard]: User is logged in, redirecting to dashboard');

      // Determine the redirect path based on the user role
      let redirectPath: DashboardPath = paths.dashboard.author.overview; // default to author dashboard

      if (user.roles.includes('editor')) {
        redirectPath = paths.dashboard.chiefEditor.overview;
      } else if (user.roles.includes('reviewer')) {
        redirectPath = paths.dashboard.reviewer.overview;
      }

      // Redirect to the appropriate dashboard
      router.replace(redirectPath);
    }
  }, [user, isLoading, router]);

  if (isLoading || user.accessToken) {
    // Maybe render a loading state or nothing until redirect completes
    return null;
  }

  return <>{children}</>;
};

export default GuestGuard;
