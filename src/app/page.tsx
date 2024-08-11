'use client';

import { redirect } from 'next/navigation';

import { paths } from '@/paths';
import { useUser } from '@/hooks/use-user';

export default function Page(): never {
  const { user } = useUser();

  if (user?.accessToken) {
    // Determine the redirect path based on the user's role
    if (user.roles.includes('editor')) {
      redirect(paths.dashboard.editor.overview);
    } else if (user.roles.includes('reviewer')) {
      redirect(paths.dashboard.reviewer.overview);
    } else {
      redirect(paths.dashboard.author.overview); // Default to author dashboard
    }
  } else {
    // If the user is not authenticated, redirect to the sign-in page
    redirect(paths.auth.signIn);
  }

  // Just in case this is called in a non-authenticated environment, we prevent the component from rendering anything.
  throw new Error('This page should not render.');
}
