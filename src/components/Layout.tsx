
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import BMILogo from './BMILogo';
import { useIsMobile } from '@/hooks/use-mobile';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const location = useLocation();
  const isMobile = useIsMobile();
  const isHomePage = location.pathname === '/';
  const isAboutPage = location.pathname === '/about';

  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-gradient-to-r from-primary/90 via-primary to-primary/90 text-white shadow-lg sticky top-0 z-50">
        <div className="container mx-auto py-4 px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <Link to="/" className="flex items-center gap-3 group transition-transform hover:scale-105">
              <div className="relative">
                <div className="absolute -top-1 -right-1 w-2 h-2 bg-white rounded-full animate-pulse"></div>
                <div className="absolute -bottom-1 -left-1 w-2 h-2 bg-white rounded-full animate-pulse" style={{ animationDelay: "0.5s" }}></div>
                <BMILogo />
              </div>
              <div className="flex flex-col">
                <span className="text-xl sm:text-2xl font-bold text-white group-hover:text-white/90 transition-colors relative after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-white/0 after:group-hover:bg-white/70 after:transition-all">
                  BodyWise BMI
                </span>
                <span className="text-xs text-white/80">Your Health Companion</span>
              </div>
            </Link>
            <nav className="flex items-center">
              <ul className="flex space-x-4 sm:space-x-6">
                {!isHomePage && (
                  <li>
                    <Link 
                      to="/" 
                      className="nav-link flex items-center gap-1 hover:text-white/80 transition-colors relative group"
                    >
                      <svg className="w-4 h-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                        <polyline points="9 22 9 12 15 12 15 22"></polyline>
                      </svg>
                      <span>Home</span>
                      <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-full"></span>
                    </Link>
                  </li>
                )}
                {!isAboutPage && (
                  <li>
                    <Link 
                      to="/about" 
                      className="nav-link flex items-center gap-1 hover:text-white/80 transition-colors relative group"
                    >
                      <svg className="w-4 h-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="12" cy="12" r="10"></circle>
                        <line x1="12" y1="16" x2="12" y2="12"></line>
                        <line x1="12" y1="8" x2="12.01" y2="8"></line>
                      </svg>
                      <span>{isMobile ? "About" : "About BMI"}</span>
                      <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-full"></span>
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
              <span className="text-xs hover:text-primary transition-colors cursor-pointer group relative">
                Privacy Policy
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary/50 transition-all duration-300 group-hover:w-full"></span>
              </span>
              <span className="text-xs hover:text-primary transition-colors cursor-pointer group relative">
                Terms of Use
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary/50 transition-all duration-300 group-hover:w-full"></span>
              </span>
              <span className="text-xs hover:text-primary transition-colors cursor-pointer group relative">
                Contact Us
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary/50 transition-all duration-300 group-hover:w-full"></span>
              </span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
