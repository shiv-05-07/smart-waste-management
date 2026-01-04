import { create } from 'zustand';
import { WasteComplaints } from '@/entities';

interface ComplaintWithDetails extends WasteComplaints {
  citizenName?: string;
  citizenEmail?: string;
  adminRemarks?: string;
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
      description: 'Overflowing garbage bin near park entrance',
      location: 'Central Park, Main Gate',
      status: 'In Progress',
      submissionDateTime: new Date('2026-01-02T10:30:00'),
      assignedWorkerName: 'John Smith',
      citizenName: 'Alice Johnson',
      citizenEmail: 'alice@example.com',
      adminRemarks: 'Crew dispatched. Cleanup in progress.',
      complaintImage: 'https://static.wixstatic.com/media/12d367_71ebdd7141d041e4be3d91d80d4578dd~mv2.png?id=complaint-001'
    },
    {
      _id: 'WC-002',
      description: 'Illegal dumping on street corner',
      location: '5th Avenue & Oak Street',
      status: 'Resolved',
      submissionDateTime: new Date('2025-12-28T14:15:00'),
      assignedWorkerName: 'Sarah Johnson',
      citizenName: 'Bob Williams',
      citizenEmail: 'bob@example.com',
      adminRemarks: 'Area cleaned and sanitized. Monitoring in place.',
      complaintImage: 'https://static.wixstatic.com/media/12d367_71ebdd7141d041e4be3d91d80d4578dd~mv2.png?id=complaint-002'
    },
    {
      _id: 'WC-003',
      description: 'Broken waste container needs replacement',
      location: 'Community Center Parking Lot',
      status: 'Pending',
      submissionDateTime: new Date('2026-01-03T09:00:00'),
      assignedWorkerName: undefined,
      citizenName: 'Carol Davis',
      citizenEmail: 'carol@example.com',
      adminRemarks: undefined,
      complaintImage: 'https://static.wixstatic.com/media/12d367_71ebdd7141d041e4be3d91d80d4578dd~mv2.png?id=complaint-003'
    },
    {
      _id: 'WC-004',
      description: 'Scattered litter in residential area',
      location: 'Maple Street, Block 5',
      status: 'Pending',
      submissionDateTime: new Date('2026-01-04T08:20:00'),
      assignedWorkerName: undefined,
      citizenName: 'David Brown',
      citizenEmail: 'david@example.com',
      adminRemarks: undefined,
      complaintImage: 'https://static.wixstatic.com/media/12d367_71ebdd7141d041e4be3d91d80d4578dd~mv2.png?id=complaint-004'
    },
    {
      _id: 'WC-005',
      description: 'Overflowing recycling bins',
      location: 'Downtown Shopping District',
      status: 'In Progress',
      submissionDateTime: new Date('2026-01-03T16:45:00'),
      assignedWorkerName: 'Mike Wilson',
      citizenName: 'Emma Martinez',
      citizenEmail: 'emma@example.com',
      adminRemarks: 'Bins being emptied. Expected completion in 2 hours.',
      complaintImage: 'https://static.wixstatic.com/media/12d367_71ebdd7141d041e4be3d91d80d4578dd~mv2.png?id=complaint-005'
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
