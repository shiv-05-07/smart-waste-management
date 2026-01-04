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
  UserCheck
} from 'lucide-react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { format } from 'date-fns';

export default function AdminDashboardPage() {
  // Mock data for complaints
  const [complaints, setComplaints] = useState([
    {
      id: 'WC-001',
      description: 'Overflowing garbage bin near park entrance',
      location: 'Central Park, Main Gate',
      status: 'In Progress',
      submissionDate: new Date('2026-01-02T10:30:00'),
      assignedWorker: 'John Smith',
      citizenName: 'Alice Johnson'
    },
    {
      id: 'WC-002',
      description: 'Illegal dumping on street corner',
      location: '5th Avenue & Oak Street',
      status: 'Resolved',
      submissionDate: new Date('2025-12-28T14:15:00'),
      assignedWorker: 'Sarah Johnson',
      citizenName: 'Bob Williams'
    },
    {
      id: 'WC-003',
      description: 'Broken waste container needs replacement',
      location: 'Community Center Parking Lot',
      status: 'Pending',
      submissionDate: new Date('2026-01-03T09:00:00'),
      assignedWorker: null,
      citizenName: 'Carol Davis'
    },
    {
      id: 'WC-004',
      description: 'Scattered litter in residential area',
      location: 'Maple Street, Block 5',
      status: 'Pending',
      submissionDate: new Date('2026-01-04T08:20:00'),
      assignedWorker: null,
      citizenName: 'David Brown'
    },
    {
      id: 'WC-005',
      description: 'Overflowing recycling bins',
      location: 'Downtown Shopping District',
      status: 'In Progress',
      submissionDate: new Date('2026-01-03T16:45:00'),
      assignedWorker: 'Mike Wilson',
      citizenName: 'Emma Martinez'
    }
  ]);

  // Mock workers data
  const workers = [
    { id: '1', name: 'John Smith' },
    { id: '2', name: 'Sarah Johnson' },
    { id: '3', name: 'Mike Wilson' },
    { id: '4', name: 'Emily Davis' },
    { id: '5', name: 'Robert Lee' }
  ];

  const handleAssignWorker = (complaintId: string, workerName: string) => {
    setComplaints(complaints.map(c => 
      c.id === complaintId ? { ...c, assignedWorker: workerName, status: 'In Progress' } : c
    ));
  };

  const handleUpdateStatus = (complaintId: string, newStatus: string) => {
    setComplaints(complaints.map(c => 
      c.id === complaintId ? { ...c, status: newStatus } : c
    ));
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

        {/* Complaints Management Table */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <Card className="shadow-sm">
            <CardHeader>
              <CardTitle className="font-heading text-2xl font-semibold text-foreground">
                Complaints Management
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-4 px-4 font-heading text-sm font-semibold text-foreground">
                        ID
                      </th>
                      <th className="text-left py-4 px-4 font-heading text-sm font-semibold text-foreground">
                        Location
                      </th>
                      <th className="text-left py-4 px-4 font-heading text-sm font-semibold text-foreground">
                        Description
                      </th>
                      <th className="text-left py-4 px-4 font-heading text-sm font-semibold text-foreground">
                        Citizen
                      </th>
                      <th className="text-left py-4 px-4 font-heading text-sm font-semibold text-foreground">
                        Status
                      </th>
                      <th className="text-left py-4 px-4 font-heading text-sm font-semibold text-foreground">
                        Assigned Worker
                      </th>
                      <th className="text-left py-4 px-4 font-heading text-sm font-semibold text-foreground">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {complaints.map((complaint) => (
                      <tr key={complaint.id} className="border-b border-gray-100 hover:bg-gray-50">
                        <td className="py-4 px-4">
                          <span className="font-paragraph text-sm font-medium text-foreground">
                            {complaint.id}
                          </span>
                        </td>
                        <td className="py-4 px-4">
                          <div className="flex items-start">
                            <MapPin className="w-4 h-4 text-gray-400 mt-0.5 mr-2 flex-shrink-0" />
                            <span className="font-paragraph text-sm text-foreground/80">
                              {complaint.location}
                            </span>
                          </div>
                        </td>
                        <td className="py-4 px-4 max-w-xs">
                          <p className="font-paragraph text-sm text-foreground/80 line-clamp-2">
                            {complaint.description}
                          </p>
                        </td>
                        <td className="py-4 px-4">
                          <span className="font-paragraph text-sm text-foreground/80">
                            {complaint.citizenName}
                          </span>
                        </td>
                        <td className="py-4 px-4">
                          <Select
                            value={complaint.status}
                            onValueChange={(value) => handleUpdateStatus(complaint.id, value)}
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
                        <td className="py-4 px-4">
                          {complaint.assignedWorker ? (
                            <div className="flex items-center">
                              <UserCheck className="w-4 h-4 text-green-600 mr-2" />
                              <span className="font-paragraph text-sm text-foreground/80">
                                {complaint.assignedWorker}
                              </span>
                            </div>
                          ) : (
                            <span className="font-paragraph text-sm text-foreground/50 italic">
                              Not assigned
                            </span>
                          )}
                        </td>
                        <td className="py-4 px-4">
                          {!complaint.assignedWorker && (
                            <Select
                              onValueChange={(value) => handleAssignWorker(complaint.id, value)}
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
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      <Footer />
    </div>
  );
}
