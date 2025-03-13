'use client'

import Image from "next/image";
import Link from "next/link";
import { FaInstagram, FaTiktok } from 'react-icons/fa';
import { useState, useEffect } from 'react';
import { gsap } from 'gsap'; // Import GSAP
import "./page.css";



interface ProductDetails {
  [key: string]: {
    name: string;
    images: string[];
    description: string;
    price: number;
    colors: string[];
    features: string[];
  };
}

const productDetails: ProductDetails = {
  matchbox: {
    name: "  NSR BOX",
    images: [
      "/product.jpeg",
      "/mueseum.jpeg",
      "/Functional Callouts.png",
      "/Dimensions.png"
     
    ],
    description: [ 
      "An elegant reimagination of a matchbox that marries precision industrial design with functional materiality,",
      "transforming a utilitarian object into a sophisticated hospitality accessory that elevates the ritual of fire and ambiance.",
    ],
    price: 44,
    features: [
      "Comes with 90 refillable strike anywhere matches" ,
      "Unlike traditional strike pads, this box maintains its form, giving it a never ending functionality."
    ],
  },
  nimbus: {
    name: "Nimbus",
    images: [
      "/There-once-was.png",
      "/alternate-nimbus-1.png",
      "/alternate-nimbus-2.png"
    ],
    description: "Product 2 stands out with its stunning design.",
    price: 79.99,
    colors: ['White', 'Gray'],
    features: [
      "Innovative design",
      "Multiple use cases",
      "High-end craftsmanship"
    ]
  },
  couch: {
    name: "Couch",
    images: [
      "/There-once-was.png",
      "/alternate-couch-1.png",
      "/alternate-couch-2.png"
    ],
    description: "Product 3 combines functionality and elegance.",
    price: 599.99,
    colors: ['Beige', 'Dark Gray'],
    features: [
      "Luxurious comfort",
      "Durable construction",
      "Modern aesthetic"
    ]
  }
};

export default function Home() {
  const [selectedProduct, setSelectedProduct] = useState<string>('matchbox');
  const [currentImage, setCurrentImage] = useState(0)

  // Define text constants for typing animation
  const slogan = "Objects Designed for Hospitality";
  const btnText = "Creating distinct atmospheres one object at a time.";
  const lastText = "Elevating everyday experiences";

  // GSAP animation
  useEffect(() => {
    const sloganSpans = document.querySelectorAll('.objectslogan span');
    const btnSpans = document.querySelectorAll('.objectbtn span');
    const lastSpans = document.querySelectorAll('.objectlast span');

    gsap.to(sloganSpans, {
      opacity: 1,
      duration: 0,
      stagger: 0.1,
      delay: 1,
    });

    const sloganDuration = sloganSpans.length * 0.1;
    gsap.to(btnSpans, {
      opacity: 1,
      duration: 0,
      stagger: 0.1,
      delay: 1 ,
    });

    const btnDuration = btnSpans.length * 0.1;
    gsap.to(lastSpans, {
      opacity: 1,
      duration: 0,
      stagger: 0.1,
      delay: 1 + sloganDuration + btnDuration,
    });
  }, []);

  // Dynamic product selection handler
  const handleProductChange = (productKey: string) => {
    setSelectedProduct(productKey);
    setCurrentImage(0);
    
  };

  // Buy now handler with error tracking
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
      console.error('Checkout error:', error.message);
      alert(`Unable to initiate checkout: ${error.message}. Please try again.`);
    }
  };

  const currentProduct = productDetails[selectedProduct];

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
      
<div className="objectbtn">
  {btnText.split('').map((char, index) => (
    <span key={index} style={{ opacity: 0 }}>{char}</span>
  ))}
</div>

        </div>
      </div>
      <div className="footer">

      <div className="socials">
        <a href ="https://www.instagram.com/ffrank.usa/">
        <FaInstagram/>
        </a>
        <a href ="https://www.tiktok.com/@frank__madeit">
        <FaTiktok/>
        </a>

      </div>
        
      </div>
      <video className="home-video" autoPlay loop muted playsInline >
        <source src="https://frankmadeit.s3.us-east-2.amazonaws.com/ezyZip.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

    </div>
      <section className="ProductPage">
        <div className="product-header">
          <div className="Banner">
              NSR BOX
             </div>
        </div>

        <div className="product-content">
       <div className="imageContainer">
            <Image
              key={currentProduct.images[currentImage]}
              src={currentProduct.images[currentImage]}
              alt={`${currentProduct.name}`}
              width={380}
              height={380}
              priority
              className="main-product-image"
           />
            <div className="image-thumbnails">
              {currentProduct.images.map((img, index) => (
                <Image
                  key={img}
                  src={img}
                  alt={`Thumbnail ${index + 1}`}
                  width={95}
                  height={80}
                  onClick={() => setCurrentImage(index)}
                  className={`thumbnail ${currentImage === index ? 'active-thumbnail' : ''}`}
                />
              ))}
            </div>
          </div>
          <div className="productDescription">
            <h2>{currentProduct.name}</h2>
            <p className="price">${currentProduct.price.toFixed(2)}</p>
            <div className="inspire">
              {currentProduct.description}
            </div>
            
            <ul className="product-features">
              {currentProduct.features.map((feature, index) => (
                <li key={index}>{feature}</li>
              ))}
            </ul>

            <button 
              onClick={handleBuyNow}
              className="buy-now-button"
            >
              Buy Now - ${currentProduct.price.toFixed(2)}
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
      </section>
    </>
  );
};