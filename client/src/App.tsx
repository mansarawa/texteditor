
import './App.css'

import { BrowserRouter,Route,Routes } from 'react-router-dom'
import Home from './component/Home'
import Welcome from './component/Welcome'

function App() {
 
  return (
    <>
       <div>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<Home/>}/>
            <Route path='/home' element={<Welcome/>}/>
          </Routes>
        </BrowserRouter>
         
      </div>
    </>
  )
}

export default App
