import { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { MapPin, Clock, CheckCircle, AlertCircle, ChevronDown } from 'lucide-react';
import { format } from 'date-fns';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import ComplaintDetailModal from '@/components/ComplaintDetailModal';
import { useComplaintStore } from '@/stores/complaintStore';

export default function CitizenComplaintHistoryPage() {
  const complaints = useComplaintStore((state) => state.complaints);
  const [selectedComplaint, setSelectedComplaint] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [expandedId, setExpandedId] = useState<string | null>(null);

  // Mock current citizen email - in real app, get from auth context
  const currentCitizenEmail = 'alice@example.com';

  const citizenComplaints = complaints.filter(
    (c) => c.citizenEmail === currentCitizenEmail
  );

  const filteredComplaints = statusFilter === 'all'
    ? citizenComplaints
    : citizenComplaints.filter((c) => c.status === statusFilter);

  const getStatusColor = (status?: string) => {
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
            My Complaint History
          </h1>
          <p className="text-lg font-paragraph text-foreground/70">
            View and track all your submitted waste complaints
          </p>
        </motion.div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-8"
        >
          <Card className="shadow-sm">
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row gap-4 items-end">
                <div className="flex-1">
                  <label className="font-paragraph text-sm text-foreground mb-2 block">
                    Filter by Status
                  </label>
                  <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Complaints</SelectItem>
                      <SelectItem value="Pending">Pending</SelectItem>
                      <SelectItem value="In Progress">In Progress</SelectItem>
                      <SelectItem value="Resolved">Resolved</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="text-sm font-paragraph text-foreground/70">
                  Showing {filteredComplaints.length} complaint{filteredComplaints.length !== 1 ? 's' : ''}
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Complaints List */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="space-y-4"
        >
          {filteredComplaints.length === 0 ? (
            <Card className="shadow-sm">
              <CardContent className="p-12 text-center">
                <p className="font-paragraph text-lg text-foreground/70">
                  No complaints found with the selected filter.
                </p>
              </CardContent>
            </Card>
          ) : (
            filteredComplaints.map((complaint) => (
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
                          <Badge
                            className={`${getStatusColor(complaint.status)} border font-paragraph text-sm px-3 py-1 flex items-center gap-2`}
                          >
                            {getStatusIcon(complaint.status)}
                            {complaint.status}
                          </Badge>
                        </div>

                        <p className="font-paragraph text-base text-foreground/80 mb-4 line-clamp-2">
                          {complaint.description}
                        </p>

                        <div className="flex flex-wrap gap-6 text-sm">
                          <div className="flex items-center text-foreground/70">
                            <MapPin className="w-4 h-4 mr-2" />
                            <span className="font-paragraph">{complaint.location}</span>
                          </div>
                          <div className="flex items-center text-foreground/70">
                            <Clock className="w-4 h-4 mr-2" />
                            <span className="font-paragraph">
                              {complaint.submissionDateTime
                                ? format(new Date(complaint.submissionDateTime), 'MMM dd, yyyy')
                                : 'N/A'}
                            </span>
                          </div>
                          {complaint.assignedWorkerName && (
                            <div className="flex items-center text-foreground/70">
                              <span className="font-paragraph text-xs bg-blue-50 text-blue-700 px-2 py-1 rounded">
                                Assigned to {complaint.assignedWorkerName}
                              </span>
                            </div>
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
