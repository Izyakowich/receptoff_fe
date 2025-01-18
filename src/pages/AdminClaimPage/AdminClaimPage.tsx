import React, { useState } from 'react';
import { Button, TextField, Card, CardContent, CardHeader, Typography, Badge } from '@mui/material';
import { toast } from 'sonner';
import { z } from 'zod';
import './AdminClaimPage.module.scss';

// Define types using zod
const ComplaintStatus = z.enum(['pending', 'in_review', 'resolved', 'rejected']);
const Complaint = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string(),
  status: ComplaintStatus,
  createdAt: z.string(),
  userId: z.string(),
  moderatorNotes: z.string().optional(),
});

type ComplaintStatus = z.infer<typeof ComplaintStatus>;
type Complaint = z.infer<typeof Complaint>;

// Mock complaints data
const mockComplaints: Complaint[] = [
  {
    id: '1',
    title: 'Service Issue',
    description: 'Having problems with...',
    status: 'pending',
    createdAt: '2024-02-20T10:00:00Z',
    userId: 'user1',
  },
  {
    id: '2',
    title: 'Billing Problem',
    description: 'Incorrect charges on...',
    status: 'in_review',
    createdAt: '2024-02-21T10:00:00Z',
    userId: 'user2',
  },
];

const AdminClaimPage = () => {
  const [complaints, setComplaints] = useState<Complaint[]>(mockComplaints);

  const getStatusColor = (status: ComplaintStatus): string => {
    const colors = {
      pending: 'bg-yellow-100 text-yellow-800',
      in_review: 'bg-blue-100 text-blue-800',
      resolved: 'bg-green-100 text-green-800',
      rejected: 'bg-red-100 text-red-800',
    };
    return colors[status];
  };

  const getStatusText = (status: ComplaintStatus): string => {
    const texts = {
      pending: 'На рассмотрении',
      in_review: 'В обработке',
      resolved: 'Решено',
      rejected: 'Отклонено',
    };
    return texts[status];
  };

  return (
    <div className="admin-claim-page max-w-4xl mx-auto p-4 space-y-8">
      <Card>
        <CardHeader title="Панель администратора" subheader="Управление жалобами пользователей" />
      </Card>
      <div className="space-y-4">
        {complaints.map((complaint) => (
          <Card key={complaint.id}>
            <CardHeader
              title={complaint.title}
              subheader={`ID: ${complaint.userId} | ${new Date(complaint.createdAt).toLocaleDateString()}`}
              action={
                <div className="space-x-2">
                  <select
                    className="border rounded p-1"
                    value={complaint.status}
                    onChange={(e) => {
                      const newStatus = e.target.value as ComplaintStatus;
                      setComplaints(prev =>
                        prev.map(c =>
                          c.id === complaint.id ? { ...c, status: newStatus } : c
                        )
                      );
                      toast.success('Статус обновлен');
                    }}
                  >
                    <option value="pending">На рассмотрении</option>
                    <option value="in_review">В обработке</option>
                    <option value="resolved">Решено</option>
                    <option value="rejected">Отклонено</option>
                  </select>
                  <Badge className={getStatusColor(complaint.status)}>
                    {getStatusText(complaint.status)}
                  </Badge>
                </div>
              }
            />
            <CardContent>
              <Typography variant="body2" className="mb-4">{complaint.description}</Typography>
              <TextField
                label="Заметки администратора"
                variant="outlined"
                fullWidth
                value={complaint.moderatorNotes || ''}
                onChange={(e) => {
                  setComplaints(prev =>
                    prev.map(c =>
                      c.id === complaint.id ? { ...c, moderatorNotes: e.target.value } : c
                    )
                  );
                }}
              />
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default AdminClaimPage;
