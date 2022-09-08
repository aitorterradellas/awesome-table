import React from 'react'
import { MainPage } from '../pages/main/MainPage'
import { NewMoviePage } from '../pages/newMovie/NewMoviePage'
import { UpdateMoviePage } from '../pages/updateMovie/UpdateMoviePage'

interface RouteProps {
  path: string
  element: JSX.Element
}

export const ROUTES: Record<string, RouteProps> = {
  MAIN_PAGE: {
    element: <MainPage />,
    path: '/',
  },
  NEW_MOVIE: {
    element: <NewMoviePage />,
    path: '/new-movie',
  },

  UPDATE_MOVIE: {
    element: <UpdateMoviePage />,
    path: '/:id',
  },
}
