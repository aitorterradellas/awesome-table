import React from 'react'
import { MainPage } from '../pages/main/MainPage'
import { NewMoviePage } from '../pages/newMovie/NewMoviePage'

interface RouteProps {
  path: string
  element: JSX.Element
  title: string
}

export const ROUTES: Record<string, RouteProps> = {
  MAIN_PAGE: {
    element: <MainPage />,
    path: '/',
    title: 'Main page',
  },
  NEW_MOVIE: {
    element: <NewMoviePage />,
    path: '/new-movie',
    title: 'New movie',
  },
}
