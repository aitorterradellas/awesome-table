import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

// Constants
import { ROUTES } from './ui/routes/routes'

// Context
import { MovieProvider } from './ui/store/MovieProvider'

function App() {
  return (
    <MovieProvider>
      <BrowserRouter>
        <Routes>
          {Object.keys(ROUTES).map((routeKey) => {
            const route = ROUTES[routeKey]

            return <Route key={route.path} {...route} />
          })}
        </Routes>
      </BrowserRouter>
    </MovieProvider>
  )
}

export default App
