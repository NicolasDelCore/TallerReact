import React, { useState, useEffect } from 'react';

const Countdown = ({ targetDate }) => {
  const calculateTimeLeft = () => {
    const difference = +new Date(targetDate) - +new Date();
    let timeLeft = {};

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60)
      };
    }

    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearTimeout(timer);
  });

  return (
    <div className="countdown-container">
    <h4 className="text-center">Dias y Horas para fijar nueva meta:</h4>
    <div className="text-center">
      {timeLeft.days > 0 && (
        <p className="countdown-item">
          <span className="countdown-value">{timeLeft.days}</span> dias
        </p>
      )}
      <p className="countdown-item">
        <span className="countdown-value">{timeLeft.hours}</span> horas
      </p>
      <p className="countdown-item">
        <span className="countdown-value">{timeLeft.minutes}</span> minutos
      </p>
      <p className="countdown-item">
        <span className="countdown-value">{timeLeft.seconds}</span> segundos
      </p>
    </div>
  </div>
  );
};

export default Countdown;
