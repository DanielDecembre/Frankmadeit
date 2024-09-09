'use client'
import React, { useEffect, useState, useMemo, useCallback } from 'react';
import './film.css';

const ComingSoonPage = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    milliseconds: 0,
  });

  const calculateTimeLeft = useCallback(() => {
    const launchDate = new Date("2024-12-31T00:00:00").getTime();
    const now = new Date().getTime();
    const difference = launchDate - now;

    if (difference < 0) {
      return { days: 0, hours: 0, minutes: 0, seconds: 0, milliseconds: 0 };
    }

    return {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
      minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
      seconds: Math.floor((difference % (1000 * 60)) / 1000),
      milliseconds: Math.floor((difference % 1000) / 10),
    };
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 100); // Update every 100ms

    return () => clearInterval(timer);
  }, [calculateTimeLeft]);

  const formattedTime = useMemo(() => ({
    days: String(timeLeft.days).padStart(2, '0'),
    hours: String(timeLeft.hours).padStart(2, '0'),
    minutes: String(timeLeft.minutes).padStart(2, '0'),
    seconds: String(timeLeft.seconds).padStart(2, '0'),
    milliseconds: String(timeLeft.milliseconds).padStart(2, '0'),
  }), [timeLeft]);

  return (
    <div className="coming-soon-page">
       <img src='/FRANKblanc.png' alt="Logo" className="logo" />
      <div className="content">
        <h1 className="title">COMING SOON</h1>
        <p className="subtitle">Films by Frank</p>
        <div className="countdown">
          <div className="time-unit">
            <span className="value">{formattedTime.days}</span>
            <span className="label">days</span>
          </div>
          <span className="separator">:</span>
          <div className="time-unit">
            <span className="value">{formattedTime.hours}</span>
            <span className="label">hours</span>
          </div>
          <span className="separator">:</span>
          <div className="time-unit">
            <span className="value">{formattedTime.minutes}</span>
            <span className="label">minutes</span>
          </div>
          <span className="separator">:</span>
          <div className="time-unit">
            <span className="value">{formattedTime.seconds}</span>
            <span className="label">seconds</span>
          </div>
          <span className="separator">.</span>
          <div className="time-unit">
            <span className="value milliseconds">{formattedTime.milliseconds}</span>
            <span className="label">centisec</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ComingSoonPage;