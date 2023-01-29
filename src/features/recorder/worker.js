import lamejs from 'lamejs';

// excerpt from lamejs documentation
onmessage = event => {
    const channels = 1; //1 for mono or 2 for stereo
    const sampleRate = 44100; //44.1khz (normal mp3 samplerate)
    const kbps = 128; //encode 128kbps mp3
    const mp3encoder = new lamejs.Mp3Encoder(channels, sampleRate, kbps);
    const mp3Data = [];

    const samples = event.data.audioData; //one second of silence (get your data from the source you have)
    const sampleBlockSize = 1152; //can be anything but make it a multiple of 576 to make encoders life easier

    for (let i = 0; i < samples.length; i += sampleBlockSize) {
    const sampleChunk = samples.subarray(i, i + sampleBlockSize);
    const mp3buf = mp3encoder.encodeBuffer(sampleChunk);
        if (mp3buf.length > 0) {
        mp3Data.push(mp3buf);
        }
    }
    const mp3buf = mp3encoder.flush();   //finish writing mp3

    if (mp3buf.length > 0) {
        mp3Data.push(new Int8Array(mp3buf));
    }

    const blob = new Blob(mp3Data, {type: 'audio/mp3'});
    
    postMessage(blob);

}