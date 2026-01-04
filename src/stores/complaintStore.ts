import { create } from 'zustand';
import { WasteComplaints } from '@/entities';

interface ResolutionData {
  description: string;
  proofImage?: string;
  resolvedDateTime: Date | string;
  resolvedBy?: string;
  adminRemarks?: string;
}

interface ComplaintWithDetails extends WasteComplaints {
  citizenName?: string;
  citizenEmail?: string;
  adminRemarks?: string;
  resolution?: ResolutionData;
  complaintTitle?: string;
  citizenPhone?: string;
  totalComplaintsByUser?: number;
}

interface ComplaintStore {
  complaints: ComplaintWithDetails[];
  addComplaint: (complaint: ComplaintWithDetails) => void;
  updateComplaint: (id: string, updates: Partial<ComplaintWithDetails>) => void;
  deleteComplaint: (id: string) => void;
  getComplaintById: (id: string) => ComplaintWithDetails | undefined;
  getComplaintsByCitizen: (citizenEmail: string) => ComplaintWithDetails[];
  setComplaints: (complaints: ComplaintWithDetails[]) => void;
}

export const useComplaintStore = create<ComplaintStore>((set, get) => ({
  complaints: [
    {
      _id: 'WC-001',
      complaintTitle: 'Overflowing Garbage Bin',
      description: 'Overflowing garbage bin near park entrance causing unpleasant odors and attracting pests',
      location: 'Central Park, Main Gate',
      status: 'In Progress',
      submissionDateTime: new Date('2026-01-02T10:30:00'),
      assignedWorkerName: 'John Smith',
      citizenName: 'Alice Johnson',
      citizenEmail: 'alice@example.com',
      citizenPhone: '(555) 123-4567',
      adminRemarks: 'Crew dispatched. Cleanup in progress.',
      complaintImage: 'https://static.wixstatic.com/media/12d367_71ebdd7141d041e4be3d91d80d4578dd~mv2.png?id=complaint-001',
      totalComplaintsByUser: 3
    },
    {
      _id: 'WC-002',
      complaintTitle: 'Illegal Dumping',
      description: 'Illegal dumping on street corner with construction waste and household items scattered',
      location: '5th Avenue & Oak Street',
      status: 'Resolved',
      submissionDateTime: new Date('2025-12-28T14:15:00'),
      assignedWorkerName: 'Sarah Johnson',
      citizenName: 'Bob Williams',
      citizenEmail: 'bob@example.com',
      citizenPhone: '(555) 234-5678',
      adminRemarks: 'Area cleaned and sanitized. Monitoring in place.',
      complaintImage: 'https://static.wixstatic.com/media/12d367_71ebdd7141d041e4be3d91d80d4578dd~mv2.png?id=complaint-002',
      totalComplaintsByUser: 1,
      resolution: {
        description: 'Complete cleanup of dumped materials. Area sanitized and monitored for future violations.',
        proofImage: 'https://static.wixstatic.com/media/12d367_71ebdd7141d041e4be3d91d80d4578dd~mv2.png?id=resolution-002',
        resolvedDateTime: new Date('2025-12-29T14:00:00'),
        resolvedBy: 'Sarah Johnson',
        adminRemarks: 'Cleanup completed successfully. Area now clean and safe.'
      }
    },
    {
      _id: 'WC-003',
      complaintTitle: 'Broken Waste Container',
      description: 'Broken waste container needs replacement at community center parking lot',
      location: 'Community Center Parking Lot',
      status: 'Pending',
      submissionDateTime: new Date('2026-01-03T09:00:00'),
      assignedWorkerName: undefined,
      citizenName: 'Carol Davis',
      citizenEmail: 'carol@example.com',
      citizenPhone: '(555) 345-6789',
      adminRemarks: undefined,
      complaintImage: 'https://static.wixstatic.com/media/12d367_71ebdd7141d041e4be3d91d80d4578dd~mv2.png?id=complaint-003',
      totalComplaintsByUser: 2
    },
    {
      _id: 'WC-004',
      complaintTitle: 'Scattered Litter',
      description: 'Scattered litter in residential area including plastic bags, bottles, and food waste',
      location: 'Maple Street, Block 5',
      status: 'Pending',
      submissionDateTime: new Date('2026-01-04T08:20:00'),
      assignedWorkerName: undefined,
      citizenName: 'David Brown',
      citizenEmail: 'david@example.com',
      citizenPhone: '(555) 456-7890',
      adminRemarks: undefined,
      complaintImage: 'https://static.wixstatic.com/media/12d367_71ebdd7141d041e4be3d91d80d4578dd~mv2.png?id=complaint-004',
      totalComplaintsByUser: 1
    },
    {
      _id: 'WC-005',
      complaintTitle: 'Overflowing Recycling Bins',
      description: 'Overflowing recycling bins at shopping district causing spillage onto sidewalk',
      location: 'Downtown Shopping District',
      status: 'In Progress',
      submissionDateTime: new Date('2026-01-03T16:45:00'),
      assignedWorkerName: 'Mike Wilson',
      citizenName: 'Emma Martinez',
      citizenEmail: 'emma@example.com',
      citizenPhone: '(555) 567-8901',
      adminRemarks: 'Bins being emptied. Expected completion in 2 hours.',
      complaintImage: 'https://static.wixstatic.com/media/12d367_71ebdd7141d041e4be3d91d80d4578dd~mv2.png?id=complaint-005',
      totalComplaintsByUser: 2
    },
    {
      _id: 'WC-006',
      complaintTitle: 'Uncollected Trash Bags',
      description: 'Multiple uncollected trash bags piling up on residential street for over a week',
      location: 'Oak Avenue, Residential Zone',
      status: 'Resolved',
      submissionDateTime: new Date('2026-01-01T11:15:00'),
      assignedWorkerName: 'Emily Davis',
      citizenName: 'Frank Wilson',
      citizenEmail: 'frank@example.com',
      citizenPhone: '(555) 678-9012',
      adminRemarks: 'Scheduled for collection and completed.',
      complaintImage: 'https://static.wixstatic.com/media/12d367_71ebdd7141d041e4be3d91d80d4578dd~mv2.png?id=complaint-006',
      totalComplaintsByUser: 1,
      resolution: {
        description: 'All trash bags collected and disposed of properly. Street cleaned and sanitized.',
        proofImage: 'https://static.wixstatic.com/media/12d367_71ebdd7141d041e4be3d91d80d4578dd~mv2.png?id=resolution-006',
        resolvedDateTime: new Date('2026-01-02T10:00:00'),
        resolvedBy: 'Emily Davis',
        adminRemarks: 'Cleanup completed. Scheduled regular collection for this area.'
      }
    },
    {
      _id: 'WC-007',
      complaintTitle: 'Hazardous Waste Dumping',
      description: 'Hazardous waste materials dumped near school area - potential safety risk',
      location: 'School District Area, Riverside',
      status: 'In Progress',
      submissionDateTime: new Date('2026-01-04T13:30:00'),
      assignedWorkerName: 'Robert Lee',
      citizenName: 'Grace Chen',
      citizenEmail: 'grace@example.com',
      citizenPhone: '(555) 789-0123',
      adminRemarks: 'Priority case. Hazmat team notified. Cleanup underway.',
      complaintImage: 'https://static.wixstatic.com/media/12d367_71ebdd7141d041e4be3d91d80d4578dd~mv2.png?id=complaint-007',
      totalComplaintsByUser: 1
    },
    {
      _id: 'WC-008',
      complaintTitle: 'Overflowing Street Dumpster',
      description: 'Street dumpster overflowing with commercial waste blocking pedestrian access',
      location: 'Market Street, Downtown',
      status: 'Resolved',
      submissionDateTime: new Date('2025-12-30T15:45:00'),
      assignedWorkerName: 'John Smith',
      citizenName: 'Henry Thompson',
      citizenEmail: 'henry@example.com',
      citizenPhone: '(555) 890-1234',
      adminRemarks: 'Dumpster emptied and area cleaned.',
      complaintImage: 'https://static.wixstatic.com/media/12d367_71ebdd7141d041e4be3d91d80d4578dd~mv2.png?id=complaint-008',
      totalComplaintsByUser: 2,
      resolution: {
        description: 'Dumpster emptied and replaced. Area thoroughly cleaned and sanitized.',
        proofImage: 'https://static.wixstatic.com/media/12d367_71ebdd7141d041e4be3d91d80d4578dd~mv2.png?id=resolution-008',
        resolvedDateTime: new Date('2025-12-31T09:30:00'),
        resolvedBy: 'John Smith',
        adminRemarks: 'Dumpster servicing schedule increased for this location.'
      }
    },
    {
      _id: 'WC-009',
      complaintTitle: 'Litter in Park Area',
      description: 'Excessive litter and debris in park area after weekend events',
      location: 'Riverside Park, North Section',
      status: 'Pending',
      submissionDateTime: new Date('2026-01-04T09:00:00'),
      assignedWorkerName: undefined,
      citizenName: 'Iris Martinez',
      citizenEmail: 'iris@example.com',
      citizenPhone: '(555) 901-2345',
      adminRemarks: undefined,
      complaintImage: 'https://static.wixstatic.com/media/12d367_71ebdd7141d041e4be3d91d80d4578dd~mv2.png?id=complaint-009',
      totalComplaintsByUser: 1
    },
    {
      _id: 'WC-010',
      complaintTitle: 'Broken Glass & Debris',
      description: 'Broken glass and sharp debris scattered on sidewalk near bus stop',
      location: 'Main Street & 3rd Avenue',
      status: 'Resolved',
      submissionDateTime: new Date('2025-12-27T10:20:00'),
      assignedWorkerName: 'Sarah Johnson',
      citizenName: 'Jack Anderson',
      citizenEmail: 'jack@example.com',
      citizenPhone: '(555) 012-3456',
      adminRemarks: 'Safety hazard addressed immediately.',
      complaintImage: 'https://static.wixstatic.com/media/12d367_71ebdd7141d041e4be3d91d80d4578dd~mv2.png?id=complaint-010',
      totalComplaintsByUser: 3,
      resolution: {
        description: 'All broken glass and debris safely removed. Area sanitized. Safety barriers placed temporarily.',
        proofImage: 'https://static.wixstatic.com/media/12d367_71ebdd7141d041e4be3d91d80d4578dd~mv2.png?id=resolution-010',
        resolvedDateTime: new Date('2025-12-27T14:00:00'),
        resolvedBy: 'Sarah Johnson',
        adminRemarks: 'Hazard eliminated. Area now safe for public use.'
      }
    },
    {
      _id: 'WC-011',
      complaintTitle: 'Clogged Storm Drain',
      description: 'Storm drain clogged with leaves and debris causing water pooling',
      location: 'Elm Street, Residential',
      status: 'In Progress',
      submissionDateTime: new Date('2026-01-04T07:15:00'),
      assignedWorkerName: 'Mike Wilson',
      citizenName: 'Karen White',
      citizenEmail: 'karen@example.com',
      citizenPhone: '(555) 123-4568',
      adminRemarks: 'Drain cleaning crew dispatched. Work in progress.',
      complaintImage: 'https://static.wixstatic.com/media/12d367_71ebdd7141d041e4be3d91d80d4578dd~mv2.png?id=complaint-011',
      totalComplaintsByUser: 1
    }
  ],

  addComplaint: (complaint) => {
    set((state) => ({
      complaints: [complaint, ...state.complaints]
    }));
  },

  updateComplaint: (id, updates) => {
    set((state) => ({
      complaints: state.complaints.map((c) =>
        c._id === id ? { ...c, ...updates } : c
      )
    }));
  },

  deleteComplaint: (id) => {
    set((state) => ({
      complaints: state.complaints.filter((c) => c._id !== id)
    }));
  },

  getComplaintById: (id) => {
    return get().complaints.find((c) => c._id === id);
  },

  getComplaintsByCitizen: (citizenEmail) => {
    return get().complaints.filter((c) => c.citizenEmail === citizenEmail);
  },

  setComplaints: (complaints) => {
    set({ complaints });
  }
}));
