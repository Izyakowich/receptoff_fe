import React from 'react';
import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import ModalWindow from 'components/ModalWindow';
import Button from 'react-bootstrap/Button';
import { useDispatch } from 'react-redux';
import { setProductsAction, useProducts } from "Slices/MainSlice"; // Adjust this import to your actual file structure
import Header from 'components/Header' 
import styles from './AddProductPage.module.scss';
import BreadCrumbs from 'components/BreadCrumbs';

const AddProductPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const products = useProducts();
  const [title, setTitle] = useState('');
  const [info, setInfo] = useState('');
  const [price, setPrice] = useState('');
  const [isImageModalWindowOpened, setIsImageModalWindowOpened] = useState(false);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [currentImage, setCurrentImage] = useState<string>('');

  const postProduct = async () => {
    try {
      const response = await axios(`http://localhost:8000/products/post/`, {
        method: 'POST',
        data: {
          product_name: title,
          product_info: info,
          price: price,
        },
        withCredentials: true
      });

      dispatch(setProductsAction([...products, {
        id: response.data.id_service,
        title: response.data.product_name,
        info: response.data.product_info,
        price: response.data.price,
        src: '', // Assuming there's a default or placeholder image path
      }]));

      navigate('/admin/');
    } catch (e) {
      console.error(e);
    }
  }

  const handleUpload = async (id: number) => {
    if (selectedImage) {
      try {
        const formData = new FormData();
        formData.append('file', selectedImage);

        const response = await axios.post(
          `http://localhost:8000/products/${id}/image/post/`,
          formData,
          {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
            withCredentials: true,
          }
        );

        const updatedProducts = products.map(product => {
          if (product.id === id) {
            return {
              ...product,
              src: response.data
            };
          }
          return product;
        });
        dispatch(setProductsAction(updatedProducts))
        console.log(updatedProducts)
        setSelectedImage(null)

      } catch (error) {
        console.error('Error uploading image:', error);
      } finally {
        setIsImageModalWindowOpened(false)
      }
    }
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files ? event.target.files[0] : null;
    setSelectedImage(file);
  };

  const handleFormSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    await postProduct();
  };

  return (
    
    <div className={styles.container}>
      <Header />
      {/* <div className={styles['admin__page-wrapper']}> */}

      <BreadCrumbs/>

      <div className={styles.formContainer}>
        <h1>Добавление услуги</h1>
        <form onSubmit={handleFormSubmit}>
          <div>
            <label htmlFor="title">Название услуги:</label>
            <input
              className={styles.input}
              id="title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="info">Описание:</label>
            <textarea
              className={styles.textarea}
              id="info"
              value={info}
              onChange={(e) => setInfo(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="price">Стоимость:</label>
            <input
              className={styles.input}
              id="price"
              type="text"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
          </div>
          <div className={styles.buttonContainer}>
            {/* <button type="button" onClick={() => setIsImageModalWindowOpened(true)} className={styles.button}>
                Загрузить картинку
            </button> */}
            <button type="submit" className={styles.button}>Добавить</button>
        </div>
        </form>
      </div>
      </div>
    // </div>
  );
};

export default AddProductPage;