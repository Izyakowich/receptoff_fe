import React, { useState, useEffect } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { Button, TextField, Card, CardContent, CardHeader, Typography, Badge } from '@mui/material';
import { toast } from 'sonner';
import { z } from 'zod';
import axios from 'axios';
import { setClaimAction } from 'Slices/ClaimSlice';
import { useDispatch } from 'react-redux';
import Header from 'components/Header';

// Типы данных
type ClaimData = {
  id: number;
  titleClaim: string;
  textClaim: string;
  adminTextClaim: string | null; // Новое поле
  publicationDate: string;
  approvingDate: string | null;
  status: string;
};

export type ReceivedClaimData = {
  id: number;
  title_claim: string;
  text_claim: string;
  admin_text_claim: string | null; // Новое поле
  publication_date: string;
  approving_date: string | null;
  status: string;
};

const UserRole = z.enum(['unauthorized', 'user']);
type UserRole = z.infer<typeof UserRole>;

interface AddClaimPageProps {
  isAuth: boolean;
  user: any; // Типизируйте пользователя, если возможно
}

interface FormData {
  titleClaim: string;
  textClaim: string;
  adminTextClaim?: string; // Новое поле
}

const AddClaimPage: React.FC<AddClaimPageProps> = ({ isAuth, user }) => {
  const dispatch = useDispatch();
  const { register, handleSubmit, reset, formState: { errors } } = useForm<FormData>();
  const [currentClaim, setClaim] = useState<ClaimData[]>([]);

  const getAllClaim = async () => {
    try {
      const response = await axios.get('http://localhost:8000/claim/', { withCredentials: true });
      const newArr = response.data.map((raw: ReceivedClaimData) => ({
        id: raw.id,
        status: raw.status,
        titleClaim: raw.title_claim,
        textClaim: raw.text_claim,
        adminTextClaim: raw.admin_text_claim || null, // Новое поле
        publicationDate: raw.publication_date,
        approvingDate: raw.approving_date,
      }));
      setClaim(newArr);
      dispatch(setClaimAction(newArr));
    } catch (error) {
      console.error('Ошибка загрузки жалоб:', error);
      toast.error('Ошибка загрузки жалоб');
    }
  };

  const postClaim: SubmitHandler<FormData> = async (data) => {
    try {
      console.log('Отправляемые данные:', data);
      const response = await axios.post(
        'http://localhost:8000/claim/post/',
        {
          title_claim: data.titleClaim,
          text_claim: data.textClaim,
          admin_text_claim: data.adminTextClaim || null, // Новое поле
          id_user: user?.id,
        },
        { withCredentials: true }
      );

      console.log('Ответ от сервера:', response.data);

      const addedClaim = {
        id: response.data.id,
        titleClaim: response.data.title_claim,
        textClaim: response.data.text_claim,
        adminTextClaim: response.data.admin_text_claim || null, // Новое поле
        publicationDate: response.data.publication_date,
        approvingDate: response.data.approving_date,
        status: response.data.status,
      };
      setClaim((prev) => [addedClaim, ...prev]);
      toast.success('Жалоба успешно добавлена');
      reset();
    } catch (error) {
      console.error('Ошибка при добавлении отзыва:', error);
      toast.error('Ошибка при добавлении отзыва');
    }
  };

  const getStatusColor = (status: string): string => {
    const colors: { [key: string]: string } = {
      registered: 'bg-yellow-100 text-yellow-800',
      denied: 'bg-red-100 text-red-800',
      moderating: 'bg-blue-100 text-blue-800',
      resolved: 'bg-green-100 text-green-800',
    };
    return colors[status] || '';
  };

  useEffect(() => {
    getAllClaim();
  }, []);

  const UserView = () => (
    <div className="max-w-4xl mx-auto p-4 space-y-8">
      <Header />
      {isAuth && (
        <Card>
          <CardHeader title="Оставьте отзыв" subheader="Помогите нам стать лучше" />
          <CardContent>
            <form onSubmit={handleSubmit(postClaim)} className="space-y-4">
              <div>
                <TextField
                  label="Тема отзыва"
                  variant="outlined"
                  fullWidth
                  {...register('titleClaim', { required: 'Обязательное поле' })}
                  error={!!errors.titleClaim}
                  helperText={errors.titleClaim?.message}
                />
              </div>
              <div>
                <TextField
                  label="Подробное описание"
                  variant="outlined"
                  fullWidth
                  multiline
                  rows={4}
                  {...register('textClaim', { required: 'Обязательное поле' })}
                  error={!!errors.textClaim}
                  helperText={errors.textClaim?.message}
                />
              </div>
              {isAuth && user.isSuperuser && ( // Поле для комментария администратора
                <div>
                  <TextField
                    label="Комментарий администратора"
                    variant="outlined"
                    fullWidth
                    multiline
                    rows={2}
                    {...register('adminTextClaim')}
                  />
                </div>
              )}
              <Button type="submit" variant="contained" fullWidth>
                Отправить
              </Button>
            </form>
          </CardContent>
        </Card>
      )}
      <div className="space-y-4">
        <Typography variant="h5">Отзывы</Typography>
        {currentClaim.map((claim: ClaimData) => (
          <Card key={claim.id} className="w-full">
            <CardHeader
              title={claim.titleClaim}
              subheader={claim.textClaim}
              action={
                <Badge className={getStatusColor(claim.status)}>
                  {claim.status}
                </Badge>
              }
            />
            <CardContent>
              <Typography variant="body2">
                Дата публикации: {new Date(claim.publicationDate).toLocaleDateString()}
              </Typography>
              {claim.approvingDate && (
                <Typography variant="body2">
                  Дата утверждения: {new Date(claim.approvingDate).toLocaleDateString()}
                </Typography>
              )}
              {claim.adminTextClaim && ( // Новый блок для комментария администратора
                <Typography variant="body2" className="mt-4">
                  <strong>Комментарий администратора:</strong> {claim.adminTextClaim}
                </Typography>
              )}
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