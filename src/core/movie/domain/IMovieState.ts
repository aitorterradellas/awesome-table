import { IMovie } from './IMovie'

export interface IMovieState {
  movies: IMovie[]
  loading: boolean
  error: string
}
