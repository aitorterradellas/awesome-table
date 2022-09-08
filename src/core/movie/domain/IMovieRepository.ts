import { IQuery } from '../../common/domain/IQuery'
import { Result } from '../../common/domain/Result'
import { Movie } from './Movie'

export interface IMovieRepository {
  getMovies(query: IQuery): Promise<Result<Movie[]>>
  getMovie(id: string): Promise<Result<Movie>>
  addMovie(movie: Movie): Promise<Result>
  updateMovie(movie: Movie): Promise<Result>
  deleteMovie(id: string): Promise<Result>
}
