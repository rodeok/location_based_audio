import { useState } from 'react';
import dynamic from 'next/dynamic';
import { toast } from 'react-toastify';
import AudioRecorder from '../components/AudioRecorder';
import AudioUploader from '../components/AudioUploader';
import { useAuth } from '../hooks/useAuth';
import { uploadAudio } from '../utils/audio';

const Map = dynamic(() => import('../components/Map'), { ssr: false });

export default function Home() {
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [audioFile, setAudioFile] = useState(null);
  const { user } = useAuth();

  const handleLocationSelect = (location) => {
    setSelectedLocation(location);
  };

  const handleRecordingComplete = (blob) => {
    setAudioFile(blob);
  };

  const handleFileSelect = (file) => {
    setAudioFile(file);
  };

  const handleSubmit = async () => {
    if (!user) {
      toast.error('Please log in to upload audio');
      return;
    }

    if (!selectedLocation) {
      toast.error('Please select a location on the map');
      return;
    }

    if (!audioFile) {
      toast.error('Please record or upload an audio file');
      return;
    }

    try {
      await uploadAudio(audioFile, selectedLocation);
      toast.success('Audio uploaded successfully');
      setAudioFile(null);
      setSelectedLocation(null);
    } catch (error) {
      toast.error('Error uploading audio');
    }
  };

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold">Location-based Audio Sharing</h1>
      <Map onLocationSelect={handleLocationSelect} />
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Record or Upload Audio</h2>
        <AudioRecorder onRecordingComplete={handleRecordingComplete} />
        <AudioUploader onFileSelect={handleFileSelect} />
        <button
          onClick={handleSubmit}
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition"
        >
          Upload Audio to Selected Location
        </button>
      </div>
    </div>
  );
}