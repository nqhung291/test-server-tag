import "./globals.css";
import { Inter } from "next/font/google";
import Script from "next/script";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

const ga4MeasurementId = process.env.NEXT_PUBLIC_GA4_MEASUREMENT_ID;

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${ga4MeasurementId}`}
      />
      <Script id="google-analytics">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${ga4MeasurementId}');
        `}
      </Script>
    </html>
  );
}
