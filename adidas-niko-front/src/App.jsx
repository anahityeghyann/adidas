import React, { useEffect, useState } from 'react'
import { BrowserRouter, Route, Routes, useParams } from 'react-router'
import Home from './pages/Home/Home'
import Layout from './layouts/Layout/Layout'
import ProductDetails from './components/ProductDetails/ProductDetails'
import AllReviews from './components/AllReviews/AllReviews'
import Recommendation from './components/Recommendation/Recommendation'
import CardSummary from './components/CardSummary/CardSummary'
import { getProduct } from './api/products'

const ProductPage = () => {
  const {id} = useParams()
  const [product, setProduct] = useState(null) 
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() =>{
    setLoading(true)
    setError(null)
    getProduct(id)
    .then(setProduct)
    .catch(() => setError('Product not found'))
    .finally(() => setLoading(false))
  }, [id])

  return (
    <>
      <ProductDetails product={product} loading={loading} error={error}/>
      <AllReviews product={product}/>
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


