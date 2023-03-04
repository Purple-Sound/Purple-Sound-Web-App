import { useState } from "react";
import { useDispatch } from "react-redux";
import { setToken } from "./slice";
import { useNavigate } from "react-router-dom";
import {
  Alert,
  AlertIcon,
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Stack,
} from "@chakra-ui/react";
import { loginApiResponse } from "../../types/api-reponse";

function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    try {
      e.preventDefault();
      setIsLoggingIn(true);
      const response = await fetch(
        `${process.env.API_BASE_URL}/api/v1/auth/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
        }
      );
      setIsLoggingIn(false);
      const data = (await response.json()) as loginApiResponse;
      console.log(data);
      if (!data.success) {
        setError(data.message);
        return;
      }
      const token = data.data.token;
      dispatch(setToken(token));
      navigate("/recorder");
    } catch (error) {
      setError("Something went wrong");
      setIsLoggingIn(false);
    }
  };

  return (
    <Box p={8} maxWidth="500px" borderWidth={1} borderRadius={8} boxShadow="lg">
      <form>
        <Stack spacing={4}>
          {error && (
            <Alert status="error">
              <AlertIcon />
              {error}
            </Alert>
          )}
          <FormControl id="email" isRequired>
            <FormLabel>Email address</FormLabel>
            <Input
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />
          </FormControl>
          <FormControl id="password" isRequired>
            <FormLabel>Password</FormLabel>
            <Input
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
          </FormControl>
          <Button
            type="submit"
            colorScheme="blue"
            size="lg"
            fontSize="md"
            onClick={handleLogin}
            isLoading={isLoggingIn}
            isDisabled={isLoggingIn}
          >
            Login
          </Button>
        </Stack>
      </form>
    </Box>
  );
}

export default LoginForm;
