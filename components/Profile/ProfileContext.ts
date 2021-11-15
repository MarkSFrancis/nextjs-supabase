import { createContext, useContext } from 'react';
import { Profile } from '@/lib/supabase/constants';

export interface ProfileContext {
  profile: Profile;
}

const profileContext = createContext<ProfileContext>(undefined as any);

export const useProfileContext = () => useContext(profileContext);

export interface ProfileProviderProps {
  userId: string;
}

export const ProfileProvider = profileContext.Provider;
