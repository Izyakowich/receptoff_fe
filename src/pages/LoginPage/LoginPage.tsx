import * as React from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form';
import Header from 'components/Header';
import BreadCrumbs from 'components/BreadCrumbs';
import Image from "react-bootstrap/Image"
import styles from './LoginPage.module.scss'
import axios, { AxiosResponse } from 'axios';
import { ChangeEvent } from 'react';
import {useDispatch} from "react-redux";
import { setUserAction, setIsAuthAction } from "../../Slices/AuthSlice";
import {toast } from 'react-toastify';
import { isElement } from 'react-dom/test-utils';



const LoginPage: React.FC = () => {
    const dispatch = useDispatch();
    const [emailValue, setEmailValue] = useState('')
    const [passwordValue, setPasswordValue] = useState('')
    const [passwordError, setPasswordError] = useState('init')
    const [emailError, setEmailError] = useState('init')
    const [isDataValid, setIsDataValid] = useState(false)

    const emailValidation = (value: string): void => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value) && value.length !== 0) {
            setEmailError('Неправильный формат email!');
        } else if(value.length === 0)  {
            setEmailError('Это обязательное поле!');
        } else {
            setEmailError('');
        }
    };

    const  passwordValidation = (value: string): void => {
        if ((value.length < 0 || value.length > 20) && value.length !== 0) {
            setPasswordError('Пароль должен быть от 8 до 20 символов!');
        } else if (value.length === 0) {
            setPasswordError('Это обязательное поле!');
        } else {
            setPasswordError('');
        }
    }

    const handleFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        try {
            const formData = new FormData();
            formData.append('email', emailValue);
            formData.append('password', passwordValue);

            console.log('formdata is', formData)
        
            const response: AxiosResponse = await axios.post('http://localhost:8000/login', formData, {
                withCredentials: true
            });
            console.log(response.data)

            dispatch(setIsAuthAction(true))

            dispatch(setUserAction({
                email: response.data.email,
                // fullname: response.data.full_name,
                isSuperuser: response.data.is_superuser
            }));

            toast.success("Вход выполнен успешно");

        } catch (error) {
            toast.error("Неверный логин или пароль");
            throw error
        }
    };

    const handleEmailValueChange = (event: ChangeEvent<HTMLInputElement>) => {
        emailValidation(event.target.value);
        setEmailValue(event.target.value)
    };

    const handlePasswordValueChange = (event: ChangeEvent<HTMLInputElement>) => {
        passwordValidation(event.target.value)
        setPasswordValue(event.target.value)
    };

    React.useEffect(() => {
        if (!emailError && !passwordError) {
            setIsDataValid(true)
        } else {
            setIsDataValid(false)
        }
    }, [emailError, passwordError])

    return (
        <div className='login__page'>
            <Header/>
            <div style={{position: 'relative'}}className={styles['login__page-wrapper']}>
                <Form onSubmit={handleFormSubmit}
                className={styles['form']}>
                    <h3 className={styles['login__page-title']}>Вход</h3>
                    <div className={styles.form__item}>
                        <Form.Group style={{height: 50}} className='w-100 mb-3' controlId="search__sub.input__sub">
                            <Form.Control value={emailValue} onChange={handleEmailValueChange} style={{height: '100%', borderColor: '#f6881b', fontSize: 18}} type="email" placeholder="E-mail..." />
                            <span className={styles['form__item-error']}>{emailError !== "init" && emailError}</span>
                        </Form.Group>
                    </div>
                    <div className={styles.form__item}>
                        <Form.Group style={{height: 50}} className='w-100 mb-3' controlId="search__sub.input__sub">
                            <Form.Control value={passwordValue} onChange={handlePasswordValueChange} style={{height: '100%', borderColor: '#f6881b', fontSize: 18}} type="password" placeholder="Пароль..." />
                            <span className={styles['form__item-error']}>{passwordError !== 'init' && passwordError}</span>
                        </Form.Group>
                    </div>
                    
                    {
                    isDataValid ? <Button type='submit' style={{backgroundColor: "#f6881b", padding: "10px 20px", fontSize: 18, height: 50}}>Войти</Button>
                    : <Button disabled type='submit' style={{backgroundColor: "#f6881b", padding: "10px 20px", fontSize: 18, height: 50}}>Войти</Button>
                    }
                    <Link className={styles['login__page-link']} to='/registration'>У вас еще нет аккаунта?</Link>
                </Form>
            </div>
        </div>
    )
};
  
export default LoginPage;