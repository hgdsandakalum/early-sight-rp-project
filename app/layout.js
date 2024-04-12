import { Metadata } from 'next';
import "@/styles/global.css";
import { Inter as FontSans } from "next/font/google"
import { cn } from "@/lib/utils"

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
})
 
export const metadata = {
    applicationName: 'Early Sight',
    title: {
      default: 'Early Sight',
    },
    description: 'The React Framework for the Web',
  };

function RootLayout({ children }) {
    
    return (
      <html lang="en" className="h-full bg-white">
        <body  className={cn(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable
        )}>
          {children}
        </body>
      </html>
    );
  }
  
  export default RootLayout;