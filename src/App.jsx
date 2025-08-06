import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Form from './Form'
import Table from './Table'
import FormData from './FormData'
import { BrowserRouter,Routes, Route } from 'react-router-dom'
import ApiFetch from './apiFetch'


function App() {
  const [count, setCount] = useState(0)


  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<FormData/>}/>
          <Route path='/table' element={<Table />}/>
          <Route path='/form' element={<Form/>}/>
          <Route path='/api' element={< ApiFetch/>} />
        </Routes>
      </BrowserRouter>
      

    </>
  )
}

export default App
