import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Form from './Form'
import Table from './Table'
import FormData from './FormData'
function App() {
  const [count, setCount] = useState(0)


  return (
    <>

      {/* <Form/> */}
      {/* <Table /> */}
      <FormData />
    </>
  )
}

export default App
