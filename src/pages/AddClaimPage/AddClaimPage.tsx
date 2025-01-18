import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Button, TextField, Card, CardContent, CardHeader, Typography, Badge } from '@mui/material';
import { toast } from 'sonner';
import { z } from 'zod';
import './AddClaimPage.module.scss';

// Define types using zod
const UserRole = z.enum(['unauthorized', 'user']);
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

type UserRole = z.infer<typeof UserRole>;
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
];

interface ComplaintFormData {
  title: string;
  description: string;
}

interface AddClaimPageProps {
  isAuth: boolean;
  user: any; // Replace 'any' with the actual type of your user object
}

const AddClaimPage: React.FC<AddClaimPageProps> = ({ isAuth, user }) => {
  const [complaints, setComplaints] = useState<Complaint[]>(mockComplaints);
  const { register, handleSubmit, reset, formState: { errors } } = useForm<ComplaintFormData>();

  const onSubmit = (data: ComplaintFormData) => {
    const newComplaint: Complaint = {
      id: Math.random().toString(36).substr(2, 9),
      ...data,
      status: 'pending',
      createdAt: new Date().toISOString(),
      userId: 'user1',
    };
    setComplaints(prev => [newComplaint, ...prev]);
    toast.success('Жалоба успешно отправлена');
    reset();
  };

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

  const UserView = () => (
    <div className="max-w-4xl mx-auto p-4 space-y-8">
      {isAuth && (
        <Card>
          <CardHeader title="Отправить жалобу" subheader="Опишите вашу проблему, и мы постараемся помочь" />
          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div>
                <TextField
                  label="Тема жалобы"
                  variant="outlined"
                  fullWidth
                  {...register('title', { required: 'Обязательное поле' })}
                  error={!!errors.title}
                  helperText={errors.title?.message}
                />
              </div>
              <div>
                <TextField
                  label="Подробное описание"
                  variant="outlined"
                  fullWidth
                  multiline
                  rows={4}
                  {...register('description', { required: 'Обязательное поле' })}
                  error={!!errors.description}
                  helperText={errors.description?.message}
                />
              </div>
              <Button type="submit" variant="contained" fullWidth>
                Отправить
              </Button>
            </form>
          </CardContent>
        </Card>
      )}
      <div className="space-y-4">
        <Typography variant="h5">Ваши жалобы</Typography>
        {complaints.map((complaint) => (
          <Card key={complaint.id} className="w-full">
            <CardHeader
              title={complaint.title}
              subheader={new Date(complaint.createdAt).toLocaleDateString()}
              action={
                <Badge className={getStatusColor(complaint.status)}>
                  {getStatusText(complaint.status)}
                </Badge>
              }
            />
            <CardContent>
              <Typography variant="body2">{complaint.description}</Typography>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );

  return (
    <div className="complaint-page">
      <UserView />
    </div>
  );
};

export default AddClaimPage;
