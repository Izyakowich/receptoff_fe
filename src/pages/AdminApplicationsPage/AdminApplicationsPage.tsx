import React, {ChangeEvent, useState} from 'react'
import axios from 'axios'
import styles from './AdminApplicationsPage.module.scss'
import Header from 'components/Header'
import { useDispatch, useSelector } from 'react-redux'
import { useApplications, setApplicationsAction } from 'Slices/ApplicationsSlice'
import Form from 'react-bootstrap/Form'
import { Dropdown } from 'react-bootstrap'
import BreadCrumbs from 'components/BreadCrumbs'
import ArrowDownIcon from 'components/Icons/ArrowDownIcon'
import AdminApplicationsTable from 'components/AdminApplicationsTable'
import { useLinksMapData, setLinksMapDataAction } from 'Slices/DetailedSlice'
// import { setAppValueAction, setAppDropdownValueNameAction, setAppDropdownValueIdAction, useInputValue, useStatusValue } from "Slices/FilterSlice"
import { RootState } from 'Slices/Store'

import {
  setSearchTerm,
  setStatusFilter,
  setStartDate,
  setEndDate,
  selectFilters,
} from 'Slices/FilterSlice';
const statuses = ["Все", "Проверяется","Отказано", "Принято"]

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

export type ApplicationData = {
  id: number;
  userEmail: string;
  moderatorEmail: string;
  status: string;
  creationDate: string;
  publicationDate: string;
  approvingDate: string;
  readyStatus: boolean;
}

const AdminApplicationsPage = () => {
  const applications = useApplications()
  const dispatch = useDispatch()
  const [startTime, setStartTime] = useState('')
  const [endTime, setEndTime] = useState('')
  const [statusValue, setStatusValue] = useState(statuses[0])
  const [emailValue, setEmailValue] = useState('')


  const filters = useSelector(selectFilters);

  // const searchValue = useInputValue()
  

  const getAllApplications = async () => {
    let res = ''
    if (filters.startDate && filters.endDate) {
      res += `?start=${filters.startDate}&end=${filters.endDate}`
    } else if(filters.startDate) {
      res += `?start=${filters.startDate}`
    } else if(filters.endDate) {
      res += `?end=${filters.endDate}`
    }

    if (res.length === 0 && filters.statusFilter !== 'Все') {
      res += `?status=${filters.statusFilter}`
    } else if (res.length !== 0 && filters.statusFilter !== 'Все'){
      res += `&status=${filters.statusFilter}`
    }

    try {
      const response = await axios(`http://localhost:8000/applications/${res}`, {
      method: 'GET',
      withCredentials: true,
    })
      
      const newArr = response.data.map((raw: ReceivedApplicationData) => ({
        id: raw.id,
        status: raw.status,
        creationDate: raw.creation_date,
        publicationDate: raw.publication_date,
        approvingDate: raw.approving_date,
        readyStatus: raw.ready_status,
        userEmail: raw.user_email,
        moderatorEmail: raw.moderator_email
    }));

    console.log("##################")

    // console.log(searchValue)
    dispatch(setApplicationsAction(newArr.filter((application: ApplicationData) => {
      return application.userEmail ? application.userEmail.includes(filters.searchTerm) : false;
    })));

    } catch(error) {
      throw error
    }
  }
//##############
const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
  dispatch(setSearchTerm(event.target.value));
};

const handleStatusChange = (eventKey: string | null) => {
  dispatch(setStatusFilter(eventKey ?? ''));
};

const handleStartDateChange = (event: ChangeEvent<HTMLInputElement>) => {
  dispatch(setStartDate(event.target.value));
};

const handleEndDateChange = (event: ChangeEvent<HTMLInputElement>) => {
  dispatch(setEndDate(event.target.value));
};
//###############

  const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    getAllApplications()
  }

  // const handleTitleValueChange = (event: ChangeEvent<HTMLInputElement>)  => { //имейл 
  //   dispatch(setAppValueAction(event.target.value))
  // }
  
  const handleCategorySelect = (eventKey: string | null) => {
    if (eventKey !== null) {
      const selectedStatus = statuses.find(status => status === eventKey)
      if (selectedStatus && selectedStatus !== filters.statusFilter && selectedStatus) {
        setStatusValue(selectedStatus)
      }
    }
};


React.useEffect(() => {
  const intervalId = setInterval(() => getAllApplications(), 1000);

  return () => {
    clearInterval(intervalId);
  };
}, [filters.statusFilter, filters.startDate, filters.endDate, filters.searchTerm]);

React.useEffect(() => {
  dispatch(setApplicationsAction(applications.filter((application: ApplicationData) => {
    return application.userEmail ? application.userEmail.includes(filters.searchTerm) : false;
  })));
}, [filters.searchTerm])

  return (
    <div className={styles.admin__page}>
      <Header></Header>
        <div className={styles['admin__page-wrapper']}>
        <BreadCrumbs/>
          <h1 className={styles['admin__page-title']}>Заявки всех пользователей</h1>

        <Form onSubmit={(event: React.FormEvent<HTMLFormElement>) => handleFormSubmit(event)}
          className={styles['form']}>
              <div className={styles.form__item}>
              Начальная дата
              <Form.Control 
                // onChange={(event: ChangeEvent<HTMLInputElement>) => {
                //   setStartTime(event.target.value);
                // }} 
                // value={startTime} 
                onChange={handleStartDateChange}
                value={filters.startDate}
                className={styles.form__input} 
                type="date" 
                placeholder="Начальная дата" 
                />
              </div>
              <div className={styles.form__item}>
              Конечная дата
              <Form.Control 
                // onChange={(event: ChangeEvent<HTMLInputElement>) => {
                //   setEndTime(event.target.value);
                // }} 
                // value={endTime} 
                onChange={handleEndDateChange}
                value={filters.endDate}
                className={styles.form__input} 
                type="date" 
                placeholder="Конечная дата" 
              />
              </div>

              <div className={styles.form__item}>
                Статус заявки
              <Dropdown className={styles['dropdown']} onSelect={handleStatusChange}>
                <Dropdown.Toggle
                    className={styles['dropdown__toggle']}
                    style={{
                        borderColor: '#f6881b',
                        backgroundColor: "#fff",
                        color: '#000',
                    }}
                >   
                    {filters.statusFilter}
                    <ArrowDownIcon className={styles.dropdown__icon}/>
                </Dropdown.Toggle>
                <Dropdown.Menu className={styles['dropdown__menu']}>
                    {statuses
                    .map(status => (
                        <Dropdown.Item className={styles['dropdown__menu-item']} key={status} eventKey={status}>
                        {status}
                        </Dropdown.Item>
                    ))}
                    </Dropdown.Menu>
                </Dropdown>
              </div>
              <div className={styles.form__item}>
                Заказчик
              <Form.Control 
                onChange={handleSearchChange} 
                value={filters.searchTerm} 
                className={styles.form__input} 
                type="text" 
                placeholder="Введите E-mail заказчика" 
              />
              </div>
          </Form>
          <AdminApplicationsTable></AdminApplicationsTable>
        </div>
    </div>
  )
}

export default AdminApplicationsPage