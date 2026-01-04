import { motion, AnimatePresence } from 'framer-motion';
import { X, MapPin, Clock, User, FileText, CheckCircle, AlertCircle, Award } from 'lucide-react';
import { Image } from '@/components/ui/image';
import { Badge } from '@/components/ui/badge';
import { format } from 'date-fns';
import { WasteComplaints } from '@/entities';

interface ResolutionData {
  description: string;
  proofImage?: string;
  resolvedDateTime: Date | string;
  resolvedBy?: string;
  adminRemarks?: string;
}

interface ComplaintDetailModalProps {
  complaint: WasteComplaints & {
    citizenName?: string;
    adminRemarks?: string;
    resolution?: ResolutionData;
    complaintTitle?: string;
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
                    {complaint.complaintTitle || 'Complaint Details'}
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
                  <div className="flex items-center gap-2">
                    <Badge
                      className={`${getStatusColor(complaint.status)} border font-paragraph text-sm px-3 py-1 flex items-center gap-2`}
                    >
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
                  <div className="bg-blue-50 border border-blue-200 rounded p-4">
                    <div className="flex items-start">
                      <FileText className="w-5 h-5 text-blue-700 mt-0.5 mr-3 flex-shrink-0" />
                      <div>
                        <h3 className="font-heading text-sm font-semibold text-blue-900 mb-1">
                          Admin Remarks
                        </h3>
                        <p className="font-paragraph text-base text-blue-800 leading-relaxed">
                          {complaint.adminRemarks}
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Resolution Information */}
                {complaint.resolution && (
                  <div className="bg-green-50 border border-green-200 rounded p-4 space-y-4">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-5 h-5 text-green-700" />
                      <h3 className="font-heading text-lg font-semibold text-green-900">
                        How the Issue Was Resolved
                      </h3>
                    </div>

                    <div>
                      <p className="font-paragraph text-sm text-green-700 mb-1">
                        Resolution Description
                      </p>
                      <p className="font-paragraph text-base text-green-800 leading-relaxed">
                        {complaint.resolution.description}
                      </p>
                    </div>

                    {complaint.resolution.proofImage && (
                      <div>
                        <p className="font-paragraph text-sm text-green-700 mb-2">
                          Resolution Proof (After Cleanup)
                        </p>
                        <Image
                          src={complaint.resolution.proofImage}
                          alt="Resolution proof"
                          width={400}
                          className="w-full rounded-sm object-cover max-h-96"
                        />
                      </div>
                    )}

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                      <div>
                        <p className="font-paragraph text-sm text-green-700 mb-1">
                          Resolved By
                        </p>
                        <p className="font-paragraph text-base text-green-800 font-semibold">
                          {complaint.resolution.resolvedBy || 'Municipal Team'}
                        </p>
                      </div>
                      <div>
                        <p className="font-paragraph text-sm text-green-700 mb-1">
                          Resolution Date
                        </p>
                        <p className="font-paragraph text-base text-green-800 font-semibold">
                          {complaint.resolution.resolvedDateTime
                            ? format(new Date(complaint.resolution.resolvedDateTime), 'MMM dd, yyyy HH:mm')
                            : 'N/A'}
                        </p>
                      </div>
                    </div>

                    {complaint.resolution.adminRemarks && (
                      <div className="pt-2 border-t border-green-200">
                        <p className="font-paragraph text-sm text-green-700 mb-1">
                          Additional Notes
                        </p>
                        <p className="font-paragraph text-base text-green-800">
                          {complaint.resolution.adminRemarks}
                        </p>
                      </div>
                    )}
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
