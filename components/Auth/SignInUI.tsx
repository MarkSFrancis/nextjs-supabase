import React, { useCallback, useState } from 'react';
import { Box, Heading, SimpleGrid, Text, VStack, Input, Button } from '@chakra-ui/react';
import { supabase } from '@/lib/supabase/client';

export const SignInUI = () => {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');

  const handleLogin = useCallback(async () => {
    try {
      setLoading(true);
      let redirectTo: string | undefined;
      if (window.location.host === 'localhost:3000') {
        redirectTo = 'http://localhost:3000';
      }

      const { error, user } = await supabase.auth.signIn({ email }, { redirectTo });
      if (error) throw error;
      console.info('user', user);
    } catch (error) {
      console.error((error as Error).message);
      alert(
        (error as { error_description?: string }).error_description || (error as Error).message
      );
    } finally {
      setLoading(false);
    }
  }, [email]);

  return (
    <SimpleGrid spacing={4} minChildWidth="250px">
      <VStack align="stretch">
        <Heading>NextJS + Supabase</Heading>
        <Text>
          This NextJS app demoes the Supabase Auth and Storage through a simple profile management
          example. Create a user profile and upload an avatar image. Fast, simple, secure.
        </Text>
      </VStack>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleLogin();
        }}
      >
        <VStack align="stretch">
          <Text>Sign in via magic link with your email below</Text>
          <Box>
            <Input
              className="inputField"
              type="email"
              placeholder="Your email"
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Box>
          <Box>
            <Button type="submit" isLoading={loading}>
              Send magic link
            </Button>
          </Box>
        </VStack>
      </form>
    </SimpleGrid>
  );
};
