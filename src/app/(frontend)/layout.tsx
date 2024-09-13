import { draftMode } from 'next/headers';

import '../globals.css';
import { Header } from '@/components/Header';
import { LiveVisualEditing } from '@/components/LiveVisualEditing';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-white min-h-screen">
        {draftMode().isEnabled && (
          <a
            className="fixed right-0 bottom-0 bg-blue-500 text-white p-4 m-4"
            href="/api/draft-mode/disable">
            Disable preview mode
          </a>
        )}
        {children}
        {draftMode().isEnabled && <LiveVisualEditing />}
      </body>
    </html>
  );
}
