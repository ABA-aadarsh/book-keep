import React, { useState } from 'react'
import {store} from "./store/store"


import Home from "./pages/Home/Home"

import AddNewBookForm from './components/AddNewBookForm/AddNewBookForm'
import { ToastContainer } from 'react-toastify'

import 'react-toastify/dist/ReactToastify.css';
import { Provider } from 'react-redux';
import PDFviewer from './components/PDFviewer/PDFviewer'
import ReadBook from './pages/ReadBook/ReadBook'
import { Outlet } from 'react-router-dom'

function App() {
  
  return (
    <>
      <Provider store={store}>
        {/* <ReadBook
          id='65571ba9a1f84c7fdc27'
        /> */}
        <Outlet/>
        {/* <AddNewBookForm/> */}
      </Provider>


      <ToastContainer
            position="top-center"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
        />
    </>
  )
}

export default App