import React from 'react'
import {Routes, Route} from 'react-router-dom'
import Home from '../Screens/Home'
import LandingPage from '../Screens/LandingPage'

const App=()=>{
  return(
    <Routes>
      <Route path='/' element={<LandingPage/>}></Route>
      <Route path='/' element={<Home/>}></Route>
    </Routes>
  )
}


export default App