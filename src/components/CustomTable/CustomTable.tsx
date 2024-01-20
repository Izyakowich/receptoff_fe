import React, { useState, ChangeEvent } from 'react'
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import axios from 'axios';
// import cn from 'classnames';
import styles from './CustomTable.module.scss'
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import AddButton from 'components/Icons/AddButton';
import EditIcon from 'components/Icons/EditIcon';
import BasketIcon from 'components/Icons/BasketIcon';
import ModalWindow from 'components/ModalWindow';
import Form from 'react-bootstrap/Form';
import Dropdown from 'react-bootstrap/Dropdown';
import ArrowDownIcon from 'components/Icons/ArrowDownIcon';
import { useTitleValue, useProducts, usePriceValues,
   setTitleValueAction, setProductsAction, setPriceValuesAction} from "../../Slices/MainSlice";
import { useDispatch } from 'react-redux';
import ImageIcon from 'components/Icons/ImageIcon';
import { useNavigate } from 'react-router-dom';

export type ReceivedProductData = {
  id: number,
  product_name: string,
  product_info: string,
  price: number,
  status: string,
  photo: string,
}

type ColumnData = {
  key: string;
  title: string;
}

export type TableData = {
  columns: ColumnData[];
  data: any[];
  children?: React.ReactNode;
  flag: 0 | 1 | 2 | 3;
  className?: string;
  // handleUsersButtonCLick?: (event: EventData) => void;
  // handleChangeButtonClick?: (event: EventData) => void;
  // handleDeleteButtonClick?: () => void;
};

export type ProductData =  {
  id: number,
  title: string,
  price: number,
  info: string,
  src: string,
  categoryTitle: string
};

