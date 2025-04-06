
import React from 'react';
import { Link } from 'react-router-dom';
import BMILogo from './BMILogo';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-primary text-white shadow-md">
        <div className="container mx-auto py-4 px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <Link to="/" className="flex items-center gap-3">
              <BMILogo />
              <span className="text-2xl font-bold">BodyWise BMI</span>
            </Link>
            <nav>
              <ul className="flex space-x-6">
                <li><Link to="/" className="hover:text-white/80 transition-colors">Home</Link></li>
                <li><Link to="/about" className="hover:text-white/80 transition-colors">About BMI</Link></li>
              </ul>
            </nav>
          </div>
        </div>
      </header>

      <main className="flex-grow container mx-auto py-8 px-4 sm:px-6 lg:px-8">
        {children}
      </main>

      <footer className="bg-muted py-6">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center text-muted-foreground">
            <p>&copy; {new Date().getFullYear()} BodyWise BMI Calculator. All rights reserved.</p>
            <p className="text-sm mt-2">
              Disclaimer: This tool is for informational purposes only and is not a substitute for professional medical advice.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
