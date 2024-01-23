import React from 'react';
import Button from 'react-bootstrap/Button';
import Image from 'react-bootstrap/Image'
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';

export type CardProps = {
  id?: number,
  src?: string;
  title: React.ReactNode;
  category?: React.ReactNode;
  price?: number;
  onButtonClick?: React.MouseEventHandler;
  onImageClick?: React.MouseEventHandler;
};

const OneCard: React.FC<CardProps> = ({id, title, category, price, src, onButtonClick, onImageClick }) => {
  return (
    <Card>
      <Link to={`/product/${id}`} style={{ display: 'block', textDecoration: 'none' }}>
        <div style={{ position: 'relative', overflow: 'hidden' }}>
          <Image
            style={{ cursor: 'pointer', width: '100%', height: 'auto' }}
            onClick={onImageClick}
            src={src ? src : "https://www.solaredge.com/us/sites/nam/files/Placeholders/Placeholder-4-3.jpg"}
            rounded
          />
        </div>
      </Link>
      <Card.Body className='d-flex flex-column'>
        <Card.Title className='pt-3'>{title}</Card.Title>
        <Card.Subtitle>Категория: {category}</Card.Subtitle>
        <Card.Text>Цена: {price}р.</Card.Text>
        <div className='mt-auto w-100' style={{position: 'relative', height: 60}}>
          <Button style={{ backgroundColor: '#f6881b', padding: '15px 30px', borderColor: "#000", position: 'absolute', right: 0, marginBottom: 50, fontSize: 18 }} onClick={onButtonClick} variant="primary">Добавить</Button>
        </div>
      </Card.Body>
    </Card>
  );
};

export default OneCard;