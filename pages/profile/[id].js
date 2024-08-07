import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';
import { getUserById, getAudioFiles } from '../../lib/pocketbase';
import AudioPlayer from '../../components/AudioPlayer';
import { useGeolocation } from '../../hooks/useGeolocation';
import { isWithinRadius } from '../../utils/location';

const UserProfile = () => {
  const router = useRouter();
  const { id } = router.query;
  const [user, setUser] = useState(null);
  const [audios, setAudios] = useState([]);
  const { location: userLocation } = useGeolocation();

  useEffect(() => {
    const fetchUserAndAudios = async () => {
      if (id) {
        try {
          const userData = await getUserById(id);
          setUser(userData);
          const audioData = await getAudioFiles(`user = "${id}"`);
          setAudios(audioData.items);
        } catch (error) {
          console.error('Error fetching user data:', error);
          toast.error('Error loading user profile');
        }
      }
    };

    fetchUserAndAudios();
  }, [id]);

  const handlePlayAudio = (audio) => {
    if (userLocation && audio.location) {
      const audioLocation = JSON.parse(audio.location);
      if (isWithinRadius(userLocation, audioLocation, 0.1)) { // 0.1 km radius (about 100 meters)
        // Allow playing the audio
        return true;
      } else {
        toast.error('You must be in the exact location to access this audio file');
        return false;
      }
    } else {
      toast.error('Unable to determine your location or audio location');
      return false;
    }
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">{user.name}'s Profile</h1>
      <p className="mb-8">Email: {user.email}</p>
      <h2 className="text-2xl font-semibold mb-4">Uploaded Audios</h2>
      {audios.length === 0 ? (
        <p>No audios uploaded yet.</p>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {audios.map((audio) => (
            <AudioPlayer
              key={audio.id}
              src={audio.url}
              title={audio.title}
              onPlay={() => handlePlayAudio(audio)}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default UserProfile;