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
  useToast,
} from "@chakra-ui/react";
import { createSessionApiResponse } from "../../types/api-reponse";

function CreateSessionForm(props: {
  mp3Blob: Blob;
  onClose: () => void;
}): JSX.Element {
  const token = useSelector((state: any) => state.auth.token);
  const [roomId, setRoomId] = useState<string>("");
  const [categoryId, setCategoryId] = useState<string>("");
  const [title, setTitle] = useState<string>("");
  const [error, setError] = useState("");
  const [apiRequestRunning, setApiRequestRunning] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const toast = useToast();

  const { mp3Blob } = props;

  const handleSession = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    try {
      e.preventDefault();
      setApiRequestRunning(true);
      const createSessionResponse = await fetch(
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
      const data =
        (await createSessionResponse.json()) as createSessionApiResponse;
      console.log(data);
      if (!data.success) {
        setError(data.message);
        return;
      }
      const sessionData = data.data.session;
      const sessionUploadUrl = data.data.uploadUrl;
      dispatch(setSession({ ...sessionData, uploadUrl: sessionUploadUrl }));

      await uploadAudio(sessionUploadUrl);
    } catch (error) {
      setError("Something went wrong");
      setApiRequestRunning(false);
    }
  };

  async function uploadAudio(uploadUrl: string) {
    setIsUploading(true);

    // const formData = new FormData();
    // formData.append("audio", mp3Blob, "audio.wav");

    let response: Response = new Response();
    try {
      response = await fetch(uploadUrl, {
        method: "PUT",
        headers: { "Content-Type": "audio/webm" },
        body: mp3Blob,
        redirect: "follow",
      });

      setIsUploading(false);

      if (response.status === 200) {
        // Show the success toast
        toast({
          title: "Upload Successful",
          description: "Your recording has been uploaded successfully.",
          status: "success",
          duration: 15000,
          isClosable: true,
          position: "top",
        });

        // Close the modal and clear the mp3Blob
        props.onClose();
        console.log("audio successfully uploaded");
      } else {
        console.log("error");
        setError("Something went wrong during upload");
      }
    } catch (error) {
      setError(error as string);
      setIsUploading(false);
    }
  }

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
              type="number"
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
            onClick={handleSession}
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
