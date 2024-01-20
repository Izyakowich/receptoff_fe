import React, { useState, ChangeEvent } from 'react'
import { useParams } from 'react-router-dom';
import axios from 'axios';
import styles from './SelectedApplicationPage.module.scss'
import Header from 'components/Header'
import ProductsTable from 'components/ProductsTable'
import BreadCrumbs from 'components/BreadCrumbs';
import { useDispatch } from 'react-redux';
import { useLinksMapData, setLinksMapDataAction } from 'Slices/DetailedSlice';
import { useLocation } from 'react-router-dom';
import { useCurrentApplicationDate, useProductsFromApplication, setCurrentApplicationIdAction,
  setCurrentApplicationDateAction, setProductsFromApplicationAction, useCurrentApplicationId } from 'Slices/ApplicationsSlice'
import { Button } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { Form } from "react-bootstrap";

export type ReceivedProductData = {
  id: number,
  product_name: string,
  product_info: string,
  price: number,
  status: string,
  photo: string,
}

const SelectedApplicationPage = () => {
  const params = useParams();
  const id = params.id === undefined ? '' : params.id;
  const [currentProduct, setCurrentProduct] = React.useState([])
  const dispatch = useDispatch();
  const linksMap = useLinksMapData();
  const location = useLocation();
  const flag = location.state?.flag;
  const applicationDate = useCurrentApplicationDate();
  const navigate = useNavigate()
  const productsFromApplication = useProductsFromApplication()
  const [dateValue, setDateValue] = useState('')
  const currentApplicationId = useCurrentApplicationId()
  const [isCard, setIsCard] = useState(false)

  React.useEffect(() => {
    if (Number(id) == currentApplicationId) {
      setIsCard(true)
    }
    console.log('flag', flag)
  }, [])

  const getCurrentApplication = async () => {
      try {
        const response = await axios(`http://localhost:8000/applications/${id}/`, {
          method: 'GET',
          withCredentials: true,
        })

        const newArr = response.data.product.map((raw: ReceivedProductData) => ({
          id: raw.id,
          title: raw.product_name,
          price: raw.price,
          info: raw.product_info,
          src: raw.photo,
      }));
      setCurrentProduct(newArr)
      console.log(newArr)
      } catch(error) {
        throw error;
      }
  }

  const sendApplication = async () => {
    try {
      await axios(`http://localhost:8000/applications/send/`, {
        method: 'PUT',
        data: {
          active_date: dateValue
        },
        withCredentials: true
      })

      dispatch(setProductsFromApplicationAction([]));
      dispatch(setCurrentApplicationDateAction(''));
      dispatch(setCurrentApplicationIdAction(0));
      toast.success("Заявка успешно отправлена на проверку!");
    } catch(error) {
      throw error;
    }
  }

  const deleteApplication = async () => {
    try {
      const response = await axios(`http://localhost:8000/applications/delete/`, {
      method: 'DELETE',
      withCredentials: true
    })

    dispatch(setProductsFromApplicationAction([]));
    dispatch(setCurrentApplicationDateAction(''));
    dispatch(setCurrentApplicationIdAction(0));
    toast.success("Заявка успешно удалена!");
    }
    catch(error) {
      throw error;
    }
    
  }

  React.useEffect(() => {
      const newLinksMap = new Map<string, string>(linksMap); // Копирование старого Map
      newLinksMap.set('Текущая заявка', '/applications/' + id + '/');
      dispatch(setLinksMapDataAction(newLinksMap))
      getCurrentApplication();
    console.log(currentApplicationId)
  }, [])

  const handleSendButtonClick = () => {
    sendApplication();
    navigate('/products')
  }

  const handleDeleteButtonClick = () => {
    deleteApplication();
    navigate('/products')
  }

  const handleDateChange = (event: ChangeEvent<HTMLInputElement>) => {
    setDateValue(event.target.value);
    console.log(event.target.value)
  };

    return (
        <div className={styles.application__page}>
            <Header/>
            <div className={styles['application__page-wrapper']}>
                <BreadCrumbs></BreadCrumbs>
                {flag ? <h1 className={styles['application__page-title']}>
                    Добавленные блюда
                </h1>
                : <>
                <h1 className={styles['application__page-title']}>
                  Текущая заявка
                </h1>
                <h5 className={styles['application__page-subtitle']}>
                </h5>
                </>
                }
                <div>
                  {!flag ? <>
                    
                  <ProductsTable flag={isCard ? false : true} products={currentProduct} className={styles['application__page-table']}/>
                  <div className={styles['application__page-info-btns']}>
                  {isCard && 
                    <Button onClick={() => handleSendButtonClick()} className={styles['application__page-info-btn']}>Отправить</Button>
                  } 
                  {isCard &&
                    <Button onClick={() => handleDeleteButtonClick()} className={styles['application__page-info-btn']}>Удалить</Button>
                  }
                  </div>
                  </>
                  : <ProductsTable flag={true} products={currentProduct} className={styles['application__page-table']}/>
                  }
                </div>
            </div>
        </div>
    )
}

export default SelectedApplicationPage