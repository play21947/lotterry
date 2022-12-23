import React from 'react'
import {Routes, Route} from 'react-router-dom'
import Home from './Screens/Home'
import SignIn from './Screens/SignIn'
import SignUp from './Screens/SignUp'
import './App.css'
import Cart from './Screens/Cart'
import Account from './Screens/Account'

const App=()=>{
  return(
    <Routes>
      <Route path='/' element={<Home/>}></Route>
      <Route path='/signin' element={<SignIn/>}></Route>
      <Route path="/signup" element={<SignUp/>}></Route>
      <Route path='/cart' element={<Cart/>}></Route>
      <Route path='/account' element={<Account/>}></Route>
    </Routes>
  )
}


export default App