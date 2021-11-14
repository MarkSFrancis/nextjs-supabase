import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase/client';
import { Profile } from '@/lib/supabase/constants';
import { useAuthSession } from '../auth/useAuthSession';

export const useSessionProfile = () => {
  const session = useAuthSession();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<unknown>();
  const [profile, setProfile] = useState<Profile | undefined>();

  async function getProfile() {
    try {
      setIsLoading(true);
      const user = supabase.auth.user();

      const { data, error: supabaseError } = await supabase
        .from('profiles')
        .select('username, website, avatar_url')
        .eq('id', user!.id)
        .single();

      if (supabaseError) {
        throw supabaseError;
      }

      setProfile(data);
    } catch (ex) {
      setError(ex);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    getProfile();
  }, [session]);

  return {
    isLoadingSessionProfile: isLoading,
    sessionProfile: profile,
    sessionProfileError: error,
  };
};
