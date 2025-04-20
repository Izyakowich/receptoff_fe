// import * as React from 'react';
// // import Button from 'react-bootstrap/Button';
// import Header from 'components/Header';
// import BreadCrumbs from 'components/BreadCrumbs';
// import Image from "react-bootstrap/Image"
// import styles from './DetaliedPage.module.scss'
// import { useEffect } from 'react';
// import { useParams } from 'react-router-dom';
// import { mockProducts } from '../../../consts'
// import {useDispatch} from "react-redux";
// import { useProduct, useLinksMapData, setProductAction, setLinksMapDataAction } from "../../Slices/DetailedSlice"
// import axios from 'axios';

// export type ReceivedProductData = {
//     id: number,
//     product_name: string,
//     product_info: string,
//     price: number,
//     status: string,
//     photo: string,
// }

// const DetailedPage: React.FC = () => {
//     const dispatch = useDispatch();
//     const product = useProduct();
//     const linksMap = useLinksMapData();

//     const params = useParams();
//     const id = params.id === undefined ? '' : params.id;

//     const getProduct = async () => {
//         try {
//             const response = await axios.get(`http://127.0.0.1:8000/products/${id}/`);
//             const jsonData = response.data;
//             dispatch(setProductAction({
//                 id: Number(jsonData.id),
//                 title: jsonData.product_name,
//                 price: jsonData.price,
//                 info: jsonData.product_info,
//                 src: jsonData.photo
//             }))

//             const newLinksMap = new Map<string, string>(linksMap); // Копирование старого Map
//             newLinksMap.set(jsonData.title, '/products/' + id + '/');
//             dispatch(setLinksMapDataAction(newLinksMap))
//         } catch {
//             const sub = mockProducts.find(item => item.id === Number(id));
//             if (sub) {
//                 dispatch(setProductAction(sub))
//             }
//         }
//     };
//     useEffect(() => {
//         getProduct();

//         return () => { // Возможно лучше обобщить для всех страниц в отдельный Slice !!!
//             dispatch(setLinksMapDataAction(new Map<string, string>([['Блюда', '/products']])))
//         }
//     }, []);

//     return (
//         <div className='detailed__page'>
//             <Header/>
//             <div className={styles['detailed__page-wrapper']} style={{paddingTop: "90px"}}>
//                 <BreadCrumbs/>
                
//                 <div className={styles['detailed__page-container']}>
//                     <Image
//                         className={styles['detailed__page-image']}
//                         src={product?.src ? product?.src : "https://www.solaredge.com/us/sites/nam/files/Placeholders/Placeholder-4-3.jpg"}
//                         rounded
//                     />
//                     <div className={styles['detailed__page-info']}>
//                         <h4 className={styles['detailed__page-article']}>Цена на данное блюдо:  <strong>{product?.price}р.</strong></h4>
//                         <div className={styles['detailed__page-description']}>
//                             <h4 className={styles['detailed__page-article']}>Описание:</h4>
//                             <p>{product?.info}</p>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     )
// };
  
// export default DetailedPage;


import * as React from 'react';
import Header from 'components/Header';
import BreadCrumbs from 'components/BreadCrumbs';
import Image from "react-bootstrap/Image"
import styles from './DetaliedPage.module.scss'
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { mockProducts } from '../../../consts'
import {useDispatch} from "react-redux";
import { useProduct, useLinksMapData, setProductAction, setLinksMapDataAction } from "../../Slices/DetailedSlice"
import axios from 'axios';
import { toast } from 'react-toastify';
import Button from 'react-bootstrap/Button';
import { useIsAuth } from 'Slices/AuthSlice';

export type ReceivedProductData = {
    id: number,
    product_name: string,
    product_info: string,
    price: number,
    status: string,
    photo: string,
}

const DetailedPage: React.FC = () => {
    const dispatch = useDispatch();
    const product = useProduct();
    const linksMap = useLinksMapData();
    const isUserAuth = useIsAuth();
    const params = useParams();
    const id = params.id === undefined ? '' : params.id;
    const [isGenerating, setIsGenerating] = useState(false);
    const [currentImage, setCurrentImage] = useState<string | undefined>();

    const handleGenerateImage = async () => {
        if (!isUserAuth) {
            toast.info('Авторизуйтесь для генерации изображений');
            return;
        }

        setIsGenerating(true);
        try {
            const response = await axios.post(
                `http://localhost:8000/products/${id}/generateImage/`,
                {},
                { withCredentials: true }
            );
            
            if (response.data.image_url) {
                setCurrentImage(response.data.image_url);
                dispatch(setProductAction({
                    ...product,
                    src: response.data.image_url
                }));
                toast.success('Изображение успешно сгенерировано!');
            }
        } catch (error) {
            toast.error('Ошибка при генерации изображения');
            console.error('Generation error:', error);
        } finally {
            setIsGenerating(false);
        }
    };

    const getProduct = async () => {
        try {
            const response = await axios.get(`http://127.0.0.1:8000/products/${id}/`);
            const jsonData = response.data;
            setCurrentImage(jsonData.photo);
            dispatch(setProductAction({
                id: Number(jsonData.id),
                title: jsonData.product_name,
                price: jsonData.price,
                info: jsonData.product_info,
                src: jsonData.photo
            }))

            const newLinksMap = new Map<string, string>(linksMap);
            newLinksMap.set(jsonData.product_name, '/products/' + id + '/');
            dispatch(setLinksMapDataAction(newLinksMap))
        } catch {
            const sub = mockProducts.find(item => item.id === Number(id));
            if (sub) {
                setCurrentImage(sub.src);
                dispatch(setProductAction(sub))
            }
        }
    };

    useEffect(() => {
        getProduct();

        return () => {
            dispatch(setLinksMapDataAction(new Map<string, string>([['Блюда', '/products']])))
        }
    }, [id]);

    return (
        <div className='detailed__page'>
            <Header/>
            <div className={styles['detailed__page-wrapper']} style={{paddingTop: "90px"}}>
                <BreadCrumbs/>
                
                <div className={styles['detailed__page-container']}>
                    <div className={styles['image-section']}>
                        <div className={styles['image-wrapper']}>
                            <Image
                                className={styles['detailed__page-image']}
                                src={currentImage || product?.src || "https://www.solaredge.com/us/sites/nam/files/Placeholders/Placeholder-4-3.jpg"}
                                rounded
                                fluid
                            />
                        </div>
                        {isUserAuth && (
                            <Button 
                                variant="outline-secondary"
                                onClick={handleGenerateImage}
                                disabled={isGenerating}
                                className={styles['generate-button']}
                            >
                                {isGenerating ? 'Генерация...' : 'Сгенерировать новое изображение'}
                            </Button>
                        )}
                    </div>
                    
                    <div className={styles['detailed__page-info']}>
                        <h4 className={styles['detailed__page-article']}>
                            Цена на данное блюдо: <strong>{product?.price}р.</strong>
                        </h4>
                        <div className={styles['detailed__page-description']}>
                            <h4 className={styles['detailed__page-article']}>Описание:</h4>
                            <p>{product?.info || 'Описание отсутствует'}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
};
  
export default DetailedPage;