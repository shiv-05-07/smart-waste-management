import { motion, AnimatePresence } from 'framer-motion';
import { X, MapPin, Clock, User, FileText, CheckCircle, AlertCircle } from 'lucide-react';
import { Image } from '@/components/ui/image';
import { Badge } from '@/components/ui/badge';
import { format } from 'date-fns';
import { WasteComplaints } from '@/entities';

interface ComplaintDetailModalProps {
  complaint: WasteComplaints & {
    citizenName?: string;
    adminRemarks?: string;
  } | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function ComplaintDetailModal({
  complaint,
  isOpen,
  onClose
}: ComplaintDetailModalProps) {
  if (!complaint) return null;

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
                    {complaint._id}
                  </h2>
                  <p className="font-paragraph text-sm text-foreground/70 mt-1">
                    Complaint Details
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
                {/* Status Badge */}
                <div className="flex items-center justify-between">
                  <h3 className="font-heading text-lg font-semibold text-foreground">
                    Status
                  </h3>
                  <Badge
                    className={`${getStatusColor(complaint.status)} border font-paragraph text-sm px-3 py-1 flex items-center gap-2`}
                  >
                    {getStatusIcon(complaint.status)}
                    {complaint.status}
                  </Badge>
                </div>

                {/* Image */}
                {complaint.complaintImage && (
                  <div>
                    <h3 className="font-heading text-lg font-semibold text-foreground mb-3">
                      Complaint Image
                    </h3>
                    <Image
                      src={complaint.complaintImage}
                      alt="Complaint image"
                      width={400}
                      className="w-full rounded-sm object-cover max-h-96"
                    />
                  </div>
                )}

                {/* Description */}
                <div>
                  <h3 className="font-heading text-lg font-semibold text-foreground mb-2">
                    Description
                  </h3>
                  <p className="font-paragraph text-base text-foreground/80 leading-relaxed">
                    {complaint.description}
                  </p>
                </div>

                {/* Location */}
                <div className="flex items-start">
                  <MapPin className="w-5 h-5 text-primary mt-1 mr-3 flex-shrink-0" />
                  <div>
                    <h3 className="font-heading text-sm font-semibold text-foreground">
                      Location
                    </h3>
                    <p className="font-paragraph text-base text-foreground/80 mt-1">
                      {complaint.location}
                    </p>
                  </div>
                </div>

                {/* Submission Date */}
                <div className="flex items-start">
                  <Clock className="w-5 h-5 text-primary mt-1 mr-3 flex-shrink-0" />
                  <div>
                    <h3 className="font-heading text-sm font-semibold text-foreground">
                      Submitted On
                    </h3>
                    <p className="font-paragraph text-base text-foreground/80 mt-1">
                      {complaint.submissionDateTime
                        ? format(new Date(complaint.submissionDateTime), 'MMM dd, yyyy HH:mm')
                        : 'N/A'}
                    </p>
                  </div>
                </div>

                {/* Citizen Name */}
                {complaint.citizenName && (
                  <div className="flex items-start">
                    <User className="w-5 h-5 text-primary mt-1 mr-3 flex-shrink-0" />
                    <div>
                      <h3 className="font-heading text-sm font-semibold text-foreground">
                        Submitted By
                      </h3>
                      <p className="font-paragraph text-base text-foreground/80 mt-1">
                        {complaint.citizenName}
                      </p>
                    </div>
                  </div>
                )}

                {/* Assigned Worker */}
                {complaint.assignedWorkerName && (
                  <div className="bg-blue-50 border border-blue-200 rounded p-4">
                    <h3 className="font-heading text-sm font-semibold text-blue-900 mb-1">
                      Assigned To
                    </h3>
                    <p className="font-paragraph text-base text-blue-800">
                      {complaint.assignedWorkerName}
                    </p>
                  </div>
                )}

                {/* Admin Remarks */}
                {complaint.adminRemarks && (
                  <div className="bg-green-50 border border-green-200 rounded p-4">
                    <div className="flex items-start">
                      <FileText className="w-5 h-5 text-green-700 mt-0.5 mr-3 flex-shrink-0" />
                      <div>
                        <h3 className="font-heading text-sm font-semibold text-green-900 mb-1">
                          Admin Remarks
                        </h3>
                        <p className="font-paragraph text-base text-green-800 leading-relaxed">
                          {complaint.adminRemarks}
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
