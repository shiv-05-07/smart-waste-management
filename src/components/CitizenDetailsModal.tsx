import { motion, AnimatePresence } from 'framer-motion';
import { X, Mail, Phone, FileText, AlertCircle } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { format } from 'date-fns';

interface CitizenDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  citizenName?: string;
  citizenEmail?: string;
  citizenPhone?: string;
  totalComplaints?: number;
  recentComplaints?: Array<{
    _id: string;
    complaintTitle?: string;
    description?: string;
    status?: string;
    submissionDateTime?: Date | string;
  }>;
}

export default function CitizenDetailsModal({
  isOpen,
  onClose,
  citizenName,
  citizenEmail,
  citizenPhone,
  totalComplaints = 0,
  recentComplaints = []
}: CitizenDetailsModalProps) {
  const maskEmail = (email?: string) => {
    if (!email) return 'N/A';
    const [name, domain] = email.split('@');
    const maskedName = name.charAt(0) + '*'.repeat(name.length - 2) + name.charAt(name.length - 1);
    return `${maskedName}@${domain}`;
  };

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

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 z-40"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
          >
            <div className="bg-white rounded-sm shadow-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              {/* Header */}
              <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-heading font-semibold text-foreground">
                    Citizen Details
                  </h2>
                  <p className="font-paragraph text-sm text-foreground/70 mt-1">
                    Citizen Information & Complaint History
                  </p>
                </div>
                <button
                  onClick={onClose}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                  aria-label="Close"
                >
                  <X className="w-6 h-6 text-foreground" />
                </button>
              </div>

              {/* Content */}
              <div className="p-6 space-y-6">
                {/* Citizen Information */}
                <div className="bg-blue-50 border border-blue-200 rounded-sm p-6">
                  <h3 className="font-heading text-lg font-semibold text-blue-900 mb-4">
                    Personal Information
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <p className="font-paragraph text-sm text-blue-700 mb-1">Full Name</p>
                      <p className="font-heading text-lg font-semibold text-blue-900">
                        {citizenName || 'N/A'}
                      </p>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Mail className="w-5 h-5 text-blue-700 flex-shrink-0" />
                      <div>
                        <p className="font-paragraph text-sm text-blue-700">Email Address</p>
                        <p className="font-paragraph text-base text-blue-900">
                          {maskEmail(citizenEmail)}
                        </p>
                      </div>
                    </div>
                    {citizenPhone && (
                      <div className="flex items-center space-x-3">
                        <Phone className="w-5 h-5 text-blue-700 flex-shrink-0" />
                        <div>
                          <p className="font-paragraph text-sm text-blue-700">Phone Number</p>
                          <p className="font-paragraph text-base text-blue-900">
                            {citizenPhone}
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Complaint Statistics */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Card className="shadow-sm">
                    <CardContent className="p-4 text-center">
                      <p className="font-paragraph text-sm text-foreground/70 mb-2">
                        Total Complaints
                      </p>
                      <p className="text-3xl font-heading font-bold text-primary">
                        {totalComplaints}
                      </p>
                    </CardContent>
                  </Card>
                  <Card className="shadow-sm">
                    <CardContent className="p-4 text-center">
                      <p className="font-paragraph text-sm text-foreground/70 mb-2">
                        Resolved
                      </p>
                      <p className="text-3xl font-heading font-bold text-green-600">
                        {recentComplaints.filter(c => c.status === 'Resolved').length}
                      </p>
                    </CardContent>
                  </Card>
                  <Card className="shadow-sm">
                    <CardContent className="p-4 text-center">
                      <p className="font-paragraph text-sm text-foreground/70 mb-2">
                        Pending
                      </p>
                      <p className="text-3xl font-heading font-bold text-yellow-600">
                        {recentComplaints.filter(c => c.status === 'Pending').length}
                      </p>
                    </CardContent>
                  </Card>
                </div>

                {/* Complaint History */}
                <div>
                  <h3 className="font-heading text-lg font-semibold text-foreground mb-4 flex items-center">
                    <FileText className="w-5 h-5 mr-2" />
                    Complaint History
                  </h3>
                  {recentComplaints.length === 0 ? (
                    <div className="bg-gray-50 border border-gray-200 rounded-sm p-6 text-center">
                      <AlertCircle className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                      <p className="font-paragraph text-sm text-foreground/70">
                        No complaints found for this citizen
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {recentComplaints.map((complaint) => (
                        <Card key={complaint._id} className="shadow-sm">
                          <CardContent className="p-4">
                            <div className="flex items-start justify-between gap-4">
                              <div className="flex-1">
                                <div className="flex items-center gap-2 mb-2">
                                  <h4 className="font-heading text-base font-semibold text-foreground">
                                    {complaint.complaintTitle || complaint._id}
                                  </h4>
                                  <Badge className={`${getStatusColor(complaint.status)} border font-paragraph text-xs px-2 py-0.5`}>
                                    {complaint.status}
                                  </Badge>
                                </div>
                                <p className="font-paragraph text-sm text-foreground/80 mb-2 line-clamp-2">
                                  {complaint.description}
                                </p>
                                <p className="font-paragraph text-xs text-foreground/60">
                                  Submitted: {complaint.submissionDateTime
                                    ? format(new Date(complaint.submissionDateTime), 'MMM dd, yyyy HH:mm')
                                    : 'N/A'}
                                </p>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  )}
                </div>

                {/* Close Button */}
                <div className="pt-4 border-t border-gray-200">
                  <button
                    onClick={onClose}
                    className="w-full bg-primary text-primary-foreground hover:bg-primary/90 rounded py-3 font-paragraph text-base font-medium transition-colors"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
