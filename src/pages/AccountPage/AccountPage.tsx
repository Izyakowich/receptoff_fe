import React, { useState, useEffect } from 'react';
import Header from 'components/Header';
import styles from './AccountPage.module.scss';
import { useUser } from 'Slices/AuthSlice';
import { Button, Form } from 'react-bootstrap';
import ApplicationsTable from 'components/ApplicationsTable';
import { useApplications } from 'Slices/ApplicationsSlice';
import axios from 'axios';
import { toast } from 'react-toastify';

const AccountPage: React.FC = () => {
    const user = useUser();
    const applications = useApplications();
    // Состояния для формы
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [middleName, setMiddleName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [address, setAddress] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const response = await axios.get('http://localhost:8000/user/profile/', { withCredentials: true });
                setFirstName(response.data.first_name || '');
                setLastName(response.data.last_name || '');
                setMiddleName(response.data.middle_name || '');
                setPhoneNumber(response.data.phone_number || '');
                setAddress(response.data.address || '');
            } catch (error) {
                toast.error('Ошибка загрузки профиля');
            } finally {
                setLoading(false);
            }
        };
        fetchProfile();
    }, []);

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await axios.put('http://localhost:8000/user/profile/update/', {
                first_name: firstName,
                last_name: lastName,
                middle_name: middleName,
                phone_number: phoneNumber,
                address
            }, { withCredentials: true });
            toast.success('Данные успешно сохранены!');
        } catch (error) {
            toast.error('Ошибка при сохранении данных');
        }
    };

    return (
        <div className={styles.account__page}>
            <Header />
            <div className={styles.account__wrapper}>
                <h2 className={styles.account__title}>Личный кабинет</h2>
                <Form className={styles.account__form} onSubmit={handleSave}>
                    <Form.Group className={styles.account__formGroup}>
                        <Form.Label>Имя</Form.Label>
                        <Form.Control value={firstName} onChange={e => setFirstName(e.target.value)} placeholder="Имя" disabled={loading} />
                    </Form.Group>
                    <Form.Group className={styles.account__formGroup}>
                        <Form.Label>Фамилия</Form.Label>
                        <Form.Control value={lastName} onChange={e => setLastName(e.target.value)} placeholder="Фамилия" disabled={loading} />
                    </Form.Group>
                    <Form.Group className={styles.account__formGroup}>
                        <Form.Label>Отчество</Form.Label>
                        <Form.Control value={middleName} onChange={e => setMiddleName(e.target.value)} placeholder="Отчество" disabled={loading} />
                    </Form.Group>
                    <Form.Group className={styles.account__formGroup}>
                        <Form.Label>Телефон</Form.Label>
                        <Form.Control value={phoneNumber} onChange={e => setPhoneNumber(e.target.value)} placeholder="Телефон" disabled={loading} />
                    </Form.Group>
                    <Form.Group className={styles.account__formGroup}>
                        <Form.Label>Адрес проживания</Form.Label>
                        <Form.Control value={address} onChange={e => setAddress(e.target.value)} placeholder="Адрес проживания" disabled={loading} />
                    </Form.Group>
                    <Button type="submit" className={styles.account__saveBtn} variant="primary" disabled={loading}>Сохранить</Button>
                </Form>
                <h3 className={styles.account__subtitle}>История заказов</h3>
                <ApplicationsTable applications={applications} />
            </div>
        </div>
    );
};

export default AccountPage; 