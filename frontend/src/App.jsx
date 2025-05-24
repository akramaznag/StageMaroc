import { useState } from 'react'
import Header from './components/Header'
import Body from './components/Body'
import Footer from './components/Footer'
import Sidebar from './components/Sidebar'
import Container from './components/Container'
import { BrowserRouter, RouterProvider } from 'react-router-dom'
import router from './routes'


function App() {
return(
  <RouterProvider router={router}/>
)


}

export default App
