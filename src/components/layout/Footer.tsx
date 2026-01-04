import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-foreground text-white mt-24">
      <div className="max-w-[100rem] mx-auto px-6 md:px-12 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* About Section */}
          <div>
            <h3 className="font-heading text-2xl font-semibold mb-4">
              Smart Waste Management
            </h3>
            <p className="font-paragraph text-sm text-gray-300 leading-relaxed">
              Empowering communities to maintain cleaner, healthier environments through 
              efficient waste reporting and management.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-heading text-xl font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-3">
              <li>
                <Link 
                  to="/" 
                  className="font-paragraph text-sm text-gray-300 hover:text-light-green transition-colors"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link 
                  to="/about" 
                  className="font-paragraph text-sm text-gray-300 hover:text-light-green transition-colors"
                >
                  About
                </Link>
              </li>
              <li>
                <Link 
                  to="/citizen-login" 
                  className="font-paragraph text-sm text-gray-300 hover:text-light-green transition-colors"
                >
                  Citizen Portal
                </Link>
              </li>
              <li>
                <Link 
                  to="/admin-login" 
                  className="font-paragraph text-sm text-gray-300 hover:text-light-green transition-colors"
                >
                  Admin Portal
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Information */}
          <div>
            <h4 className="font-heading text-xl font-semibold mb-4">Contact Us</h4>
            <ul className="space-y-3">
              <li className="flex items-start space-x-3">
                <Mail className="w-5 h-5 text-light-green mt-0.5 flex-shrink-0" />
                <span className="font-paragraph text-sm text-gray-300">
                  support@wastemanagement.gov
                </span>
              </li>
              <li className="flex items-start space-x-3">
                <Phone className="w-5 h-5 text-light-green mt-0.5 flex-shrink-0" />
                <span className="font-paragraph text-sm text-gray-300">
                  1-800-CLEAN-CITY
                </span>
              </li>
              <li className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-light-green mt-0.5 flex-shrink-0" />
                <span className="font-paragraph text-sm text-gray-300">
                  Municipal Office, City Hall
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-700 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="font-paragraph text-sm text-gray-400">
              © {new Date().getFullYear()} Smart Community Waste Management. All rights reserved.
            </p>
            <div className="flex space-x-6">
              <a 
                href="#" 
                className="font-paragraph text-sm text-gray-400 hover:text-light-green transition-colors"
              >
                Privacy Policy
              </a>
              <a 
                href="#" 
                className="font-paragraph text-sm text-gray-400 hover:text-light-green transition-colors"
              >
                Terms of Service
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
