import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router'
import Home from './pages/Home/Home'
import Layout from './layouts/Layout/Layout'
import ProductDetails from './components/ProductDetails/ProductDetails'
import AllReviews from './components/AllReviews/AllReviews'
import Recommendation from './components/Recommendation/Recommendation'
import CardSummary from './components/CardSummary/CardSummary'

const ProductPage = () => {
  return (
    <>
      <ProductDetails />
      <AllReviews />
      <Recommendation />
    </>
  )
}

const App = () => {
  return (
    <BrowserRouter>
    <Routes>
      <Route element={<Layout/>}>
         <Route path='/' element={<Home/>}/> 
         <Route path='/product/:id' element={<ProductPage/>}/> 
         <Route path='/cart' element={<CardSummary/>}/>
      </Route>
    </Routes>
    </BrowserRouter>
  )
}

export default App

// dress styles section 

