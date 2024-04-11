import { Metadata } from 'next';
import "@/styles/global.css";
 
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
        <body className="h-full">{children}</body>
      </html>
    );
  }
  
  export default RootLayout;