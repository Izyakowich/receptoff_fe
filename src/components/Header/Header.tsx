import React from 'react';
import { Link } from 'react-router-dom'
import styles from './Header.module.scss'
import ProfileIcon from 'components/Icons/ProfileIcon';

const Header: React.FC = () => {
    return (
        <div className={styles.header}>
            <div className={styles.header__wrapper}>
                <Link to='/' className={styles.header__logo}>РЕЦЕПТOFF</Link>

                <div className={styles.header__blocks}>
                    <Link className={styles.header__block} to='/'>Виды продуктов</Link>
                    <Link className={styles.header__block} to='/'>Мои заявки</Link>
                    <Link className={styles.header__block} to='/'>Поддержка</Link>
                </div>

                <Link to='/registration' className={styles.header__profile}><ProfileIcon/></Link>
            </div>
        </div>
    )
};

export default Header;