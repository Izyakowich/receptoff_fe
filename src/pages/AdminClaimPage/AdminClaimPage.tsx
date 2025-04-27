import React, { useState, useEffect } from 'react';
import { Button, Card, CardContent, CardHeader, Typography, Badge, TextField, Select, MenuItem } from '@mui/material';
import { toast } from 'sonner';
import axios from 'axios';
import { z } from 'zod';
import './AdminClaimPage.module.scss';
import Header from 'components/Header';

// Определение типов с использованием zod
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

const AdminClaimPage = () => {
  const [complaints, setComplaints] = useState<Complaint[]>([]);

  // Загрузка жалоб с бэкенда
  const fetchComplaints = async () => {
    try {
      const response = await axios.get('http://localhost:8000/claim/', { withCredentials: true });
      const data = response.data.map((claim: any) => ({
        id: claim.id,
        title: claim.title_claim,
        description: claim.text_claim,
        status: claim.status === 'Проверяется' ? 'pending' : claim.status === 'Рассмотрено' ? 'resolved' : 'rejected',
        createdAt: claim.publication_date,
        userId: claim.id_user,
        moderatorNotes: claim.admin_text_claim || '', // Используем admin_text_claim
      }));
      setComplaints(data);
    } catch (error) {
      console.error('Ошибка загрузки жалоб:', error);
      toast.error('Ошибка загрузки жалоб');
    }
  };

  useEffect(() => {
    fetchComplaints();
  }, []);

  // Обновление статуса жалобы и комментария администратора
  const updateComplaintStatus = async (id: string, status: ComplaintStatus, notes?: string) => {
    try {
      const response = await axios.put(
        `http://localhost:8000/claim/${id}/adminput/`,
        {
          status: status === 'resolved' ? 'Рассмотрено' : 'Удалено',
          admin_text_claim: notes, // Отправляем комментарий администратора
        },
        { withCredentials: true }
      );

      if (response.status === 200) {
        setComplaints((prev) =>
          prev.map((complaint) =>
            complaint.id === id ? { ...complaint, status, moderatorNotes: notes || '' } : complaint
          )
        );
        toast.success('Статус отзыва обновлен');
      }
    } catch (error) {
      console.error('Ошибка обновления статуса:', error);
      toast.error('Ошибка обновления статуса');
    }
  };

  // Цвета для статусов
  const getStatusColor = (status: ComplaintStatus): string => {
    const colors = {
      pending: 'bg-yellow-100 text-yellow-800',
      in_review: 'bg-blue-100 text-blue-800',
      resolved: 'bg-green-100 text-green-800',
      rejected: 'bg-red-100 text-red-800',
    };
    return colors[status];
  };

  // Тексты для статусов
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
    <div className="admin-claim-page max-w-4xl mx-auto p-4 space-y-8" style={{ marginTop: '64px' }}>
      <Header />
      <Card>
        <CardHeader title="Панель администратора" subheader="Управление жалобами пользователей" />
      </Card>
      <div className="space-y-4">
        {complaints.map((complaint) => (
          <Card key={complaint.id}>
            <CardHeader
              title={complaint.title}
              subheader={`ID пользователя: ${complaint.userId} | Дата создания: ${new Date(
                complaint.createdAt
              ).toLocaleDateString()}`}
              action={
                <div className="space-x-2">
                  <Select
                    value={complaint.status}
                    onChange={(e) => {
                      const newStatus = e.target.value as ComplaintStatus;
                      updateComplaintStatus(complaint.id, newStatus, complaint.moderatorNotes);
                    }}
                  >
                    <MenuItem value="pending">На рассмотрении</MenuItem>
                    <MenuItem value="in_review">В обработке</MenuItem>
                    <MenuItem value="resolved">Решено</MenuItem>
                    <MenuItem value="rejected">Отклонено</MenuItem>
                  </Select>
                  <Badge className={getStatusColor(complaint.status)}>
                    {getStatusText(complaint.status)}
                  </Badge>
                </div>
              }
            />
            <CardContent>
              <Typography variant="body2" className="mb-4">
                {complaint.description}
              </Typography>
              <TextField
                label="Ответ администратора"
                variant="outlined"
                fullWidth
                value={complaint.moderatorNotes || ''}
                onChange={(e) => {
                  setComplaints((prev) =>
                    prev.map((c) =>
                      c.id === complaint.id ? { ...c, moderatorNotes: e.target.value } : c
                    )
                  );
                }}
                onBlur={() => updateComplaintStatus(complaint.id, complaint.status, complaint.moderatorNotes)}
              />
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default AdminClaimPage;