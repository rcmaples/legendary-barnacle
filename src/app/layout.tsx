// import './globals.css';

import '@/app/globals.css';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const localEnv = process.env;
  console.dir(localEnv);
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}



