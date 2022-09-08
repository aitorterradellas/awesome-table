import { IQuery } from '../../common/domain/IQuery'
import { Result } from '../../common/domain/Result'
import { MovieDTO } from '../infrastructure/MovieDTO'
import { Movie } from './Movie'

export interface IMovieRepository {
  getMovies(query: IQuery): Promise<Result<Movie[]>>
  getMovie(id: string): Promise<Result<Movie>>
  addMovie(movie: MovieDTO): Promise<Result>
  updateMovie(movie: MovieDTO): Promise<Result>
  deleteMovie(id: string): Promise<Result>
}
