import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import styles from './CurrentApplicationPage.module.scss'
import Table from 'react-bootstrap/Table';


interface ProductData {
  id: number,
  title: string,
  price: number,
  info: string,
  src: string
}

export type ReceivedProductData = {
  id: number,
  product_name: string,
  product_info: string,
  price: number,
  status: string,
  photo: string,
}

const CurrentApplicationPage = () => {
  const [applicationData, setApplicationData] = useState(null);
  const { id } = useParams(); // Access the id parameter from the URL
  const [currentProducts, setCurrentProducts] = useState<ProductData[]>([])

  const getCurrentApplication = async (id: number) => {
    try {
      const response = await axios(`http://localhost:8000/applications/${id}/`, {
        method: 'GET',
        withCredentials: true,
      })
      const newArr = response.data.products.map((raw: ReceivedProductData) => ({
        id: raw.id,
        title: raw.product_name,
        price: raw.price,
        info: raw.product_info,
        src: raw.photo
    }));
    setCurrentProducts(newArr)
    console.log('newArr is', newArr)
    } catch(error) {
      throw error;
    }
  }
  useEffect(() => {
    const fetchApplicationData = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/applications/${id}/`);
        setApplicationData(response.data);
      } catch (error) {
        console.error('Error fetching application data:', error);
      }
    };

    fetchApplicationData();
  }, [id]);


  return (
    <>    <h3 className={styles.modal__title}>Добавленные блюда</h3>
      <div className={styles.modal__list}>
        {currentProducts.map((product: ProductData, index: number) => (
          <div className={styles['modal__list-item']}>
            <div className={styles['modal__list-item-title']}>
            <b>{product.title}</b>
            </div>
            <b>{product.price} ₽</b>
          </div>
        ))}
      </div>
      </>

  );
};

export default CurrentApplicationPage;
