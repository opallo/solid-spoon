// src/app/layout.tsx

import './globals.css';

export const metadata = {
  title: 'BizOps Setter Assistant',
  description: 'Get instant response suggestions for your leads.',
  icons: {
    icon: './favicon.ico',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        { children }
      </body>
    </html>
  );
}
