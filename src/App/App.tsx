import { HashRouter, Routes, Route } from 'react-router-dom'
// import styles from './App.module.scss'
import MainPage from 'pages/MainPage';
import DetaliedPage from 'pages/DetaliedPage';
import RegistrationPage from 'pages/RegistrationPage';
import LoginPage from 'pages/LoginPage';

function App() {
    return (
      <div className='app'>
        <HashRouter>
            <Routes>
                <Route path="/" element={<MainPage />} />

                <Route path="/product">
                  <Route path=":id" element={<DetaliedPage />} />
                </Route>

                <Route path='/registration' element={<RegistrationPage/>}></Route>
                <Route path='/login' element={<LoginPage/>}></Route>
            </Routes>
        </HashRouter>
      </div>
    );
  }
  
export default App;