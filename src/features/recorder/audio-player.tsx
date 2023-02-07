import { Box } from "@chakra-ui/react";
import { useState, useEffect } from "react";

function AudioPlayer({mp3Blob}: {mp3Blob: Blob | null}){
    const [audioUrl, setAudioUrl] = useState("");

    useEffect(() => {
        if(!mp3Blob){
            return;
        }
        const url = URL.createObjectURL(mp3Blob);
        setAudioUrl(url);

        return () => URL.revokeObjectURL(url);
    }, [mp3Blob]);

    return(
        <Box>
            <audio controls src={audioUrl}/>
        </Box>
    );
}

export default AudioPlayer;