import React, { useEffect, useReducer } from 'react';
import ProfileCard from '@/components/ProfileCard';
import { Profile } from '@/lib/supabase/constants';
import { supabase } from '@/lib/supabase/client';

/**
 * Since we want this component to update in realtime,
 * we should use "useReducer" for sending Realtime events
 */

type State = {
  profiles: Profile[];
};
type Action = {
  type?: string;
  payload: any;
};
type ProfileListProps = {
  profiles: Profile[];
};

const handleDatabaseEvent = (state: State, action: Action) => {
  if (action.type === 'upsert') {
    // eslint-disable-next-line eqeqeq
    const otherProfiles = state.profiles.filter((x) => x.id != action.payload.id);
    return {
      profiles: [action.payload, ...otherProfiles],
    };
  }
  if (action.type === 'set') {
    return {
      profiles: action.payload,
    };
  }
  return { profiles: [] };
};

export default function ProfileList({ profiles }: ProfileListProps) {
  const initialState: State = { profiles };
  const [state, dispatch] = useReducer(handleDatabaseEvent, initialState);

  useEffect(() => {
    const subscription = supabase
      .from('profiles')
      .on('*', (payload) => {
        dispatch({ type: 'upsert', payload: payload.new });
      })
      .subscribe();

    return () => {
      supabase.removeSubscription(subscription);
    };
  }, []);

  useEffect(() => {
    dispatch({ type: 'set', payload: profiles });
  }, [profiles]);

  return (
    <>
      {state.profiles.length === 0 ? (
        <p className="opacity-half font-light m-0">There are no public profiles created yet</p>
      ) : (
        <div className="profileList">
          {state.profiles?.map((profile: any) => (
            <ProfileCard profile={profile} key={profile.id} />
          ))}
        </div>
      )}
    </>
  );
}
