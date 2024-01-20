import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { setProductsAction,useProducts } from "Slices/MainSlice"; // Adjust this import to your actual file structure
import Header from 'components/Header';
import ModalWindow from 'components/ModalWindow';
import styles from './EditProductPage.module.scss';
import Button from 'react-bootstrap/Button';
import { useProduct, useLinksMapData, setProductAction, setLinksMapDataAction } from "../../Slices/DetailedSlice"
import BreadCrumbs from 'components/BreadCrumbs';

export type ReceivedProductData = {
    id: number,
    product_name: string,
    product_info: string,
    price: number,
    status: string,
    photo: string,
}

export type ProductData = {
  id: number;
  title: string;
  info: string;
  src: string;
  price: string;
  status: string;
};

const EditProductPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [isImageModalWindowOpened, setIsImageModalWindowOpened] = useState(false);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [currentImage, setCurrentImage] = useState<string>('');

  const products = useProducts()
  const [title, setTitle] = useState('');
  const [info, setInfo] = useState('');
  const [price, setPrice] = useState('');
  const product = useProduct()
  const linksMap = useLinksMapData();

  const getProduct = async () => {
        const response = await axios.get(`http://127.0.0.1:8000/products/${id}/`);
        const jsonData = response.data;
        dispatch(setProductAction({
            id: Number(jsonData.id),
            title: jsonData.product_name,
            price: jsonData.price,
            info: jsonData.product_info,
            src: jsonData.photo
        }))

        const newLinksMap = new Map<string, string>(linksMap); // Копирование старого Map
        newLinksMap.set(jsonData.title, '/products/' + id + '/');
        dispatch(setLinksMapDataAction(newLinksMap))

};
useEffect(() => {
    getProduct();

    return () => { // Возможно лучше обобщить для всех страниц в отдельный Slice !!!
        dispatch(setLinksMapDataAction(new Map<string, string>([['Блюда', '/products']])))
    }
}, []);
  
  useEffect(() => {
    const productToEdit = products.find(product => product.id.toString() === id);
    if (productToEdit) {
      setTitle(productToEdit.title);
      setInfo(productToEdit.info);
      setPrice(productToEdit.price.toString());
    }
  }, [id, products]);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files ? event.target.files[0] : null;
    setSelectedImage(file);
  };

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

  const putProduct = async (id: number) => {
    try {
      const response = await axios(`http://localhost:8000/products/${id}/put/`, {
        method: 'PUT',
        data: {
          product_name: title,
          product_info: info,
          price: price,
        },
        withCredentials: true
      });
      navigate('/products/admin/');

      const updatedProducts = products.map(product => {
        if (product.id === id) {
          return {
            ...product,
            title: response.data.product_name,
            info: response.data.product_info,
            src: response.data.image,
            price: response.data.price
          };
        }
        return product;
      });

      dispatch(setProductsAction(updatedProducts));
    } catch (e) {
      console.error(e);
    }
  };

  const handleFormSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    await putProduct(parseInt(id ?? ''));
  };
  return (
    <div className={styles['main__page']}>
    <Header />
    <div className={styles['main__page-wrapper']}>
      <BreadCrumbs />
      </div>
    <div className={styles.container}>
      
      <div className={styles.formContainer}>
        <h1>Редактирование</h1>
        <form onSubmit={handleFormSubmit}>
          <div className={styles.formGroup}>
            <label htmlFor="title">Название услуги:</label>
            <input
              id="title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className={styles.inputField}
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="info">Описание:</label>
            <textarea
              id="info"
              value={info}
              onChange={(e) => setInfo(e.target.value)}
              className={styles.textAreaField}
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="price">Стоимость:</label>
            <input
              id="price"
              type="text"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className={styles.inputField}
            />
          </div>
          
          <div className={styles.buttonContainer}>
            <button type="button" onClick={() => setIsImageModalWindowOpened(true)} className={styles.submitButton}>
                Редактировать картинку
            </button>
            <button type="submit" className={styles.submitButton}>Сохранить изменения</button>
        </div>
        </form>
      </div>
      <ModalWindow 
      handleBackdropClick={() => { setIsImageModalWindowOpened(false); setSelectedImage(null); }}
      active={isImageModalWindowOpened}
      className={styles.modal}
    >
      <h3 className={styles.modal__title}>Выберите картинку</h3>
      {currentImage && <h4 className={styles.modal__subtitle}>Текущее изображение</h4>}
      <div className={styles.dropzone__container}>
        <div className="dropzone__wrapper">
          {currentImage && 
            <img className={styles.dropzone__image} src={currentImage} alt="Текущее изображение" />}
          {selectedImage && 
            <p className={styles.dropzone__filename}>Вы загрузили: <b>{selectedImage.name}</b></p>}
          <label className={styles.dropzone__btn} htmlFor="upload">
            <span className={styles['dropzone__btn-text']}>Загрузите изображение</span>
          </label>
          <input 
            className={styles.drop_button} 
            id="upload" 
            type="file" 
            onChange={handleImageChange} 
          />
        </div>
      </div>
      <Button 
          disabled={!selectedImage} 
          className={styles.drop_button} 
          onClick={() => handleUpload(parseInt(id ?? ''))}
        >
        Сохранить
      </Button>
    </ModalWindow>
  </div>
  </div>
  );
};
export default EditProductPage;