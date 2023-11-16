import React, { useState } from 'react'
import BookListContainer from './components/BookList/BookListContainer'
import Navbar from './components/Navbar/Navbar'
import Home from './pages/Home/Home'
import AddNewBookForm from './components/AddNewBookForm/AddNewBookForm'
import { ToastContainer } from 'react-toastify'

import 'react-toastify/dist/ReactToastify.css';

function App() {
  
  return (
    <>
      <AddNewBookForm/>


      <ToastContainer
            position="top-right"
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