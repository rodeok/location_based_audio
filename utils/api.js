import PocketBase from 'pocketbase';

const pb = new PocketBase(process.env.NEXT_PUBLIC_POCKETBASE_URL);

export const apiClient = pb;

export const handleApiError = (error) => {
  console.error('API Error:', error);
  if (error.status === 401) {
    // Handle unauthorized error (e.g., redirect to login)
    window.location.href = '/login';
  } else {
    // Handle other errors
    throw error;
  }
};

export const get = async (endpoint, queryParams = {}) => {
  try {
    const response = await pb.send(endpoint, { method: 'GET', params: queryParams });
    return response;
  } catch (error) {
    handleApiError(error);
  }
};

export const post = async (endpoint, data) => {
  try {
    const response = await pb.send(endpoint, { method: 'POST', body: data });
    return response;
  } catch (error) {
    handleApiError(error);
  }
};

export const put = async (endpoint, data) => {
  try {
    const response = await pb.send(endpoint, { method: 'PUT', body: data });
    return response;
  } catch (error) {
    handleApiError(error);
  }
};

export const del = async (endpoint) => {
  try {
    const response = await pb.send(endpoint, { method: 'DELETE' });
    return response;
  } catch (error) {
    handleApiError(error);
  }
};