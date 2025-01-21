'use client'

import Image from "next/image";
import Link from "next/link";
import { FaInstagram } from 'react-icons/fa'
import { FaTiktok } from 'react-icons/fa'
import "./page.css";
import { useState } from 'react';



const products = {
  product1: {
    image: "/There-once-was.png",
    description: "Product 1 is an amazing item that elevates any setting.",
  },
  product2: {
    image: "/There-once-was.png",
    description: "Product 2 stands out with its stunning design.",
  },
  product3: {
    image: "/There-once-was.png",
    description: "Product 3 combines functionality and elegance.",
  },
};

export default function Home() {
  const [selectedProduct, setSelectedProduct] = useState("product1");
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
  
        < div className="objectslogan">
        Objects Designed for Hospitality
      </div>
        <div className="objectbtn">
        Creating distinct atmospheres one object at a time 
          </div>
          <div>
          Elevating everyday experiences  
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
        <div className="trademark">
          <p> © 2023 Frank - All rights reserved.™ </p>
        </div>
      </div>
      <video className="home-video" autoPlay loop muted playsInline >
        <source src="https://frankmadeit.s3.us-east-2.amazonaws.com/ezyZip.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

    </div>
    <section className="ProductPage">
    <div className="pageSelector">
    <select onChange={(e) => setSelectedProduct(e.target.value)} className="dropdown">
            <option value="product1"> Matchbox </option>
            <option value="product2"> Nimbus </option>
            <option value="product3"> Couch </option>
          </select>
    </div>
    <div className="productContent">
      <div className="imageContainer">
        <Image
         src={products[selectedProduct].image}
         alt={selectedProduct}
         width={300}
         height={300}/>
      </div>
      <div className="productDescription">
        {products[selectedProduct].description}
      </div>
      <div className="productFooter">
      <a href ="https://www.instagram.com/ffrank.usa/">
        <FaInstagram/>
        </a>
        <a href ="https://www.tiktok.com/@frank__madeit">
        <FaTiktok/>
        </a>
      </div>
      <div className="trademark2">
          <p> © 2023 Frank - All rights reserved.™ </p>
      </div>
    </div>
    </section>
    </>
  );
}

