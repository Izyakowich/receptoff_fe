import React, { useState, ChangeEvent } from 'react'
import styles from './AdminProductsPage.module.scss'
import {useDispatch} from "react-redux";
import {  useTitleValue, useProducts, usePriceValues,
      setTitleValueAction, setProductsAction, setPriceValuesAction } from "../../Slices/MainSlice";
import { toast } from 'react-toastify';
import axios from 'axios';
import Form from 'react-bootstrap/Form';
import { Dropdown } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Header from 'components/Header';
import CustomTable from 'components/CustomTable';
import ModalWindow from 'components/ModalWindow';
import ArrowDownIcon from 'components/Icons/ArrowDownIcon';
import EditIcon from 'components/Icons/EditIcon';
import BasketIcon from 'components/Icons/BasketIcon';
import AddButton from 'components/Icons/AddButton';
import { useNavigate } from 'react-router-dom';





export type ReceivedProductData = {
  id: number,
  product_name: string,
  product_info: string,
  price: number,
  status: string,
  photo: string,
}

export type CategoryData = {
    id: number;
    title: string;
}

const columns = [
    {
        key: 'title',
        title: 'Название продукта'
    },
    {
        key: 'price',
        title: 'Стоимость'
    },
]

const AdminProductsPage = () => {
    const dispatch = useDispatch()
    const products = useProducts()
    const navigate = useNavigate()
    const [isProductsShow, setIsProductsShow] = useState(true)

  return (
    <div className={styles.admin__page}>
        <Header/>

        <div className={styles['admin__page-wrapper']}>
            {isProductsShow && <><h1 className={styles['admin__page-title']}>Список услуг</h1>

            <div className={styles['admin__page-title']}>
                <CustomTable className={styles['admin__page-table']} data={products} 
                columns={columns} flag={2} ></CustomTable>
            </div>
            </>}
        </div>
        {/* <ModalWindow handleBackdropClick={() => {setIsAddModalWindowOpened(false); setIsEditModalWindowOpened(false);}}
                className={styles.modal} active={isAddModalWindowOpened || isEditModalWindowOpened}>
                <h3 className={styles.modal__title}>Заполните данные</h3>
                <Form onSubmit={(event: React.FormEvent<HTMLFormElement>) => handleCategoryFormSubmit(event)}
                className={styles['form']}>
                    <div className={styles.form__item}>
                    <Form.Control onChange={(event: ChangeEvent<HTMLInputElement>) => {setNewCategoryValue(event.target.value)}} value={newCategoryValue} className={styles.form__input} type="text" placeholder="Название категории*" />
                    </div>
                    <Button disabled={newCategoryValue.length !== 0 ? false : true} type='submit'>Сохранить</Button>
                </Form>
            </ModalWindow>

            <ModalWindow handleBackdropClick={() => setIsDeleteModalWindowOpened(false)} active={isDeleteModalWindowOpened} className={styles.modal}>
            <h3 className={styles.modal__title}>Вы уверены, что хотите удалить это блюдо?</h3>
            <div className={styles['modal__delete-btns']}>
                <Button onClick={() => deleteCategory()} className={styles.modal__btn}>Подтвердить</Button>
                <Button onClick={() => setIsDeleteModalWindowOpened(false)} className={styles.modal__btn}>Закрыть</Button>
            </div>
            </ModalWindow> */}
    </div>
  )
}

export default AdminProductsPage