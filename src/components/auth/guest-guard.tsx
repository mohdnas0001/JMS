// GuestGuard.tsx
'use client';

import * as React from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';

import { paths } from '@/paths';

type DashboardPath =
  | typeof paths.dashboard.author.overview
  | typeof paths.dashboard.chiefEditor.overview
  | typeof paths.dashboard.reviewer.overview;

const GuestGuard: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { data: session, status } = useSession();
  const router = useRouter();

  React.useEffect(() => {
    if (status === 'loading') return; // Wait until loading is complete

    if (session) {
      console.debug('[GuestGuard]: User is logged in, redirecting to dashboard');

      // Determine the redirect path based on the user role
      let redirectPath: DashboardPath = paths.dashboard.author.overview; // default to author dashboard

      if (session.role === 'editor') {
        redirectPath = paths.dashboard.chiefEditor.overview;
      } else if (session.role === 'reviewer') {
        redirectPath = paths.dashboard.reviewer.overview;
      }

      // Redirect to the appropriate dashboard
      router.replace(redirectPath);
    }
  }, [session, status, router]);

  if (status === 'loading' || session) {
    // Render loading or nothing until redirect completes
    return null;
  }

  return <>{children}</>;
};

export default GuestGuard;
