import { HashRouter, Routes, Route, Navigate } from 'react-router-dom'
import React from 'react';
import MainPage from 'pages/MainPage';
import ProductsPage from 'pages/ProductsPage';
import DetaliedPage from 'pages/DetaliedPage';
import RegistrationPage from 'pages/RegistrationPage';
import LoginPage from 'pages/LoginPage';
import CurrentApplicationPage from 'pages/CurrentApplicationPage';
import ApplicationsListPage from 'pages/ApplicationsListPage';
import SelectedApplicationPage from 'pages/SelectedApplicationPage';
import AdminProductsPage from 'pages/AdminProductsPage';
import axios, {AxiosResponse} from 'axios';
import Cookies from "universal-cookie";
import {useDispatch} from "react-redux";
import {setUserAction, setIsAuthAction, useIsAuth, useUser} from "../Slices/AuthSlice";
import { useIsProductsLoading, setProductsAction, setIsProductsLoadingAction} from "Slices/MainSlice";
import { setCurrentApplicationIdAction } from 'Slices/ApplicationsSlice'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { mockProducts } from '../../consts';
import { setApplicationsAction, setCurrentApplicationDateAction, setProductsFromApplicationAction } from 'Slices/ApplicationsSlice'
import { useCurrentApplicationId } from 'Slices/ApplicationsSlice'
import AdminApplicationsPage from 'pages/AdminApplicationsPage/AdminApplicationsPage';
import AddProductPage from 'pages/AddProductPage';
import EditProductPage from 'pages/EditProductPage';

const cookies = new Cookies();

export type Product = {
    id: number,
    title: string,
    price: number,
    info: string,
    src: string
}

export type ReceivedProductData = {
    id: number,
    product_name: string,
    product_info: string,
    price: number,
    status: string,
    photo: string,
}

function App() {
  const dispatch = useDispatch();
  const isAuth = useIsAuth();
  const user = useUser();
  const isLoading = useIsProductsLoading();


  const getInitialUserInfo = async () => {
    console.log(cookies.get("session_id"))
    try {
      const response: AxiosResponse = await axios('http://localhost:8000/user_info/',
      { 
        method: 'GET',
        withCredentials: true, 
        headers: {
          "Content-type": "application/json; charset=UTF-8"
        },
      })

      console.log(response.data)
      dispatch(setIsAuthAction(true))
      dispatch(setUserAction({
        email: response.data.email,
        isSuperuser: response.data.is_superuser
      }))
      
    } 
    catch {
      console.log('Пользоатель не авторизован!!!')
    }
  }

  const getProducts = async () => {
    try {
        const response = await axios('http://localhost:8000/products/', {
            method: 'GET',
            withCredentials: true 
        });
        const products = response.data.products;
        if (response.data.application_id) {
          getCurrentApplication(response.data.application_id);
          dispatch(setCurrentApplicationIdAction(response.data.application_id))
        }
        const newArr = products.map((raw: ReceivedProductData) => ({
            id: raw.id,
            title: raw.product_name,
            price: raw.price,
            info: raw.product_info,
            src: raw.photo
                  }));
        dispatch(setProductsAction(newArr));
    }
    catch {
      dispatch(setProductsAction(mockProducts));
    } finally {
      dispatch(setIsProductsLoadingAction(false))
    }
};

const getCurrentApplication = async (id: number) => {
  try {
    const response = await axios(`http://localhost:8000/applications/${id}/`, {
      method: 'GET',
      withCredentials: true,
    })
    dispatch(setCurrentApplicationDateAction(response.data.application.creation_date))
    const newArr = response.data.products.map((raw: ReceivedProductData) => ({
      id: raw.id,
      title: raw.product_name,
      price: raw.price,
      info: raw.product_info,
      src: raw.photo
  }));

  dispatch(setProductsFromApplicationAction(newArr))
  } catch(error) {
    throw error;
  }
}

// const handleFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
//   event.preventDefault();
//   try {
      
//       const response: AxiosResponse = await axios.get('http://localhost:8000/user_info', {
//           withCredentials: true
//       });
//       console.log(response.data)

//       dispatch(setIsAuthAction(true))

//       dispatch(setUserAction({
//           email: response.data.email,
//           fullname: response.data.full_name,
//           phoneNumber: response.data.phone_number,
//           isSuperuser: response.data.is_superuser
//       }));

//   } catch (error) {
//       throw error
//   }
// };

  React.useEffect(() => {
    dispatch(setIsProductsLoadingAction(true))
    if (cookies.get("session_id")) {
      getInitialUserInfo();
    }
    getProducts();
  }, [])

  return (
    <div className='app'>
      <HashRouter>
          <Routes>
          <Route
          path="/"
          element={<Navigate to="/products/" replace />}
        />
              {/* <Route path='/' element={<ProductsPage/>}/> */}
              <Route path="/products/" element={<ProductsPage />} />
              {isAuth && user.isSuperuser && <Route path="/products/admin/" element={<AdminProductsPage />} />}
              {isAuth && user.isSuperuser && <Route path="/applications/" element={<AdminApplicationsPage />} />}
              {isAuth && user.isSuperuser && <Route path="/products/admin/add/" element={<AddProductPage />} />}
              {isAuth && user.isSuperuser && <Route path="/products/admin/edit/:id/" element={<EditProductPage />} />}              {isAuth && user.isSuperuser && <Route path="/admin/edit/:id/" element={<EditProductPage />} />}
              {isAuth && user.isSuperuser && <Route path="/applications/detailed/:id/" element={<SelectedApplicationPage />} />}

              <Route path="/products/">
                <Route path=":id" element={<DetaliedPage />} />
              </Route>
              {!isAuth && <Route path='/registration/' element={<RegistrationPage/>}></Route>}
              {!isAuth && <Route path='/login/' element={<LoginPage/>}></Route>}
              
              {isAuth && !user.isSuperuser && <Route path='/applications/' element={<ApplicationsListPage/>}></Route>}
              {isAuth  && <Route path="/applications/">
                <Route path=":id/" element={<SelectedApplicationPage />} />
              </Route>}

              <Route path="*" element={<Navigate to="/" replace />} />
              
          </Routes>
      </HashRouter>
      <ToastContainer autoClose={1500} pauseOnHover={false} />
    </div>
    );
  }
  
export default App;