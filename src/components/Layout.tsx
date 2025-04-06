
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import BMILogo from './BMILogo';
import { useIsMobile } from '@/hooks/use-mobile';
import { 
  NavigationMenu, 
  NavigationMenuList, 
  NavigationMenuItem, 
  NavigationMenuLink 
} from '@/components/ui/navigation-menu';
import { cn } from '@/lib/utils';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const location = useLocation();
  const isMobile = useIsMobile();
  const currentPath = location.pathname;

  // Navigation items
  const navItems = [
    { path: '/', label: 'Home' },
    { path: '/bmi-calculator', label: 'BMI Calculator' },
    { path: '/guide', label: 'BMI Guide' },
    { path: '/health-tips', label: 'Health Tips' },
    { path: '/faq', label: 'FAQ' },
    { path: '/about', label: 'About' },
  ];

  // Filter out the current page from navigation items for desktop view
  const filteredNavItems = navItems.filter(item => item.path !== currentPath);

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
                  Body Index
                </span>
                <span className="text-xs text-white/80">Your Health Companion</span>
              </div>
            </Link>
            
            <NavigationMenu className="hidden md:flex">
              <NavigationMenuList>
                {filteredNavItems.map((item) => (
                  <NavigationMenuItem key={item.path}>
                    <Link 
                      to={item.path} 
                      className={cn(
                        "px-4 py-2 font-bold hover:text-white/80 transition-colors relative group",
                        "text-white/90"
                      )}
                    >
                      <span>{item.label}</span>
                      <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-full"></span>
                    </Link>
                  </NavigationMenuItem>
                ))}
              </NavigationMenuList>
            </NavigationMenu>

            <nav className="md:hidden">
              <select 
                className="bg-primary text-white font-bold border border-white/20 rounded-md py-1 px-2 focus:outline-none focus:ring-2 focus:ring-white/40"
                value={currentPath}
                onChange={(e) => {
                  window.location.href = e.target.value;
                }}
              >
                {navItems.map((item) => (
                  <option key={item.path} value={item.path}>
                    {item.label}
                  </option>
                ))}
              </select>
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
            <p className="animate-fade-in">&copy; {new Date().getFullYear()} Body Index Calculator. All rights reserved.</p>
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
