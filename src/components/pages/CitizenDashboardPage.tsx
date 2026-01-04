import { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Upload, MapPin, FileText, Clock, CheckCircle, AlertCircle } from 'lucide-react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { format } from 'date-fns';

export default function CitizenDashboardPage() {
  const [formData, setFormData] = useState({
    description: '',
    location: '',
    image: null as File | null
  });

  // Mock data for submitted complaints
  const [complaints] = useState([
    {
      id: 'WC-001',
      description: 'Overflowing garbage bin near park entrance',
      location: 'Central Park, Main Gate',
      status: 'In Progress',
      submissionDate: new Date('2026-01-02T10:30:00'),
      assignedWorker: 'John Smith'
    },
    {
      id: 'WC-002',
      description: 'Illegal dumping on street corner',
      location: '5th Avenue & Oak Street',
      status: 'Resolved',
      submissionDate: new Date('2025-12-28T14:15:00'),
      assignedWorker: 'Sarah Johnson'
    },
    {
      id: 'WC-003',
      description: 'Broken waste container needs replacement',
      location: 'Community Center Parking Lot',
      status: 'Pending',
      submissionDate: new Date('2026-01-03T09:00:00'),
      assignedWorker: null
    }
  ]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Placeholder for complaint submission
    console.log('Complaint submitted:', formData);
    // Reset form
    setFormData({
      description: '',
      location: '',
      image: null
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData({
        ...formData,
        image: e.target.files[0]
      });
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Pending':
        return 'bg-yellow-100 text-yellow-800 border-yellow-300';
      case 'In Progress':
        return 'bg-blue-100 text-blue-800 border-blue-300';
      case 'Resolved':
        return 'bg-green-100 text-green-800 border-green-300';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-300';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Pending':
        return <Clock className="w-4 h-4" />;
      case 'In Progress':
        return <AlertCircle className="w-4 h-4" />;
      case 'Resolved':
        return <CheckCircle className="w-4 h-4" />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="max-w-[100rem] mx-auto px-6 md:px-12 py-16">
        {/* Page Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-heading font-semibold text-foreground mb-4">
            Citizen Dashboard
          </h1>
          <p className="text-lg font-paragraph text-foreground/70">
            Submit new complaints and track your existing reports
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Submit Complaint Form */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Card className="shadow-sm">
              <CardHeader>
                <CardTitle className="font-heading text-2xl font-semibold text-foreground flex items-center">
                  <FileText className="w-6 h-6 text-primary mr-3" />
                  Submit Waste Complaint
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <Label htmlFor="image" className="font-paragraph text-sm text-foreground mb-2 block">
                      Upload Image
                    </Label>
                    <div className="border-2 border-dashed border-gray-300 rounded p-6 text-center hover:border-primary transition-colors cursor-pointer">
                      <input
                        id="image"
                        name="image"
                        type="file"
                        accept="image/*"
                        onChange={handleFileChange}
                        className="hidden"
                      />
                      <label htmlFor="image" className="cursor-pointer">
                        <Upload className="w-10 h-10 text-gray-400 mx-auto mb-2" />
                        <p className="font-paragraph text-sm text-foreground/70">
                          {formData.image ? formData.image.name : 'Click to upload or drag and drop'}
                        </p>
                        <p className="font-paragraph text-xs text-foreground/50 mt-1">
                          PNG, JPG up to 10MB
                        </p>
                      </label>
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="location" className="font-paragraph text-sm text-foreground mb-2 block">
                      Location
                    </Label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <Input
                        id="location"
                        name="location"
                        type="text"
                        required
                        value={formData.location}
                        onChange={handleChange}
                        className="w-full pl-10 font-paragraph"
                        placeholder="Enter location or address"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="description" className="font-paragraph text-sm text-foreground mb-2 block">
                      Description
                    </Label>
                    <Textarea
                      id="description"
                      name="description"
                      required
                      value={formData.description}
                      onChange={handleChange}
                      className="w-full font-paragraph min-h-[120px]"
                      placeholder="Describe the waste issue in detail..."
                    />
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-primary text-primary-foreground hover:bg-primary/90 rounded py-6 font-paragraph text-base"
                  >
                    Submit Complaint
                  </Button>
                </form>
              </CardContent>
            </Card>
          </motion.div>

          {/* Complaints Summary */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Card className="shadow-sm">
              <CardHeader>
                <CardTitle className="font-heading text-2xl font-semibold text-foreground">
                  Quick Stats
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-3 gap-4">
                  <div className="bg-yellow-50 p-4 rounded text-center">
                    <p className="text-2xl font-heading font-bold text-yellow-800">
                      {complaints.filter(c => c.status === 'Pending').length}
                    </p>
                    <p className="font-paragraph text-xs text-yellow-700 mt-1">Pending</p>
                  </div>
                  <div className="bg-blue-50 p-4 rounded text-center">
                    <p className="text-2xl font-heading font-bold text-blue-800">
                      {complaints.filter(c => c.status === 'In Progress').length}
                    </p>
                    <p className="font-paragraph text-xs text-blue-700 mt-1">In Progress</p>
                  </div>
                  <div className="bg-green-50 p-4 rounded text-center">
                    <p className="text-2xl font-heading font-bold text-green-800">
                      {complaints.filter(c => c.status === 'Resolved').length}
                    </p>
                    <p className="font-paragraph text-xs text-green-700 mt-1">Resolved</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* My Complaints */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-12"
        >
          <h2 className="text-3xl font-heading font-semibold text-foreground mb-6">
            My Complaints
          </h2>
          
          <div className="space-y-4">
            {complaints.map((complaint) => (
              <Card key={complaint.id} className="shadow-sm hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-start">
                    <div className="md:col-span-8">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h3 className="font-heading text-xl font-semibold text-foreground mb-1">
                            {complaint.id}
                          </h3>
                          <p className="font-paragraph text-sm text-foreground/70 flex items-center">
                            <MapPin className="w-4 h-4 mr-1" />
                            {complaint.location}
                          </p>
                        </div>
                      </div>
                      <p className="font-paragraph text-base text-foreground/80 mb-3">
                        {complaint.description}
                      </p>
                      <div className="flex flex-wrap gap-3 text-sm">
                        <span className="font-paragraph text-foreground/60 flex items-center">
                          <Clock className="w-4 h-4 mr-1" />
                          {format(complaint.submissionDate, 'MMM dd, yyyy HH:mm')}
                        </span>
                        {complaint.assignedWorker && (
                          <span className="font-paragraph text-foreground/60">
                            Assigned to: {complaint.assignedWorker}
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="md:col-span-4 flex justify-end">
                      <Badge className={`${getStatusColor(complaint.status)} border font-paragraph text-sm px-3 py-1 flex items-center gap-2`}>
                        {getStatusIcon(complaint.status)}
                        {complaint.status}
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </motion.div>
      </div>

      <Footer />
    </div>
  );
}
