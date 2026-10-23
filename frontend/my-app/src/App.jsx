import { useState } from 'react'
import { Route, BrowserRouter as Router } from 'react-router-dom'
import { Routes } from 'react-router-dom'
import Home from './pages/landing'


import './App.css'

function App() {


  return (
    <>
     <Router>
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>

     </Router>
    </>
  )
}

export default App
