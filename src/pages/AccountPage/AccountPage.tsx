import React, { useState } from 'react';
import Header from 'components/Header';
import styles from './AccountPage.module.scss';
import { useUser } from 'Slices/AuthSlice';
import { Button, Form } from 'react-bootstrap';
import ApplicationsTable from 'components/ApplicationsTable';
import { useApplications } from 'Slices/ApplicationsSlice';

const AccountPage: React.FC = () => {
    const user = useUser();
    const applications = useApplications();
    // Состояния для формы
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [middleName, setMiddleName] = useState('');
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');
    // TODO: Подгружать и сохранять данные пользователя через API

    const handleSave = (e: React.FormEvent) => {
        e.preventDefault();
        // TODO: Реализовать сохранение данных пользователя через API
        alert('Данные сохранены (заглушка)');
    };

    return (
        <div className={styles.account__page}>
            <Header />
            <div className={styles.account__wrapper}>
                <h2 className={styles.account__title}>Личный кабинет</h2>
                <Form className={styles.account__form} onSubmit={handleSave}>
                    <Form.Group className={styles.account__formGroup}>
                        <Form.Label>Имя</Form.Label>
                        <Form.Control value={firstName} onChange={e => setFirstName(e.target.value)} placeholder="Имя" />
                    </Form.Group>
                    <Form.Group className={styles.account__formGroup}>
                        <Form.Label>Фамилия</Form.Label>
                        <Form.Control value={lastName} onChange={e => setLastName(e.target.value)} placeholder="Фамилия" />
                    </Form.Group>
                    <Form.Group className={styles.account__formGroup}>
                        <Form.Label>Отчество</Form.Label>
                        <Form.Control value={middleName} onChange={e => setMiddleName(e.target.value)} placeholder="Отчество" />
                    </Form.Group>
                    <Form.Group className={styles.account__formGroup}>
                        <Form.Label>Телефон</Form.Label>
                        <Form.Control value={phone} onChange={e => setPhone(e.target.value)} placeholder="Телефон" />
                    </Form.Group>
                    <Form.Group className={styles.account__formGroup}>
                        <Form.Label>Адрес проживания</Form.Label>
                        <Form.Control value={address} onChange={e => setAddress(e.target.value)} placeholder="Адрес проживания" />
                    </Form.Group>
                    <Button type="submit" className={styles.account__saveBtn} variant="primary">Сохранить</Button>
                </Form>
                <h3 className={styles.account__subtitle}>История заказов</h3>
                <ApplicationsTable applications={applications} />
            </div>
        </div>
    );
};

export default AccountPage; 