import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "TikTok Downloader",
  description: "Download TikTok videos without watermark",
  openGraph: {
    title: "TikTok Downloader",
    description: "Download TikTok videos without watermark",
    url: "https://tikdl.web.id",
    site_name: "TikTok Downloader",
  },
  twitter: {
    card: "summary",
    title: "TikTok Downloader",
    description: "Download TikTok videos without watermark",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="shortcut icon" href="favicon.ico" type="image/x-icon" />
        <link rel="apple-touch-icon" href="/icon.png" />
        <link rel="icon" type="image/png" href="/icon.png" />
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  );
}