import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import BMILogo from './BMILogo';
import { useIsMobile } from '@/hooks/use-mobile';
import { 
  NavigationMenu, 
  NavigationMenuList, 
  NavigationMenuItem, 
  NavigationMenuLink,
  NavigationMenuContent,
  NavigationMenuTrigger
} from '@/components/ui/navigation-menu';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { ChevronDown, Menu, X } from 'lucide-react';
import { DropdownMenuItem } from '@/components/ui/dropdown-menu';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const location = useLocation();
  const isMobile = useIsMobile();
  const currentPath = location.pathname;
  const [showMoreTools, setShowMoreTools] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileMoreToolsOpen, setMobileMoreToolsOpen] = useState(false);

  // Scroll to top when pathname changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  // Main navigation items
  const mainNavItems = [
    { path: '/#tools-section', label: 'All Tools' },
    { path: '/bmi-calculator', label: 'BMI Calculator' },
    { path: '/body-fat-calculator', label: 'Body Fat Calculator' },
  ];

  // Additional tools for the dropdown menu
  const moreToolsItems = [
    { path: '/bmr-calculator', label: 'BMR Calculator' },
    { path: '/ideal-weight-calculator', label: 'Ideal Weight Calculator' },
    { path: '/heart-rate-calculator', label: 'Heart Rate Calculator' },
    { path: '/water-intake-calculator', label: 'Water Intake Calculator' },
    { path: '/mental-health-assessment', label: 'Mental Health Assessment' },
    { path: '/macro-calculator', label: 'Macro Calculator' },
    { path: '/blood-pressure-checker', label: 'Blood Pressure Checker' },
    { path: '/sleep-calculator', label: 'Sleep Calculator' },
  ];

  // Filter out the current page from navigation items for desktop view
  const filteredMainNavItems = mainNavItems.filter(item => item.path !== currentPath);
  const filteredMoreToolsItems = moreToolsItems.filter(item => item.path !== currentPath);

  // Toggle mobile menu
  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  // Handle scrolling to section if hash is present in the path
  const handleNavClick = (path: string) => {
    // Close mobile menu
    setMobileMenuOpen(false);
    
    // Handle hash links
    if (path.includes('#')) {
      const [route, hash] = path.split('#');
      const isHomePage = location.pathname === '/' || location.pathname === '';
      
      // If already on home page, just scroll to the element
      if (isHomePage) {
        const element = document.getElementById(hash);
        if (element) {
          // Use a longer delay on mobile to ensure the mobile menu is fully closed
          // before calculating the scroll position
          const delay = isMobile ? 300 : 100;
          setTimeout(() => {
            // Add a small offset to account for the fixed header
            const headerOffset = isMobile ? 80 : 60;
            const elementPosition = element.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
            
            window.scrollTo({
              top: offsetPosition,
              behavior: 'smooth'
            });
          }, delay);
        }
        return;
      } else {
        // If on another page, store the hash in sessionStorage
        sessionStorage.setItem('scrollTarget', hash);
        // Navigate to the homepage
        window.location.href = '/';
      }
    }
  };

  // Check for stored scroll target on component mount
  useEffect(() => {
    const scrollTarget = sessionStorage.getItem('scrollTarget');
    if (scrollTarget && (location.pathname === '/' || location.pathname === '')) {
      const element = document.getElementById(scrollTarget);
      if (element) {
        // Small delay to ensure the page is fully loaded
        setTimeout(() => {
          // Add a small offset to account for the fixed header
          const headerOffset = isMobile ? 80 : 60;
          const elementPosition = element.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
          
          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });
          
          // Clear the stored target after scrolling
          sessionStorage.removeItem('scrollTarget');
        }, 300);
      }
    }
  }, [location.pathname]);

  useEffect(() => {
    // Only scroll to top if there's no hash in the URL
    if (!location.hash) {
      window.scrollTo(0, 0);
    }
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-gradient-to-r from-primary/90 via-primary to-primary/90 text-white shadow-lg sticky top-0 z-50">
        <div className="container mx-auto py-4 px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <Link to="/" className="flex items-center gap-3 group transition-transform hover:scale-105">
              <div className="relative">
                <BMILogo />
              </div>
              <div className="flex flex-col">
                <span className="text-xl sm:text-2xl font-bold text-white group-hover:text-white/90 transition-colors relative after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-white/0 after:group-hover:bg-white/70 after:transition-all">
                  Body Index
                </span>
                <span className="text-xs text-white/80">Free Health Tools & Fitness Calculators</span>
              </div>
            </Link>
            
            {/* Desktop Navigation */}
            <NavigationMenu className="hidden md:flex">
              <NavigationMenuList>
                {filteredMainNavItems.map((item) => (
                  <NavigationMenuItem key={item.path}>
                    <Link 
                      to={item.path} 
                      className={cn(
                        "px-4 py-2 font-bold text-white/90 hover:text-white transition-colors rounded-md",
                        "hover:bg-white/10"
                      )}
                      onClick={(e) => {
                        if (item.path.includes('#')) {
                          e.preventDefault();
                          handleNavClick(item.path);
                        }
                      }}
                    >
                      {item.label}
                    </Link>
                  </NavigationMenuItem>
                ))}
                
                {/* Custom More Tools Dropdown */}
                <div 
                  className="relative group"
                  onMouseEnter={() => setShowMoreTools(true)}
                  onMouseLeave={() => setShowMoreTools(false)}
                >
                  <button 
                    className="px-4 py-2 font-bold text-white/90 hover:text-white transition-colors flex items-center rounded-md hover:bg-white/10"
                  >
                    More Tools
                    <ChevronDown className="ml-1 h-4 w-4" />
                  </button>
                  {showMoreTools && (
                    <div className="absolute top-full left-0 pt-2">
                      <div 
                        className="min-w-[200px] bg-white rounded-lg shadow-lg p-4 z-50 animate-slideDownAndFade"
                      >
                        <ul className="grid gap-1">
                          {filteredMoreToolsItems.map((item) => (
                            <li key={item.path}>
                              <Link
                                to={item.path}
                                className="block w-full rounded-md py-2 px-3 text-sm font-medium text-gray-700 hover:bg-primary/10 hover:text-primary transition-colors"
                              >
                                {item.label}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  )}
                </div>
              </NavigationMenuList>
            </NavigationMenu>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <button 
                className="p-2 rounded-md hover:bg-white/10 transition-colors relative z-10 focus:outline-none focus:ring-1 focus:ring-white/30"
                onClick={toggleMobileMenu}
                aria-label="Toggle mobile menu"
                aria-expanded={mobileMenuOpen}
              >
                <div className="relative w-6 h-6">
                  <span className={`absolute block h-0.5 w-6 bg-white rounded-sm transform transition-all duration-300 ease-in-out ${mobileMenuOpen ? 'rotate-45 top-3' : 'top-1.5'}`}></span>
                  <span className={`absolute block h-0.5 w-6 bg-white rounded-sm transform transition-all duration-300 ease-in-out top-3 ${mobileMenuOpen ? 'opacity-0' : 'opacity-100'}`}></span>
                  <span className={`absolute block h-0.5 w-6 bg-white rounded-sm transform transition-all duration-300 ease-in-out ${mobileMenuOpen ? '-rotate-45 top-3' : 'top-[18px]'}`}></span>
                </div>
              </button>
            </div>
          </div>

          {/* Mobile Menu Dropdown */}
          <div 
            className={`md:hidden fixed inset-0 bg-primary/95 z-40 transition-all duration-300 ease-in-out ${
              mobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
            }`}
            style={{
              top: '72px', // Height of the header
            }}
          >
            <nav className="h-full overflow-y-auto px-4 py-6 flex flex-col">
              {mainNavItems.map((item, index) => (
                <Link 
                  key={item.path} 
                  to={item.path}
                  className={cn(
                    "px-4 py-4 font-medium text-white/90 hover:text-white rounded-md transition-all text-lg",
                    "hover:bg-white/10 hover:pl-5",
                    currentPath === item.path && "bg-white/20 text-white"
                  )}
                  onClick={(e) => {
                    if (item.path.includes('#')) {
                      e.preventDefault();
                      handleNavClick(item.path);
                    }
                  }}
                  style={{ 
                    transitionDelay: mobileMenuOpen ? `${index * 50}ms` : '0ms',
                    transform: mobileMenuOpen ? 'translateX(0)' : 'translateX(-10px)',
                    opacity: mobileMenuOpen ? 1 : 0
                  }}
                >
                  {item.label}
                </Link>
              ))}
              
              {/* Mobile More Tools Dropdown */}
              <div 
                style={{ 
                  transitionDelay: mobileMenuOpen ? `${mainNavItems.length * 50}ms` : '0ms',
                  transform: mobileMenuOpen ? 'translateX(0)' : 'translateX(-10px)',
                  opacity: mobileMenuOpen ? 1 : 0
                }}
                className="mb-4"
              >
                <button 
                  className="w-full flex justify-between items-center px-4 py-4 font-medium text-white/90 hover:text-white rounded-md transition-all hover:bg-white/10 text-lg"
                  onClick={() => setMobileMoreToolsOpen(!mobileMoreToolsOpen)}
                >
                  <span>More Tools</span>
                  <ChevronDown 
                    className={`h-5 w-5 transition-transform duration-200 ${mobileMoreToolsOpen ? 'transform rotate-180' : ''}`} 
                  />
                </button>
                
                <div 
                  className={`transition-all duration-300 ease-in-out ${
                    mobileMoreToolsOpen ? 'max-h-[500px] opacity-100 visible' : 'max-h-0 opacity-0 invisible'
                  }`}
                >
                  <div className="grid grid-cols-1 gap-1 mt-2">
                    {moreToolsItems.map((item, index) => (
                      <Link 
                        key={item.path} 
                        to={item.path}
                        className={cn(
                          "block px-4 py-3 font-medium text-white/90 hover:text-white rounded-md transition-all ml-4",
                          "hover:bg-white/10 hover:pl-8 pl-6",
                          currentPath === item.path && "bg-white/20 text-white"
                        )}
                        onClick={() => setMobileMenuOpen(false)}
                        style={{ 
                          transitionDelay: mobileMoreToolsOpen ? `${index * 30}ms` : '0ms',
                          transform: mobileMoreToolsOpen ? 'translateX(0)' : 'translateX(-10px)',
                          opacity: mobileMoreToolsOpen ? 1 : 0
                        }}
                      >
                        {item.label}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
              
              <div className="mt-auto pt-4 border-t border-white/20"
                style={{ 
                  transitionDelay: mobileMenuOpen ? '400ms' : '0ms',
                  transform: mobileMenuOpen ? 'translateY(0)' : 'translateY(10px)',
                  opacity: mobileMenuOpen ? 1 : 0
                }}
              >
                <div className="flex flex-col space-y-3">
                  <Link 
                    to="/about" 
                    className="px-4 py-2 text-white/80 hover:text-white"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    About
                  </Link>
                  <Link 
                    to="/privacy-policy" 
                    className="px-4 py-2 text-white/80 hover:text-white"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Privacy Policy
                  </Link>
                  <Link 
                    to="/terms-of-use" 
                    className="px-4 py-2 text-white/80 hover:text-white"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Terms of Use
                  </Link>
                  <Link 
                    to="/contact" 
                    className="px-4 py-2 text-white/80 hover:text-white"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Contact Us
                  </Link>
                </div>
              </div>
            </nav>
          </div>
        </div>
      </header>

      <main className="flex-grow container mx-auto py-8 px-4 sm:px-6 lg:px-8">
        {children}
      </main>

      <footer className="bg-gradient-to-r from-primary/90 via-primary to-primary/90 text-white pt-10 pb-6">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            {/* Logo and Mission */}
            <div className="md:col-span-1">
              <Link to="/" className="flex items-center gap-2 mb-4 group transition-transform hover:scale-105">
                <div className="relative">
                  <BMILogo size="small" />
                </div>
                <div className="flex flex-col">
                  <span className="text-lg font-bold text-white">Body Index</span>
                  <span className="text-xs text-white/80">Free Health Tools & Fitness Calculators</span>
                </div>
              </Link>
              <p className="text-sm text-white/80 mt-4">
                Empowering individuals with tools and knowledge to take control of their health journey.
              </p>
            </div>

            {/* Tools Links */}
            <div className="md:col-span-1">
              <h3 className="text-lg font-bold mb-4 text-white/90 border-b border-white/20 pb-2">Essential Tools</h3>
              <ul className="space-y-2">
                <li>
                  <Link to="/bmi-calculator" className="text-white/80 hover:text-white transition-colors text-sm flex items-center hover:translate-x-1 transition-transform">
                    <span className="mr-2">→</span>
                    BMI Calculator
                  </Link>
                </li>
                <li>
                  <Link to="/body-fat-calculator" className="text-white/80 hover:text-white transition-colors text-sm flex items-center hover:translate-x-1 transition-transform">
                    <span className="mr-2">→</span>
                    Body Fat Calculator
                  </Link>
                </li>
                <li>
                  <Link to="/bmr-calculator" className="text-white/80 hover:text-white transition-colors text-sm flex items-center hover:translate-x-1 transition-transform">
                    <span className="mr-2">→</span>
                    BMR Calculator
                  </Link>
                </li>
                <li>
                  <Link to="/water-intake-calculator" className="text-white/80 hover:text-white transition-colors text-sm flex items-center hover:translate-x-1 transition-transform">
                    <span className="mr-2">→</span>
                    Water Intake Calculator
                  </Link>
                </li>
              </ul>
            </div>

            {/* More Tools Links */}
            <div className="md:col-span-1">
              <h3 className="text-lg font-bold mb-4 text-white/90 border-b border-white/20 pb-2">More Tools</h3>
              <ul className="space-y-2">
                <li>
                  <Link to="/macro-calculator" className="text-white/80 hover:text-white transition-colors text-sm flex items-center hover:translate-x-1 transition-transform">
                    <span className="mr-2">→</span>
                    Macro Calculator
                  </Link>
                </li>
                <li>
                  <Link to="/ideal-weight-calculator" className="text-white/80 hover:text-white transition-colors text-sm flex items-center hover:translate-x-1 transition-transform">
                    <span className="mr-2">→</span>
                    Ideal Weight Calculator
                  </Link>
                </li>
                <li>
                  <Link to="/blood-pressure-checker" className="text-white/80 hover:text-white transition-colors text-sm flex items-center hover:translate-x-1 transition-transform">
                    <span className="mr-2">→</span>
                    Blood Pressure Checker
                  </Link>
                </li>
                <li>
                  <Link to="/mental-health-assessment" className="text-white/80 hover:text-white transition-colors text-sm flex items-center hover:translate-x-1 transition-transform">
                    <span className="mr-2">→</span>
                    Mental Health Assessment
                  </Link>
                </li>
              </ul>
            </div>

            {/* Company Info and Resources */}
            <div className="md:col-span-1">
              <h3 className="text-lg font-bold mb-4 text-white/90 border-b border-white/20 pb-2">Company</h3>
              <ul className="space-y-2">
                <li>
                  <Link to="/about" className="text-white/80 hover:text-white transition-colors text-sm flex items-center hover:translate-x-1 transition-transform">
                    <span className="mr-2">→</span>
                    About Us
                  </Link>
                </li>
                <li>
                  <Link to="/contact" className="text-white/80 hover:text-white transition-colors text-sm flex items-center hover:translate-x-1 transition-transform">
                    <span className="mr-2">→</span>
                    Contact Us
                  </Link>
                </li>
                <li>
                  <Link to="/privacy-policy" className="text-white/80 hover:text-white transition-colors text-sm flex items-center hover:translate-x-1 transition-transform">
                    <span className="mr-2">→</span>
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link to="/terms-of-use" className="text-white/80 hover:text-white transition-colors text-sm flex items-center hover:translate-x-1 transition-transform">
                    <span className="mr-2">→</span>
                    Terms of Use
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          {/* Social Icons and Newsletter */}
          <div className="flex flex-col md:flex-row justify-between items-center py-6 border-t border-white/20">
            <div className="flex space-x-4 mb-4 md:mb-0">
              {/* Placeholder for social media icons */}
              <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors cursor-pointer">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-white" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                </svg>
              </div>
              <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors cursor-pointer">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-white" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </div>
              <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors cursor-pointer">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-white" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                </svg>
              </div>
            </div>
            
            <div className="text-white/80 text-sm text-center md:text-right">
              &copy; {new Date().getFullYear()} Body Index | All Rights Reserved<br/>
              <span className="text-xs text-white/60">Health tools for informational purposes only. Not a substitute for professional medical advice.</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
