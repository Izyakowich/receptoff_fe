import * as React from 'react';
import Header from 'components/Header';
import BreadCrumbs from 'components/BreadCrumbs';
import Image from "react-bootstrap/Image"
import styles from './DetaliedPage.module.scss'
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { mockProducts } from '../../../consts'
import {useDispatch} from "react-redux";
import { useProduct, useLinksMapData, setProductAction, setLinksMapDataAction } from "../../Slices/DetailedSlice"
import axios from 'axios';
import { toast } from 'react-toastify';
import Button from 'react-bootstrap/Button';
import { useIsAuth, useUser } from 'Slices/AuthSlice';
import { useProductsFromApplication, setProductsFromApplicationAction, useCurrentApplicationId, setCurrentApplicationIdAction } from 'Slices/ApplicationsSlice';
import ApplicationIcon from 'components/Icons/ApplicationIcon';

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
    const user = useUser();
    const productsFromApplication = useProductsFromApplication();
    const currentApplicationId = useCurrentApplicationId();
    const params = useParams();
    const id = params.id === undefined ? '' : params.id;
    const [isGenerating, setIsGenerating] = useState(false);
    const [currentImage, setCurrentImage] = useState<string | undefined>();
    const navigate = useNavigate();

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

    const handleAddToCart = async () => {
        if (!isUserAuth) {
            toast.info('Авторизуйтесь для добавления в корзину');
            return;
        }
        try {
            const response = await axios.post(
                `http://localhost:8000/products/${product.id}/post/`,
                {},
                { withCredentials: true }
            );
            const addedProduct = {
                id: response.data.id,
                title: response.data.product_name,
                price: response.data.price,
                info: response.data.product_info,
                src: response.data.photo
            };
            // Обновить applicationId, если пришёл новый
            if (response.data.application_id) {
                dispatch(setCurrentApplicationIdAction(response.data.application_id));
            }
            dispatch(setProductsFromApplicationAction([...productsFromApplication, addedProduct]));
            toast.success('Блюдо добавлено в корзину!');
        } catch {
            toast.error('Блюдо уже добавлено в корзину!');
        }
    };

    const handleGoToCart = () => {
        if (currentApplicationId !== null) {
            navigate(`/applications/${currentApplicationId}/`, { state: { flag: false } });
        } else {
            toast.info('Корзина пуста');
        }
    };

    const getProduct = async () => {
        try {
            console.log('🔍 Fetching product data for ID:', id);
            const response = await axios.get(`http://127.0.0.1:8000/products/${id}/`);
            const jsonData = response.data;
            console.log('✅ Received product data:', {
                id: jsonData.id,
                name: jsonData.product_name,
                price: jsonData.price
            });
            
            setCurrentImage(jsonData.photo);
            
            const productData = {
                id: Number(jsonData.id),
                title: jsonData.product_name,
                price: jsonData.price,
                info: jsonData.product_info,
                src: jsonData.photo
            };
            console.log('📦 Dispatching product data:', productData);
            dispatch(setProductAction(productData));

            // Обновляем linksMap, сохраняя базовую структуру
            const newLinksMap = new Map<string, string>([
                ['Блюда', '/products'],
                [id.toString(), jsonData.product_name]
            ]);
            console.log('🗺 Setting linksMap:', Object.fromEntries(newLinksMap));
            dispatch(setLinksMapDataAction(newLinksMap));

        } catch (error) {
            console.log('❌ Error fetching product:', error);
            const sub = mockProducts.find(item => item.id === Number(id));
            if (sub) {
                console.log('📝 Using mock data:', sub);
                setCurrentImage(sub.src);
                dispatch(setProductAction(sub));
                
                // Обновляем linksMap для моковых данных
                const newLinksMap = new Map<string, string>([
                    ['Блюда', '/products'],
                    [id.toString(), sub.title]
                ]);
                console.log('🗺 Setting linksMap (mock):', Object.fromEntries(newLinksMap));
                dispatch(setLinksMapDataAction(newLinksMap));
            }
        }
    };

    useEffect(() => {
        console.log('🚀 Component mounted, fetching data for ID:', id);
        getProduct();

        return () => {
            console.log('👋 Component unmounting, resetting linksMap');
            dispatch(setLinksMapDataAction(new Map<string, string>([['Блюда', '/products']])));
        }
    }, [id]);

    useEffect(() => {
        if (id) {
            dispatch(setLinksMapDataAction(new Map<string, string>([
                ['Блюда', '/products'],
                [product.title, `/products/${id}`]
            ])));
        }
    }, [id, product.title]);

    return (
        <div className='detailed__page'>
            <Header/>
            <div className={styles['detailed__page-wrapper']} style={{paddingTop: "90px"}}>
                <BreadCrumbs/>
                <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 24}}>
                    <h2 className={styles['detailed__page-title']} style={{margin: 0}}>{product?.title}</h2>
                    {isUserAuth && (
                        <div style={{cursor: 'pointer'}}>
                            <ApplicationIcon onClick={handleGoToCart} />
                        </div>
                    )}
                </div>
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
                        {user.isSuperuser && (
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
                        {isUserAuth && (
                            <Button 
                                variant="primary"
                                onClick={handleAddToCart}
                                className={styles['add-to-cart-button']}
                                style={{margin: '16px 0'}}
                            >
                                В корзину
                            </Button>
                        )}
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