import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom'
import Home from './pages/Home/Home.jsx'
import ReadBook from './pages/ReadBook/ReadBook.jsx'
import AddNewBookForm from './components/AddNewBookForm/AddNewBookForm.jsx'
import Login from './pages/Login/Login.jsx'
import Signup from './pages/Signup/Signup.jsx'
import AuthLayout from './components/AuthLayout.jsx'
const router=createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App/>}>
      <Route path='' element={<AuthLayout><Home/></AuthLayout>}/>
      <Route path='book/:id' element={<AuthLayout><ReadBook/></AuthLayout>}/>
      <Route path='book/add' element={<AuthLayout><AddNewBookForm/></AuthLayout>}/>
      <Route path='login' element={<Login/>}/>
      <Route path='signup' element={<Signup/>}/>
    </Route>
  )
)
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider
      router={router}
    />
  </React.StrictMode>,
)
