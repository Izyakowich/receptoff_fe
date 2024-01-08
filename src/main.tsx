import React from 'react'
import 'bootstrap/dist/css/bootstrap.css';
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.scss'
import store from "./Store";
import { Provider } from "react-redux";

// ReactDOM.createRoot(document.getElementById('root')!).render(
//   <React.StrictMode>
//     <Provider store={store}>
//       <App />
//     </Provider>
//   </React.StrictMode>,
// )


ReactDOM.createRoot(document.getElementById('root')!).render(
    <Provider store={store}>
      <App />
    </Provider>
)
