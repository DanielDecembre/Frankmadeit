'use client'

import Image from "next/image";
import Link from "next/link";
import { FaInstagram, FaTiktok } from 'react-icons/fa';
import { useState } from 'react';
import "./page.css";

interface ProductDetails {
  [key: string]: {
    name: string;
    images: string[];
    description: string[];
    price: number;
    features: string[];
  };
}

const productDetails: ProductDetails = {
  matchbox: {
    name: "NSR BOX",
    images: [
      "/product.jpeg",
      "/mueseum.jpeg",
      "/Functional Callouts.png",
      "/Dimensions.png"
    ],
    description: [
      "An elegant reimagination of a matchbox that marries precision industrial design with functional materiality,",
      "transforming a utilitarian object into a sophisticated hospitality accessory that elevates the ritual of fire and ambiance."
    ],
    price: 44,
    features: [
      "Comes with 90 refillable strike anywhere matches",
      "Unlike traditional strike pads, this box maintains its form, giving it a never ending functionality."
    ],
  }
};

export default function Home() {
  const [currentImage, setCurrentImage] = useState(0);
  const currentProduct = productDetails['matchbox'];

  const slogan = "Objects Designed for Hospitality";

  const lastText = "Elevating everyday experiences";

  const handleBuyNow = async () => {
    try {
      const response = await fetch('/api/square-checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          price: currentProduct.price,
          productName: currentProduct.name,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'API request failed');
      }

      const data = await response.json();
      
      if (data.checkoutUrl) {
        window.location.href = data.checkoutUrl;
      } else {
        throw new Error('No checkout URL received');
      }
    } catch (error) {
      console.error('Checkout error:', error);
      const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
      alert(`Unable to initiate checkout: ${errorMessage}. Please try again.`);
    }
  };

  return (
    <>
      <div className="main_container">
       <div className="home_wrapper">
        <Image src="/FRANKblanc.png" className="homeLogo" alt="NSR Match-Box" width={100} height={100} />
       <div className="headers">
        <Link href="/">
            Home
          </Link>
        </div>
        <Link href="mailto:frank.frankmademe@gmail.com" className="icon">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" width={25} height={25}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
      </svg>
      </Link>
        <div className="object_container">
          <div className="object_btn_container">
            <div className="object_btn_text"> Creating distinct atmospheres one object at a time.</div>
          </div>
        </div>
      </div>
      <div className="footer">
        <div className="socials"></div>
      </div>
      <video className="home-video" autoPlay loop muted playsInline >
        <source src="https://frankmadeit.s3.us-east-2.amazonaws.com/ezyZip.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      </div>

      <section className="Ourstory">
        <div className="story-header-container">
          <div className="navbar">
            <div className="header-L">
              <div className="left-title">
                <Image
                  src="/NSR-logo.png"
                  alt=""
                  width={95}
                  height={140}
                  className="brand-logo"/>
              </div>
            </div>
          </div>
          <div className="navbar2">
          <Link href="/">Home</Link>
          <div onClick={() => document.getElementById('purchase-section')?.scrollIntoView({ behavior: 'smooth' })}>
            Shop
            </div>
          </div>
          <div className="center-title">
            - NSR MATCHBOX -
          </div>
        </div>
        
        <div className="story-body">
          <div className="story-body-container">
            <Image
              src="/productflagship.png"
              alt="fire"
              width={400}
              height={500}
              className="fire-image"/>
            <div className="story-description">
              <h2> Origin - </h2>
              <p className="context">
                The word NSR or fire had been mentioned in
                ancient Egyptian texts in different fonus.
                The discovery of fire was considered as the
                first step toward civilzation. Revolutionizing
                many aspects of life including how we gather.
              </p>
            </div>
          </div>
          <div className="gallery-section">
            <div className="description">
            <p className="function-description1">
              Reduced CO2 emissions:
              Recycled PETG significantly reduce CO2 emissions.
              Releases 56% less CO2 compared to pure PETG.
            </p>
            <p className="function-description2">
              Durability:
              Carbon fiber PETG is strong and durable, leading to
              longer-lasting products and potentially less waste
              </p>
              </div>
            <div className="functionality">
              <Image
                src="/Functional Callouts.png"
                alt="fire"
                width={460}
                height={490}
                className="functional-image"/>
            </div>
          </div>
          <div className="Purchase-page">
            <div className="purchase-left">
              <Image
                src="/mueseum.png"
                alt="fire"
                width={460}
                height={490}
                className="mueseum-image"/>
              <div className="p-image-description">
                <p className="bullet-1">
                  2025 
                </p>
              </div>
            </div>
            <div className="purchase-right" id="purchase-section">
              <div className="right-title">
                <h2>NSR Matchbox</h2>
              </div>
              <div className="right-price">
                <h3>$44.00</h3>
              </div>
              <p className="right-description">
                An elegant reimagination of a matchbox that marries precision industrial design with functional materiality, transforming a utilitarian object into a sophisticated hospitality accessory that elevates the ritual of fire and ambiance.
              </p>
              <ul className="right-list">
                <li>Comes with 90 refillable strike anywhere matches</li>
                <li>Unlike traditional strike pads, this box maintains its form, giving it a never ending functionality.</li>
              </ul>
              <button onClick={handleBuyNow} className="right-purchase">
                Buy Now
              </button>
            </div>
          </div>
          <div className="productFooter">
          <a href="https://www.instagram.com/ffrank.usa/">
            <FaInstagram/>
          </a>
          <a href="https://www.tiktok.com/@frank__madeit">
            <FaTiktok/>
          </a>
        </div>
        <div className="trademark2">
          <p>© 2023 Frank - All rights reserved.™</p>
        </div>
        </div>
        
      </section>
    </>
  );
};