const CustomTable: React.FC<TableData> = ({columns, data, className}) => {
  const products = useProducts()
  const dispatch = useDispatch()
  const navigate = useNavigate();

  const [isAddModalWindowOpened, setIsAddModalWindowOpened] = useState(false)
  // const [isEditModalWindowOpened, setIsEditModalWindowOpened] = useState(false)
  const [isDeleteModalWindowOpened, setIsDeleteModalWindowOpened] = useState(false)
  const [isImageModalWindowOpened, setIsImageModalWindowOpened] = useState(false)

  const [productTitleValue, setProductTitleValue] = useState('')
  const [productInfoValue, setProductInfoValue] = useState('')
  const [productPriceValue, setProductPriceValue] = useState('')
  const [currentProductId, setCurrentProductId] = useState<number>()
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [currentImage, setCurrentImage] = useState('')

  const [isValid, setIsValid] = useState(false)

  // const postProduct = async () => {
  //   try {
  //     const response = await axios(`http://localhost:8000/products/post/`, {
  //       method: 'POST',
  //       data: {
  //         product_name: productTitleValue,
  //         price: Number(productPriceValue),
  //         info: productInfoValue
  //       },
  //       withCredentials: true
  //     })
  //     setIsAddModalWindowOpened(false)
  //     dispatch(setProductsAction([...products, {
  //       id: response.data.id,
  //       title:  response.data.product_name,
  //       price:  response.data.price,
  //       info: response.data.info,
  //       src: ''
  //     }]))
  //     toast.success('Вы добавили новое блюдо!')
  //   } catch(e) {
  //     toast.error('Блюдо уже существует!')
  //   }
  // }

  // const putProduct = async (id: number) => {
  //   try {
  //     const response = await axios(`http://localhost:8000/products/${id}/put/`, {
  //       method: 'PUT',
  //       data: {
  //         title: productInfoValue,
  //         price: Number(productPriceValue),
  //         info: productInfoValue,
  //         status: "enabled"
  //       },
  //       withCredentials: true
  //     })
  //     setIsEditModalWindowOpened(false)
  //     const updatedProducts = products.map(product => {
  //       if (product.id === id) {
  //         return {
  //           ...product,
  //           title: response.data.title,
  //           price: response.data.price,
  //           info: response.data.info,
  //           src: response.data.src
  //         };
  //       }
  //       return product;
  //     });

  //     dispatch(setProductsAction(updatedProducts))
  //     toast.success('Информация обновлена!')
  //   } catch(e) {
  //     toast.error('Блюдо с таким названием уже существует!')
  //   }
  // }
  
  const deleteProduct = async () => {
    try {
      await axios(`http://localhost:8000/products/${currentProductId}/delete/`, {
        method: 'DELETE',
        withCredentials: true,

      })

      dispatch(setProductsAction(products.filter((product) => {
        return product.id !== currentProductId 
      })))
      setIsDeleteModalWindowOpened(false)
      toast.success('Блюдо удалено!')
    } catch(e) {
      throw e
    }
  }

  const handleUpload = async () => {
    if (selectedImage) {
      try {
        const formData = new FormData();
        formData.append('file', selectedImage);

        const response = await axios.post(
          `http://localhost:8000/products/${currentProductId}/image/post/`,
          formData,
          {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
            withCredentials: true,
          }
        );
        const updatedProducts = products.map(product => {
          if (product.id === currentProductId) {
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
        toast.success('Изображение загружено')

      } catch (error) {
        console.error('Error uploading image:', error);
      } finally {
        setIsImageModalWindowOpened(false)
      }
    }
  };

  // const handleProductFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
  //   event.preventDefault()
  //   if (isAddModalWindowOpened) {
  //     postProduct()
  //   } else if(currentProductId) {
  //     putProduct(currentProductId)
  //   }
  // }

  const handleAddButtonClick = () => {
    navigate('/products/admin/add/')
  }

  const handleEditButtonClick = (product: ProductData) => {
    setCurrentProductId(product.id)
    // setIsEditModalWindowOpened(true);
    setProductTitleValue(product.title)
    setProductPriceValue((product.price.toString()))
    setProductInfoValue(product.info)
    navigate(`/admin/edit/${product.id}`)
    // history('/CurrentApplicationPage');
  }

  const handleDeleteButtonClick = (id: number) => {
    setCurrentProductId(id)
    setIsDeleteModalWindowOpened(true)
  }

  const handleImageButtonClick = (product: ProductData) => {
    setCurrentProductId(product.id)
    setIsImageModalWindowOpened(true)
    setCurrentImage(product.src)
  }

  const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedImage(file);
    }
  };

  return (
    <>
      <span className={`${styles['table__add-text']}`}>Добавление новой услуги</span><AddButton onClick={() => handleAddButtonClick()}/>
      <div className={`${styles.table__container} ${className}`}>
      <div className={`${styles.table__add} ${className}`}>
      </div>
      <Table hover>
          <thead>
            <tr>
              {columns.map((column, index) => (
                <th key={index}>{column.title}</th>
              ))}
              {<th>Действия</th>}
            </tr>
          </thead>
          <tbody>
            {data.map((row, rowIndex) => (
              <tr key={rowIndex}>
                {columns.map((column, columnIndex) => (
                  <td key={columnIndex}>{row[column.key]}</td>
                ))}
                <td className={styles.table__action}>
                  <EditIcon onClick={() => handleEditButtonClick(row)}/>
                  <ImageIcon onClick={() => handleImageButtonClick(row)}/>
                  <BasketIcon onClick={() => handleDeleteButtonClick(row.id)}/>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>

        <ModalWindow handleBackdropClick={() => setIsDeleteModalWindowOpened(false)} active={isDeleteModalWindowOpened} className={styles.modal}>
          <h3 className={styles.modal__title}>Вы уверены, что хотите удалить?</h3>
          <div className={styles['modal__delete-btns']}>
            <Button onClick={() => {deleteProduct()}} className={styles.modal__btn}>Удалить</Button>
            <Button onClick={() => setIsDeleteModalWindowOpened(false)} className={styles.modal__btn}>Отмена</Button>
          </div>
        </ModalWindow>

        <ModalWindow handleBackdropClick={() => {setIsImageModalWindowOpened(false); setSelectedImage(null)}} active={isImageModalWindowOpened } className={styles.modal}>
          <h3 style={{color: '#f6881b'}} className={styles.modal__title}>Выберите картинку</h3>
          {currentImage && <h4 style={{color: '#f6881b'}} className={styles.modal__subtitle}>Текущее изображение</h4>}
          <div className={styles.dropzone__container}>
          <div className="dropzone__wrapper">
          <img className={styles.dropzone__image} src={currentImage} alt="" />
          {selectedImage && <p className={styles.dropzone__filename}>Вы загрузили: <b>{selectedImage.name}</b></p>}
            <label className={styles.dropzone__btn} htmlFor="upload">
              <span className={styles['dropzone__btn-text']}>Загрузите изображение</span>
            </label>
            <input className={styles.dropzone__input} id="upload" type="file" onChange={handleImageChange} />
          </div>
          </div>
          <Button style={{backgroundColor: '#f6881b'}} disabled={selectedImage ? false : true} className={styles.dropzone__button} onClick={handleUpload}>Сохранить</Button>
          
        </ModalWindow>
      </div>
    </>
  );
}

export default CustomTable