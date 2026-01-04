import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Menu, X } from 'lucide-react';
import { useState } from 'react';

export default function Header() {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  const isActive = (path: string) => location.pathname === path;
  
  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-[100rem] mx-auto px-6 md:px-12">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-primary rounded-sm flex items-center justify-center">
              <span className="text-white font-heading text-xl font-bold">W</span>
            </div>
            <span className="font-heading text-xl font-semibold text-foreground hidden md:block">
              Waste Management
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link 
              to="/" 
              className={`font-paragraph text-base transition-colors ${
                isActive('/') ? 'text-primary' : 'text-foreground hover:text-primary'
              }`}
            >
              Home
            </Link>
            <Link 
              to="/about" 
              className={`font-paragraph text-base transition-colors ${
                isActive('/about') ? 'text-primary' : 'text-foreground hover:text-primary'
              }`}
            >
              About
            </Link>
            <Link 
              to="/how-it-works" 
              className={`font-paragraph text-base transition-colors ${
                isActive('/how-it-works') ? 'text-primary' : 'text-foreground hover:text-primary'
              }`}
            >
              How It Works
            </Link>
            <Link 
              to="/contact" 
              className={`font-paragraph text-base transition-colors ${
                isActive('/contact') ? 'text-primary' : 'text-foreground hover:text-primary'
              }`}
            >
              Contact
            </Link>
            <Link 
              to="/citizen-login" 
              className={`font-paragraph text-base transition-colors ${
                isActive('/citizen-login') ? 'text-primary' : 'text-foreground hover:text-primary'
              }`}
            >
              Citizen Login
            </Link>
            <Link 
              to="/admin-login" 
              className={`font-paragraph text-base transition-colors ${
                isActive('/admin-login') ? 'text-secondary' : 'text-foreground hover:text-secondary'
              }`}
            >
              Admin Login
            </Link>
            <Link to="/citizen-signup">
              <Button className="bg-primary text-primary-foreground hover:bg-primary/90 rounded">
                Sign Up
              </Button>
            </Link>
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? (
              <X className="w-6 h-6 text-foreground" />
            ) : (
              <Menu className="w-6 h-6 text-foreground" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <nav className="md:hidden py-4 border-t border-gray-200">
            <div className="flex flex-col space-y-4">
              <Link 
                to="/" 
                className={`font-paragraph text-base transition-colors ${
                  isActive('/') ? 'text-primary' : 'text-foreground'
                }`}
                onClick={() => setMobileMenuOpen(false)}
              >
                Home
              </Link>
              <Link 
                to="/about" 
                className={`font-paragraph text-base transition-colors ${
                  isActive('/about') ? 'text-primary' : 'text-foreground'
                }`}
                onClick={() => setMobileMenuOpen(false)}
              >
                About
              </Link>
              <Link 
                to="/how-it-works" 
                className={`font-paragraph text-base transition-colors ${
                  isActive('/how-it-works') ? 'text-primary' : 'text-foreground'
                }`}
                onClick={() => setMobileMenuOpen(false)}
              >
                How It Works
              </Link>
              <Link 
                to="/contact" 
                className={`font-paragraph text-base transition-colors ${
                  isActive('/contact') ? 'text-primary' : 'text-foreground'
                }`}
                onClick={() => setMobileMenuOpen(false)}
              >
                Contact
              </Link>
              <Link 
                to="/citizen-login" 
                className={`font-paragraph text-base transition-colors ${
                  isActive('/citizen-login') ? 'text-primary' : 'text-foreground'
                }`}
                onClick={() => setMobileMenuOpen(false)}
              >
                Citizen Login
              </Link>
              <Link 
                to="/admin-login" 
                className={`font-paragraph text-base transition-colors ${
                  isActive('/admin-login') ? 'text-secondary' : 'text-foreground'
                }`}
                onClick={() => setMobileMenuOpen(false)}
              >
                Admin Login
              </Link>
              <Link to="/citizen-signup" onClick={() => setMobileMenuOpen(false)}>
                <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90 rounded">
                  Sign Up
                </Button>
              </Link>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}
