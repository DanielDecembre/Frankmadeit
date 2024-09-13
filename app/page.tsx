'use client'

import "./page.css";
import Nav from './Components/Nav/nav';
import React, { useState } from 'react';

export default function Home() {
  const [isMuted, setIsMuted] = useState(true);

  const toggleMute = () => {
    setIsMuted(!isMuted);
    // You'll need to implement a way to actually mute/unmute the iframe here
  };

  return (
    <div className="main-container">
      <Nav />
      <div className="video-container">
        <div className="video-wrapper">
        <iframe
  src="https://www.youtube.com/embed/IWSNxeRBzu4?autoplay=1&mute=1&controls=0&rel=0&modestbranding=1&loop=1&playlist=IWSNxeRBzu4"
  title="YouTube video player"
  frameBorder="0"
  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
  allowFullScreen={true}
></iframe>
          {isMuted && (
            <button className="unmute-button" onClick={toggleMute}>
              Unmute
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

