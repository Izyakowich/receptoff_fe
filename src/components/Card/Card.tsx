import React from 'react';
import Button from 'react-bootstrap/Button';
import Image from 'react-bootstrap/Image'
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';
import { useIsAuth } from 'Slices/AuthSlice';
import styles from './Card.module.scss'

export type CardProps = {
  id?: number,
  src?: string;
  title: React.ReactNode;
  category?: React.ReactNode;
  price?: number;
  onButtonClick?: React.MouseEventHandler;
  onImageClick?: React.MouseEventHandler;
};

const OneCard: React.FC<CardProps> = ({id, title, price, src, onButtonClick, onImageClick }) => {
  const isUserAuth = useIsAuth();

  return (
    <Card className={styles.card}>
      <Link className={styles['card__image-link']} to={`/products/${id}`}>
        <div className={styles['card__image-wrapper']}>
          <Image
            className={styles.card__image}
            onClick={onImageClick}
            src={src ? src : "https://www.solaredge.com/us/sites/nam/files/Placeholders/Placeholder-4-3.jpg"}
            rounded
          />
        </div>
      </Link>
      <Card.Body className={`d-flex flex-column ${styles.card__info}`}>
        <Card.Title className='pt-3'>{title}</Card.Title>
        <Card.Text>Цена: {price}р.</Card.Text>
        {isUserAuth && <div className={`mt-auto w-100 ${styles['card__button-wrapper']}`}>
          <Button style={{backgroundColor: '#f6881b', borderColor: '#f6881b'}} className={styles.card__button} onClick={onButtonClick} variant="primary">Добавить</Button>
        </div>}
      </Card.Body>
    </Card>
  );
};

export default OneCard;