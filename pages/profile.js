import { useState, useEffect } from 'react';
import { useAuth } from '../hooks/useAuth';
import { getUserAudios } from '../utils/audio';
import AudioPlayer from '../components/AudioPlayer';

export default function Profile() {
  const { user } = useAuth();
  const [userAudios, setUserAudios] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserAudios = async () => {
      if (user) {
        try {
          const audios = await getUserAudios(user.id);
          setUserAudios(audios);
        } catch (error) {
          console.error('Error fetching user audios:', error);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchUserAudios();
  }, [user]);

  if (!user) {
    return <div>Please log in to view your profile.</div>;
  }

  if (loading) {
    return <div>Loading profile...</div>;
  }

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold">Your Profile</h1>
      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4">User Information</h2>
        <p><strong>Name:</strong> {user.name}</p>
        <p><strong>Email:</strong> {user.email}</p>
      </div>
      <div>
        <h2 className="text-2xl font-semibold mb-4">Your Uploaded Audios</h2>
        {userAudios.length === 0 ? (
          <p>You haven't uploaded any audios yet.</p>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {userAudios.map((audio) => (
              <AudioPlayer key={audio.id} src={audio.url} title={audio.title} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}