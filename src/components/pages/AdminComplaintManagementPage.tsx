import { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { MapPin, Clock, UserCheck, AlertTriangle, Search, Filter } from 'lucide-react';
import { format } from 'date-fns';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import ComplaintDetailModal from '@/components/ComplaintDetailModal';
import { useComplaintStore } from '@/stores/complaintStore';

export default function AdminComplaintManagementPage() {
  const complaints = useComplaintStore((state) => state.complaints);
  const updateComplaint = useComplaintStore((state) => state.updateComplaint);

  const [selectedComplaint, setSelectedComplaint] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [locationFilter, setLocationFilter] = useState<string>('all');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editingRemarks, setEditingRemarks] = useState('');
  const [editingWorker, setEditingWorker] = useState('');

  const workers = [
    { id: '1', name: 'John Smith' },
    { id: '2', name: 'Sarah Johnson' },
    { id: '3', name: 'Mike Wilson' },
    { id: '4', name: 'Emily Davis' },
    { id: '5', name: 'Robert Lee' }
  ];

  // Get unique locations
  const locations = Array.from(new Set(complaints.map((c) => c.location))).filter(Boolean);

  // Filter complaints
  const filteredComplaints = complaints.filter((complaint) => {
    const matchesSearch =
      complaint._id?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      complaint.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      complaint.location?.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus = statusFilter === 'all' || complaint.status === statusFilter;
    const matchesLocation = locationFilter === 'all' || complaint.location === locationFilter;

    return matchesSearch && matchesStatus && matchesLocation;
  });

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
        return <AlertTriangle className="w-4 h-4" />;
      case 'In Progress':
        return <AlertTriangle className="w-4 h-4" />;
      case 'Resolved':
        return <UserCheck className="w-4 h-4" />;
      default:
        return null;
    }
  };

  const handleUpdateStatus = (id: string, newStatus: string) => {
    updateComplaint(id, { status: newStatus });
  };

  const handleAssignWorker = (id: string, workerName: string) => {
    updateComplaint(id, { assignedWorkerName: workerName, status: 'In Progress' });
  };

  const handleSaveRemarks = (id: string) => {
    updateComplaint(id, { adminRemarks: editingRemarks });
    setEditingId(null);
    setEditingRemarks('');
  };

  const handleOpenModal = (complaint: any) => {
    setSelectedComplaint(complaint);
    setIsModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <div className="max-w-[100rem] mx-auto px-6 md:px-12 py-16">
        {/* Admin Badge */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <div className="bg-secondary/10 border border-secondary/30 rounded p-4 flex items-center gap-3">
            <AlertTriangle className="w-5 h-5 text-secondary flex-shrink-0" />
            <p className="font-heading text-sm font-semibold text-secondary">
              Admin Access Only - Advanced Complaint Management
            </p>
          </div>
        </motion.div>

        {/* Page Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-heading font-semibold text-foreground mb-4">
            Complaint Management
          </h1>
          <p className="text-lg font-paragraph text-foreground/70">
            Advanced tools for managing and resolving community complaints
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
            <CardHeader>
              <CardTitle className="font-heading text-lg font-semibold text-foreground flex items-center">
                <Filter className="w-5 h-5 mr-2" />
                Filters & Search
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div>
                  <label className="font-paragraph text-sm text-foreground mb-2 block">
                    Search
                  </label>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <Input
                      type="text"
                      placeholder="Search by ID, description, location..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10 font-paragraph"
                    />
                  </div>
                </div>

                <div>
                  <label className="font-paragraph text-sm text-foreground mb-2 block">
                    Status
                  </label>
                  <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Statuses</SelectItem>
                      <SelectItem value="Pending">Pending</SelectItem>
                      <SelectItem value="In Progress">In Progress</SelectItem>
                      <SelectItem value="Resolved">Resolved</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="font-paragraph text-sm text-foreground mb-2 block">
                    Location
                  </label>
                  <Select value={locationFilter} onValueChange={setLocationFilter}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Locations</SelectItem>
                      {locations.map((location) => (
                        <SelectItem key={location} value={location || ''}>
                          {location}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex items-end">
                  <div className="text-sm font-paragraph text-foreground/70">
                    {filteredComplaints.length} complaint{filteredComplaints.length !== 1 ? 's' : ''}
                  </div>
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
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200 bg-gray-50">
                      <th className="text-left py-4 px-6 font-heading text-sm font-semibold text-foreground">
                        ID
                      </th>
                      <th className="text-left py-4 px-6 font-heading text-sm font-semibold text-foreground">
                        Description
                      </th>
                      <th className="text-left py-4 px-6 font-heading text-sm font-semibold text-foreground">
                        Location
                      </th>
                      <th className="text-left py-4 px-6 font-heading text-sm font-semibold text-foreground">
                        Status
                      </th>
                      <th className="text-left py-4 px-6 font-heading text-sm font-semibold text-foreground">
                        Assigned To
                      </th>
                      <th className="text-left py-4 px-6 font-heading text-sm font-semibold text-foreground">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredComplaints.map((complaint) => (
                      <tr
                        key={complaint._id}
                        className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
                      >
                        <td className="py-4 px-6">
                          <button
                            onClick={() => handleOpenModal(complaint)}
                            className="font-paragraph text-sm font-medium text-primary hover:underline"
                          >
                            {complaint._id}
                          </button>
                        </td>
                        <td className="py-4 px-6 max-w-xs">
                          <p className="font-paragraph text-sm text-foreground/80 line-clamp-2">
                            {complaint.description}
                          </p>
                        </td>
                        <td className="py-4 px-6">
                          <div className="flex items-center text-foreground/80">
                            <MapPin className="w-4 h-4 mr-2 flex-shrink-0" />
                            <span className="font-paragraph text-sm">{complaint.location}</span>
                          </div>
                        </td>
                        <td className="py-4 px-6">
                          <Select
                            value={complaint.status || ''}
                            onValueChange={(value) => handleUpdateStatus(complaint._id, value)}
                          >
                            <SelectTrigger className="w-[140px]">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="Pending">Pending</SelectItem>
                              <SelectItem value="In Progress">In Progress</SelectItem>
                              <SelectItem value="Resolved">Resolved</SelectItem>
                            </SelectContent>
                          </Select>
                        </td>
                        <td className="py-4 px-6">
                          {complaint.assignedWorkerName ? (
                            <div className="flex items-center">
                              <UserCheck className="w-4 h-4 text-green-600 mr-2" />
                              <span className="font-paragraph text-sm text-foreground/80">
                                {complaint.assignedWorkerName}
                              </span>
                            </div>
                          ) : (
                            <Select
                              onValueChange={(value) => handleAssignWorker(complaint._id, value)}
                            >
                              <SelectTrigger className="w-[140px]">
                                <SelectValue placeholder="Assign worker" />
                              </SelectTrigger>
                              <SelectContent>
                                {workers.map((worker) => (
                                  <SelectItem key={worker.id} value={worker.name}>
                                    {worker.name}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          )}
                        </td>
                        <td className="py-4 px-6">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => {
                              setEditingId(complaint._id);
                              setEditingRemarks(complaint.adminRemarks || '');
                            }}
                            className="font-paragraph text-xs"
                          >
                            Add Remarks
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Remarks Modal */}
        {editingId && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-40 flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white rounded-sm shadow-lg max-w-md w-full p-6"
            >
              <h3 className="text-xl font-heading font-semibold text-foreground mb-4">
                Add Admin Remarks
              </h3>
              <Textarea
                value={editingRemarks}
                onChange={(e) => setEditingRemarks(e.target.value)}
                placeholder="Add remarks about the complaint resolution..."
                className="w-full font-paragraph min-h-[120px] mb-4"
              />
              <div className="flex gap-3">
                <Button
                  onClick={() => {
                    handleSaveRemarks(editingId);
                  }}
                  className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90 rounded"
                >
                  Save Remarks
                </Button>
                <Button
                  onClick={() => setEditingId(null)}
                  variant="outline"
                  className="flex-1 rounded"
                >
                  Cancel
                </Button>
              </div>
            </motion.div>
          </motion.div>
        )}
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
