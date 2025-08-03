import * as React from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import Alert from '@mui/material/Alert';

import { paths } from '@/paths';
import { logger } from '@/lib/default-logger';

export interface AuthGuardProps {
  children: React.ReactNode;
  allowedRoles?: string[]; 
}

export function AuthGuard({ children, allowedRoles }: AuthGuardProps): React.JSX.Element | null {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [isChecking, setIsChecking] = React.useState<boolean>(true);

  const checkPermissions = async (): Promise<void> => {
    if (status === 'loading') {
      return;
    }

    if (status === 'unauthenticated') {
      logger.debug('[AuthGuard]: User is not logged in, redirecting to sign in');
      router.replace(paths.auth.signIn);
      return;
    }

    const userRole = session?.role ?? '';

    if (allowedRoles && !allowedRoles.includes(userRole)) {
      logger.debug('[AuthGuard]: User does not have the required roles, redirecting to not authorized page');
      router.replace(paths.errors.notAuthorized); 
      return;
    }

    setIsChecking(false);
  };

  React.useEffect(() => {
    checkPermissions().catch(() => {
    });
  }, [session, status]);

  if (isChecking || status === 'loading') {
    return null;
  }

  if (status === 'unauthenticated') {
    return <Alert color="error">You are not authenticated</Alert>;
  }

  return <>{children}</>;
}
