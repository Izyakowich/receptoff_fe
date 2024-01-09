import React from 'react'
import axios from 'axios'
import { toast } from 'react-toastify';
import styles from './CurrentApplicationPage.module.scss'
import Header from 'components/Header'
import Button from 'react-bootstrap/Button'
import BreadCrumbs from 'components/BreadCrumbs';
import { useCurrentApplicationId } from 'Slices/ApplicationsSlice'
import ProductsTable from 'components/ProductsTable'
import { useDispatch } from 'react-redux'
import { useCurrentApplicationDate, useProductsFromApplication,
  setCurrentApplicationDateAction, setProductsFromApplicationAction, setCurrentApplicationIdAction } from 'Slices/ApplicationsSlice'
import { useLinksMapData, setLinksMapDataAction } from 'Slices/DetailedSlice';


export type ReceivedProductData = {
  id: number,
  product_name: string,
  product_info: string,
  price: number,
  status: string,
  photo: string,
}

const CurrentApplicationPage = () => {
  const dispatch = useDispatch();
  const products = useProductsFromApplication();
  const applicationDate = useCurrentApplicationDate();
  const currentApplicationId = useCurrentApplicationId();
  const linksMap = useLinksMapData();

  React.useEffect(() => {
    dispatch(setLinksMapDataAction(new Map<string, string>([
      ['Текущая заявка', '/application']
  ])))
  }, [])

  const sendApplication = async () => {
    try {
      const response = await axios(`http://localhost:8000/applications/send`, {
        method: 'PUT',
        withCredentials: true
      })

      dispatch(setProductsFromApplicationAction([]));
      dispatch(setCurrentApplicationDateAction(''));
      toast.success("Заявка успешно отправлена на проверку!");
    } catch(error) {
      throw error;
    }
  }

  const deleteApplication = async () => {
    try {
      const response = await axios(`http://localhost:8000/applications/delete`, {
      method: 'DELETE',
      withCredentials: true
    })

    dispatch(setProductsFromApplicationAction([]));
    dispatch(setCurrentApplicationDateAction(''));
    toast.success("Заявка успешно удалена!");
    }
    catch(error) {
      throw error;
    }
    
  }

  const handleSendButtonClick = () => {
    sendApplication();
  }

  const handleDeleteButtonClick = () => {
    deleteApplication();
  }

  return (
    <div className={styles.application__page}>
      <Header/>
      <div className={styles['application__page-wrapper']}>
        <BreadCrumbs links={linksMap}></BreadCrumbs>
        <h1 className={styles['application__page-title']}>
          Текущая заявка
        </h1>

        {products.length !== 0 ? <div>
          
          <div className={styles['application__page-info']}>
            {/* <h3 className={styles['application__page-info-title']}>Дата создания заявки: <br/><b>{applicationDate}</b></h3> */}
            <h3 className={styles['application__page-info-title']}>Добавленные блюда:</h3>
            <ProductsTable products={products} className={styles['application__page-info-table']}/>

            <div className={styles['application__page-info-btns']}>
              <Button onClick={() => handleSendButtonClick()} className={styles['application__page-info-btn']}>Отправить</Button>
              <Button onClick={() => handleDeleteButtonClick()} className={styles['application__page-info-btn']}>Удалить</Button>
            </div>
          </div>
        </div>
        : null
      }
      </div>
    </div>
  )
}

export default CurrentApplicationPage
