import { createContext, useContext } from 'react';
import { Profile } from '@/lib/supabase/constants';

export interface ProfileContext {
  profile: Profile;
}

const profileContext = createContext<ProfileContext>(undefined as unknown as ProfileContext);

export const useProfileContext = () => useContext(profileContext);

export const ProfileProvider = profileContext.Provider;
