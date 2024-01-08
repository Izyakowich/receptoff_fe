import React from 'react'
import axios from 'axios';
import { toast } from 'react-toastify';
import styles from './ProductsTable.module.scss'
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import cn from 'classnames';
import { useDispatch } from 'react-redux';
import BasketIcon from 'components/Icons/BasketIcon';
import { useCurrentApplicationDate, useProductsFromApplication,
  setCurrentApplicationDateAction, setProductsFromApplicationAction, setCurrentApplicationIdAction } from 'Slices/ApplicationsSlice'

interface ProductData {
  id: number,
  title: string,
  price: number,
  info: string,
  src: string,
}

export type ProductsTableProps = {
  products: ProductData[];
  className?: string;
  flag?: boolean;
};

const ProductsTable: React.FC<ProductsTableProps> = ({products, className, flag}) => {
  const dispatch = useDispatch();
  const productss = useProductsFromApplication()

  const deleteProductFromApplication = async (id: number) => {
    try {
      const response = axios(`http://localhost:8000/application_product/${id}/delete`, {
        method: 'DELETE',
        withCredentials: true
      })

      console.log(id, productss)

      dispatch(setProductsFromApplicationAction(productss.filter(product => product.id !== id)))

      toast.success("Блюдо успешно удалено!");
    } catch(error) {
      throw error;
    }
  }

  const handleDeleteButtonClick = (id: number) => {
    deleteProductFromApplication(id)
  }

  return (
    <div className={styles.table__container}>
      <Table responsive borderless className={!className ? styles.table : cn(styles.table, className)}>
        <thead style={{backgroundColor: '#f6881b'}}
>
          <tr className={styles.tableHead}>
            <th>№</th>
            <th>Название</th>
            <th>Цена</th>
            {!flag && <th></th>}
          </tr>
        </thead>
        <tbody>
          {products.map((product: ProductData, index: number) => (
            <tr key={product.id}>
              <td>{++index}</td>
              <td>{product.title}</td>
              <td>{product.price} ₽</td>
              {!flag && <td className={styles.table__action}><BasketIcon onClick={() => handleDeleteButtonClick(product.id)}/></td>}
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  )
}

export default ProductsTable