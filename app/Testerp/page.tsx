'use client'

import Link from 'next/link';
import "./test.css";
import { useState } from 'react';
import Image from 'next/image';

import { MouseEvent } from 'react';

const LearnMoreModal = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleModal = (e: MouseEvent<HTMLElement>) => {
    e.preventDefault();
    setIsOpen(!isOpen);
  };



  return (
    <>
      <button className="btn1" onClick={toggleModal}>
        Learn More
      </button>

      <div className={`modal-overlay ${isOpen ? 'active' : ''}`} onClick={toggleModal}>
        <div className="modal-content" onClick={e => e.stopPropagation()}>
          <button className="modal-close" onClick={toggleModal}>×</button>
          <div className="modal-title">About NSR</div>
          <div className="modal-body">
            <p>Purposeful design tailored to your needs.</p>
          </div>
        </div>
      </div>
    </>
  );
};

// Define the Hero component
const Hero = () => {
  return (
    <div className="hero-container">
       <div className="logo-wrapper">
        <Image src="/FRANKblanc.png" className="logo2" alt="NSR Match-Box" width={50} height={50} />
      </div>
      <div className="headers">
        <Link href="/">
            Home
          </Link>
        </div>
      <Link href="mailto:danieldecembre15@gmail.com" className="objectIcon">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" width={25} height={25}>
  <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
</svg>
      </Link>
      <video className="hero-video" autoPlay loop muted>
        <source src="/go-with.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>


      {/* Hero Content */}
      <div className="hero-content">
        <h1>NSR</h1>
        <p>Purposeful design</p>
        
        {/* Call-to-Action Buttons */}
        <div className="hero-buttons">
          <LearnMoreModal />
          <Link href="/contact" className="btn2">
            BUY NOW
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Hero;