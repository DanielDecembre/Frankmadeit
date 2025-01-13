'use client'

import Image from "next/image";
import Link from "next/link";
import { FaInstagram } from 'react-icons/fa'
import { FaTiktok } from 'react-icons/fa'
import Head from "next/head";
import "./page.css";


export default function Home() {
  return (
    <>
    <Head>
    <title>Frank - Object Design for Hospitality</title>
        <meta name="description" content="Follow Frank on Instagram and TikTok for the latest in object design, creating distinct atmospheres in hospitality." />
        <meta name="keywords" content="Frank Instagram, Frank TikTok, Frank hospitality design, object design" />
        <meta name="author" content="Frank Made" />

        {/* Open Graph for Social Media */}
        <meta property="og:title" content="Frank - Object Design for Hospitality" />
        <meta property="og:description" content="Discover Frank's latest object designs on Instagram and TikTok, elevating everyday experiences." />
        <meta property="og:image" content="/FRANKblanc.png" />
        <meta property="og:url" content="https://www.frankmade.com" />
        <meta property="og:type" content="website" />

        {/* Instagram Specific */}
        <meta name="instagram:site" content="https://www.instagram.com/ffrank.usa/" />
        <meta name="instagram:description" content="Follow Frank on Instagram for the latest updates in hospitality object design." />

        {/* TikTok Specific */}
        <meta name="tiktok:site" content="https://www.tiktok.com/@frank__madeit" />
        <meta name="tiktok:description" content="Explore Frank's innovative designs on TikTok." />

        <link rel="canonical" href="https://www.frankmade.com" />
        <script
  type="application/ld+json"
  dangerouslySetInnerHTML={{
    __html: JSON.stringify({
      "@context": "http://schema.org",
      "@type": "Organization",
      name: "Frank",
      url: "https://www.frankmade.com",
      logo: "https://www.frankmade.com/FRANKblanc.png",
      sameAs: [
        "https://www.instagram.com/ffrank.usa/",
        "https://www.tiktok.com/@frank__madeit"
      ],
      description: "Follow Frank on Instagram and TikTok for the latest in hospitality object design."
    }),
  }}
/>
      </Head>
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
  
        <p className="objectslogan">
        Object Design for Hospitality
        </p>
        <div className="objectbtn">
        Creating distinct atmospheres one object at a time | Elevating everyday experiences  
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
      <video className="home-video" autoPlay loop muted>
        <source src="/go-with.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

    </div>
    </>
  );
}

