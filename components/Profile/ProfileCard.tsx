import React, { FC } from 'react';
import { Box, Text, Wrap } from '@chakra-ui/react';
import { Profile } from '@/lib/supabase/constants';
import { Avatar } from './Avatar/Avatar';

export interface ProfileCardProps {
  profile: Profile;
}

export const ProfileCard: FC<ProfileCardProps> = (props) => {
  const lastUpdated = props.profile.updated_at ? new Date(props.profile.updated_at) : null;
  return (
    <Box border="1px" borderColor="gray.200" borderRadius="lg" boxShadow="md" p={4}>
      <Wrap align="center" spacing={4}>
        <Avatar url={props.profile.avatar_url} size={100} />
        <Box>
          <Text>{props.profile.username}</Text>
          {props.profile.website && (
            <a href={props.profile.website} target="_blank" rel="noreferrer">
              {props.profile.website}
            </a>
          )}
          <Text>
            <small>
              Last updated{' '}
              {lastUpdated
                ? `${lastUpdated.toLocaleDateString()} ${lastUpdated.toLocaleTimeString()}`
                : 'Never'}
            </small>
          </Text>
        </Box>
      </Wrap>
    </Box>
  );
};
