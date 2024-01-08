import React from 'react'
import Header from 'components/Header'
import styles from './MainPage.module.scss'
import image from '../../assets/main.jpg'

const MainPage = () => {

    return (
        <div className={styles.main__page}>
            <Header/>
            {/* <div className={styles['main__page-intro']}>
                <h1 className={styles['main__page-title']}>Travel pass</h1>
                <h4 className={styles['main__page-subtitle']}>Система по приобретению абонементов на транспорт</h4>
            </div> */}
            {/* <img src={image} className={styles['main__page-image']} alt="main image" /> */}
            
            {/* <div className={styles['main__page-wrapper']}>
                <div className={styles['main__page-about']}>
                    <h2 className={styles['main__page-part-title']}>О компании</h2>
                    <div className={styles['main__page-about-wrapper']}>
                        <ul className={styles['main__page-about-info']}>
                            <li className={styles['main__page-about-item']}>Наша компания специализируется на продаже абонементов для различных видов транспорта.</li>
                            <li className={styles['main__page-about-item']}>Мы также предлагаем возможность приобретения нескольких абонементов и добавления их в одну заявку.</li>
                            <li className={styles['main__page-about-item']}>После составления заявки вам потребуется отправить ее на проверку нашим администраторам. </li>
                            <li className={styles['main__page-about-item']}>Мы сделаем все возможное, чтобы предоставить вам ответ в кратчайшие сроки.</li>
                            <li className={styles['main__page-about-item']}>Более того, у вас есть возможность просмотреть полную историю ваших заявок.</li>
                            <li className={styles['main__page-about-item']}>Если у вас возникнут вопросы, наша служба поддержки всегда готова помочь вам.</li>
                        </ul>

                        <div className={styles['main__page-stats']}>
                            <div className={styles['main__page-stats-item']}>
                            <h3 className={styles['main__page-stats-title']}>1500</h3>
                                <p className={styles['main__page-stats-subtitle']}>Зарегестрированных пользователей</p>
                            </div>

                            <div className={styles['main__page-stats-item']}>
                                <h3 className={styles['main__page-stats-title']}>24</h3>
                                <p className={styles['main__page-stats-subtitle']}>Доступных абонементов</p>
                            </div>

                            <div className={styles['main__page-stats-item']}>
                                <h3 className={styles['main__page-stats-title']}>6</h3>
                                <p className={styles['main__page-stats-subtitle']}>Различных категорий</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className={styles['main__page-categories']}>
                    <h2 className={styles['main__page-part-title']}>Доступные категории</h2>
                    <div className={styles['main__page-categories-cards']}>
                        {categories.map(category => (
                        category.title !== 'Все категории' && <div key={category.id} className={styles['main__page-categories-card']}>
                            <h3 className={styles['main__page-categories-title']}>{category.title}</h3>
                        </div>
                        ))}
                    </div>
                </div>
            </div> */}
        </div>
    )
}

export default MainPage