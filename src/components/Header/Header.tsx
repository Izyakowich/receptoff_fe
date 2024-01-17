import React from 'react';
import { useState } from 'react';
import { Link, Route, useLocation, useNavigate, Routes } from 'react-router-dom'
import styles from './Header.module.scss'
import ProfileIcon from 'components/Icons/ProfileIcon';
import ApplicationIcon from 'components/Icons/ApplicationIcon';
import ProfileWindow from "components/ProfileWindow";
import BurgerIcon from 'components/Icons/BurgerIcon';
import { motion, AnimatePresence } from "framer-motion";
import axios, {AxiosResponse} from 'axios';
import {useDispatch} from "react-redux";
import {useUser, useIsAuth, setIsAuthAction, setUserAction} from "../../Slices/AuthSlice";
import Cookies from "universal-cookie";
import { toast } from 'react-toastify';
import { useApplications, useProductsFromApplication } from 'Slices/ApplicationsSlice';
import { Button } from 'react-bootstrap';
import { useIsMainPage } from 'Slices/MainSlice';
import BasketIcon from 'components/Icons/BasketIcon';
import ProductsPage from 'pages/ProductsPage';
import AdminProductsPage from 'pages/AdminProductsPage';

const cookies = new Cookies();

const Header: React.FC = () => {
    const location = useLocation();
    const dispatch = useDispatch();
    const [isProfileButtonClicked, setIsProfileButtonClicked] = useState(false);
    const [isBurgerMenuOpened, setIsBurgerMenuOpened] = useState(false)
    const isUserAuth = useIsAuth();
    const navigate = useNavigate();
    const productsFromApplications = useProductsFromApplication();
    const applications = useApplications();
    let user = useUser();
    const isMainPage = useIsMainPage();

    const handleProfileButtonClick = () => {
        setIsProfileButtonClicked(!isProfileButtonClicked);
    };

    const logout = async () => {
        try {
            console.log(cookies.get('session_id'))
            const response: AxiosResponse = await axios('http://localhost:8000/logout/',
            {
                method: "POST",
                withCredentials: true,
                headers: { 
                    "Content-type": "application/json; charset=UTF-8"
                }, 
            })

            cookies.remove("session_id", { path: "/" }); 

            dispatch(setIsAuthAction(false))
            dispatch(setUserAction({
                email: "",
                // fullname: "",
                // phoneNumber: "",
                isSuperuser: false
            }))
            setIsProfileButtonClicked(false);
            toast.success("Вы вышли из аккаунта");
        }
        catch(error) {
            console.log(error)
        }
    }

    const handleSubmit = async () => {
        await logout();
    };

    return (
        <div className={styles.header}>
            <div className={styles.header__wrapper}>
                <div className={styles.header__logo}>РЕЦЕПТOFF</div>

                <div className={styles.header__blocks}>
                    <Link className={styles.header__block} to='/products/'>Все блюда</Link>
                    {isUserAuth && user.isSuperuser && <Link className={styles.header__block} to={'/products/admin/'}>Управление</Link>}
                    {isUserAuth && !user.isSuperuser ? 
                    <Link className={styles.header__block} to='/applications/'>Мои заявки</Link>
                    : isUserAuth && <Link className={styles.header__block} to='/applications/'>Заявки</Link>}
                    {/* {!user.isSuperuser &&  <Link className={styles.header__block} to='/'>Поддержка</Link>} */}
                </div>

                <div className={styles.header__icons}>
                    {isUserAuth ?
                    <div>email: {user.email} </div> : ""
                    }
                    
                    {/* {isUserAuth ? <Link to='/logout'>Выйти</Link> : <Link to='/login' className={styles.header__profile}>Войти</Link>} */}

                    {isUserAuth ? <span className={styles['header__profile-icon']} onClick={logout}>Выйти</span> : <Link to='/login/' className={styles.header__profile}>Войти</Link>}
                    {isBurgerMenuOpened === false
                        ? <BurgerIcon className={styles.burger__icon} color='accent' onClick={() => setIsBurgerMenuOpened(true)} />
                        : <div className={styles.cancel__icon} onClick={() => setIsBurgerMenuOpened(false)}></div>}
                    {isBurgerMenuOpened && !user.isSuperuser &&
                    <div className={styles.burger__menu}>
                        <Link className={styles['burger__menu-item']} to={'/products/'}>Блюда</Link>
                        <Link className={styles['burger__menu-item']} to={'/applications/'}>Мои заявки</Link>
                    </div>}
                    {isBurgerMenuOpened && user.isSuperuser &&
                    <div className={styles.burger__menu}>
                        <Link className={styles['burger__menu-item']} to={'/products/'}>Все блюда</Link>
                        <Link className={styles['burger__menu-item']} to={'/admin/'}>Управление</Link>
                        <Link className={styles['burger__menu-item']} to={'/applications/'}>Заявки</Link>
                    </div>
                    }
                </div>
            </div>
        </div>
    )
};

export default Header;