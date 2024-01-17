// import React from 'react'
// import axios from 'axios'
// import { toast } from 'react-toastify';
// import styles from './CurrentApplicationPage.module.scss'
// import Header from 'components/Header'
// import Button from 'react-bootstrap/Button'
// import BreadCrumbs from 'components/BreadCrumbs';
// import { useCurrentApplicationId } from 'Slices/ApplicationsSlice'
// import ProductsTable from 'components/ProductsTable'
// import { useDispatch } from 'react-redux'
// import { useCurrentApplicationDate, useProductsFromApplication,
//   setCurrentApplicationDateAction, setProductsFromApplicationAction, setCurrentApplicationIdAction } from 'Slices/ApplicationsSlice'
// import { useLinksMapData, setLinksMapDataAction } from 'Slices/DetailedSlice';


// export type ReceivedProductData = {
//   id: number,
//   product_name: string,
//   product_info: string,
//   price: number,
//   status: string,
//   photo: string,
// }

// const CurrentApplicationPage = () => {
//   const dispatch = useDispatch();
//   const products = useProductsFromApplication();
//   const applicationDate = useCurrentApplicationDate();
//   const currentApplicationId = useCurrentApplicationId();
//   const linksMap = useLinksMapData();

//   React.useEffect(() => {
//     dispatch(setLinksMapDataAction(new Map<string, string>([
//       ['Текущая заявка', '/application/']
//   ])))
//   }, [])

//   const sendApplication = async () => {
//     try {
//       const response = await axios(`http://localhost:8000/applications/send/`, {
//         method: 'PUT',
//         withCredentials: true
//       })

//       dispatch(setProductsFromApplicationAction([]));
//       dispatch(setCurrentApplicationDateAction(''));
//       toast.success("Заявка отправлена на проверку!");
//     } catch(error) {
//       throw error;
//     }
//   }

//   const deleteApplication = async () => {
//     try {
//       const response = await axios(`http://localhost:8000/applications/delete/`, {
//       method: 'DELETE',
//       withCredentials: true
//     })

//     dispatch(setProductsFromApplicationAction([]));
//     dispatch(setCurrentApplicationDateAction(''));
//     toast.success("Заявка удалена!");
//     }
//     catch(error) {
//       throw error;
//     }
    
//   }

//   const handleSendButtonClick = () => {
//     sendApplication();
//   }

//   const handleDeleteButtonClick = () => {
//     deleteApplication();
//   }

//   return (
//     <div className={styles.application__page}>
//       <Header/>
//       <div className={styles['application__page-wrapper']}>
//         <BreadCrumbs links={linksMap}></BreadCrumbs>
//         <h1 className={styles['application__page-title']}>
//           Текущая заявка
//         </h1>

//         {products.length !== 0 ? <div>
          
//           <div className={styles['application__page-info']}>
//             {/* <h3 className={styles['application__page-info-title']}>Дата создания заявки: <br/><b>{applicationDate}</b></h3> */}
//             <h3 className={styles['application__page-info-title']}>Добавленные блюда:</h3>
//             <ProductsTable products={products} className={styles['application__page-info-table']}/>

//             <div className={styles['application__page-info-btns']}>
//               <Button onClick={() => handleSendButtonClick()} className={styles['application__page-info-btn']}>Отправить</Button>
//               <Button onClick={() => handleDeleteButtonClick()} className={styles['application__page-info-btn']}>Удалить</Button>
//             </div>
//           </div>
//         </div>
//         : null
//       }
//       </div>
//     </div>
//   )
// }

// export default CurrentApplicationPage

// import React, { useState, ChangeEvent } from 'react'
// import { useParams } from 'react-router-dom';
// import axios from 'axios';
// import styles from './CurrentApplicationPage.module.scss'
// import Header from 'components/Header'
// import ProductsTable from 'components/ProductsTable'
// import BreadCrumbs from 'components/BreadCrumbs';
// import { useDispatch } from 'react-redux';
// import { useLinksMapData, setLinksMapDataAction } from 'Slices/DetailedSlice';
// import { useLocation } from 'react-router-dom';
// import { useCurrentApplicationDate, useProductsFromApplication,
//   setCurrentApplicationDateAction, setProductsFromApplicationAction } from 'Slices/ApplicationsSlice'
// import { Button } from 'react-bootstrap';
// import { toast } from 'react-toastify';
// import { useNavigate } from 'react-router-dom';
// import { Form } from "react-bootstrap";

// export type ReceivedProductData = {
//   id: number,
//   product_name: string,
//   product_info: string,
//   price: number,
//   status: string,
//   photo: string,
// }


// const CurrentApplicationPage = () => {
//   const params = useParams();
//   const id = params.id === undefined ? '' : params.id;
//   const [currentProduct, setCurrentProduct] = React.useState([])
//   const dispatch = useDispatch();
//   const linksMap = useLinksMapData();
//   const location = useLocation();
//   const flag = location.state?.flag;
//   const applicationDate = useCurrentApplicationDate();
//   const navigate = useNavigate()
//   const productsFromApplication = useProductsFromApplication()
//   const today = new Date().toISOString().split('T')[0];
//   const [dateValue, setDateValue] = useState('')
  
