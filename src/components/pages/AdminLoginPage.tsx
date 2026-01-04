import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Shield, AlertTriangle } from 'lucide-react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

export default function AdminLoginPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Placeholder for Supabase authentication
    console.log('Admin login data:', formData);
    // Navigate to admin dashboard after login
    navigate('/admin-dashboard');
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="min-h-[calc(100vh-80px)] flex items-center justify-center py-16 px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full max-w-md"
        >
          <div className="bg-white p-10 rounded-sm shadow-sm border-t-4 border-secondary">
            {/* Warning Banner */}
            <div className="bg-secondary/10 border border-secondary/30 rounded p-4 mb-6">
              <div className="flex items-start">
                <AlertTriangle className="w-5 h-5 text-secondary mt-0.5 mr-3 flex-shrink-0" />
                <div>
                  <p className="font-heading text-sm font-semibold text-secondary mb-1">
                    Authorized Access Only
                  </p>
                  <p className="font-paragraph text-xs text-foreground/70">
                    This portal is restricted to municipal administrators. Unauthorized access is prohibited.
                  </p>
                </div>
              </div>
            </div>

            {/* Header */}
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-secondary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-secondary" />
              </div>
              <h1 className="text-3xl font-heading font-semibold text-foreground mb-2">
                Admin Portal
              </h1>
              <p className="font-paragraph text-base text-foreground/70">
                Municipal Administration Access
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <Label htmlFor="email" className="font-paragraph text-sm text-foreground mb-2 block">
                  Admin Email
                </Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full font-paragraph"
                  placeholder="Enter admin email"
                />
              </div>

              <div>
                <Label htmlFor="password" className="font-paragraph text-sm text-foreground mb-2 block">
                  Password
                </Label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  required
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full font-paragraph"
                  placeholder="Enter password"
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    id="remember"
                    type="checkbox"
                    className="w-4 h-4 text-secondary border-gray-300 rounded focus:ring-secondary"
                  />
                  <label htmlFor="remember" className="ml-2 font-paragraph text-sm text-foreground/70">
                    Remember me
                  </label>
                </div>
                <a href="#" className="font-paragraph text-sm text-secondary hover:underline">
                  Forgot password?
                </a>
              </div>

              <Button
                type="submit"
                className="w-full bg-secondary text-secondary-foreground hover:bg-secondary/90 rounded py-6 font-paragraph text-base"
              >
                Access Admin Portal
              </Button>
            </form>

            {/* Footer */}
            <div className="mt-6 text-center">
              <p className="font-paragraph text-xs text-foreground/60">
                For technical support, contact IT department
              </p>
            </div>
          </div>
        </motion.div>
      </div>

      <Footer />
    </div>
  );
}
