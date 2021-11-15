import { supabase } from '@/lib/supabase/client';
import { Profile, PROFILES_TABLE } from '@/lib/supabase/constants';
import { useSupabaseQuery } from '../useSupabaseQuery';

export const usePublicProfiles = () => {
  const profiles = useSupabaseQuery(
    () =>
      supabase
        .from<Profile>(PROFILES_TABLE)
        .select('id, username, avatar_url, website, updated_at')
        .order('updated_at', { ascending: false }),
    []
  );

  return {
    isLoadingPublicProfiles: profiles.isLoading,
    publicProfiles: profiles.data,
    publicProfilesError: profiles.error,
  };
};