//   React.useEffect(() => {
//     console.log('flag', flag)
//   }, [])

//   const getCurrentApplication = async () => {
//       try {
//         const response = await axios(`http://localhost:8000/applications/${id}/`, {
//           method: 'GET',
//           withCredentials: true,
//         })

//         const newArr = response.data.products.map((raw: ReceivedProductData) => ({
//           id: raw.id,
//           title: raw.product_name,
//           price: raw.price,
//           info: raw.product_info,
//           src: raw.photo,
//       }));
//       setCurrentProduct(newArr)
//       } catch(error) {
//         throw error;
//       }
//   }

//   const sendApplication = async () => {
//     try {
//       await axios(`http://localhost:8000/applications/send/`, {
//         method: 'PUT',
//         data: {
//           active_date: dateValue
//         },
//         withCredentials: true
//       })

//       dispatch(setProductsFromApplicationAction([]));
//       dispatch(setCurrentApplicationDateAction(''));
//       toast.success("Заявка успешно отправлена на проверку!");
//     } catch(error) {
//       throw error;
//     }
//   }

//   const deleteApplication = async () => {
//     try {
//       const response = await axios(`http://localhost:8000/applications/delete/`, {
//       method: 'DELETE',
//       withCredentials: true
//     })

//     dispatch(setProductsFromApplicationAction([]));
//     dispatch(setCurrentApplicationDateAction(''));
//     toast.success("Заявка успешно удалена!");
//     }
//     catch(error) {
//       throw error;
//     }
    
//   }

//   React.useEffect(() => {
//       const newLinksMap = new Map<string, string>(linksMap); // Копирование старого Map
//       newLinksMap.set('Текущая заявка', '/applications/' + id + '/');
//       dispatch(setLinksMapDataAction(newLinksMap))
//       getCurrentApplication();

//   }, [])

//   const handleSendButtonClick = () => {
//     sendApplication();
//     navigate('/products')
//   }

//   const handleDeleteButtonClick = () => {
//     deleteApplication();
//     navigate('/products')
//   }

//   const handleDateChange = (event: ChangeEvent<HTMLInputElement>) => {
//     setDateValue(event.target.value);
//     console.log(event.target.value)
//   };

//     return (
//         <div className={styles.application__page}>
//             <Header/>
//             <div className={styles['application__page-wrapper']}>
//                 <BreadCrumbs links={linksMap}></BreadCrumbs>
//                 {flag ? <h1 className={styles['application__page-title']}>
//                     Добавленные абонементы
//                 </h1>
//                 : <>
//                 <h1 className={styles['application__page-title']}>
//                   Текущая заявка
//                 </h1>
//                 <h5 className={styles['application__page-subtitle']}>
//                   У вас есть возможность удалять абонементы из заявки, удалить всю заявку или отправить заявку на проверку модераторам!
//                 </h5>
//                 </>
//                 }
//                 <div>
//                   {!flag ? <>
//                     <h3 className={styles['application__page-info-title']}>Дата создания заявки: <br/><b>{applicationDate}</b></h3>
//                     {/* <h3 className={styles['application__page-text']}>Добавленные абонементы:</h3> */}

//                   <ProductsTable flag={false} products={productsFromApplication} className={styles['application__page-table']}/>
//                   <h3 className={styles['application__page-text']} style={{marginTop: 30}}>Дата начала действия абонемента:</h3>
//                   <div className={styles['application__page-info-btns']}>
//                   <Form.Control
//                     className={styles['application__page-input']}
//                     type="date"
//                     defaultValue={today}
//                     min={today}
//                     onChange={handleDateChange}
//                   />
//                     <Button onClick={() => handleSendButtonClick()} className={styles['application__page-info-btn']}>Отправить</Button>
//                     <Button onClick={() => handleDeleteButtonClick()} className={styles['application__page-info-btn']}>Удалить</Button>
//                   </div>
//                   </>
//                   : <ProductsTable flag={true} products={currentProduct} className={styles['application__page-table']}/>
//                   }
//                 </div>
//             </div>
//         </div>
//     )
// }

// export default CurrentApplicationPage



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

