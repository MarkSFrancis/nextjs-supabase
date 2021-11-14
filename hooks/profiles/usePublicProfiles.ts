import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase/client';
import { Profile } from '@/lib/supabase/constants';

export const usePublicProfiles = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<unknown>();
  const [profiles, setProfiles] = useState<Profile[] | undefined>();

  async function getPublicProfiles() {
    try {
      setIsLoading(true);

      const { data, error: supabaseError } = await supabase
        .from<Profile>('profiles')
        .select('id, username, avatar_url, website, updated_at')
        .order('updated_at', { ascending: false });

      if (supabaseError || !data) {
        setError(supabaseError ?? 'No data');
      }

      setProfiles(data ?? undefined);
    } catch (ex) {
      setError(ex);
      console.error('error', (ex as Error).message);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    getPublicProfiles();
  }, []);

  return {
    isLoadingPublicProfiles: isLoading,
    publicProfiles: profiles,
    publicProfilesError: error,
  };
};
