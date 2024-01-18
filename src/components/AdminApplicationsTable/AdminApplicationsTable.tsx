import React from 'react'
import { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import styles from './AdminApplicationsTable.module.scss'
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import ModalWindow from 'components/ModalWindow'
import cn from 'classnames';
import { useDispatch } from 'react-redux';
import { useCurrentApplicationDate, useProductsFromApplication,
  setCurrentApplicationDateAction, setProductsFromApplicationAction, setCurrentApplicationIdAction, useApplications, setApplicationsAction } from 'Slices/ApplicationsSlice'
import { Link, useNavigate } from 'react-router-dom';
import CancelIcon from 'components/Icons/CancelIcon';
import AcceptIcon from 'components/Icons/AcceptIcon';



interface ApplicationData {
  id: number;
  status: string;
  creationDate: string;
  publicationDate: string;
  approvingDate: string;
  readyStatus: boolean;
  userEmail: string;
}

interface ProductData {
  id: number;
  title: string;
  price: number;
  info: string;
  src: string;
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
  className?: string;
};

export type ReceivedApplicationData = {
  id: number;
  status: string;
  creation_date: string;
  publication_date: string;
  approving_date: string;
  ready_status: boolean;
  user_email: string;
}

const AdminApplicationsTable: React.FC<ProductsTableProps> = ({className}) => {
  const dispatch = useDispatch();
  const applications = useApplications()
  const [isModalWindowOpened, setIsModalWindowOpened] = useState(false);
  const [currentProducts, setCurrentProducts] = useState<ProductData[]>([])
  const navigate = useNavigate();

  const getAllApplications = async () => {
    try {
      const response = await axios('http://localhost:8000/applications/', {
        method: 'GET',
        withCredentials: true
      })
      const newArr = response.data.map((raw: ReceivedApplicationData) => ({
        id: raw.id,
        status: raw.status,
        // status: raw.status=="moderating" ? "Проверяется":"",
        // status: raw.status=="moderating" ? "Проверяется" : raw.status=="approved" ? "Принято" : raw.status=="registered" ? "Зарегистрирован" : raw.status=="denied" ? "Отказано" : raw.status=="deleted" ? "Удалено" : "",
        creationDate: raw.creation_date,
        publicationDate: raw.publication_date,
        approvingDate: raw.approving_date,
        readyStatus: raw.ready_status,
        userEmail: raw.user_email
    }));
    dispatch(setApplicationsAction(newArr))
    } catch(error) {
      throw error
    }
  }

  const getCurrentApplication = async (id: number) => {
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
        src: raw.photo
    }));
    setCurrentProducts(newArr)
    console.log('newArr is', newArr)
    } catch(error) {
      console.log("AAT")
      throw error;
    }
  }

  const putApplication = async (id: number, isAccepted: boolean) => {
    try {
      if (isAccepted) {
        await axios(`http://localhost:8000/applications/${id}/adminput/`, {
          method: 'PUT',
          data: {
            status: "Принято"
          },
          withCredentials: true
        })
        toast.success('Заявка принята!')
      } else {
        await axios(`http://localhost:8000/applications/${id}/adminput/`, {
          method: 'PUT',
          data: {
            status: "Отказано"
          },
          withCredentials: true
        })
        toast.success('Заявка отклонена!')
      }

      const updatedApplications = applications.map(application => {
        if (application.id === id) {
          return {
            ...application,
            status: isAccepted ? 'Принято' : 'Отказано'
          };
        }
        return application;
      });

      dispatch(setApplicationsAction(updatedApplications))
    } catch(e) {
      throw e
    }
  }
  

  const handleDetailedButtonClick = (id: number) => {
    // getCurrentApplication(id)
    setIsModalWindowOpened(true)
    navigate(`/admin/detailed/${id}/`); // Assuming the route for CurrentApplicationPage is '/applications/:id'
  };

  const handleAcceptButtonClick = (id: number) => {
    putApplication(id, true)
  }

  const handleCancelButtonClick = (id: number) => {
    putApplication(id, false)
  }

  React.useEffect(() => {
    getAllApplications()
  }, [])

  return (
    <>
    <div className={styles.table__container}>
    <Table responsive borderless className={!className ? styles.table : cn(styles.table, className)}>
        <thead>
          <tr className={styles.tableHead}>
            <th>№</th>
            <th>Статус</th>
            <th>Заказчик</th>
            <th>Дата создания</th>
            <th>Дата формирования</th>
            <th>Дата завершения</th>
            <th>Действие</th>
          </tr>
        </thead>
        <tbody>
          {applications.map((application: ApplicationData, index: number) => (
            
            <tr key={application.id}>
              {application.status !== 'Зарегистрирован' && <>
              <td>{++index}</td>
              <td>{application.status}</td>
              <td>{application.userEmail}</td>
              <td>{application.creationDate}</td>
              <td>{application.publicationDate ? application.publicationDate : '-'}</td>
              <td>{application.approvingDate ? application.approvingDate : '-'}</td>
              <td className={styles.table__action}>
                
                  <Button style={{backgroundColor: '#f6881b'}} onClick={() => handleDetailedButtonClick(application.id)}>Подробнее</Button>
                  {application.status === 'Проверяется' && <><CancelIcon onClick={() => handleCancelButtonClick(application.id)}></CancelIcon>
                  <AcceptIcon onClick={() => handleAcceptButtonClick(application.id)}></AcceptIcon></>}
                {/* </Link> */}
              </td>
              </>}
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

export default AdminApplicationsTable