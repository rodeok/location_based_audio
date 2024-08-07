// API and Backend
export const POCKETBASE_URL = process.env.NEXT_PUBLIC_POCKETBASE_URL || 'http://localhost:8090';

// Authentication
export const TOKEN_KEY = 'auth_token';
export const USER_KEY = 'current_user';

// Geolocation
export const DEFAULT_LOCATION = { lat: 40.7128, lng: -74.0060 }; // New York City
export const DEFAULT_RADIUS = 5; // in kilometers

// Audio
export const MAX_AUDIO_DURATION = 300; // 5 minutes in seconds
export const ALLOWED_AUDIO_TYPES = ['audio/mpeg', 'audio/wav', 'audio/webm'];
export const MAX_AUDIO_SIZE = 10 * 1024 * 1024; // 10MB

// Pagination
export const ITEMS_PER_PAGE = 20;

// Map
export const MAP_ZOOM_LEVEL = 13;

// Toasts
export const TOAST_DURATION = 3000; // 3 seconds

// Date format
export const DATE_FORMAT = 'MMMM dd, yyyy HH:mm';

// Routes
export const ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  SIGNUP: '/signup',
  PROFILE: '/profile',
  NEARBY_AUDIOS: '/nearby-audios',
};

// Collections
export const COLLECTIONS = {
  USERS: 'users',
  AUDIO_FILES: 'audio_files',
};