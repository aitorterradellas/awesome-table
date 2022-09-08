import React, { createContext, useState } from 'react'
import { IMovieState } from '../../core/movie/domain/IMovieState'

const INITIAL_STATE: IMovieState = {
  movies: [],
  loading: false,
  error: '',
}

export const MovieContext = createContext({
  state: INITIAL_STATE,
  setState: (set: (movie: IMovieState) => IMovieState) => {
    /** DOES NOTHING */
  },
})

export const MovieProvider = ({
  children,
}: {
  children: React.ReactNode
}): React.ReactElement => {
  const [state, setState] = useState(INITIAL_STATE)

  return (
    <MovieContext.Provider value={{ state, setState }}>
      {children}
    </MovieContext.Provider>
  )
}
