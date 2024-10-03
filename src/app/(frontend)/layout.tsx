'use client';

// import { useEffect } from 'react';
// import { init as initFullStory } from '@fullstory/browser';

import '../globals.css';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // useEffect(() => {
  //   initFullStory({
  //     orgId: 'o-1X4FZW-na1',
  //   });
  // }, []);
  return (
    <html lang="en">
      <body className="bg-white min-h-screen">{children}</body>
    </html>
  );
}
