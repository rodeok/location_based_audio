import PocketBase from 'pocketbase';
import { getCurrentUser } from './auth';

const pb = new PocketBase(process.env.NEXT_PUBLIC_POCKETBASE_URL);

export const uploadAudio = async (file, location) => {
  try {
    const user = getCurrentUser();
    if (!user) throw new Error('User not authenticated');

    const formData = new FormData();
    formData.append('audio', file);
    formData.append('location', JSON.stringify(location));
    formData.append('user', user.id);

    const record = await pb.collection('audio_files').create(formData);
    return record;
  } catch (error) {
    console.error('Error uploading audio:', error);
    throw error;
  }
};

export const getNearbyAudios = async (location, radius = 5) => {
  try {
    // This is a simplified query. You may need to implement a more
    // sophisticated geospatial query depending on your backend capabilities
    const records = await pb.collection('audio_files').getList(1, 50, {
      sort: '-created',
      filter: `location.lat >= ${location.lat - radius} && location.lat <= ${location.lat + radius} && location.lng >= ${location.lng - radius} && location.lng <= ${location.lng + radius}`,
    });
    return records.items;
  } catch (error) {
    console.error('Error fetching nearby audios:', error);
    throw error;
  }
};

export const getUserAudios = async (userId) => {
  try {
    const records = await pb.collection('audio_files').getList(1, 50, {
      sort: '-created',
      filter: `user = "${userId}"`,
    });
    return records.items;
  } catch (error) {
    console.error('Error fetching user audios:', error);
    throw error;
  }
};

export const deleteAudio = async (audioId) => {
  try {
    await pb.collection('audio_files').delete(audioId);
  } catch (error) {
    console.error('Error deleting audio:', error);
    throw error;
  }
};