import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  FileText, 
  Clock, 
  CheckCircle, 
  Users, 
  MapPin, 
  BarChart3,
  UserCheck,
  ChevronDown,
  Eye,
  Award
} from 'lucide-react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import ComplaintDetailModal from '@/components/ComplaintDetailModal';
import CitizenDetailsModal from '@/components/CitizenDetailsModal';
import { useComplaintStore } from '@/stores/complaintStore';
import { format } from 'date-fns';

export default function AdminDashboardPage() {
  const complaints = useComplaintStore((state) => state.complaints);
  const updateComplaint = useComplaintStore((state) => state.updateComplaint);
  const [selectedComplaint, setSelectedComplaint] = useState<any>(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [isCitizenDetailsOpen, setIsCitizenDetailsOpen] = useState(false);
  const [selectedCitizen, setSelectedCitizen] = useState<any>(null);
  const [expandedId, setExpandedId] = useState<string | null>(null);

  // Mock workers data
  const workers = [
    { id: '1', name: 'John Smith' },
    { id: '2', name: 'Sarah Johnson' },
    { id: '3', name: 'Mike Wilson' },
    { id: '4', name: 'Emily Davis' },
    { id: '5', name: 'Robert Lee' }
  ];

  const handleAssignWorker = (complaintId: string, workerName: string) => {
    updateComplaint(complaintId, { assignedWorkerName: workerName, status: 'In Progress' });
  };

  const handleUpdateStatus = (complaintId: string, newStatus: string) => {
    updateComplaint(complaintId, { status: newStatus });
  };

  const handleOpenDetailModal = (complaint: any) => {
    setSelectedComplaint(complaint);
    setIsDetailModalOpen(true);
  };

  const handleOpenCitizenDetails = (complaint: any) => {
    setSelectedCitizen({
      citizenName: complaint.citizenName,
      citizenEmail: complaint.citizenEmail,
      citizenPhone: complaint.citizenPhone,
      totalComplaints: complaint.totalComplaintsByUser,
      recentComplaints: complaints.filter(c => c.citizenEmail === complaint.citizenEmail)
    });
    setIsCitizenDetailsOpen(true);
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
        return <Clock className="w-4 h-4" />;
      case 'In Progress':
        return <Clock className="w-4 h-4" />;
      case 'Resolved':
        return <CheckCircle className="w-4 h-4" />;
      default:
        return null;
    }
  };

  const totalComplaints = complaints.length;
  const pendingComplaints = complaints.filter(c => c.status === 'Pending').length;
  const resolvedComplaints = complaints.filter(c => c.status === 'Resolved').length;

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
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h1 className="text-4xl md:text-5xl font-heading font-semibold text-foreground mb-4">
                Admin Dashboard
              </h1>
              <p className="text-lg font-paragraph text-foreground/70">
                Manage complaints and monitor municipal operations
              </p>
            </div>
            <Link to="/analytics">
              <Button className="bg-secondary text-secondary-foreground hover:bg-secondary/90 rounded flex items-center gap-2">
                <BarChart3 className="w-5 h-5" />
                View Analytics
              </Button>
            </Link>
          </div>
        </motion.div>

        {/* Overview Cards */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12"
        >
          <Card className="shadow-sm border-l-4 border-l-primary">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-paragraph text-sm text-foreground/70 mb-1">
                    Total Complaints
                  </p>
                  <p className="text-3xl font-heading font-bold text-foreground">
                    {totalComplaints}
                  </p>
                </div>
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                  <FileText className="w-6 h-6 text-primary" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-sm border-l-4 border-l-yellow-500">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-paragraph text-sm text-foreground/70 mb-1">
                    Pending Complaints
                  </p>
                  <p className="text-3xl font-heading font-bold text-foreground">
                    {pendingComplaints}
                  </p>
                </div>
                <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center">
                  <Clock className="w-6 h-6 text-yellow-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-sm border-l-4 border-l-green-500">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-paragraph text-sm text-foreground/70 mb-1">
                    Resolved Complaints
                  </p>
                  <p className="text-3xl font-heading font-bold text-foreground">
                    {resolvedComplaints}
                  </p>
                </div>
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                  <CheckCircle className="w-6 h-6 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Complaints Table */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <Card className="shadow-sm">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="font-heading text-2xl font-semibold text-foreground">
                  Recent Complaints
                </CardTitle>
                <Link to="/admin-complaint-management">
                  <Button variant="outline" className="rounded">
                    View All
                  </Button>
                </Link>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {complaints.slice(0, 5).map((complaint) => (
                  <motion.div
                    key={complaint._id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Card
                      className="shadow-sm hover:shadow-md transition-shadow cursor-pointer"
                      onClick={() => handleOpenDetailModal(complaint)}
                    >
                      <CardContent className="p-6">
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-3">
                              <h3 className="font-heading text-lg font-semibold text-foreground">
                                {complaint._id}
                              </h3>
                              <Badge className={`${getStatusColor(complaint.status)} border font-paragraph text-sm px-3 py-1 flex items-center gap-2`}>
                                {getStatusIcon(complaint.status)}
                                {complaint.status}
                              </Badge>
                              {complaint.status === 'Resolved' && (
                                <Badge className="bg-green-100 text-green-800 border border-green-300 font-paragraph text-xs px-2 py-1 flex items-center gap-1">
                                  <Award className="w-3 h-3" />
                                  Verified
                                </Badge>
                              )}
                            </div>
                            <p className="font-paragraph text-base text-foreground/80 mb-3 line-clamp-2">
                              {complaint.description}
                            </p>
                            <div className="flex flex-wrap gap-6 text-sm mb-3">
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
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                handleOpenCitizenDetails(complaint);
                              }}
                              className="font-paragraph text-sm text-primary hover:underline flex items-center gap-1"
                            >
                              <Eye className="w-4 h-4" />
                              View Citizen: {complaint.citizenName}
                            </button>
                          </div>
                          <div className="flex-shrink-0">
                            <ChevronDown className="w-6 h-6 text-foreground/50" />
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Detail Modal */}
      <ComplaintDetailModal
        complaint={selectedComplaint}
        isOpen={isDetailModalOpen}
        onClose={() => setIsDetailModalOpen(false)}
      />

      {/* Citizen Details Modal */}
      <CitizenDetailsModal
        isOpen={isCitizenDetailsOpen}
        onClose={() => setIsCitizenDetailsOpen(false)}
        citizenName={selectedCitizen?.citizenName}
        citizenEmail={selectedCitizen?.citizenEmail}
        citizenPhone={selectedCitizen?.citizenPhone}
        totalComplaints={selectedCitizen?.totalComplaints}
        recentComplaints={selectedCitizen?.recentComplaints}
      />

      <Footer />
    </div>
  );
}
