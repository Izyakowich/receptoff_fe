import * as React from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Header from 'components/Header';
import OneCard from 'components/Card';
import styles from './MainPage.module.scss'
import { useEffect, useState } from 'react';
import { ChangeEvent } from 'react';
// import Dropdown from 'react-bootstrap/Dropdown';
// import { Link } from 'react-router-dom';
// import SliderFilter from 'components/Slider';
import BreadCrumbs from 'components/BreadCrumbs';

import { mockProducts } from '../../../consts';

export type Product = {
    id: number,
    title: string,
    price: number,
    info: string,
    src: string,
    idCategory: number,
    categoryTitle: string,
    status: string
}

export type ReceivedProductData = {
    id: number,
    title: string,
    price: number,
    info: string,
    src: string,
    id_category: number,
    category: string,
}



const MainPage: React.FC = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [titleValue, setTitleValue] = useState<string>('')

    const linksMap = new Map<string, string>([
        ['Продукты', '/']
    ]);

    const fetchProducts = async () => {
        let url = 'http://127.0.0.1:8000/products'
        
  
        try {
            const response = await fetch(url, {
                credentials: 'include'
            });
            const jsonData = await response.json();
            const newRecipesArr = jsonData.map((raw: ReceivedProductData) => ({
                id: raw.id,
                title: raw.title,
                price: raw.price,
                info: raw.info,
                src: raw.src,
                categoryTitle: raw.category
            }));
        
            setProducts(newRecipesArr);
        }
        catch {
            console.log('запрос не прошел !')

            if (titleValue) {
                const filteredArray = mockProducts.filter(mockProducts => mockProducts.title.includes(titleValue));
                setProducts(filteredArray);
            }

            
            else {
                setProducts(mockProducts);
            }
        }
        
    };
    useEffect(() => {
        fetchProducts();
    }, []);

    const handleSearchButtonClick = () => {
        fetchProducts();
    }

    const handleTitleValueChange = (event: ChangeEvent<HTMLInputElement>) => {
        setTitleValue(event.target.value);
    };


    const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
    };



    return (
        <div className={styles['main__page']}>
            <Header/>
            <div className={styles['content']}>
                <BreadCrumbs links={linksMap}></BreadCrumbs>

                <h1 className="mb-4" style={{fontSize: 30}}>
                    Здесь вы можете выбрать для себя любимое блюдо
                </h1>

                <Form className="d-flex gap-3" onSubmit={handleFormSubmit}>
                    <div className='w-100'>
                        <Form.Group style={{height: 60}} className='w-100 mb-3' controlId="search__sub.input__sub">
                            <Form.Control style={{height: '100%', borderColor: '#3D348B', fontSize: 18}} value={titleValue} onChange={handleTitleValueChange} type="text" placeholder="Введите название блюда..." />
                        </Form.Group>
                        <div style={{display: 'flex', gap: 10, width: '100%', justifyContent: 'space-between', alignItems: 'flex-end'}}>
            
                        </div>
                        
                    </div>
                    
                    <Button style={{backgroundColor: "#2787F5", padding: "15px 40px", borderColor: "#000", fontSize: 18, height: 60}} onClick={() => handleSearchButtonClick()}>Найти</Button>
                </Form>

                <div className={styles["content__cards"]}>
                    { products.map((product: Product) => (
                        <OneCard id={product.id} src={product.src} onButtonClick={() => console.log('add to application')} title={product.title} category={product.categoryTitle} price={Number(product.price)}></OneCard>
                    ))}
                </div>
            </div>
        </div>
    )
};
  
export default MainPage;