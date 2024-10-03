// import './globals.css';
'use client';

import '@/app/globals.css';

import { useEffect } from 'react';
import { init as initFullStory } from '@fullstory/browser';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  useEffect(() => {
    initFullStory({
      orgId: 'o-1X4FZW-na1',
    });
  }, []);

  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
