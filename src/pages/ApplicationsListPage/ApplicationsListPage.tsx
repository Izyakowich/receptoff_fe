import React, { useState } from 'react'
import axios from 'axios'
import styles from './ApplicationsListPage.module.scss'
import Header from 'components/Header'
import ModalWindow from 'components/ModalWindow'
import ApplicationsTable from 'components/ApplicationsTable'
import BreadCrumbs from 'components/BreadCrumbs'
import { useDispatch } from 'react-redux'
import { setApplicationsAction, useApplications } from 'Slices/ApplicationsSlice'
import { useLinksMapData, setLinksMapDataAction } from 'Slices/DetailedSlice';

export type ReceivedApplicationData = {
    id: number;
    user_email: string;
    moderator_email: string;
    creation_date: string;
    publication_date: string;
    approving_date: string;
    status: string;
    ready_status: boolean;
  }

const ApplicationsListPage = () => {
    const dispatch = useDispatch();
    const applications = useApplications();
    const linksMap = useLinksMapData();
    const [isModalWindowOpened, setIsModalWindowOpened] = useState(false);

    const getAllApplications = async () => {
        try {
          const response = await axios('http://localhost:8000/applications/', {
            method: 'GET',
            withCredentials: true
          })
          const newArr = response.data.map((raw: ReceivedApplicationData) => ({
            id: raw.id,
            status: raw.status,
            // status: raw.status=="registered" ? "Зарегестрировано" : raw.status=="denied" ? "Отклонено" : raw.status=="moderating" ? "Проверяется" : "",
            creationDate: raw.creation_date,
            publicationDate: raw.publication_date,
            approvingDate: raw.approving_date,
            readyStatus: raw.ready_status
        }));
        dispatch(setApplicationsAction(newArr))
        } catch(error) {
          throw error
        }
    }

    React.useEffect(() => {
        dispatch(setLinksMapDataAction(new Map<string, string>([
            ['Заявки', '/applications/']
        ])))
        getAllApplications()
    }, [])
    
    return (
        <div className={styles.applications__page}>
            <Header/>
            <div className={styles['applications__page-wrapper']}>
                <BreadCrumbs links={linksMap}></BreadCrumbs>
                <h1 className={styles['applications__page-title']}>История ваших заявок</h1>
                <ApplicationsTable applications={applications}/>
                <ModalWindow handleBackdropClick={() => setIsModalWindowOpened(false)} className={styles.modal} active={isModalWindowOpened}>
                    <h3 className={styles.modal__title}>Регистрация прошла успешно!</h3>
                </ModalWindow>
            </div>
        </div>
    )
}

export default ApplicationsListPage