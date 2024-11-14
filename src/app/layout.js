import { Outfit } from "next/font/google";
import Script from 'next/script'
import "./globals.css";

const outfit = Outfit({ subsets: ["latin"] });

export const metadata = {
  title: "CreaBusiness Insurance",
  description: "CreaBusiness Insurance",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.6.0/css/all.min.css" integrity="sha512-Kc323vGBEqzTmouAECnVceyQqyqdsSiqLQISBL29aUW4U/M7pSPA/gEUZQqv1cwx4OnYxTxve5UMg5GT6L4JJg==" crossorigin="anonymous" referrerpolicy="no-referrer" />
      <body
        className={outfit.className}
        style={{
          margin: "0",
          background: "#F2F3F5",
        }}
      >
        {children}
      </body>
      <Script src="https://secure.ewaypayments.com/scripts/eCrypt.min.js" />
    </html>
  );
}
