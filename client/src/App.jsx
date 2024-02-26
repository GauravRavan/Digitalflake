import { useState } from 'react'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import Login from './Login'
import Home from './Home'
import Register from './Register'


function App() {
  const [count, setCount] = useState(0)

  return (
   <div>
     <BrowserRouter>
    <Routes>
    <Route path="/" element={<Login></Login>}></Route>
    <Route path="/home" element={<Home></Home>}></Route>
    <Route path="/Register" element={<Register></Register>}></Route>
    </Routes>
    </BrowserRouter>

   </div>
  )
}

export default App
