import { useEffect, useState, useCallback } from 'react';
import { useSession, signOut } from 'next-auth/react';

export const useUser = () => {
  const { data: session, status } = useSession();
  const [roles, setRoles] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchUserRoles = useCallback(() => {
    if (status !== 'authenticated' || !session?.role) {
      setIsLoading(false);
      return;
    }

    try {
      // Assuming the roles are stored in the session
      setRoles(Array.isArray(session.role) ? session.role : [session.role]);
    } catch (e) {
      console.error('Failed to retrieve user roles.', e);
      setError('Failed to retrieve user roles.');
      signOut();
    } finally {
      setIsLoading(false);
    }
  }, [session, status]);

  useEffect(() => {
    fetchUserRoles();
  }, [fetchUserRoles]);

  return { user: { accessToken: session?.accessToken, roles }, error, isLoading };
};
