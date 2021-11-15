import { Profile } from '@/lib/supabase/constants';
import { useSupabaseQuery } from '../useSupabaseQuery';

export const usePublicProfiles = () => {
  const profiles = useSupabaseQuery(
    (client) =>
      client
        .from<Profile>('profiles')
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
