import { supabase } from '@/lib/supabase/client';
import { Profile } from '@/lib/supabase/constants';
import { useAuthSession } from '../auth/useAuthSession';
import { useSupabaseQuery } from '../useSupabaseQuery';

export const useSessionProfile = () => {
  const session = useAuthSession();

  const sessionProfile = useSupabaseQuery(
    (client) => {
      const user = supabase.auth.user();

      return (
        client
          .from<Profile>('profiles')
          .select('username, website, avatar_url')
          // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
          .eq('id', user!.id)
          .single()
      );
    },
    [session]
  );

  return {
    isLoadingSessionProfile: sessionProfile.isLoading,
    sessionProfile: sessionProfile.data,
    sessionProfileError: sessionProfile.error,
  };
};
