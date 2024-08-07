import PocketBase from 'pocketbase';
import { POCKETBASE_URL } from '../config/constants';

let pb;

// Initialize PocketBase
if (typeof window !== 'undefined') {
  // Client-side initialization
  pb = new PocketBase(POCKETBASE_URL);

  // Load auth store from local storage
  pb.authStore.onChange(() => {
    console.log('AuthStore changed');
  });
} else {
  // Server-side initialization
  pb = new PocketBase(POCKETBASE_URL);
}

export default pb;

// Helper functions

export const isLoggedIn = () => {
  return pb.authStore.isValid;
};

export const getCurrentUser = () => {
  return pb.authStore.model;
};

export const login = async (email, password) => {
  return await pb.collection('users').authWithPassword(email, password);
};

export const logout = () => {
  pb.authStore.clear();
};

export const register = async (userData) => {
  return await pb.collection('users').create(userData);
};

export const updateUser = async (id, userData) => {
  return await pb.collection('users').update(id, userData);
};

export const getAudioFiles = async (filter = '', sort = '-created') => {
  return await pb.collection('audio_files').getList(1, 50, {
    filter: filter,
    sort: sort,
  });
};

export const createAudioFile = async (audioData) => {
  return await pb.collection('audio_files').create(audioData);
};

export const updateAudioFile = async (id, audioData) => {
  return await pb.collection('audio_files').update(id, audioData);
};

export const deleteAudioFile = async (id) => {
  return await pb.collection('audio_files').delete(id);
};
export const searchUsers = async (searchTerm) => {
    return await pb.collection('users').getList(1, 10, {
      filter: `name ~ "${searchTerm}" || email ~ "${searchTerm}"`,
    });
  };