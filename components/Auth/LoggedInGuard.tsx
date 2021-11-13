import { Spinner } from '@chakra-ui/react';
import { useRouter } from 'next/dist/client/router';
import React, { FC, ReactChildren, useEffect, useState } from 'react';
import { useAuthSession } from '@/lib/hooks/useAuthSession';

export interface LoggedInGuardProps {
  fallback?: ReactChildren;
}

/**
 * Only renders the children if the user is logged in. You can also use a function for the children if rendering requires the user's session information
 * @example
 * <LoggedInGuard>{session?.user?.id}</LoggedInGuard>
 * // Or use a function
 * <LoggedInGuard>{(session) => <>{session.user?.id}</>}</LoggedInGuard>
 */
export const LoggedInGuard: FC<LoggedInGuardProps> = (props) => {
  const session = useAuthSession();
  const [redirecting, setRedirecting] = useState(false);
  const { push: redirectTo } = useRouter();

  useEffect(() => {
    if (!session && !props.fallback && !redirecting) {
      setRedirecting(true);
    }
  }, [session]);

  useEffect(() => {
    if (redirecting && !session) {
      redirectTo('/auth/login');
    }
  }, [redirecting, redirectTo]);

  if (!session) {
    if (props.fallback) {
      return <>{props.fallback}</>;
    }
    setRedirecting(true);
    return <Spinner />;
  }

  if (typeof props.children === 'function') {
    return <>{props.children(session)}</>;
  }

  return <>{props.children}</>;
};
