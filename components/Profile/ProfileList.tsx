import React from 'react';
import { Box, Text } from '@chakra-ui/react';
import { ProfileCard } from './ProfileCard';
import { Profile, PROFILES_TABLE } from '@/lib/supabase/constants';
import { supabase } from '@/lib/supabase/client';
import { ProfileProvider } from './ProfileContext';
import { useSupabaseSubscriptionReducer } from '@/hooks/supabase/useSupabaseSubscriptionReducer';
import { useSupabaseSubscription } from '@/hooks/supabase/useSupabaseSubscription';

interface ProfileListProps {
  profiles: Profile[];
}

export const ProfileList = ({ profiles }: ProfileListProps) => {
  const [state, dispatch] = useSupabaseSubscriptionReducer(profiles);
  useSupabaseSubscription(() => supabase.from<Profile>(PROFILES_TABLE), dispatch, []);

  return (
    <>
      {state.length === 0 ? (
        <Text color="gray.500">There are no public profiles created yet</Text>
      ) : (
        <Box className="profileList">
          {state.map((profile) => (
            <ProfileProvider key={profile.id} value={{ profile }}>
              <ProfileCard />
            </ProfileProvider>
          ))}
        </Box>
      )}
    </>
  );
};
