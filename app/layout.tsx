import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});

const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Frank - Object Design for Hospitality",
  description: "Follow Frank on Instagram and TikTok for the latest in object design, creating distinct atmospheres in hospitality.",
  icons: {
    icon: '/FRANKblanc.png',
  },
  openGraph: {
    title: 'Frank - Object Design for Hospitality',
    description: 'Discover Frank\'s latest object designs on Instagram and TikTok, elevating everyday experiences.',
    images: '/FRANKblanc.png',
    url: 'https://www.frankmade.com',
    type: 'website',
  },
  other: {
    'instagram:site': 'https://www.instagram.com/ffrank.usa/',
    'instagram:description': 'Follow Frank on Instagram for the latest updates in hospitality object design.',
    'tiktok:site': 'https://www.tiktok.com/@frank__madeit',
    'tiktok:description': 'Explore Frank\'s innovative designs on TikTok.',
  },
  keywords: [
    'Frank Instagram',
    'Frank TikTok',
    'Frank hospitality design',
    'object design',
    'hospitality objects',
    'Frank Made'
  ],
  authors: [{ name: 'Frank Made' }],
  creator: 'Frank Made',
  publisher: 'Frank Made',
  formatDetection: {
    telephone: false,
    email: true,
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        {children}
      </body>
    </html>
  );
}