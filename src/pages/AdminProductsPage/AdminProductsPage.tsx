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
import BreadCrumbs from 'components/BreadCrumbs';


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

    const getProducts = async () => {
        try {
            const response = await axios(`http://localhost:8000/products/`, {
                method:'GET',
                withCredentials: true,
            })
            const request_id = response.data.application_id;
        }
        catch (error) {
            console.log(error)
        }
    }

React.useEffect(() => {
    getProducts()
  }, [])


  return (
    <div className={styles.admin__page}>
        <Header/>
        <div className={styles['admin__page-wrapper']}>
        <BreadCrumbs/>

            {isProductsShow && <><h1 className={styles['admin__page-title']}>Список услуг</h1>

            <div className={styles['admin__page-title']}>
                <CustomTable className={styles['admin__page-table']} data={products} 
                columns={columns} flag={2} ></CustomTable>
            </div>
            </>}
        </div>
    </div>
  )
}

export default AdminProductsPage