
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import BMILogo from './BMILogo';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const location = useLocation();
  const isHomePage = location.pathname === '/';
  const isAboutPage = location.pathname === '/about';

  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-primary text-white shadow-md">
        <div className="container mx-auto py-4 px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <Link to="/" className="flex items-center gap-3 group">
              <div className="animate-float transition-transform">
                <BMILogo />
              </div>
              <span className="text-2xl font-bold hover:text-white/90 transition-colors">BodyWise BMI</span>
            </Link>
            <nav className="flex items-center">
              <ul className="flex space-x-6">
                {!isHomePage && (
                  <li>
                    <Link 
                      to="/" 
                      className="hover:text-white/80 transition-colors relative after:content-[''] after:absolute after:w-full after:scale-x-0 after:h-0.5 after:bottom-0 after:left-0 after:bg-white after:origin-bottom-right after:transition-transform after:duration-300 hover:after:scale-x-100 hover:after:origin-bottom-left"
                    >
                      Home
                    </Link>
                  </li>
                )}
                {!isAboutPage && (
                  <li>
                    <Link 
                      to="/about" 
                      className="hover:text-white/80 transition-colors relative after:content-[''] after:absolute after:w-full after:scale-x-0 after:h-0.5 after:bottom-0 after:left-0 after:bg-white after:origin-bottom-right after:transition-transform after:duration-300 hover:after:scale-x-100 hover:after:origin-bottom-left"
                    >
                      About BMI
                    </Link>
                  </li>
                )}
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
