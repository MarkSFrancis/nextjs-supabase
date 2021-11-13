import React, { FC } from 'react';
import { Box, Text } from '@chakra-ui/react';
import { Profile } from '@/lib/supabase/constants';
import { Avatar } from './Avatar/Avatar';

export interface ProfileCardProps {
  profile: Profile;
}

export const ProfileCard: FC<ProfileCardProps> = (props) => {
  const lastUpdated = props.profile.updated_at ? new Date(props.profile.updated_at) : null;
  return (
    <Box className="profileCard">
      <Avatar url={props.profile.avatar_url} size={100} />
      <Box className="userInfo">
        <Text className="username">{props.profile.username}</Text>
        <a className="website" href={props.profile.website} target="_blank" rel="noreferrer">
          {props.profile.website}
        </a>
        <Text>
          <small>
            Last updated{' '}
            {lastUpdated
              ? `${lastUpdated.toLocaleDateString()} ${lastUpdated.toLocaleTimeString()}`
              : 'Never'}
          </small>
        </Text>
      </Box>
    </Box>
  );
};
