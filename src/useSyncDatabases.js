import { useEffect } from 'react';
import syncDatabases from './syncService';

export const useSyncDatabases = () => {
  useEffect(() => {
    // Call syncDatabases when the app comes back online
    const handleOnline = async () => {
      try {
        await syncDatabases();
        console.log('Data synchronized successfully');
      } catch (error) {
        console.error('Error during synchronization:', error);
      }
    };

    window.addEventListener('online', handleOnline);
    
    // Clean up the event listener when the component is unmounted
    return () => {
      window.removeEventListener('online', handleOnline);
    };
  }, []);
};
