
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
            <Route path='/' element={<Welcome/>}/>
            <Route path='/home' element={<Home/>}/>
          </Routes>
        </BrowserRouter>
         
      </div>
    </>
  )
}

export default App