const updateTable: React.FC<TableData> = ({columns, data, className}) => {
  const products = useProducts()
  const dispatch = useDispatch()

  const [isAddModalWindowOpened, setIsAddModalWindowOpened] = useState(false)
  const [isEditModalWindowOpened, setIsEditModalWindowOpened] = useState(false)
  const [isDeleteModalWindowOpened, setIsDeleteModalWindowOpened] = useState(false)
  const [isImageModalWindowOpened, setIsImageModalWindowOpened] = useState(false)

  const [productTitleValue, setProductTitleValue] = useState('')
  const [productInfoValue, setProductInfoValue] = useState('')
  const [productPriceValue, setProductPriceValue] = useState('')
  const [currentProductId, setCurrentProductId] = useState<number>()
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [currentImage, setCurrentImage] = useState('')

  const [isValid, setIsValid] = useState(false)

  const postProduct = async () => {
    try {
      const response = await axios(`http://localhost:8000/products/post/`, {
        method: 'POST',
        data: {
          product_name: productTitleValue,
          price: Number(productPriceValue),
          info: productInfoValue
        },
        withCredentials: true
      })
      setIsAddModalWindowOpened(false)
      dispatch(setProductsAction([...products, {
        id: response.data.id,
        title:  response.data.product_name,
        price:  response.data.price,
        info: response.data.info,
        src: ''
      }]))
      toast.success('Вы добавили новое блюдо!')
    } catch(e) {
      toast.error('Блюдо уже существует!')
    }
  }

  const putProduct = async (id: number) => {
    try {
      const response = await axios(`http://localhost:8000/products/${id}/put/`, {
        method: 'PUT',
        data: {
          title: productInfoValue,
          price: Number(productPriceValue),
          info: productInfoValue,
          status: "enabled"
        },
        withCredentials: true
      })
      setIsEditModalWindowOpened(false)
      const updatedProducts = products.map(product => {
        if (product.id === id) {
          return {
            ...product,
            title: response.data.title,
            price: response.data.price,
            info: response.data.info,
            src: response.data.src
          };
        }
        return product;
      });

      dispatch(setProductsAction(updatedProducts))
      toast.success('Информация обновлена!')
    } catch(e) {
      toast.error('Блюдо с таким названием уже существует!')
    }
  }
  
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

  const handleProductFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (isAddModalWindowOpened) {
      postProduct()
    } else if(currentProductId) {
      putProduct(currentProductId)
    }
  }

  const handleEditButtonClick = (product: ProductData) => {
    setCurrentProductId(product.id)
    setIsEditModalWindowOpened(true);
    setProductTitleValue(product.title)
    setProductPriceValue((product.price.toString()))
    setProductInfoValue(product.info)
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
      <div className={`${styles.table__container} ${className}`}>
      <div className={`${styles.table__add} ${className}`}>
      <span className={`${styles['table__add-text']}`}>Добавить блюдо</span><AddButton onClick={() => setIsAddModalWindowOpened(true)}/>
      </div>
      <Table>
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

        <ModalWindow handleBackdropClick={() => {setIsAddModalWindowOpened(false); setIsEditModalWindowOpened(false); productTitleValue && setProductTitleValue(''); productPriceValue && setProductPriceValue(''); productInfoValue && setProductInfoValue('')}}
        className={styles.modal} active={isAddModalWindowOpened || isEditModalWindowOpened}>
          <h3 style={{color: '#f6881b'}}className={styles.modal__title}>Заполните данные</h3>
          <Form onSubmit={(event: React.FormEvent<HTMLFormElement>) => handleProductFormSubmit(event)}
          className={styles['form']}>
            {/* <Dropdown className={styles['dropdown']} onSelect={handleCategorySelect}>
              <Dropdown.Toggle
                  className={styles['dropdown__toggle']}
                  style={{
                      borderColor: '#2787F5',
                      backgroundColor: "#fff",
                      color: '#000',
                  }}
              >   
                {categoryValue?.title}
                <ArrowDownIcon className={styles.dropdown__icon}/>
              </Dropdown.Toggle>
              <Dropdown.Menu className={styles['dropdown__menu']}>
                {categories
                  .map(category => (
                    category.title !== 'Все категории' && <Dropdown.Item className={styles['dropdown__menu-item']} key={category.id} eventKey={category.id}>
                      {category.title}
                    </Dropdown.Item>
                  ))}
                </Dropdown.Menu>
             </Dropdown> */}
            <div className={styles.form__item}>
              <Form.Control onChange={(event: ChangeEvent<HTMLInputElement>) => {setProductTitleValue(event.target.value)}} value={productTitleValue} className={styles.form__input} type="text" placeholder="Название блюда*" />
            </div>
            <div className={styles.form__item}>
              <Form.Control onChange={(event: ChangeEvent<HTMLInputElement>) => {setProductPriceValue(event.target.value); isNaN(Number(event.target.value)) ? setIsValid(false) : setIsValid(true)}} value={productPriceValue} className={styles.form__input} type="text" placeholder="Стоимость*" />
            </div>
            <div className={styles.form__item}>
              <Form.Control
                as="textarea"
                onChange={(event: ChangeEvent<HTMLTextAreaElement>) => setProductInfoValue(event.target.value)}
                value={productInfoValue}
                className={styles.form__textarea}
                placeholder="Описание*"
                style={{borderColor: '#f6881b'}}
              />
            </div>
            <Button style={{backgroundColor: '#f6881b'}} disabled={productTitleValue && productPriceValue && productInfoValue && isValid ? false : true} type='submit'>Сохранить</Button>
          </Form>
        </ModalWindow>

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

export default updateTable