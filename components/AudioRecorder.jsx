import { useState, useRef } from 'react';
import { FaMicrophone, FaStop } from 'react-icons/fa';

const AudioRecorder = ({ onRecordingComplete }) => {
  const [isRecording, setIsRecording] = useState(false);
  const mediaRecorder = useRef(null);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorder.current = new MediaRecorder(stream);
      const chunks = [];

      mediaRecorder.current.ondataavailable = (e) => chunks.push(e.data);
      mediaRecorder.current.onstop = () => {
        const blob = new Blob(chunks, { type: 'audio/webm' });
        onRecordingComplete(blob);
      };

      mediaRecorder.current.start();
      setIsRecording(true);
    } catch (err) {
      console.error('Error accessing microphone:', err);
    }
  };

  const stopRecording = () => {
    if (mediaRecorder.current) {
      mediaRecorder.current.stop();
      setIsRecording(false);
    }
  };

  return (
    <div className="flex items-center space-x-4">
      {isRecording ? (
        <button
          onClick={stopRecording}
          className="bg-red-500 text-white px-4 py-2 rounded-full flex items-center"
        >
          <FaStop className="mr-2" /> Stop Recording
        </button>
      ) : (
        <button
          onClick={startRecording}
          className="bg-blue-500 text-white px-4 py-2 rounded-full flex items-center"
        >
          <FaMicrophone className="mr-2" /> Start Recording
        </button>
      )}
    </div>
  );
};

export default AudioRecorder;