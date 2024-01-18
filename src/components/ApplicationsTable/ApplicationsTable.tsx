import React from 'react'
import { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import styles from './ApplicationsTable.module.scss'
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import ModalWindow from 'components/ModalWindow'
import cn from 'classnames';
import { useDispatch } from 'react-redux';
import { useCurrentApplicationDate, useProductsFromApplication,
  setCurrentApplicationDateAction, setProductsFromApplicationAction, setCurrentApplicationIdAction } from 'Slices/ApplicationsSlice'
import { Link, useNavigate } from 'react-router-dom';

interface ApplicationData {
  id: number;
  userEmail: string;
  moderatorEmail: string;
  status: string;
  creationDate: string;
  publicationDate: string;
  approvingDate: string;
  readyStatus: boolean;
}

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

export type ProductsTableProps = {
  applications: ApplicationData[];
  className?: string;
};

const ApplicationsTable: React.FC<ProductsTableProps> = ({applications, className}) => {
  const dispatch = useDispatch();
  const [isModalWindowOpened, setIsModalWindowOpened] = useState(false);
  const [currentProducts, setCurrentProducts] = useState<ProductData[]>([])
  const navigate = useNavigate();

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

  // const handleDetailedButtonClick = (id: number) => {
  //   getCurrentApplication(id);
  //   setIsModalWindowOpened(true)
  // };

  const handleDetailedButtonClick = (id: number) => {
    // Modify the function to navigate to the CurrentApplicationPage route
    navigate(`/detailed/${id}/`); // Assuming the route for CurrentApplicationPage is '/applications/:id'
  };

  return (
    <>
    <div className={styles.table__container}>
    <Table responsive borderless className={!className ? styles.table : cn(styles.table, className)}>
        <thead>
          <tr className={styles.tableHead}>
            <th>№</th>
            <th>Статус</th>
            <th>Дата создания</th>
            <th>Дата формирования</th>
            <th>Дата завершения</th>
            <th>Готовность</th>
            <th>Действие</th>
          </tr>
        </thead>
        <tbody>
          {applications.map((application: ApplicationData, index: number) => (
            console.log(application),
            <tr key={application.id}>
              <td>{++index}</td>
              <td>{application.status}</td>
              <td>{application.creationDate}</td>
              <td>{application.publicationDate ? application.publicationDate : '-'}</td>
              <td>{application.approvingDate ? application.approvingDate : '-'}</td>
              <td>{application.readyStatus==false ? "Готовится" : "Готово"}</td>
              <td className={styles.table__action}>
                
                <Link to={`/applications/${application.id}/`}>
                  <Button style={{backgroundColor: '#f6881b'}} onClick={() => handleDetailedButtonClick(application.id)}>Подробнее</Button>
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>

      {/* <ModalWindow handleBackdropClick={() => setIsModalWindowOpened(false)} className={styles.modal} active={isModalWindowOpened}>
      <h3 className={styles.modal__title}>Добавленные блюда</h3>
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
      </ModalWindow> */}
    </>
  );
}

export default ApplicationsTable