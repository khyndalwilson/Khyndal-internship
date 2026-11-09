import React, { useState, useEffect } from 'react';

const ExpiryTimer = ({ expiryDate }) => {
  const [timeLeft, setTimeLeft] = useState('');

  useEffect(() => {
    if (!expiryDate) return;

    const updateTimer = () => {
      const millisLeft = expiryDate - Date.now();

      if (millisLeft < 0) {
        setTimeLeft('EXPIRED');
        return;
      }

      const hours = Math.floor((millisLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((millisLeft % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((millisLeft % (1000 * 60)) / 1000);

      setTimeLeft(`${hours}h ${minutes}m ${seconds}s`);
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);

    return () => clearInterval(interval);
  }, [expiryDate]);

  if (!expiryDate) return null;

  return (
    <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-semibold text-gray-800 border border-gray-200 shadow-sm z-10">
      {timeLeft}
    </div>
  );
};

export default ExpiryTimer;