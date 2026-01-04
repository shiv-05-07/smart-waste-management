import { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Upload, MapPin, FileText, Clock, CheckCircle, AlertCircle, ChevronDown, ChevronUp } from 'lucide-react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import ComplaintDetailModal from '@/components/ComplaintDetailModal';
import { useComplaintStore } from '@/stores/complaintStore';
import { format } from 'date-fns';

export default function CitizenDashboardPage() {
  const [formData, setFormData] = useState({
    description: '',
    location: '',
    image: null as File | null
  });

  const complaints = useComplaintStore((state) => state.complaints);
  const addComplaint = useComplaintStore((state) => state.addComplaint);
  const [selectedComplaint, setSelectedComplaint] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [expandedId, setExpandedId] = useState<string | null>(null);

  // Mock current citizen email - in real app, get from auth context
  const currentCitizenEmail = 'alice@example.com';

  const citizenComplaints = complaints.filter(
    (c) => c.citizenEmail === currentCitizenEmail
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Create new complaint with unique ID
    const newComplaint = {
      _id: `WC-${String(complaints.length + 1).padStart(3, '0')}`,
      description: formData.description,
      location: formData.location,
      status: 'Pending',
      submissionDateTime: new Date(),
      assignedWorkerName: undefined,
      citizenName: 'Alice Johnson',
      citizenEmail: currentCitizenEmail,
      adminRemarks: undefined,
      complaintImage: formData.image ? URL.createObjectURL(formData.image) : undefined
    };
    addComplaint(newComplaint);
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

  const getStatusColor = (status?: string) => {
    switch (status) {
      case 'Pending':
        return 'bg-red-100 text-red-800 border-red-300';
      case 'In Progress':
        return 'bg-orange-100 text-orange-800 border-orange-300';
      case 'Resolved':
        return 'bg-green-100 text-green-800 border-green-300';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-300';
    }
  };

  const getStatusIcon = (status?: string) => {
    switch (status) {
      case 'Pending':
        return <AlertCircle className="w-4 h-4" />;
      case 'In Progress':
        return <AlertCircle className="w-4 h-4" />;
      case 'Resolved':
        return <CheckCircle className="w-4 h-4" />;
      default:
        return null;
    }
  };

  const handleOpenModal = (complaint: any) => {
    setSelectedComplaint(complaint);
    setIsModalOpen(true);
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
                      {citizenComplaints.filter(c => c.status === 'Pending').length}
                    </p>
                    <p className="font-paragraph text-xs text-yellow-700 mt-1">Pending</p>
                  </div>
                  <div className="bg-blue-50 p-4 rounded text-center">
                    <p className="text-2xl font-heading font-bold text-blue-800">
                      {citizenComplaints.filter(c => c.status === 'In Progress').length}
                    </p>
                    <p className="font-paragraph text-xs text-blue-700 mt-1">In Progress</p>
                  </div>
                  <div className="bg-green-50 p-4 rounded text-center">
                    <p className="text-2xl font-heading font-bold text-green-800">
                      {citizenComplaints.filter(c => c.status === 'Resolved').length}
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
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-3xl font-heading font-semibold text-foreground">
              My Complaints
            </h2>
            <a href="/complaint-history" className="text-primary hover:underline font-paragraph text-sm">
              View All →
            </a>
          </div>
          
          <div className="space-y-4">
            {citizenComplaints.length === 0 ? (
              <Card className="shadow-sm">
                <CardContent className="p-12 text-center">
                  <p className="font-paragraph text-lg text-foreground/70">
                    No complaints submitted yet. Start by reporting an issue.
                  </p>
                </CardContent>
              </Card>
            ) : (
              citizenComplaints.map((complaint) => (
                <motion.div
                  key={complaint._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <Card 
                    className="shadow-sm hover:shadow-md transition-shadow cursor-pointer"
                    onClick={() => handleOpenModal(complaint)}
                  >
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-3">
                            <h3 className="font-heading text-xl font-semibold text-foreground">
                              {complaint._id}
                            </h3>
                            <Badge className={`${getStatusColor(complaint.status)} border font-paragraph text-sm px-3 py-1 flex items-center gap-2`}>
                              {getStatusIcon(complaint.status)}
                              {complaint.status}
                            </Badge>
                          </div>
                          <p className="font-paragraph text-base text-foreground/80 mb-3 line-clamp-2">
                            {complaint.description}
                          </p>
                          <div className="flex flex-wrap gap-6 text-sm">
                            <span className="font-paragraph text-foreground/60 flex items-center">
                              <MapPin className="w-4 h-4 mr-2" />
                              {complaint.location}
                            </span>
                            <span className="font-paragraph text-foreground/60 flex items-center">
                              <Clock className="w-4 h-4 mr-2" />
                              {complaint.submissionDateTime
                                ? format(new Date(complaint.submissionDateTime), 'MMM dd, yyyy')
                                : 'N/A'}
                            </span>
                            {complaint.assignedWorkerName && (
                              <span className="font-paragraph text-xs bg-blue-50 text-blue-700 px-2 py-1 rounded">
                                Assigned to {complaint.assignedWorkerName}
                              </span>
                            )}
                          </div>
                        </div>
                        <div className="flex-shrink-0">
                          <ChevronDown className="w-6 h-6 text-foreground/50" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))
            )}
          </div>
        </motion.div>
      </div>

      {/* Detail Modal */}
      <ComplaintDetailModal
        complaint={selectedComplaint}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />

      <Footer />
    </div>
  );
}
