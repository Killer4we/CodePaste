import { useState } from 'react'
import './App.css'
import Navbar from './components/Navbar'
import Home from './components/Home'
import About from './components/About'
import Pastes from './components/Pastes'
import ViewPaste from './components/ViewPaste'
import Error from './components/Error'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'


const router = createBrowserRouter(
  [{
    path:'/',
    element: <div>
      <Navbar/>
      <Home/>
    </div>
  },
  {
    path:'/home',
    element: <div>
      <Navbar/>
      <Home/>
    </div>
  },
  {
    path:'/about',
    element: <div>
    <Navbar/>
    <About/>
  </div>
  },
  {
    path: '/pastes',
    element : <div>
      <Navbar/>
      <Pastes/>
    </div>
  },
  {
    path: '/paste/:id',
    element: <div>
      <Navbar/>
      <ViewPaste/>
    </div>
  },
  {
    path:'*',
    element: <div>
      <Navbar/>
      <Error/>
    </div>
  }
]
)


function App() {

  return (
    <div>
      <RouterProvider router={router}>
          Hey
      </RouterProvider>
    </div>
  )
}

export default App
