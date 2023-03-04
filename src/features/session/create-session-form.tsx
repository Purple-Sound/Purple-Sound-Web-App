import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSession } from "./slice";
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
import { createSessionApiResponse } from "../../types/api-reponse";

function CreateSessionForm() {
  const token = useSelector((state) => state.auth.token);
  const [roomId, setRoomId] = useState<string>("");
  const [categoryId, setCategoryId] = useState<string>("");
  const [title, setTitle] = useState<string>("");
  const [error, setError] = useState("");
  const [apiRequestRunning, setApiRequestRunning] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    try {
      e.preventDefault();
      setApiRequestRunning(true);
      const response = await fetch(
        `${process.env.API_BASE_URL}/api/v1/session`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            roomId: parseInt(roomId),
            categoryId: parseInt(categoryId),
            title,
          }),
        }
      );
      setApiRequestRunning(false);
      const data = (await response.json()) as createSessionApiResponse;
      console.log(data);
      if (!data.success) {
        setError(data.message);
        return;
      }
      const sessionData = data.data.session;
      const sessionUploadUrl = data.data.uploadUrl;
      dispatch(setSession({ ...sessionData, uploadUrl: sessionUploadUrl }));
      navigate("/recorder");
    } catch (error) {
      setError("Something went wrong");
      setApiRequestRunning(false);
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
          <FormControl id="room" isRequired>
            <FormLabel>Room Id</FormLabel>
            <Input
              type="number"
              value={roomId}
              onChange={(event) => setRoomId(event.target.value)}
            />
          </FormControl>
          <FormControl id="category" isRequired>
            <FormLabel>Category</FormLabel>
            <Input
              type="category"
              value={categoryId}
              onChange={(event) => setCategoryId(event.target.value)}
            />
          </FormControl>
          <FormControl id="title" isRequired>
            <FormLabel>Title</FormLabel>
            <Input
              type="title"
              value={title}
              onChange={(event) => setTitle(event.target.value)}
            />
          </FormControl>
          <Button
            type="submit"
            colorScheme="blue"
            size="lg"
            fontSize="md"
            onClick={handleLogin}
            isLoading={apiRequestRunning}
            isDisabled={apiRequestRunning}
          >
            Create Session
          </Button>
        </Stack>
      </form>
    </Box>
  );
}

export default CreateSessionForm;
