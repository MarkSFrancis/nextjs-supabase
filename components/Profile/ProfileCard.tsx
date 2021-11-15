import React, { FC } from 'react';
import { Box, Text, Wrap } from '@chakra-ui/react';
import { useProfileContext } from './ProfileContext';
import { ProfileAvatar } from './ProfileAvatar';
import { Card } from '../Card/Card';

export const ProfileCard: FC = () => {
  const { profile } = useProfileContext();

  const lastUpdated = profile.updated_at ? new Date(profile.updated_at) : null;
  return (
    <Card p={4}>
      <Wrap align="center" spacing={4}>
        <ProfileAvatar size="lg" />
        <Box>
          <Text>{profile.username}</Text>
          {profile.website && (
            <a href={profile.website} target="_blank" rel="noreferrer">
              {profile.website}
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
    </Card>
  );
};
