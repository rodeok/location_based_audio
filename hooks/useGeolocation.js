import { useState, useEffect } from 'react';

export const useGeolocation = (options = {}) => {
  const [location, setLocation] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    let mounted = true;
    let watchId;

    const onSuccess = (position) => {
      if (mounted) {
        setLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
      }
    };

    const onError = (error) => {
      if (mounted) {
        setError(error);
      }
    };

    if (!navigator.geolocation) {
      setError(new Error('Geolocation is not supported by your browser'));
    } else {
      navigator.geolocation.getCurrentPosition(onSuccess, onError, options);
      watchId = navigator.geolocation.watchPosition(onSuccess, onError, options);
    }

    return () => {
      mounted = false;
      if (watchId) {
        navigator.geolocation.clearWatch(watchId);
      }
    };
  }, [options]);

  return { location, error };
};