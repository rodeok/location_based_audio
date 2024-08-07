import PocketBase from 'pocketbase';

const pb = new PocketBase("http://127.0.0.1:8090");

export const login = async (email, password) => {
  try {
    const authData = await pb.collection('users').authWithPassword(email, password);
    return authData.record;
  } catch (error) {
    console.error('Login error:', error);
    throw error;
  }
};

export const signup = async (name, email, password) => {
  try {
    const user = await pb.collection('users').create({
      name,
      email,
      password,
      passwordConfirm: password,
    });
    await login(email, password);
    return user;
  } catch (error) {
    console.error('Signup error:', error);
    throw error;
  }
};

export const logout = () => {
  pb.authStore.clear();
};

export const getCurrentUser = () => {
  return pb.authStore.model;
};

export const isAuthenticated = () => {
  return pb.authStore.isValid;
};

export const refreshSession = async () => {
  if (pb.authStore.isValid) {
    try {
      await pb.collection('users').authRefresh();
    } catch (error) {
      console.error('Session refresh error:', error);
      logout();
    }
  }
};