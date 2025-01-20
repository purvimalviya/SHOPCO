import React, { useEffect, useState } from 'react';

const OnlineOfflineButton: React.FC = () => {
  const [isOnline, setIsOnline] = useState<boolean>(navigator.onLine);

  const checkOnlineStatus = async () => {
    try {
      const response = await fetch('https://httpbin.org/status/200', { method: 'HEAD', cache: 'no-cache' });

      if (response.ok) {
        setIsOnline(true); 
      } else {
        setIsOnline(false); 
      }
    } catch (error) {
      setIsOnline(false); 
    }
  };

  useEffect(() => {
    checkOnlineStatus();

    const handleOnline = () => {
      console.log('Online!');
      checkOnlineStatus(); 
    };

    const handleOffline = () => {
      console.log('Offline!');
      setIsOnline(false); 
    };

    const intervalId = setInterval(() => {
      checkOnlineStatus();
    }, 5000); 

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      clearInterval(intervalId); 
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  return (
    <div
      className={`fixed bottom-5 right-5 px-5 py-3 text-sm font-semibold text-white rounded-full shadow-lg transition-colors z-50 ${
        isOnline ? 'bg-gray-400' : 'bg-gray-600'
      }`}
    >
      {isOnline ? '🟢 Online' : '🔴 Offline'}
    </div>
  );
};

export default OnlineOfflineButton;
