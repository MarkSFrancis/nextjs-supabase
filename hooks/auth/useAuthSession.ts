import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase/client';

export const useAuthSession = () => {
  const [session, setSession] = useState(() => supabase.auth.session());

  useEffect(() => {
    supabase.auth.onAuthStateChange((_event, newSession) => {
      setSession(newSession);
    });
  }, []);

  return session;
};
