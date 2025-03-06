import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Sidebar from './component/Sidebar'
import Editor from './component/Editor'
import { BrowserRouter,Route,Routes } from 'react-router-dom'
import Home from './component/Home'
import Welcome from './component/Welcome'
import FolderFileManager from './component/FolderManage'
function App() {
  const [count, setCount] = useState(0)

  return (
    <>
       <div>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<Welcome/>}/>
            <Route path='/home' element={<Home/>}/>
          </Routes>
        </BrowserRouter>
         {/* <Sidebar />
         <Editor /> */}
      </div>
    </>
  )
}

export default App
