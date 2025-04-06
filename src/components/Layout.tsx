
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
      <header className="bg-primary text-white shadow-md sticky top-0 z-50">
        <div className="container mx-auto py-4 px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <Link to="/" className="flex items-center gap-3 group transition-transform hover:scale-105">
              <div className="animate-float transition-transform relative">
                <div className="absolute -top-1 -right-1 w-2 h-2 bg-white rounded-full animate-pulse"></div>
                <div className="absolute -bottom-1 -left-1 w-2 h-2 bg-white rounded-full animate-pulse" style={{ animationDelay: "0.5s" }}></div>
                <BMILogo />
              </div>
              <span className="text-2xl font-bold text-white group-hover:text-white/90 transition-colors relative after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-white/0 after:group-hover:bg-white/70 after:transition-all">
                BodyWise BMI
              </span>
            </Link>
            <nav className="flex items-center">
              <ul className="flex space-x-6">
                {!isHomePage && (
                  <li>
                    <Link 
                      to="/" 
                      className="nav-link flex items-center gap-1 hover:text-white/80 transition-colors"
                    >
                      <svg className="w-4 h-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                        <polyline points="9 22 9 12 15 12 15 22"></polyline>
                      </svg>
                      Home
                    </Link>
                  </li>
                )}
                {!isAboutPage && (
                  <li>
                    <Link 
                      to="/about" 
                      className="nav-link flex items-center gap-1 hover:text-white/80 transition-colors"
                    >
                      <svg className="w-4 h-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="12" cy="12" r="10"></circle>
                        <line x1="12" y1="16" x2="12" y2="12"></line>
                        <line x1="12" y1="8" x2="12.01" y2="8"></line>
                      </svg>
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
            <p className="animate-fade-in">&copy; {new Date().getFullYear()} BodyWise BMI Calculator. All rights reserved.</p>
            <p className="text-sm mt-2 animate-fade-in" style={{ animationDelay: "0.2s" }}>
              Disclaimer: This tool is for informational purposes only and is not a substitute for professional medical advice.
            </p>
            <div className="flex justify-center mt-4 space-x-4 animate-fade-in" style={{ animationDelay: "0.3s" }}>
              <span className="text-xs hover:text-primary transition-colors cursor-pointer">Privacy Policy</span>
              <span className="text-xs hover:text-primary transition-colors cursor-pointer">Terms of Use</span>
              <span className="text-xs hover:text-primary transition-colors cursor-pointer">Contact Us</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
