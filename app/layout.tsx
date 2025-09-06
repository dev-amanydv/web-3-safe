import type { Metadata } from "next";
import "./globals.css";
import { Inter } from "next/font/google";
import Image from "next/image";
import { SeedProvider } from "@/utils/SeedContext";
import { ToastProvider } from "@/utils/ToastContext";

const inter = Inter({
  subsets: ["latin"], // you can also add "latin-ext"
  weight: ["400", "500", "600", "700"], // optional
  variable: "--font-inter", // optional (for CSS variables)
});

export const metadata: Metadata = {
  title: "Web3Safe | Secure Web3 Blockchain Wallet",
  description:
    "Web3Safe is a secure, fast, and user-friendly Web3 blockchain wallet. Generate seed phrases, manage your private keys, and store crypto assets safely. Built with advanced security for DeFi and Web3 users.",
  keywords: [
    "Web3Safe",
    "blockchain wallet",
    "crypto wallet",
    "secure crypto wallet",
    "seed phrase generator",
    "private key wallet",
    "Ethereum wallet",
    "Bitcoin wallet",
    "DeFi wallet",
    "Web3 security",
  ],
  authors: [{ name: "Aman Yadav", url: "https://github.com/dev-amanydv" }],
  openGraph: {
    title: "Web3Safe | Secure Web3 Blockchain Wallet",
    description:
      "Web3Safe lets you generate seed phrases, manage private/public keys, and securely store cryptocurrencies with ease.",
    url: "https://yourdomain.com",
    siteName: "Web3Safe",
    images: [
      {
        url: "https://yourdomain.com/og-image.png", // add your OG image path
        width: 1200,
        height: 630,
        alt: "Web3Safe - A Secure Blockchain Wallet",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Web3Safe | Secure Web3 Blockchain Wallet",
    description:
      "The most secure and user-friendly Web3 blockchain wallet for managing crypto assets, seed phrases, and private keys.",
    images: ["https://yourdomain.com/og-image.png"],
    creator: "@yourTwitterHandle",
  },
  metadataBase: new URL("https://yourdomain.com"),
  themeColor: "#0f172a", // change to your brand’s primary color
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} antialiased`}
      >
      <ToastProvider>
        <SeedProvider >
          <div className="w-full fixed top-0 left-0  backdrop-blur-lg flex items-center px-10 py-10 h-15"><Image src={'/web3safeLogo.svg'} width={150} height={75} alt="Web3Safe made by Aman Yadav Full-Stack Developer" /></div>
          {children}
          </SeedProvider>
      </ToastProvider>
      </body>
    </html>
  );
}
