import React, {ChangeEvent, useState} from 'react'
import axios from 'axios'
import styles from './AdminApplicationsPage.module.scss'
import Header from 'components/Header'
import { useDispatch } from 'react-redux'
import { useApplications, setApplicationsAction } from 'Slices/ApplicationsSlice'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import { Dropdown } from 'react-bootstrap'
import ArrowDownIcon from 'components/Icons/ArrowDownIcon'
import AdminApplicationsTable from 'components/AdminApplicationsTable'

const statuses = ["Все", "Проверяется",'Отказано', "Принято"]

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

const AdminApplicationsPage = () => {
  const applications = useApplications()
  const dispatch = useDispatch()
  const [startTime, setStartTime] = useState('')
  const [endTime, setEndTime] = useState('')
  const [statusValue, setStatusValue] = useState(statuses[0])

  const getAllApplications = async () => {
    let res = ''
    if (startTime && endTime) {
      res += `?start=${startTime}&end=${endTime}`
    } else if(startTime) {
      res += `?start=${startTime}`
    } else if(endTime) {
      res += `?end=${endTime}`
    }

    if (res.length === 0 && statusValue !== 'Все') {
      res += `?status=${statusValue}`
    } else if (res.length !== 0 && statusValue !== 'Все'){
      res += `&status=${statusValue}`
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
        readyStatus: raw.ready_status
    }));
    dispatch(setApplicationsAction(newArr))
    } catch(error) {
      throw error
    }
  }

  const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    getAllApplications()
  }

  const handleCategorySelect = (eventKey: string | null) => {
    if (eventKey !== null) {
      const selectedStatus = statuses.find(status => status === eventKey)
      if (selectedStatus && selectedStatus !== statusValue && selectedStatus) {
        setStatusValue(selectedStatus)
      }
    }
};


  return (
    <div className={styles.admin__page}>
      <Header></Header>
        <div className={styles['admin__page-wrapper']}>
          <h1 className={styles['admin__page-title']}>Заявки всех пользователей</h1>
          <Form onSubmit={(event: React.FormEvent<HTMLFormElement>) => handleFormSubmit(event)}
          className={styles['form']}>
              <div className={styles.form__item}>
                <Form.Control onChange={(event: ChangeEvent<HTMLInputElement>) => {setStartTime(event.target.value)}} value={startTime} className={styles.form__input} type="date" placeholder="Начальная дата (Год-Месяц-День)*" />
              </div>
              <div className={styles.form__item}>
                <Form.Control onChange={(event: ChangeEvent<HTMLInputElement>) => {setEndTime(event.target.value)}} value={endTime} className={styles.form__input} type="date" placeholder="Конечная дата (Год-Месяц-День)*" />
              </div>

              <div className={styles.form__item}>
              <Dropdown className={styles['dropdown']} onSelect={handleCategorySelect}>
                <Dropdown.Toggle
                    className={styles['dropdown__toggle']}
                    style={{
                        borderColor: '#f6881b',
                        backgroundColor: "#fff",
                        color: '#000',
                    }}
                >   
                    {statusValue}
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
              <Button style={{backgroundColor: '#f6881b', borderColor: '#f6881b'}} className={styles.form__btn} type='submit'>Найти</Button>
          </Form>
          <AdminApplicationsTable></AdminApplicationsTable>
        </div>
    </div>
  )
}

export default AdminApplicationsPage