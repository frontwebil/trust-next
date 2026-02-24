import ReduxProvider from "@/Redux/ReduxProvider";
import { Inter } from "next/font/google";
import "./index.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["400", "500", "600", "700"],
});

export const metadata = {
  title: "Trust Wallet AML",
  description: "AML analytics for crypto assets",
  icons: {
    icon: "/favicon.png", // favicon PNG
    shortcut: "/favicon.png", // favicon для старих браузерів
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} antialiased`}>
        <ReduxProvider>{children}</ReduxProvider>
      </body>
    </html>
  );
}
