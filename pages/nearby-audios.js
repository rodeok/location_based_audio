import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import AudioPlayer from '../components/AudioPlayer';
import { getNearbyAudios } from '../utils/audio';
import { useGeolocation } from '../hooks/useGeolocation';

export default function NearbyAudios() {
  const [audios, setAudios] = useState([]);
  const [loading, setLoading] = useState(true);
  const { location, error } = useGeolocation();

  useEffect(() => {
    const fetchNearbyAudios = async () => {
      if (location) {
        try {
          const nearbyAudios = await getNearbyAudios(location);
          setAudios(nearbyAudios);
        } catch (error) {
          toast.error('Error fetching nearby audios');
        } finally {
          setLoading(false);
        }
      }
    };

    fetchNearbyAudios();
  }, [location]);

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (loading) {
    return <div>Loading nearby audios...</div>;
  }

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold">Nearby Audios</h1>
      {audios.length === 0 ? (
        <p>No audios found in your area.</p>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {audios.map((audio) => (
            <AudioPlayer key={audio.id} src={audio.url} title={audio.title} />
          ))}
        </div>
      )}
    </div>
  );
}