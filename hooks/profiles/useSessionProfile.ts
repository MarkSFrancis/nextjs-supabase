import { supabase } from '@/lib/supabase/client';
import { Profile, PROFILES_TABLE } from '@/lib/supabase/constants';
import { useAuthSession } from '../auth/useAuthSession';
import { useSupabaseQuery } from '../supabase/useSupabaseQuery';

export const useSessionProfile = () => {
  const session = useAuthSession();

  const sessionProfile = useSupabaseQuery(() => {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const user = supabase.auth.user()!;

    return supabase
      .from<Profile>(PROFILES_TABLE)
      .select('username, avatar_url')
      .eq('id', user.id)
      .single();
  }, [session]);

  return sessionProfile;
};
