import { useState } from "react";
import { supabase } from "@/lib/supabase/client";
import {
  Box,
  Container,
  Heading,
  SimpleGrid,
  Text,
  VStack,
} from "@chakra-ui/layout";
import { Input } from "@chakra-ui/input";
import { Button } from "@chakra-ui/button";

export default function Auth({}) {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");

  const handleLogin = async (email: string) => {
    try {
      setLoading(true);
      const { error, user } = await supabase.auth.signIn({ email });
      if (error) throw error;
      console.log("user", user);
      alert("Check your email for the login link!");
    } catch (error) {
      console.log("Error thrown:", (error as Error).message);
      alert(
        (error as { error_description?: string }).error_description ||
          (error as Error).message
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxW="container.lg">
      <SimpleGrid columns={2}>
        <VStack align="stretch">
          <Heading>Supabase Auth + Storage</Heading>
          <Text>
            Experience our Auth and Storage through a simple profile management
            example. Create a user profile and upload an avatar image. Fast,
            simple, secure.
          </Text>
        </VStack>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleLogin(email);
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
    </Container>
  );
}
